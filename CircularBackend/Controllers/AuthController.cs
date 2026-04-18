using CircularBackend.Models.Dtos;
using CircularBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CircularBackend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService ) : ControllerBase
    {
        [HttpPost]
        [Route("campus_register")]
        public async Task<IActionResult> RegisterAsync(CampusDto request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Invalid request data." });
            }
            
            var result = await authService.CreateUser(request);
            if (result)
            {
                return Ok(new { message = "User created successfully." });
            }
            else
            {
                return BadRequest(new { message = "User with the same email already exists." });
            }
            
        }
        [HttpPost]
        [Route("create_student")]
        public async Task<IActionResult> RegisterStudent(StudentDto request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Invalid request data." });
            }
            var result = await authService.CreateStudent(request);
            if (result != null)
            {
                return Ok(new { message = $"student created successfully{result}" });
            }
            else
            {
                return BadRequest(new { message = "Student with the same email already exists." });
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginAsync(LoginDto request)
        {
            if (request == null)
            {
                return BadRequest(new { message = "Invalid request data." });
            }

            var tokens = await authService.LoginUser(request);

            if (tokens == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            Response.Cookies.Append("accessToken", tokens.AccessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true ONLY if using https://
                SameSite = SameSiteMode.Lax, // Lax is much better for local dev redirects
                Expires = DateTime.UtcNow.AddMinutes(5),
                Path = "/" //now middleware can access cookie in all route 
            });
            Response.Cookies.Append("refreshToken", tokens.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true ONLY if using https://
                SameSite = SameSiteMode.Lax, // Lax is much better for local dev redirects,
                Expires = DateTime.UtcNow.AddDays(7),
                Path = "/"
            });
            return Ok(new {message = "Login successful.", role = tokens.Role});
        }

        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("accessToken", new CookieOptions
            {
                HttpOnly = true,
                Secure = false, // Set to true ONLY if using https://
                SameSite = SameSiteMode.Lax, // Lax is much better for local dev redirects
                Path = "/"
            });
                Response.Cookies.Delete("refreshToken", new CookieOptions
                {
                    HttpOnly = true,
                    Secure = false, // Set to true ONLY if using https://
                    SameSite = SameSiteMode.Lax, // Lax is much better for local dev redirects
                    Path = "/"
                });

            return Ok(new { message = "Logged out successfully." });
        }

        [HttpPost]
        [Route("refresh_token")]
        public async Task<IActionResult> RefreshToken()
        {
            Console.WriteLine("Received refresh token request.");
            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                return BadRequest("Refresh token is missing.");
            }
            var newAccessToken = await authService.RefreshTokenAsync(refreshToken);
            if (newAccessToken == null)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }
           
            Response.Cookies.Append("accessToken", newAccessToken, new CookieOptions
            {
                 HttpOnly= true,
                    Secure = false, // Set to true ONLY if using https://
                    SameSite = SameSiteMode.Lax, // Lax is much better for local dev redirects
                    Expires = DateTime.UtcNow.AddMinutes(5),
                    Path = "/" //now middleware can access cookie in all route 
            });
            
            return Ok(new { Token = newAccessToken });
        }

    }
}
