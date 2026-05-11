namespace CircularBackend.Models.Dtos
{
    public class StudentListDto
    {
        public int Id { get; set; }
        public string StudentId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public string Year { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class PagedStudentResponseDto
    {
        public List<StudentListDto> Students { get; set; }
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }

    }
}
