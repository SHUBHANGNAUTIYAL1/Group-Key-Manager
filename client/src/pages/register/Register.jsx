import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import "./register.css"
import axios from 'axios'


function Register() {
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const navigate=useNavigate();
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const newUser={
                ...formData
            }
            const response=await axios.post("http://localhost:8100/api/auth/register", newUser);
            console.log(response)
            
           navigate("/"); 

        } catch (error) {
            console.error('Error registering user:', error);
            
        }
        
    };
  return (
    <div className="container">
        <div className="login-container1">
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username} onChange={handleChange}
                    placeholder='john'
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder='john@gmail.com'
                    required
                />
                </div>
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password} onChange={handleChange}
                    required
                    placeholder="**************"
                />
                </div>
                <button type="submit">sign Up</button>
            </form>
            <p>Already a user? <Link to="/"> Login now</Link> </p>
        </div>
    </div>
  )
}

export default Register