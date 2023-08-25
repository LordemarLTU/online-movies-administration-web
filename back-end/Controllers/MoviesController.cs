using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Data;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public MoviesController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Movie>> GetAllMovies()
        {
            var movies = _dbContext.Movies.ToList();
            return Ok(movies);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Movie>> GetMovieById(int id)
        {
            var movie = await _dbContext.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            return Ok(movie);
        }

        [HttpPost]
        public IActionResult AddMovie([FromBody] Movie movie)
        {
            if (ModelState.IsValid)
            {
                var newMovie = new Movie
                {
                    Title = movie.Title,
                    ReleasedDate = movie.ReleasedDate,
                    Genres = movie.Genres,
                    Actors = movie.Actors,
                };

                _dbContext.Movies.Add(newMovie);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Movie added successfully." });
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMovie(int id)
        {
            var movie = _dbContext.Movies.Find(id);
            if (movie != null)
            {
                _dbContext.Movies.Remove(movie);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Movie deleted successfully." });
            }

            return BadRequest(new { Message = "Failed to delete movie." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMovie(int id, Movie updatedMovie)
        {
            if (id != updatedMovie.Id)
            {
                return BadRequest();
            }

            var movie = await _dbContext.Movies.FindAsync(id);

            if (movie == null)
            {
                return NotFound();
            }

            movie.Title = updatedMovie.Title;
            movie.ReleasedDate = updatedMovie.ReleasedDate;
            movie.Genres = updatedMovie.Genres;
            movie.Actors = updatedMovie.Actors;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(new { Message = "Movie successfully updated." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Update failed due to concurrency issue.");
            }
        }
    }
}
