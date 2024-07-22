using NSwag.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Services (db context) to dependency injection (DI)

builder.Services.AddDbContext<PostDb>(opt => opt.UseInMemoryDatabase("Posts"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

//  Nswag intergration
// metadata about http api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "PostAPI";
    config.Title = "PostAPI v1";
    config.Version = "1";

});


var app = builder.Build();

// Nswag for Development mode
if(app.Environment.IsDevelopment())
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


app.MapGet("/postItems", async (PostDb db) =>
    await db.Posts.ToListAsync());


app.MapGet("/postItems/complete", async (PostDb db) =>
    await db.Posts.Where(t => t.IsPublished).ToListAsync());

app.MapGet("/postItems/{id}", async (int id, PostDb db) =>
    await db.Posts.FindAsync(id)
        is Post post
            ? Results.Ok(post)
            : Results.NotFound());

app.MapPost("/postItems", async (Post post, PostDb db) => 
{
    db.Posts.Add(post);
    await db.SaveChangesAsync();

    return Results.Created($"/postItems/{post.Id}", post); 
}
);

app.MapPut("/postItems/{id}", async (int id, Post inputPost, PostDb db) => 
{
    var post = await db.Posts.FindAsync(id);

    if (post is null) return Results.NotFound();

    post.Title = inputPost.Title;
    post.IsPublished = inputPost.IsPublished;

    await db.SaveChangesAsync();

    return Results.NoContent();
}
);


app.Run();
