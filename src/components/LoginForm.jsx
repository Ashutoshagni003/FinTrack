import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LoginFrontend from './LoginFrontend';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigateTo = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.token); // Ensure this is 'json.token'
      navigateTo("/");
    } else {
      alert("Invalid credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
    <LoginFrontend props={credentials} />
    {/* <form onSubmit={onSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={credentials.email} onChange={onChange} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={credentials.password} onChange={onChange} required />
      </div>
      <button type="submit">Login</button>
    </form> */}
    </>
  );
};

export default LoginForm;
