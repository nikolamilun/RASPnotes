using NotesAPI.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.OpenApi;
using Microsoft.AspNetCore.Http.HttpResults;
namespace NotesAPI.Model
{
    public class Note
    {
        public int NoteID { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        public bool Done { get; set; }
    }


public static class NoteEndpoints
{
	public static void MapNoteEndpoints (this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/Note").WithTags(nameof(Note));

        group.MapGet("/", async (NotesDbContext db) =>
        {
            return await db.Notes.ToListAsync();
        })
        .WithName("GetAllNotes")
        .WithOpenApi();

        group.MapGet("/{id}", async Task<Results<Ok<Note>, NotFound>> (int noteid, NotesDbContext db) =>
        {
            return await db.Notes.AsNoTracking()
                .FirstOrDefaultAsync(model => model.NoteID == noteid)
                is Note model
                    ? TypedResults.Ok(model)
                    : TypedResults.NotFound();
        })
        .WithName("GetNoteById")
        .WithOpenApi();

        group.MapPut("/{id}", async Task<Results<Ok, NotFound>> (int noteid, Note note, NotesDbContext db) =>
        {
            var affected = await db.Notes
                .Where(model => model.NoteID == noteid)
                .ExecuteUpdateAsync(setters => setters
                  .SetProperty(m => m.NoteID, note.NoteID)
                  .SetProperty(m => m.Header, note.Header)
                  .SetProperty(m => m.Text, note.Text)
                  .SetProperty(m => m.Done, note.Done)
                );

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("UpdateNote")
        .WithOpenApi();

        group.MapPost("/", async (Note note, NotesDbContext db) =>
        {
            db.Notes.Add(note);
            await db.SaveChangesAsync();
            return TypedResults.Created($"/api/Note/{note.NoteID}",note);
        })
        .WithName("CreateNote")
        .WithOpenApi();

        group.MapDelete("/{id}", async Task<Results<Ok, NotFound>> (int noteid, NotesDbContext db) =>
        {
            var affected = await db.Notes
                .Where(model => model.NoteID == noteid)
                .ExecuteDeleteAsync();

            return affected == 1 ? TypedResults.Ok() : TypedResults.NotFound();
        })
        .WithName("DeleteNote")
        .WithOpenApi();
    }
}}
