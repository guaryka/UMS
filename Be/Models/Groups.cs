using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace hihi.Models
{
    public class Groups
    {
        [Key]
        public int GroupId { get; set; }
        public string? Name { get; set; }
        public string? Code { get; set; }
        public Nullable<int> Parent_Id { get; set; }
        public Nullable<int> STT { get; set; }
    }
}
