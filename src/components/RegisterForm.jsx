import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from "react-router-dom";


const RegisterForm = () => {
  const navigateTo = useNavigate();

  const [credentials, setCredentials] = useState({name:"",email:"", password:"",cpassword:""});

  const onSubmit = async (e) =>{

    e.preventDefault();
    const {name , email, password} = credentials;
    const response = await fetch("http://localhost:5000/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name,email,password})
      });
      const json = await response.json()
      console.log(json)
      
        localStorage.setItem('token',json.authtoken);
        navigateTo("/");
      
}

const onChange = (e) =>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
}

  return (
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
    </form>
  );
};

export default RegisterForm;
