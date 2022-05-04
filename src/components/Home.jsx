import React from 'react';

export default function Home() {
  return (
    <div>
      <h1 className='text-red-400 font-bold flex items-center justify-center text-4xl pt-20'>
        Welcome to OOTD!
      </h1>
      <div className='flex items-center justify-center pt-10 text-red-300 italic'>
        OOTD is a brand review platform for people who like to shop for clothes.
      </div>
      <div className='flex items-center justify-center text-red-300 italic'>
        If you love shopping for clothes and you have knowledge about various clothing brands,
      </div>
      <div className='flex items-center justify-center text-red-300 italic'>
        here is a good place for your voice to be heard.
      </div>
    </div>
  );
}
