using NSwag.AspNetCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
// Services (db context) to dependency injection (DI)

builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

//  Nswag intergration
// metadata about http api
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApiDocument(config =>
{
    config.DocumentName = "TodoAPI";
    config.Title = "TodoAPI v1";
    config.Version = "1";

});


var app = builder.Build();

// Nswag for Development mode
if(app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwaggerUi(c =>
    {
        c.DocumentTitle = "TodoAPI";
        c.Path = "/swagger";
        c.DocumentPath = "/swagger/{documentName}/swagger.json";
        c.DocExpansion = "list";
    });
}


app.MapGet("/todoitems", async (TodoDb db) =>
    await db.Todos.ToListAsync());


app.MapGet("/todoitems/complete", async (TodoDb db) =>
    await db.Todos.Where(t => t.IsComplete).ToListAsync());

app.MapGet("/todoitems/{id}", async (int id, TodoDb db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());

app.MapPost("/todoitems", async (Todo todo, TodoDb db) => 
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todoitems/{todo.Id}", todo); 
}
);

app.MapPut("/todoitems/{id}", async (int id, Todo inputTodo, TodoDb db) => 
{
    var todo = await db.Todos.FindAsync(id);

    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.IsComplete = inputTodo.IsComplete;

    await db.SaveChangesAsync();

    return Results.NoContent();
}
);


app.Run();
