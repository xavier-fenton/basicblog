using Microsoft.EntityFrameworkCore;

class PostDb : DbContext
{
    public PostDb(DbContextOptions<PostDb> options)
        : base(options) { }

    public DbSet<Post> Posts => Set<Post>();
}