using Microsoft.EntityFrameworkCore;

namespace test_app.Entities
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
            Database.EnsureCreated(); // создаем базу данных при первом обращении
        }

        public DbSet<Employee> Employees { get; set; } = null!;
    }
}