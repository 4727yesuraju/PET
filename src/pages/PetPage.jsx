import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PatPageSkeleton from '../components/skeletons/PatPageSkeleton';
import toast from 'react-hot-toast';


const PetPage = ()=>{

    const { id } = useParams();
    const [pet, setPet] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    console.log("pet : ",pet);

    useEffect(() => {
        console.log("use effect");
        const getPet = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_URL}/pets?id=${id}`);
                const data = await res.json();
                console.log(data);
                setPet(data.pets[0]);
            } catch (error) {
                toast.error(error.message);
                setPet([]);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };
    
        getPet();
    }, [id]);

    const handleNext = () => {
        if (currentTrailerIdx < pet?.images?.length - 1)
            setCurrentTrailerIdx(currentTrailerIdx + 1);
    };
    
    const handlePrev = () => {
        if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
    };

        
    if (loading)
        return (
            <div className="min-h-screen bg-black p-10 pt-24">
            <PatPageSkeleton />
            </div>
        );
        
    if (!pet) {
        return (
            <div className="bg-black text-white h-screen pt-24">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mx-auto px-4 py-8 h-full mt-40">
                <h2 className="text-2xl sm:text-5xl font-bold text-balance">
                    Content not found 😥
                </h2>
                </div>
            </div>
            </div>
        );
    }

    return <div className="bg-black min-h-screen text-white pt-24">
              <div className="mx-auto container px-4 py-8 h-full">
                {
                  pet?.images?.length > 0 && 
                  (
                    <div className="flex justify-between items-center mb-4">
                        
                      <button
                         className={`
                                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                          currentTrailerIdx === 0
                                            ? 'opacity-50 cursor-not-allowed '
                                            : ''
                                        }}
                                        `}
                        disabled={currentTrailerIdx === 0}
                        onClick={handlePrev}
                      >
                        <ChevronLeft size={24} />
                      </button>
        
                      <button
                        className={`
                                        bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
                                          currentTrailerIdx === pet?.images?.length - 1
                                            ? 'opacity-50 cursor-not-allowed '
                                            : ''
                                        }}
                                        `}
                        disabled={currentTrailerIdx === pet?.images?.length - 1}
                        onClick={handleNext}
                      >
                        <ChevronRight size={24} />
                      </button>
        
                    </div>
                  )}
  
                 <div className='aspect-video p-2 sm:px-10 md:px-32 text-center'>
					{pet?.images?.length > 0 && (
						<img src ={pet?.images?.[currentTrailerIdx]} alt="pet img" className="mx-auto w-6/12"/>
					)}

					{pet?.images?.length === 0 && (
						<h2 className='text-xl text-center mt-5'>
							No trailers available for{" "}
							<span className='font-bold text-red-600'>{pet?.name}</span> 😥
						</h2>
					)}
				</div>
        
        
                {/* movie details */}
                <div
                  className="flex flex-col md:flex-row items-center justify-between gap-20 
        				max-w-6xl mx-auto"
                >
                  <div className="mb-4 md:mb-0 flex flex-col gap-2">
                    <h2 className="text-5xl font-bold text-balance">{pet?.name}</h2>
                    {/* <p className='mt-2 text-lg'>
        							{formatReleaseDate(content?.release_date || content?.first_air_date)} |{" "}
        							{content?.adult ? (
        								<span className='text-red-600'>18+</span>
        							) : (
        								<span className='text-green-600'>PG-13</span>
        							)}{" "}
        						</p> */}
                    <p className="mt-4 text-lg text-justify">{pet?.description}</p>
                    <div className="flex justify-between">
                        <div><span>city :  {pet?.city} <br /> state : {pet?.state}   </span></div>
                        <div><span>breed :  {pet?.breed} <br /> animal : {pet?.animal}   </span></div>
                    </div>
                  </div>
                  <img
                    src={pet?.images?.[0]}
                    alt="pet's pic here'"
                    className="max-h-[600px] rounded-md"
                  />
                </div>
              </div>
            </div>
}

export default PetPage
