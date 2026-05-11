using CircularBackend.Models.Dtos;
using CircularBackend.Models.Entities;

namespace CircularBackend.Services
{
    public interface ICampusService
    {
        public Task<PagedStudentResponseDto> GetStudentByCampus(int campusCode , int page);

        public Task<bool> DeleteStudentByIdAsync(int Id);

    }
}
