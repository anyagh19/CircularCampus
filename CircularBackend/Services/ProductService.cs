using CircularBackend.Data;
using CircularBackend.Models.Dtos;
using CircularBackend.Models.Entities;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System.Net;
using System.Threading.Tasks;

namespace CircularBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly Account _account;

        public ProductService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            var section = _configuration.GetSection("Cloudinary");
            _account = new Account(
                section["CloudName"],
                section["ApiKey"],
                section["ApiSecret"]
            );
        }
        
        public async Task<bool> CreateProduct(ProductCreateDto productCreateDto)
        {
            if (productCreateDto == null)
            {
                return false;
            }

            var ProductImageUrl =await UploadImageToCloudinary(productCreateDto.ProductImage);

            var product = new Product
            {
                ProductName = productCreateDto.ProductName,
                ProductDescription = productCreateDto.ProductDescription,
                ProductImageUrl = ProductImageUrl,
                ProductCategory = productCreateDto.ProductCategory,
                ProductPrice = productCreateDto.ProductPrice,
                CampusCode = productCreateDto.CampusCode,
                StudentId = productCreateDto.StudentId
            };

            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return true;
        }

        private async Task<string> UploadImageToCloudinary(IFormFile file)
        {
            var client = new Cloudinary(_account);
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(file.FileName, file.OpenReadStream()),
                DisplayName = file.FileName
            };               

            var uploadResult = await client.UploadAsync(uploadParams);
            
            if(uploadResult != null && uploadResult.StatusCode == HttpStatusCode.OK)
            {
                return uploadResult.SecureUrl.ToString();
            }
            return null; 
        }

    }
}
