using System.ComponentModel.DataAnnotations;

namespace CircularBackend.Models.Dtos
{
    public class LoginDto
    {
        [Required]
       
        public string Identifier { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
