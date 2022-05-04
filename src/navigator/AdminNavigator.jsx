import React, {useState} from 'react';
import {Routes, Route} from 'react-router-dom';
import Brands from '../components/admin/Brands';
import Dashboard from '../components/admin/Dashboard';
import Header from '../components/admin/Header';
import Navbar from '../components/admin/Navbar';
import CreateBrand from "../components/modals/CreateBrand";
import BrandReviews from '../components/user/BrandReviews';


export default function AdminNavigator() {
  const [displayCreateBrand, setDisplayCreateBrand] = useState(false);

  const displayBrandForm = () => {
    setDisplayCreateBrand(true);
  }

  const hideBrandForm = () => {
    setDisplayCreateBrand(false);
  }

  return (
    <>
      <div className='flex'>
        <Navbar />
        <div className='flex-1 p-2 max-w-screen-xl'>
            <Header onAddBrandClick={displayBrandForm}/>
            <Routes>
                <Route path='/' element={<Dashboard/>} />
                <Route path='/brands' element={<Brands/>} />
                <Route path='/brand/review/:brandId' element={<BrandReviews/>} />
            </Routes>
        </div>
      </div>
      <CreateBrand visible={displayCreateBrand} onClose={hideBrandForm}/>
    </>
  );
}
