// I have a naming violation here but will fix later
// Todo: introduce updated time

using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.VisualBasic;
public class Post
{
    public int id { get; set;}
    public string? title { get; set;}
    public bool is_published {get; set;}

    public string? body {get; set;}     
    public DateTime? date_created {get; set;}        

}