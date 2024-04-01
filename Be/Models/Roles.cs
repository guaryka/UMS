using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hihi.Models
{
    public class Roles
    {
        [Key]
        public int RoleId { get; set; }
        public string? Name { get; set; }
    }
}
