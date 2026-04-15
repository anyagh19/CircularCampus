using CircularBackend.Services;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace CircularBackend.Models.Entities
{
    public class Campus : IUserEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CampusName { get; set; }

        [Required]
        public int CampusCode { get; set; }

        [Required]
        [EmailAddress]
        public string CampusEmail { get; set; }

        [Required]
        public string Password { get; set; }
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiryTime { get; set; }
        [Required]
        public string Role { get; set; } = "Campus";

        public ICollection<Student> students { get; set; } = new List<Student>();
    }
}
