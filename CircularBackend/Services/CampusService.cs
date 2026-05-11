using CircularBackend.Data;
using CircularBackend.Models.Dtos;
using CircularBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CircularBackend.Services
{
    public class CampusService(ApplicationDbContext context) : ICampusService
    {
        public async Task<PagedStudentResponseDto> GetStudentByCampus(int campusCode , int page)
        {
            if(campusCode == null || campusCode <= 0)
            {
                return null;
            }

            var campus = await context.Campuses.FirstOrDefaultAsync(c => c.CampusCode == campusCode);
            if(campus == null)
            {
                return null;
            }
            
            var query = context.Students
                .Where(s => s.CampusCode == campusCode)
                .Select(s => new StudentListDto
                {
                    Id = s.Id,
                    StudentId = s.StudentId,
                    Name = s.Name,
                    Email = s.Email,
                    Department = s.Department,
                    Year = s.Year,
                    PhoneNumber = s.PhoneNumber
                });

            var pageResult = 2f;
            var pageCount = Math.Ceiling(context.Students.Count() / pageResult);

            var students = await query
                .Skip((page - 1) * (int)pageResult)
                .Take((int)pageResult)
                .ToListAsync();

            return new PagedStudentResponseDto
            {
                Students = students,
                TotalPages = (int)pageCount,
                CurrentPage = page
            };

        }

        public async Task<bool> DeleteStudentByIdAsync(int id)
        {
            var rowsDeleted = await context.Students
                .Where(s => s.Id == id)
                .ExecuteDeleteAsync();

            return rowsDeleted > 0;   // true if exactly 1 row was removed
        }
    }
}
