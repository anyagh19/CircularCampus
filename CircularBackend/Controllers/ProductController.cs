using CircularBackend.Models.Dtos;
using CircularBackend.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CircularBackend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProductController(IProductService productService) : ControllerBase
    {
        [HttpPost]
        [Route("create_product/{CampusCode}/{StudentId}")]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateDto productCreateDto, int CampusCode , int StudentId )
        {
            productCreateDto.CampusCode = CampusCode;
            productCreateDto.StudentId = StudentId;
           
            var result = await productService.CreateProduct(productCreateDto);
            if (!result)
            {
                return BadRequest(new { message = "Failed to create product" });
            }
            return Ok(new { message = "Product created successfully" });
        }
    }
}
