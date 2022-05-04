import React from 'react';
import {ImSpinner3} from 'react-icons/im';

export default function submit({value, busy, type, onClick}) {
  return (
    <button type={type || "submit"} className='w-full rounded bg-submitBtn text-white
     hover:bg-red-400 transition font-semibold text-base cursor-pointer h-10
     flex items-center justify-center' onClick={onClick}>
       {busy ? <ImSpinner3 className='animate-spin'/> : value}
     </button>
  );
}
