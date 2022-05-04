import React, { useState, useEffect } from 'react';
import Container from '../Container';
import Title from '../form/Title';
import FormInput from '../form/FormInput';
import Submit from '../form/Submit';
import CustomLink from '../CustomLink';
import { createUser } from '../../api/auth';
import { useNotification, useAuth } from '../../hooks';
import { useNavigate } from 'react-router-dom';

const validateUserInfo = ({name, email, password}) => {
  if (!name.trim()) {
    return {
      valid: false,
      error: "The name is missing."
    };
  }
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

export default function Signup() {

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const {name, email, password} = userInfo;

  const nav = useNavigate();
  const {authInfo} = useAuth();
  const {isLoggedIn} = authInfo;
  const {updateNotification} = useNotification();

  const handleChange = ({target}) => {
    const {value, name} = target;
    setUserInfo({...userInfo, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {valid, error} = validateUserInfo(userInfo);
    if (!valid) {
      return updateNotification('error', error);
    }
    const response = await createUser(userInfo);
    if (response.error) {
      return console.log(response.error);
    }
    console.log(response.user);
    updateNotification('success', 'Your account has been created. Now sign in.');
  }

  useEffect(() => {
    if (isLoggedIn) {
      nav('/');
    }
  }, [isLoggedIn]);


  return (
    <div className='fixed inset-0 bg-primary z-20 flex justify-center items-center'>
        <Container>
            <form onSubmit={handleSubmit} className='bg-secondary rounded p-6 w-72 space-y-6 z-20'>
                <Title>
                    Sign up
                </Title>
                <FormInput value={name} onChange={handleChange} name="name" label="Name" placeholder="Abby Smith" />
                <FormInput value={email} onChange={handleChange} name="email" label="Email" placeholder="abby@gmail.com" />
                <FormInput value={password} onChange={handleChange} name="password" label="Password" placeholder="********" type='password'/>
                <Submit value="Sign up"/>
                <div className='flex justify-end'>
                  <CustomLink to="/auth/signin">
                    Sign in
                  </CustomLink>
                </div>
            </form>
        </Container>
    </div>
  );
}
