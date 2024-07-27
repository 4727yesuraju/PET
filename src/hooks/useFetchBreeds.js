import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useFetchBreeds = (animal = 'dog') => {
  const [loadingb, setLoading] = useState(false);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const getBreeds = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL}/breeds?animal=${animal}`,
        );
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setBreeds(['any', ...data.breeds]);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getBreeds();
  }, []);

  return { breeds };
};
export default useFetchBreeds;
