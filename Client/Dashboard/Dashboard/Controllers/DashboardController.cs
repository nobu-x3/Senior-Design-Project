#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Text.Json;
using System.IO;
using System.Net;
using Dashboard;
using Microsoft.Net.Http.Headers;
using System.IO.Compression;
using NuGet.Protocol;

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

        
        [HttpPost("sessionLoad")]
        public async Task<IActionResult> LoadSession()
        {
            var postedFile = Request.Form.Files[0];
            var uploadFolder = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");
            
            if (postedFile.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(postedFile.ContentDisposition).FileName.Trim().ToString();
                var finalPath = Path.Combine(uploadFolder, fileName);
                using (var fileStream = new FileStream(finalPath, FileMode.Create))
                {
                    await postedFile.CopyToAsync(fileStream);
                }

                try
                {
                    var text = await System.IO.File.ReadAllTextAsync(finalPath);
                    var res = JsonSerializer.Deserialize<List<Student>>(text);
                    if (res != null)
                    {
                        await _context.AddRangeAsync(res);
                        await _context.SaveChangesAsync();
                    }
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return BadRequest();
                }
               
                
                return Ok();
            }
            return BadRequest();
        }


        [HttpGet("startSession")]
        public async Task<IActionResult> StartSession()
        {
            var psi = new ProcessStartInfo()
            {
                FileName = "/bin/bash",
                Arguments = "-c \" ./start_verification_server.sh \"",
                RedirectStandardOutput = false,
                UseShellExecute = true,
                CreateNoWindow = false
            };

            var process = Process.Start(psi);
            await process.WaitForExitAsync();
            return Ok();
        }
        
        [HttpGet("downloadCompiledExecutables")]
        public async Task<FileContentResult> DownloadCompiledExecutables()
        {
            var fileName = "Client.zip";
            var bytes = await System.IO.File.ReadAllBytesAsync(fileName);
            return File(bytes, "application/zip", "Client.zip");
        }
        
        [HttpGet("compileExecutables")]
        public async Task<IActionResult> CompileClientExecutables()
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
            return Ok();
        }

        [HttpGet("sessionSave")]
        public async Task<FileContentResult> SaveStudents()
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            string jsonString = JsonSerializer.Serialize(_context.Students, options);
            string fileName = $"SaveData_{DateTime.Now.ToFileTime()}";
            await System.IO.File.WriteAllTextAsync(fileName, jsonString);
            var bytes = await System.IO.File.ReadAllBytesAsync(fileName);
            
            return File(bytes, "application/octet-stream", "SaveData.json");
        }
    }
}
