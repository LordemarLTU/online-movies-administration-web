import { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditActorForm = () => {
    const navigate = useNavigate();
    const { actorId } = useParams(); 
    const [actorData, setActorData] = useState({
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      nationality: '',
    });
    
    useEffect(() => {
      axios.get(`/api/actors/${actorId}`)
        .then(response => {
          setActorData(response.data);
        })
        .catch(error => console.error(error));
    }, [actorId]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/actors/${actorId}`, actorData);
            navigate('/app/actors');
        } catch (error) {
            console.error('Error adding actor:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActorData({ ...actorData, [name]: value });
    };

    function formatDateForInput(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

  const nationalityOptions = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "China",
    "India",
    "Brazil",
  ];

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Edit actor</h2>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold leading-6 text-gray-900">
              First name *
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="firstName"
                onChange={handleChange}
                value={actorData.firstName}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name *
            </label>
            <div className="mt-2.5">
              <input
                required
                type="text"
                name="lastName"
                onChange={handleChange}
                value={actorData.lastName}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-semibold leading-6 text-gray-900">
              Date of birth *
            </label>
            <div className="mt-2.5">
              <input
                required
                type="date"
                name="dateOfBirth"
                onChange={handleChange}
                value={formatDateForInput(actorData.dateOfBirth)}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="nationality" className="block text-sm font-semibold leading-6 text-gray-900">
                Nationality
            </label>
            <div className="mt-2.5">
                <select
                 name="nationality"
                 onChange={handleChange}
                 value={actorData.nationality}
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                {nationalityOptions.map((option) => (
                    <option key={option} value={option}>
                    {option}
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

export default EditActorForm;