using System.ComponentModel.DataAnnotations;

namespace CircularBackend.Models.Dtos
{
    public class CampusDto
    {
        
        public string CampusName { get; set; }
        public int CampusCode { get; set; }
        public string CampusEmail { get; set; }
        public string Password { get; set; }
    }
}
