import { createContext, useContext, useState } from 'react';

export const PetsContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const usePetsContext = () => {
  return useContext(PetsContext);
};

export const PetsContextProvider = ({ children }) => {
  const [pets, setPets] = useState(
    JSON.parse(localStorage.getItem('pets')) || null,
  );

  return (
    <PetsContext.Provider value={{ pets, setPets }}>
      {children}
    </PetsContext.Provider>
  );
};
