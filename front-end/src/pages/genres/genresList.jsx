import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GenresList = () => {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        axios.get('/api/genres')
          .then(response => setGenres(response.data))
          .catch(error => console.error(error));
    }, []);

    const handleDelete = (genreId) => {
        axios.delete(`/api/genres/${genreId}`)
        .then(() => {
            setGenres(prevGenres => prevGenres.filter(genre => genre.id !== genreId));
        })
        .catch(error => console.error(error));
    };

    return(
        <div>
            <div className="mt-12 mx-auto lg:w-1/2 flex justify-between">
                <h1 className="text-2xl font-bold">Genres list</h1>
                <Link to="/app/genres/add">
                    <button className="justify-items-end px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Add new genre</button>
                </Link>
            </div>

            <div className="mt-3 mx-auto lg:w-1/2 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Options</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {genres.map(genre => (
                            <tr key={genre.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {genre.title}
                                </th>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <a href={`/app/genres/edit/${genre.id}`} className="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                                    <a onClick={() => handleDelete(genre.id)} className="font-medium text-red-600 hover:underline cursor-pointer">Remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default GenresList