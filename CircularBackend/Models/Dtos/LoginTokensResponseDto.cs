namespace CircularBackend.Models.Dtos
{
    public class LoginTokensResponseDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Role { get; set; }
    }
}
