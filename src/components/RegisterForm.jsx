import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {
  const navigateTo = useNavigate();
  const [credentials, setCredentials] = useState({name:"", email:"", password:""});

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });

    const json = await response.json();
    if (json.success) {
      localStorage.setItem('token', json.token);
      toast.success("Welcome! Registration successful.");
      navigateTo("/");
    } else {
      toast.error("User already exists.");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={credentials.name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
        <ToastContainer />
      </form>
    </>
  );
};

export default RegisterForm;
