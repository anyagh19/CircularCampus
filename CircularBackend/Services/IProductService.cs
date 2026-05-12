using CircularBackend.Models.Dtos;

namespace CircularBackend.Services
{
    public interface IProductService
    {
        public Task<bool> CreateProduct(ProductCreateDto productCreateDto);
    }
}
