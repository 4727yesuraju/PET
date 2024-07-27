import { useState } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import useFetchAnimals from '../hooks/useFetchAnimals';
import useFetchBreeds from '../hooks/useFetchBreeds';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('animal');
  const [searchTerm, setSearchTerm] = useState('');

  const [options, setOptions] = useState({
    animal: '',
    location: '',
    breed: '',
  });

  const [results, setResults] = useState([{}]);

  const { animals } = useFetchAnimals();
  const { breeds } = useFetchBreeds();

  const handleTabClick = tab => {
    setActiveTab(tab);
    setSearchTerm('');
    setResults([]);
  };

  const handleChange = e => {
    if (e.target.value === 'any')
      return setOptions({ ...options, [e.target.id]: '' });
    setOptions({ ...options, [e.target.id]: e.target.value });
  };
  const handleSearch = async e => {
    e.preventDefault();
    let conn_str = `${import.meta.env.VITE_URL}/pets?${activeTab}=${searchTerm}`;
    if (activeTab === 'all') {
      conn_str = `${import.meta.env.VITE_URL}/pets?animal=${options.animal}&location=${options.location}&breed=${options.breed}`;
    }
    try {
      const res = await fetch(`${conn_str}`);
      const data = await res.json();
      setResults(data.pets);
    } catch (error) {
      toast.error('An error occurred, please try again later');
    }
  };

  return (
    <div className="bg-black min-h-screen text-white pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'animal' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-700`}
            onClick={() => handleTabClick('animal')}
          >
            Animal
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'location' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-700`}
            onClick={() => handleTabClick('location')}
          >
            Location
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'breed' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-700`}
            onClick={() => handleTabClick('breed')}
          >
            Breed
          </button>

          <button
            className={`py-2 px-4 rounded ${
              activeTab === 'all' ? 'bg-red-600' : 'bg-gray-800'
            } hover:bg-red-700`}
            onClick={() => handleTabClick('all')}
          >
            All
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          {activeTab !== 'all' ? (
            <>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={'Search for a ' + activeTab}
                className="w-full p-2 rounded bg-gray-800 text-white"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
                <Search className="size-6" />
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <select
                name=""
                id="animal"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white text-center"
              >
                {animals?.map((animal, ind) => (
                  <option key={ind}>{animal}</option>
                ))}
              </select>
              <select
                name=""
                id="breed"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white text-center"
              >
                {breeds?.map((breed, ind) => (
                  <option key={ind}>{breed}</option>
                ))}
              </select>
              <select
                name=""
                id="location"
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-800 text-white text-center"
              >
                {['', 'us', 'ind']?.map((loc, ind) => {
                  if (loc === '') return <option key={ind}>any</option>;
                  return <option key={ind}>{loc}</option>;
                })}
              </select>
              <button className="w-full p-2 rounded bg-red-600 hover:bg-red-700 text-white text-center">
                submit
              </button>
            </div>
          )}
        </form>

          {
            results.length === 0 &&
            (
              <div className="bg-black text-white h-screen pt-24">
                  <div className="max-w-6xl mx-auto">
                      <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                      <h2 className="text-2xl sm:text-5xl font-bold text-balance">
                          Pet&lsquo;s not found 😥
                      </h2>
                      </div>
                  </div>
            </div>
            )
          }
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map(result => {
            if (!result.images) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === 'person' ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={result.images[0]}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link to={'/pet/' + result.id}>
                    <img
                      src={result.images[0]}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
