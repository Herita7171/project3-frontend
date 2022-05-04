import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import {AiOutlineHome, AiOutlineShop} from 'react-icons/ai';
import {RiHandbagLine} from 'react-icons/ri';
import {BiLogOutCircle} from 'react-icons/bi';
import { useAuth } from '../../hooks';

export default function Navbar() {
  const {handleLogout} = useAuth();
  return (
    <nav className='w-48 min-h-screen bg-secondary border-r border-gray-300'>
        <div className='flex flex-col justify-between pl-5 h-screen sticky top-0'>
            <ul>
                <li>
                    <Link to='/'>
                        <img src='./logo.png' alt='logo' className='h-20 p-2' />
                    </Link>
                </li>
                <li>
                    <NavItem to='/'>
                        <AiOutlineHome />
                        <span>
                            Home
                        </span>
                    </NavItem>
                </li>
                <li>
                    <NavItem to='/brands'>
                        <RiHandbagLine />
                        <span>
                            Brands
                        </span>
                    </NavItem>
                </li>
            </ul>

            <div className='flex flex-col items-start text-gray-500 pb-5'>
                <button onClick={handleLogout} className='flex items-center text-sm hover:opacity-80 space-x-1'>
                    <BiLogOutCircle />
                    <span>
                        Log out
                    </span>
                </button>
            </div>
        </div>
    </nav>
  );
}

const NavItem = ({children, to}) => {
    const commonClassName = " flex items-center text-lg space-x-2 p-2 hover:opacity-80";
    return (
        <NavLink className={({isActive}) => (isActive ? "text-white" :
         "text-gray-500") + commonClassName} to={to}>
            {children}
        </NavLink>
    )
}
