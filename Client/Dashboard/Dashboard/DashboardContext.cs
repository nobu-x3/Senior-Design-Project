using Microsoft.EntityFrameworkCore;

namespace Dashboard;

public class DashboardContext : DbContext
{
    public DashboardContext(DbContextOptions<DashboardContext> options) : base(options)
    {
        
    }

    public DbSet<Student> Students { get; set; } = null!;
}