import React, {useEffect, useState} from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { useNotification, useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const validateUserInfo = ({email, password}) => {
  if (!email.trim()) {
    return {
      valid: false,
      error: "The email is missing."
    };
  }
  if (!password.trim()) {
    return {
      valid: false,
      error: "The password is missing."
    };
  }
  return {valid: true};
}

export default function Signin() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  });

  const nav = useNavigate();
  const {updateNotification} = useNotification();
  const {handleLogin, authInfo} = useAuth();
  const {isPending, isLoggedIn} = authInfo;

  

  const handleChange = ({ target }) => {
    const { value, name } = target;
    setUserInfo({...userInfo, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, error } = validateUserInfo(userInfo);
    if (!valid) {
      return updateNotification("error", error);
    }
    handleLogin(userInfo.email, userInfo.password);
  }

  return (
    <div className='fixed inset-0 bg-primary z-20 flex justify-center items-center'>
        <Container>
            <form onSubmit={handleSubmit} className='bg-secondary rounded p-6 w-72 space-y-6'>
                <Title>
                    Sign in
                </Title>
               <FormInput name="email" value={userInfo.email} onChange={handleChange} label="Email" placeholder="abby@gmail.com" />
               <FormInput name="password" value={userInfo.password} onChange={handleChange} label="Password" placeholder="********" type='password' />
               <Submit value="Sign in" busy={isPending}/>
               <div className='flex justify-end'>
                    <span className='text-gray-500'>Don't have an account?</span>
                    <CustomLink to="/auth/signup">
                      Sign up
                    </CustomLink>
               </div>
            </form>
        </Container>
    </div>
  );
}
