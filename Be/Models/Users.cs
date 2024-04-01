using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace hihi.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? UserName { get; set; }
        public Nullable<System.DateTime> Date { get; set; }
        public string? Gender { get; set; }
        public string? Number { get; set; }
        public string? Email { get; set; }
        public Nullable<int> GroupId { get; set; }
        public Nullable<int> RoleId { get; set; }
        public Nullable<int> STT { get; set; }
    }
}




