using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CircularBackend.Models.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string ProductDescription { get; set; }

        [Required]
        public string ProductImageUrl { get; set; }

        [Required]
        public string ProductCategory { get; set; }

        [Required]
        public decimal ProductPrice { get; set; }

        [Required]
        public int CampusCode { get; set; }

        [ForeignKey("CampusId")]
        public Campus campus { get; set; }
        public int campusId { get; set; }

        [Required]
        public int StudentId { get; set; }
        [ForeignKey("StudentId")]
        public Student Student { get; set; }

    }
}
