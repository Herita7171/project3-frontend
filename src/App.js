import React from 'react';
import Navbar from './components/user/Navbar';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import SingleBrandPage from './components/user/SingleBrandPage';
import BrandReviews from './components/user/BrandReviews';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import { useAuth } from './hooks';
import AdminNavigator from './navigator/AdminNavigator';


export default function App() {
  const {authInfo} = useAuth();
  const isAdmin = authInfo.profile?.role === "admin";
  if (isAdmin) {
    return <AdminNavigator />;
  }
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/auth/signin' element={<Signin/>} />
        <Route path='/auth/signup' element={<Signup/>} />
        <Route path='/brand/:brandId' element={<SingleBrandPage/>} />
        <Route path='/brand/review/:brandId' element={<BrandReviews/>} />
      </Routes>
    </>
  );
}
