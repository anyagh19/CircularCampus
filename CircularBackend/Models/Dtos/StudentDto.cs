using System.ComponentModel.DataAnnotations;

namespace CircularBackend.Models.Dtos
{
    public class StudentDto
    {
        public string StudentId { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
        public int CampusCode { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public string Year { get; set; }
        public string PhoneNumber { get; set; }
    }
}
