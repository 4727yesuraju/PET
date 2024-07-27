import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="absolute w-full  z-50">
      <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20 text-white">
        <div className="flex items-center gap-10 z-50">
          <Link to="/" className="flex gap-4 items-end">
            <img src="/pets.png" alt="Netflix Logo" className="w-16 sm:w-24" />
            <h1 className="text-4xl text-red-600">PETS</h1>
          </Link>
        </div>

        <div className="flex gap-2 items-center z-50 ">
          <Link
            to={'/search'}
            className="relative z-50 "
            onClick={() => console.log('hia')}
          >
            <Search className="size-6 cursor-pointer" />
          </Link>
          <img
            src={'/404.png'}
            alt="Avatar"
            className="h-8 cursor-pointer rounded-full"
          />
        </div>
      </header>
    </div>
  );
};
export default Header;
