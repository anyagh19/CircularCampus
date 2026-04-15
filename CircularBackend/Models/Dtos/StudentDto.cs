using System.ComponentModel.DataAnnotations;

namespace CircularBackend.Models.Dtos
{
    public class StudentDto
    {
        public string StudentId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int CampusCode { get; set; }
    }
}
