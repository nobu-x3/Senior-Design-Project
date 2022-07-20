#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using Dashboard;

namespace Dashboard.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly DashboardContext _context;

        public DashboardController(DashboardContext context)
        {
            _context = context;
        }

        // GET: api/Dashboard
        [HttpGet]
        public JsonResult GetStudents()
        {
            return new JsonResult(_context.Students.ToList());
        }

        // GET: api/Dashboard/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            return student;
        }

        // PUT: api/Dashboard/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{studentID}")]
        public async Task<IActionResult> PutStudent(string studentID, Student _student)
        {
            var student = _context.Students.FirstOrDefault(student => student.StudentID.Equals(studentID));
            if (student != null)
            {
                _context.Entry(student).State = EntityState.Modified;
                student.Status = _student.Status;
                student.LastUpdate = DateTime.Now;
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Dashboard
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Student>> PostStudent(Student student)
        {
            _context.Students.Add(student);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudent", new { id = student.ID }, student);
        }

        [HttpPost("server/{student.StudentID}")]
        public async Task<ActionResult<Student>> Post(Student student)
        {
            var _student = _context.Students.FirstOrDefault(student => student.StudentID.Equals(student.StudentID));
            if (_student != null)
            {
                _context.Entry(_student).State = EntityState.Modified;
                _student.Status = student.Status;
                _student.LastUpdate = DateTime.Now;
            }


            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // DELETE: api/Dashboard/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Students.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentExists(int id)
        {
            return _context.Students.Any(e => e.ID == id);
        }

        [HttpPost("sessionSave")]
        public async Task<IActionResult> StartSession()
        {
            bool finished = await CompileClientExecutables();
            return NoContent();
        }
        private async Task<bool> CompileClientExecutables()
        {
            var psi = new ProcessStartInfo()
            {
                FileName = "/bin/bash",
                Arguments = "-c \" cd ImgCapture; ./compile.sh \"",
                RedirectStandardOutput = false,
                UseShellExecute = true,
                CreateNoWindow = false
            };

            var process = Process.Start(psi);
            await process.WaitForExitAsync();
            return true;
        }
    }
}
