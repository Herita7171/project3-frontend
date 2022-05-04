import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className='text-red-400 font-bold text-4xl pt-20 pl-20'>
        Hello,
      </h1>
      <div className='flex items-center justify-start pt-10 text-red-300 italic pl-20'>
        Feel free to add a brand you are interested in by clicking the Create button.
      </div>
      <div className='flex items-center justify-start text-red-300 italic pl-20'>
        You can also search brands on the Brands page.
      </div>
      <div className='flex items-center justify-start text-red-300 italic pl-20'>
        Looking forward to seeing your reviews!
      </div>
    </div>
  );
}

