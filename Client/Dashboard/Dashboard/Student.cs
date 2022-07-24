using System.ComponentModel.DataAnnotations.Schema;

namespace Dashboard;

public class Student
{
    public int ID { get; set; }
    public string? StudentID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [NotMapped]
    public IFormFile? BaseImage { get; set; }
    public string? ImagePath { get; set; }
    public DateTime LastUpdate { get; set; }
    public bool Status { get; set; }
    
}