using Microsoft.AspNetCore.Mvc;
using back_end.Models;
using back_end.Data;
using Microsoft.EntityFrameworkCore;

namespace back_end.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public ActorsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Actor>> GetAllActors()
        {
            var actors = _dbContext.Actors.ToList();
            return Ok(actors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Actor>> GetActorById(int id)
        {
            var actor = await _dbContext.Actors.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            return Ok(actor);
        }

        [HttpPost]
        public IActionResult AddActor([FromBody] Actor actor)
        {
            if (ModelState.IsValid)
            {
                var newActor = new Actor
                {
                    FirstName = actor.FirstName,
                    LastName = actor.LastName,
                    DateOfBirth = actor.DateOfBirth,
                    Nationality = actor.Nationality
                };

                _dbContext.Actors.Add(newActor);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Actor added successfully."});
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteActor(int id)
        {
            var actor = _dbContext.Actors.Find(id);
            if (actor != null)
            {
                _dbContext.Actors.Remove(actor);
                _dbContext.SaveChanges();

                return Ok(new { Message = "Actor deleted successfully." });
            }

            return BadRequest(new { Message = "Failed to delete actor." });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateActor(int id, Actor updatedActor)
        {
            if (id != updatedActor.Id)
            {
                return BadRequest();
            }

            var actor = await _dbContext.Actors.FindAsync(id);

            if (actor == null)
            {
                return NotFound();
            }

            actor.FirstName = updatedActor.FirstName;
            actor.LastName = updatedActor.LastName;
            actor.DateOfBirth = updatedActor.DateOfBirth;
            actor.Nationality = updatedActor.Nationality;

            try
            {
                await _dbContext.SaveChangesAsync();
                return Ok(new { Message = "Actor successfully updated." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Update failed due to concurrency issue.");
            }
        }
    }
}