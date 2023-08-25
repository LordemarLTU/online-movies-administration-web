using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Data;
using Microsoft.EntityFrameworkCore;
using back_end.Migrations;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _dbContext;

        public SearchController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        public IActionResult MoviesSearch([FromBody] SearchData searchData)
        {
            var filteredMovies = _dbContext.Movies.ToList()
            .Where(movie =>
                (string.IsNullOrEmpty(searchData.Title) || movie.Title.Contains(searchData.Title, StringComparison.OrdinalIgnoreCase)) &&
                (string.IsNullOrEmpty(searchData.ReleasedDate) || movie.ReleasedDate.ToString("yyyy-MM-dd").Contains(searchData.ReleasedDate, StringComparison.OrdinalIgnoreCase)) &&
                (string.IsNullOrEmpty(searchData.Genre) || movie.Genres.Contains(searchData.Genre, StringComparison.OrdinalIgnoreCase)))
            .ToList();

            return Ok(filteredMovies);
        }
    }
}
