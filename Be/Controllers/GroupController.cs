using hihi.Models;
using Microsoft.AspNetCore.Mvc;

namespace hihi.Controllers
{
    public class GroupController : Controller
    {
        private readonly DatabaseContext _ctx;
        public GroupController(DatabaseContext dbContext)
        {
            _ctx = dbContext;
        }
        [HttpPost]
        [Route("Group/CreateGroup")]
        public IActionResult CreateGroup([FromBody] Groups group)
        {          
                _ctx.Groups.Add(group);
                _ctx.SaveChanges();
                return Json(group);                                        
        }
        [HttpGet]
        [Route("Group/Details/GroupId/{GroupId}")]
        public IActionResult SuaNhom(int GroupId)
        {     // Lấy thông tin nhóm con từ cơ sở dữ liệu theo groupId
            var editgr = _ctx.Groups.Where(g => g.GroupId == GroupId);
            var jsongr = editgr.Select(u => new
            {
                id = u.GroupId,
                name = u.Name,
                code = u.Code,
                stt = u.STT,
            });
            return Ok(jsongr);
        }
        [HttpPut]
        [Route("Group/UpdateGroup")]
        public async Task<IActionResult> CapNhatNhom([FromBody] Groups group)
        {
            var grold = _ctx.Groups.FirstOrDefault(g => g.STT == group.STT && g.Parent_Id == group.Parent_Id);
            var editgr = await _ctx.Groups.FindAsync(group.GroupId);
            
            if (editgr != null && grold.STT != null)
            {
                var a = editgr.STT;
                grold.STT = a;
            }
            editgr.Name = group.Name;   
            editgr.Code = group.Code;
            editgr.STT = group.STT;
            await _ctx.SaveChangesAsync();
            return Ok(grold);
        }
        [HttpDelete]
        [Route("Group/DeleteGroup/GroupId/{GroupId}")]
        public IActionResult XoaNhom(int GroupId)
        {
            var item = _ctx.Groups.Find(GroupId);
            if (item != null)
            {
                _ctx.Groups.Remove(item);
                _ctx.SaveChanges();
                return Json(item);
            }
            else
            {
                return NotFound(); 
            }            
        }
    }
}
