import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { usePetsContext } from '../context/PetsContext';

const useFetchPets = () => {
  const [loading, setLoading] = useState(false);
  const { setPets } = usePetsContext();

  useEffect(() => {
    const getPets = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_URL}/pets/`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setPets(data.pets);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getPets();
  }, []);

  return { loading };
};
export default useFetchPets;
