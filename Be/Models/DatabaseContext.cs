using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.X509Certificates;
using hihi.Models;

namespace hihi.Models
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> opts) :base(opts) { }
        public DbSet<Groups> Groups { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<Roles> Roles { get; set; }
    }
}
