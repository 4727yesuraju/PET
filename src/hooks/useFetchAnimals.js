import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const useFetchAnimals = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const getAnimals = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/animals`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setAnimals(['any', ...data.animals]);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getAnimals();
  }, []);

  return { animals };
};
export default useFetchAnimals;
