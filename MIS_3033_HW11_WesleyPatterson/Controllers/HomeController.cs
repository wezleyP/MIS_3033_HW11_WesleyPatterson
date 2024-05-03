using Microsoft.AspNetCore.Mvc;
using MIS_3033_HW11_WesleyPatterson.Data;
using MIS_3033_HW11_WesleyPatterson.Models;
using System.Diagnostics;
using System.Numerics;
using System.Security.Cryptography;
using System.Xml.Linq;

namespace MIS_3033_HW11_WesleyPatterson.Controllers
{
    public class HomeController : Controller
    {
        PatientDB db = new PatientDB();

        public JsonResult GetPatients()
        {
            var patients = db.Patients;
            return Json(patients);
        }

        public JsonResult AddPatient( string id, string name , int age, double weight , double bmi)
        {
            Patient stu = db.Patients.Where(x => x.Id == id).FirstOrDefault();

            if (stu != null)
            {
                return Json(new { status = "fail", mes = "Student already exists" });
            }

            Patient p = new Patient();
            p.Id = id;
            p.Name = name;
            p.Age = age;
            p.Weight = weight;
            p.Bmi = bmi;

            p.Bmilevel = p.GetBMILevel();

            db.Patients.Add(p);
            db.SaveChanges();
            return Json(new { status = "success", mes = "Student added successfully" });
        }
        public JsonResult EditPatient( string id, string name , int age, double weight , double bmi)
        {

            Patient p = db.Patients.Where(x => x.Id == id).FirstOrDefault();

            if (p == null)
            {
                return Json(new { status = "fail", mes = "Student does not exist" });
            }

            p.Name = name;
            p.Age = age;
            p.Weight = weight;
            p.Bmi = bmi;

            p.Bmilevel = p.GetBMILevel();

            db.SaveChanges();
            return Json(new { status = "success", mes = "Student edited successfully" });
            
        }        
        public JsonResult DeletePatient( string id)
        {

            Patient p = db.Patients.Where(x => x.Id == id).FirstOrDefault();

            if (p == null)
            {
                return Json(new { status = "fail", mes = "Student does not exist" });
            }

            db.Remove(p);
            db.SaveChanges();
            return Json(new { status = "success", mes = "Student Deleted successfully" });
            
        }

        public JsonResult GetSummary()
        {
            return Json(db.Patients.GroupBy(x => x.Bmilevel).Select( x => new {l=x.Key, n=x.Count()}));
        }

        public IActionResult Summary()
        {
            return View();
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
