using CircularBackend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace CircularBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        //Tables are added here
        public DbSet<Campus> Campuses { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
