using CircularBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CircularBackend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CampusController(ICampusService campusService) : ControllerBase
    {
        [HttpGet]
        [Route("students/{campusCode}/{page}")]
        //[Authorize(Roles = "Campus")]
        public async Task<IActionResult> GetStudentsByCampus(int campusCode , int page)
        {
            var students = await campusService.GetStudentByCampus(campusCode , page);
            if (students == null)
            {
                return NotFound(new { message = "Campus not found or invalid campus code." });
            }
            return Ok(students);
        }

        [HttpDelete]
        [Route("delete_student/{id}")]
        public async Task<IActionResult> DeleteStudentById(int id)
        {
            var result = await campusService.DeleteStudentByIdAsync(id);
            if (result)
            { 
                return Ok(new { message = "Student deleted successfully." });
            }
            return NotFound(new { message = "Student not found." });
        }
    }
}
