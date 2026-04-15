using CircularBackend.Data;
using CircularBackend.Models.Dtos;
using CircularBackend.Models.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace CircularBackend.Services
{
    public class AuthService(ApplicationDbContext context , IConfiguration configuration) : IAuthService
    {
        public async Task<bool> CreateUser(CampusDto request)
        {
            var user = await context.Campuses.FirstOrDefaultAsync(u => u.CampusEmail == request.CampusEmail);
            if (user == null)
            {
                var password = PasswordHasher(request.Password);
                var newCampus = new Campus
                {
                    CampusName = request.CampusName,
                    CampusCode = request.CampusCode,
                    CampusEmail = request.CampusEmail,
                    Password = password
                };

                await context.Campuses.AddAsync(newCampus);

                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }
        public async Task<Student> CreateStudent(StudentDto request)
        {
            if(request == null)
            {
                return null;
            }

            var campus = await context.Campuses.FirstOrDefaultAsync(c => c.CampusCode == request.CampusCode);
            if(campus == null)
            {
                return null;
            }
            var check = await context.Students.FirstOrDefaultAsync(u => u.StudentId == request.StudentId);
            if(check != null)
            {
                return null;
            }
            var student = new Student
            {
                StudentId = request.StudentId,
                Name = request.Name,
                Password = PasswordHasher(request.Password),
                CampusCode = request.CampusCode,
                Role = "Student",
                Campus = campus
            };

            await context.Students.AddAsync(student);
            await context.SaveChangesAsync();
            return student;
        }

        public async Task<LoginTokensResponseDto> LoginUser(LoginDto request)
        {
            if(request == null)
            {
                return null;
            }

            if(request.Identifier.Contains("@"))
            {
                var user = await context.Campuses.FirstOrDefaultAsync(u => u.CampusEmail == request.Identifier);

                if (user == null) return null;

                var isPasswordValid = PasswordChecker(request.Password, user.Password);

                if (!isPasswordValid) return null;

                var accessToken = GenerateAccessToken(user.Id.ToString(), "Campus" , user.CampusCode.ToString());
                var refreshToken = GenerateRefreshTokend();
                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);
                await context.SaveChangesAsync();

                return new LoginTokensResponseDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
            }
            else
            {
              
                var user = await context.Students.FirstOrDefaultAsync(u => u.StudentId == request.Identifier);

                if (user == null) return null;

                var isPasswordValid = PasswordChecker(request.Password, user.Password);

                if (!isPasswordValid) return null;

                var accessToken = GenerateAccessToken(user.Id.ToString(), "Student" , user.CampusCode.ToString());
                var refreshToken = GenerateRefreshTokend();

                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(7);

                return new LoginTokensResponseDto
                {
                    AccessToken = accessToken,
                    RefreshToken = refreshToken
                };
            }
        }
        public async Task<string> RefreshTokenAsync(string refreshToken)
        {
            IUserEntity? user = (IUserEntity?)await context.Campuses.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken)
                     ?? (IUserEntity?)await context.Students.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return null;
            }
            return GenerateAccessToken(user.Id.ToString(), user.Role , user.CampusCode.ToString());

        }

        private string PasswordHasher(string password)
        {
            var HashedPassword = new PasswordHasher<object>().HashPassword(null , password);
            return HashedPassword;
        }

        private bool PasswordChecker(string password , string hashedPassword)
        {
            var checker = new PasswordHasher<Campus>();
            var result = checker.VerifyHashedPassword(null, hashedPassword, password);

            if(result == PasswordVerificationResult.Success)
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }

        private string GenerateAccessToken(string userId, string role, string CampusCode) 
        {
            //claims are those who we wants to add in token like userId, role, email etc
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Role, role),
                new Claim(ClaimTypes.Name , CampusCode)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration.GetValue<string>("Jwt:Key")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(15),
                SigningCredentials = creds,
                Issuer = configuration.GetValue<string>("Jwt:Issuer"),
                Audience = configuration.GetValue<string>("Jwt:Audience")
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshTokend()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


    }
}
