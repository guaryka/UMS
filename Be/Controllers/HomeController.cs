using hihi.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace hihi.Controllers
{
    public class HomeController : Controller
    {
        private readonly DatabaseContext _ctx;
        public HomeController(DatabaseContext dbContext)
        {
            _ctx = dbContext;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult QuanLy()
        {
            return View();
        }
        public IActionResult Nodes()
        {
            var nodes = new List<JsTreeModel>();
            foreach (Groups items in _ctx.Groups)
            {
                if (items.GroupId == 1)
                {
                    nodes.Add(new JsTreeModel() { id = items.GroupId.ToString(), parent = "#", text = items.Name.ToString() });
                }
                else
                    nodes.Add(new JsTreeModel() { id = items.GroupId.ToString(), parent = items.Parent_Id.ToString(), text = items.Name.ToString() + " " + items.STT.ToString() });
            }
            return Json(nodes);
        }
    }
}