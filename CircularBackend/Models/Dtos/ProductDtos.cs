namespace CircularBackend.Models.Dtos
{
    public class ProductDtos
    {
    }

    public class ProductCreateDto
    {
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public IFormFile ProductImage { get; set; }
        public string ProductCategory { get; set; }
        public int ProductPrice { get; set; }
        public int CampusCode { get; set; }
        public int StudentId { get; set; }
    }
}
