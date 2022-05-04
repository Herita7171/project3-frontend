import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomLink({to, children}) {
  return (
    <Link className="text-white hover:font-bold cursor-pointer text-base pl-1" to={to}>
        {children}
    </Link>
  );
}
