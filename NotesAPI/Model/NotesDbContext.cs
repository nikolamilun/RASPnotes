using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace NotesAPI.Model
{
    public class NotesDbContext : DbContext
    {
        public NotesDbContext() : base()
        {
            
        }
        public NotesDbContext(DbContextOptions<NotesDbContext> options) : base(options)
        {
            
        }
        public DbSet<Note> Notes { get; set; }
    }
}
