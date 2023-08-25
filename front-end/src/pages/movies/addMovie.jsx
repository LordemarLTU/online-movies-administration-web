import { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddMovie() {
  const navigate = useNavigate();
  const [movieFormData, setFormData] = useState({
      title: '',
      releasedDate: '',
      genres: '',
      actors: '',
  });
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);

  useEffect(() => {
    axios.get('/api/genres')
      .then(response => setGenres(response.data))
      .catch(error => console.error(error));

    axios.get('/api/actors')
      .then(response => setActors(response.data))
      .catch(error => console.error(error));
    }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/api/movies', movieFormData);
          navigate('/app');
      } catch (error) {
          console.error('Error adding movie:', error);
      }
  };

  const handleGenresSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      genres: selectedOptions.toString(),
    }));
  };

  const handleActosSelection = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      actors: selectedOptions.toString(),
    }));
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...movieFormData, [name]: value });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add a new movie</h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
              Title
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="title"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="releasedDate" className="block text-sm font-semibold leading-6 text-gray-900">
              Released date
            </label>
            <div className="mt-2.5">
              <input
                required
                type="date"
                name="releasedDate"
                onChange={handleChange}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="genres" className="block text-sm font-semibold leading-6 text-gray-900">
                Genres
            </label>
            <div className="mt-2.5">
                <select
                 required
                 name="genres"
                 onChange={handleGenresSelection}
                 multiple
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {genres.map(genre => (
                    <option key={genre.id} value={genre.title}>
                      {genre.title}
                    </option>
                ))}
                </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="actors" className="block text-sm font-semibold leading-6 text-gray-900">
                Cast
            </label>
            <div className="mt-2.5">
                <select
                 required
                 name="actors"
                 onChange={handleActosSelection}
                 multiple
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {actors.map(actor => (
                    <option key={actor.id} value={actor.firstName + " " + actor.lastName}>
                      {actor.firstName} {actor.lastName}
                    </option>
                ))}
                </select>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
