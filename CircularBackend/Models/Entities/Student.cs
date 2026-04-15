using CircularBackend.Services;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CircularBackend.Models.Entities
{
    public class Student: IUserEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string StudentId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public int CampusCode { get; set; }
        [Required]
        public int CampusId { get; set; }

        public string RefreshToken { get; set; } = string.Empty;

        public DateTime RefreshTokenExpiryTime { get; set; }

        public string Role { get; set; } = "Student";

        [ForeignKey("CampusId")]
        public Campus Campus { get; set; }

    }
}
