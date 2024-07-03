import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUpFrontend.css'
import { Link } from 'react-router-dom'

const SignUpFrontend = (props) => {
    const navigateTo = useNavigate();

    const [credentials, setCredentials] = useState({ name: "", email: "", password: ""});

    const onSubmit = async (e) => {

        e.preventDefault();
        const { name, email, password, cpassword } = credentials;

        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json)

        localStorage.setItem('token', json.authtoken);
        navigateTo("/");

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (

        <>
            <div className="parent">
                <div className="leftChild">
                    <div className="leftContainer">
                        <h1>Create Account</h1>
                        <form onSubmit={onSubmit}>
                            <div>
                                <label>Name:</label>
                                <input type="text" name="name" value={props.name} onChange={onChange} required />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input type="email" name="email" value={props.email} onChange={onChange} required />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" name="password" value={props.password} onChange={onChange} required />
                            </div>
                           
                            
                            <button type="submit">Register</button>
                        </form>
                    </div>

                </div>
                <div className="rightChild">

                </div>

            </div>
        </>
    )
}

export default SignUpFrontend