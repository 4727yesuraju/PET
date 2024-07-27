import { Loader } from 'lucide-react';
import React from 'react';

export default function LoadingAnime() {
  return (
    <div className="h-screen">
      <div className="flex justify-center items-center bg-black h-full">
        <Loader className="animate-spin text-red-600 size-10" />
      </div>
    </div>
  );
}
