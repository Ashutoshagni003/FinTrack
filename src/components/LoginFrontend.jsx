import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginFrontend.css'
import { Link } from 'react-router-dom'

const LoginFrontend = (props) => {
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
        <div className='parent'>
            <div className="leftChild">
                <div className="leftContent">
                    <h1>FinTrack</h1>
                    <p className='wel'>Welcome Back ! Track Your Finances, Transform Your Future</p>
                    <p className='det'>Please enter your details</p>
                    <div className="formComp">
                        <form onSubmit={onSubmit}>
                            <div>
                                <label className='Label'>Email Address</label><br/>
                                <input type="email" name="email" value={props.email} onChange={onChange} required />
                            </div>
                            <div className='formy'>
                                <label className='Label'>Password</label><br/>
                                <input type="password" name="password" value={props.password} onChange={onChange} required />
                            </div>
                            <button type="submit" className='btn'>Login</button>
                        </form>
                    </div>
                    <div className="singleLine"><p>Dont't have an account ? </p> <Link to="/register" className='linkStyle'>Create Account</Link></div>


                </div>

            </div>
            <div className="rightChild">

            </div>

        </div>
    )
}

export default LoginFrontend