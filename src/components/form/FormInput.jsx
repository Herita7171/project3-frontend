import React from 'react';

export default function FormInput({name, label, placeholder, ...rest}) {
  return (
    <div>
        <label htmlFor={name} className='font-semibold text-white text-base'>{label}</label>
        <input id={name} name={name} className='bg-white rounded border-2 border-darkSubtle w-full
        text-sm p-1' placeholder={placeholder} {...rest}/>
    </div>
  );
}
