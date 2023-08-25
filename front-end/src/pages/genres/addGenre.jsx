import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddGenreForm = () => {
    const navigate = useNavigate();
    const [genreFormData, setGenreFormData] = useState({ 
      title: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/genres', genreFormData);
            navigate('/app/genres');
        } catch (error) {
            console.error('Error adding genre:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGenreFormData({ ...genreFormData, [name]: value });
    };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add a new genre</h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">
              Title *
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

export default AddGenreForm;