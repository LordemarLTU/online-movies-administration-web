using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;
using System.Collections.Generic;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GenresController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public GenresController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Genre>> GetAllGenres()
        {
            var genres = _dbContext.Genres.ToList();
            return Ok(genres);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> GetGenreById(int id)
        {
            var genre = await _dbContext.Genres.FindAsync(id);

            if (genre == null)
            {
                return NotFound();
            }

            return Ok(genre);
        }

        [HttpPost]
        public async Task<ActionResult<Genre>> AddGenre([FromBody] Genre genre)
        {
            //if (ModelState.IsValid)
            //{
                var newGenre = new Genre
                {
                    Title = genre.Title,
                };

                _dbContext.Genres.Add(newGenre);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Genre added successfully." });
            //}
            return BadRequest(ModelState);
        }

        [HttpDelete("{genreId}")]
        public IActionResult DeleteGenre(int genreId)
        {
            var genre = _dbContext.Genres.Find(genreId);
            if (genre != null)
            {
                _dbContext.Genres.Remove(genre);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Genre deleted successfully." });
            }

            return BadRequest(new { Message = "Failed to delete genre." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGenre(int id, Genre updatedGenre)
        {
            if (id != updatedGenre.Id)
            {
                return BadRequest();
            }

            var genre = await _dbContext.Genres.FindAsync(id);

            if (genre == null)
            {
                return NotFound();
            }

            genre.Title = updatedGenre.Title;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(new { Message = "Genre successfully updated." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Update failed due to concurrency issue.");
            }
        }
    }
}
