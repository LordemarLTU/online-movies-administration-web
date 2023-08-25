import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchData, setSearchData] = useState({
        title: '',
        releasedDate: '',
        genre: '',
    });

    useEffect(() => {
        axios.get('/api/movies')
          .then(response => setMovies(response.data))
          .catch(error => console.error(error));

        axios.get('/api/genres')
          .then(response => setGenres(response.data))
          .catch(error => console.error(error));
       }, []);

    function formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
  
    const handleDelete = (movieId) => {
        axios.delete(`/api/movies/${movieId}`)
        .then(() => {
            setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
        })
        .catch(error => console.error(error));
    };

    const handleSearchChange = (e) => {
        const { name, value } = e.target;
        setSearchData({ ...searchData, [name]: value });
    };

    const handleSearch = async (e) => {
        e.preventDefault();        
        axios.post('/api/search', searchData)
        .then(response => setMovies(response.data))
        .catch(error => console.error(error));
        // try {
        //     const response = await axios.post('/api/search', searchData);
            
        // } catch (error) {
        //     console.error('Error searching:', error);
        // }
    };

    return( 
    <div>
        <div className="mt-12 mx-auto lg:w-2/3 flex justify-between">
            <h1 className="text-2xl font-bold">Movies list</h1>
            <Link to="/app/movies/add">
                <button className="justify-items-end px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Add new movie</button>
            </Link>
        </div>

        <div className="mx-auto lg:w-2/3 mt-5">
            <form onSubmit={handleSearch} className="mx-4 sm:mx-0 sm:col-span-2 sm:flex sm:space-x-4 space-y-2 sm:space-y-0">
                    <input
                        type="text"
                        name="title"
                        placeholder="Seach by title ..."
                        onChange={handleSearchChange}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    
                    <input
                    type="date"
                    name="releasedDate"
                    onChange={handleSearchChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <select
                    name="genre"
                    onChange={handleSearchChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="">Select a genre</option>
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.title}>
                        {genre.title}
                        </option>
                    ))}
                    </select>

                    <button
                        type="submit"
                        className="block w-full sm:w-auto rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Search
                    </button>
                </form>
            </div>

        <div className="mt-3 mx-auto lg:w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Released
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Genre
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cast
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Options</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map(movie => (
                        <tr key={movie.id} className="bg-white hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {movie.title}
                            </th>
                            <td className="px-6 py-4">
                                {formatDateForInput(movie.releasedDate)}
                            </td>
                            <td className="px-6 py-4">
                                {movie.genres}
                            </td>
                            <td className="px-6 py-4">
                                {movie.actors}
                            </td>
                            <td className="px-6 py-4 text-right space-x-4">
                                <a href={`/app/movies/edit/${movie.id}`} className="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                                <a onClick={() => handleDelete(movie.id)} className="font-medium text-red-600 hover:underline cursor-pointer">Remove</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default MoviesList