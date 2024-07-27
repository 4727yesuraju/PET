import React, { useState } from 'react';
import { usePetsContext } from '../context/PetsContext';
import PetsSlider from '../components/PetsSlider';
import { Link } from 'react-router-dom';
import { Barcode, Info, Play } from 'lucide-react';

export default function HomePage() {
  function getRandomPic(num) {
    return Math.floor(Math.random() * num);
  }
  const [imgLoading, setImgLoading] = useState(true);
  const { pets } = usePetsContext();
  const trendingPet = pets && pets[getRandomPic(pets.length)];

  if (!pets)
    return (
      <div className="h-screen text-white relative">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );
  return (
    <div>
      <div className="relative h-screen text-white ">
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10" />
        )}

        <img
          src={trendingPet?.images[getRandomPic(trendingPet.images.length)]}
          alt="Hero img"
          className="absolute top-0 left-0 w-full h-full object-cover -z-50"
          onLoad={() => {
            setImgLoading(false);
          }}
        />

        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50 -z-50"
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32">
          <div
            className="bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10"
          />

          <div className="max-w-2xl">
            <h1 className="mt-4 text-6xl font-extrabold text-balance">
              {trendingPet?.title || trendingPet?.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingPet.breed} {' - '} {trendingPet.animal}
            </p>

            <p className="mt-4 text-lg">
              {trendingPet?.description.length > 200
                ? trendingPet?.description.slice(0, 200) + '...'
                : trendingPet?.description}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/pet/${trendingPet?.id}`}
              className="bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center"
            >
              <Barcode className="size-6 mr-2 fill-black" />
              Buy
            </Link>

            <Link
              to={`/pet/${trendingPet?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center"
            >
              <Info className="size-6 mr-2" />
              More Info
            </Link>
          </div>
        </div>
      </div>

      <PetsSlider />
    </div>
  );
}
