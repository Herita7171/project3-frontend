import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getIsAuth, userSignIn } from '../api/auth';
import { useNotification } from '../hooks';

export const AuthContext = createContext();

const defaultAuthInfo = {
    profile: null,
    isLoggedIn: false,
    isPending: false,
    error: ''
}

export default function AuthProvider({children}) {

    const [authInfo, setAuthInfo] = useState({
        ...defaultAuthInfo
    })
    const { updateNotification } =useNotification();

    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
       setAuthInfo({...authInfo, isPending: true});
       const {error, user} = await userSignIn({email, password});
       if (error) {
           updateNotification("error", "Your email/password is incorrect.");
           return setAuthInfo({...authInfo, isPending: false, error});
       }
       navigate("/", {replace: true});
       setAuthInfo({profile: {...user }, isPending: false, isLoggedIn: true, error: ""});
       localStorage.setItem("auth-token", user.token);
    }

    const isAuth = async () => {
        const token = localStorage.getItem("auth-token");
        if (!token) {
            return;
        }
        setAuthInfo({...authInfo, isPending: true});
        const {error, user} = await getIsAuth(token);
        if (error) {
            return setAuthInfo({...authInfo, isPending: false, error});
        }
        setAuthInfo({profile: {...user }, isPending: false, isLoggedIn: true, error: ""});
    }

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setAuthInfo({...defaultAuthInfo});
        navigate('/', {replace: true});
    }

    useEffect(() => {
        isAuth();
    }, []);

  return (
    <AuthContext.Provider value={{authInfo, handleLogin, handleLogout, isAuth}}>
        {children}
    </AuthContext.Provider>
  );
}
