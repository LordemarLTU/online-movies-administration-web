namespace back_end.Models
{
    public class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime ReleasedDate { get; set; }
        public string Genres { get; set; }
        public string Actors { get; set; }
    }
}
