import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import Container from '../Container';

export default function Navbar() {
    const {authInfo, handleLogout} = useAuth();
    const {isLoggedIn} = authInfo;

  return (
    <div className="bg-secondary shadow-sm shadow-gray-300">
        <Container className="p-3">
            <div className='flex justify-between items-center'>
                <Link to='/'>
                    <img src="./logo.png" alt='' className='h-20 pl-10'/>
                </Link>
                <ul className='flex items-center space-x-4'>
                    <li>
                        {isLoggedIn ? (<button onClick={handleLogout} className='text-white font-semibold hover:font-extrabold'>Log out</button>) : (<Link className='text-white font-semibold text-base pr-10 hover:font-extrabold' to='/auth/signin'>
                            Login
                        </Link>)}
                    </li>
                </ul>
            </div>
        </Container>
    </div>
  );
}
