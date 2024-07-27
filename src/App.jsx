import { Toaster } from 'react-hot-toast';
import useFetchPets from './hooks/useFetchPets';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import NotFoundPage from './pages/404';
import Searchpage from './pages/Searchpage';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import LoadingAnime from './components/LoadingAnime';
import PetPage from './pages/PetPage';

const App = () => {
  const { loading } = useFetchPets();

  console.log(loading);

  if (loading) {
    return <LoadingAnime />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pet/:id" element={<PetPage />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />

      <Toaster />
    </>
  );
};

export default App;
