import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const  ActorsList = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        axios.get('/api/actors')
          .then(response => setActors(response.data))
          .catch(error => console.error(error));
    }, []);

    const handleDelete = (actorId) => {
        axios.delete(`/api/actors/${actorId}`)
        .then(() => {
            setActors(prevActors => prevActors.filter(actor => actor.id !== actorId));
        })
        .catch(error => console.error(error));
    };

    function formatDateForInput(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
      }

    return(
        <div>
            <div className="mt-12 mx-auto lg:w-2/3 flex justify-between">
                <h1 className="text-2xl font-bold">Actors list</h1>
                <Link to="/app/actors/add">
                    <button className="justify-items-end px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Add new actor</button>
                </Link>
            </div>

            <div className="mt-3 mx-auto lg:w-2/3 relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                First name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Last name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Genre
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date of birth
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nationality
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Options</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {actors.map(actor => (
                            <tr key={actor.id} className="bg-white border-b hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {actor.firstName}
                                </th>
                                <td className="px-6 py-4">
                                    {actor.lastName}
                                </td>
                                <td className="px-6 py-4">
                                    {formatDateForInput(actor.dateOfBirth)}
                                </td>
                                <td className="px-6 py-4">
                                    {actor.nationality}
                                </td>
                                <td className="px-6 py-4 text-right space-x-4">
                                    <a href={`/app/actors/edit/${actor.id}`} className="font-medium text-blue-600 hover:underline cursor-pointer">Edit</a>
                                    <a onClick={() => handleDelete(actor.id)} className="font-medium text-red-600 hover:underline cursor-pointer">Remove</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ActorsList