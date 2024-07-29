using Microsoft.EntityFrameworkCore;
using System.Diagnostics;


var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
var Configuration = builder.Configuration;

builder.Services.AddDbContext<PostDb>(opt => opt.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Logging.AddConsole();


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PostAPI";
    config.Title = "PostAPI v1";
    config.Version = "1";

});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
    policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod()
                       .AllowAnyHeader(); ;

    });
});



var app = builder.Build();


// Nswag for Development mode
if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(c =>
    {
        c.DocumentTitle = "PostAPI";
        c.Path = "/swagger";
        c.DocumentPath = "/swagger/{documentName}/swagger.json";
        c.DocExpansion = "list";
    });
}

app.UseCors(MyAllowSpecificOrigins);

app.MapGet("/", () => "Welcome to the Blogs apis refer to the docs for usage.");

// Query the postgres server after each end point

app.MapGet("/postItems", async (PostDb db) =>
{
    var posts = await db.Posts.ToListAsync();
    var result = posts.Select(post => 
    {
    var  date_created = post.date_created.ToString();
        return   new Post
        {
            id = post.id,
            title = post.title,
            body = post.body,
            is_published = post.is_published,
            date_created = post.date_created
        };
    }
    );

    return Results.Ok(result);
});


app.MapGet("/postItems/complete", async (PostDb db) =>
    await db.Posts.Where(t => t.is_published).ToListAsync());

app.MapGet("/postItems/{id}", async (int id, PostDb db) =>
    await db.Posts.FindAsync(id)
        is Post post
            ? Results.Ok(post)
            : Results.NotFound());


// Todo: Bug:Date Created doesn't work but updateTime sets itself
app.MapPost("/postItems", async (Post post, PostDb db) =>
{
    db.Posts.Add(post);
    await db.SaveChangesAsync();

    return Results.Created($"/postItems/{post.id}", post);
}
);

app.MapPut("/postItems/{id}", async (int id, Post inputPost, PostDb db) =>
{
    // debugging
    Debug.WriteLine(id);

    var post = await db.Posts.FindAsync(id);

    if (post is null) return Results.NotFound();

    post.title = inputPost.title;
    post.body = inputPost.body;

    await db.SaveChangesAsync();

    return Results.NoContent();
}
);

// if existing id is deleted, a new entry is still reading as if the deleted id is there. eg: id: 2 (deleted) new entry afterwards has id: 3, i'd expect it's id to be = 2

app.MapDelete("/postItems/{id}", async (int id, PostDb db) => 
{

    if(await db.Posts.FindAsync(id) is Post post)
    { 
        db.Posts.Remove(post);
        await db.SaveChangesAsync();
        return Results.NoContent();
            
    };
    return Results.NotFound();

}
);



app.Run();
