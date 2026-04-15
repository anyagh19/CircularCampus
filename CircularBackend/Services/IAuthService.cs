using CircularBackend.Models.Dtos;
using CircularBackend.Models.Entities;

namespace CircularBackend.Services
{
    public interface IAuthService
    {
        public Task<bool> CreateUser(CampusDto request);
        public Task<Student> CreateStudent(StudentDto request);
        public Task<LoginTokensResponseDto> LoginUser(LoginDto request);
        public Task<string> RefreshTokenAsync(string refreshToken);
  
    }

    public interface IUserEntity
    {
        int Id { get; set; }
        string Password { get; set; }
        string RefreshToken { get; set; }
        DateTime RefreshTokenExpiryTime { get; set; }
        int CampusCode { get; set; }
        string Role { get; set; }
    }
}
