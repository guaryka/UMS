using hihi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Configuration;
using System.Globalization;
using System.Text.RegularExpressions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace hihi.Controllers
{
    public class UserController : Controller
    {
        private readonly DatabaseContext _ctx;
        public UserController(DatabaseContext dbContext)
        {
            _ctx = dbContext;
        }
        [HttpPost]
        public async Task<JsonResult> GetData(int GroupId)
        {
            int draw = Convert.ToInt32(Request.Form["draw"].FirstOrDefault() ?? "0");
            int length = Convert.ToInt32(Request.Form["length"].FirstOrDefault() ?? "0");
            int start = Convert.ToInt32(Request.Form["start"].FirstOrDefault() ?? "0");
            string searchValue = Request.Form["search[value]"].FirstOrDefault() ?? "";
            Console.WriteLine("searchValue: " + searchValue);
            
            var totalRecordsTask = _ctx.Users.CountAsync(u => u.GroupId == GroupId);
            var totalRecords = await totalRecordsTask;
            var baseQuery = (from u in _ctx.Users
                             join r in _ctx.Roles on u.RoleId equals r.RoleId
                             where u.GroupId == GroupId
                             orderby u.STT
                             select new { u, r });
                             
            if (!string.IsNullOrEmpty(searchValue))
            {
                baseQuery = baseQuery.Where(e => (e.u.FullName + e.u.Gender + e.u.Email + e.u.UserName + e.u.Date + e.u.Number + e.r.Name).Contains(searchValue));
            }
            int filteredRecords = baseQuery.Count();
            var jsonUsers = baseQuery.Skip(start).Take(length).Select(u => new
            {
                id = u.u.Id,
                fullname = u.u.FullName,
                username = u.u.UserName,
                date = u.u.Date,
                gender = u.u.Gender,
                number = u.u.Number,
                email = u.u.Email,
                groupid = u.u.GroupId,
                stt = u.u.STT,
                roleName = u.r.Name,
                roleId = u.r.RoleId,
            });
            return Json(new
            {
                draw = draw,
                recordsTotal = totalRecords,
                recordsFiltered = filteredRecords,
                data = jsonUsers.ToList(),            
            });
        }
        [HttpPost]
        [Route("User/CreateUser")]
        public IActionResult TaoNguoiDungMoi([FromBody] Users users)
        {
            _ctx.Users.Add(users);
            _ctx.SaveChanges();
            var users2 = from u in _ctx.Users
                         join r in _ctx.Roles on u.RoleId equals r.RoleId
                         where u.GroupId == users.GroupId
                         select new { u, r };

            var jsonUsers = users2.Select(u => new
            {
                id = u.u.Id,
                fullname = u.u.FullName,
                username = u.u.UserName,
                date = u.u.Date,
                gender = u.u.Gender,
                number = u.u.Number,
                email = u.u.Email,
                groupid = u.u.GroupId,
                stt = u.u.STT,
                roleName = u.r.Name,
            });
            return Ok(jsonUsers);
        }
        [HttpPut]
        [Route("User/UpdateUser")]
        public async Task<IActionResult> ChinhSuaNguoiDung([FromBody] Users users)
        {
            var editgr = _ctx.Users.FirstOrDefault(g => g.Id == users.Id);    
            editgr.FullName = users.FullName;
            editgr.UserName = users.UserName;
            editgr.Date = users.Date;
            editgr.Gender = users.Gender;
            editgr.Number = users.Number;
            editgr.Email = users.Email;
            editgr.STT = users.STT;
            editgr.RoleId = users.RoleId;
            await _ctx.SaveChangesAsync();
            var users2 = from u in _ctx.Users
                         join r in _ctx.Roles on u.RoleId equals r.RoleId
                         where u.GroupId == users.GroupId
                         select new { u, r };

            var jsonUsers = users2.Select(u => new
            {
                id = u.u.Id,
                fullname = u.u.FullName,
                username = u.u.UserName,
                date = u.u.Date,
                gender = u.u.Gender,
                number = u.u.Number,
                email = u.u.Email,
                groupid = u.u.GroupId,
                stt = u.u.STT,
                roleName = u.r.Name,
                roleId = u.r.RoleId,
            });
            return Ok(jsonUsers);
        }
        [HttpDelete]
        [Route("User/DeleteUser")]
        public async Task<IActionResult> XoaNguoiDung([FromBody] Users users)
        {
            var item = _ctx.Users.FirstOrDefault(g => g.Id == users.Id);
            if (item != null)
            {
                _ctx.Users.Remove(item);
                await _ctx.SaveChangesAsync();
                return Json(users);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
