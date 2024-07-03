import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SignUpFrontend.css"

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
    <div className="parent">
    <div className="leftChild">
      <div className="leftContainer">
      <h1>FinTrack</h1>
      <p className="wel">Create Account</p>
      <div className="singleLine"><p >Already our Member? </p><Link to="/login">Log In</Link></div>
      
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label><br/>
          <input type="text" name="name" value={credentials.name} onChange={onChange} required />
        </div>
        <div>
          <label>Email:</label><br/>
          <input type="email" name="email" value={credentials.email} onChange={onChange} required />
        </div>
        <div>
          <label>Password:</label><br/>
          <input type="password" name="password" value={credentials.password} onChange={onChange} required />
        </div>
        <button type="submit" className='btn'>Register</button>
        <ToastContainer />
      </form>
      </div>
    </div>
    <div className="rightChild">

    </div>

    </div>
      
    </>
  );
};

export default RegisterForm;
