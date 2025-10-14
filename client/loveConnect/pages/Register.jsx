import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/Context';
import axios from 'axios'

import {toastSuccess} from '../utility/toast'

const Signup = () => {

  const {baseURL} = useGlobalContext();
  
  const [userInfo,setUserInfo] = React.useState({
    fullname: '',
    email: '',
    password: ''
  });

  const [error,setError] = useState('');
  const [message,setMessage] = useState('');

  const [loading,setLoading] = useState(false);

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    setMessage('');
    if(userInfo.fullname === ''){
       setError("Fullname is required")
    }else if(userInfo.email === ''){
      setError("Email is required")
    }else if(!emailRegex.test(userInfo.email)){
       setError("Email is not valid")
    } else if(userInfo.password === ''){
      setError("Password is required")
    } else {
     try {

        setLoading(true)
        const res = await axios.post(`${baseURL}/api/users/register`, userInfo);
        if(res.data.success){
          console.log(res.data); 
          toastSuccess("Registration successfull!");
          setMessage("Please check your email to verify your account.")
          setUserInfo({
            fullname: '',
            email: '',
            password: ''
          })
        }
        setLoading(false)
    
     } catch (error) {
       console.error("Server is not responding:", error);
       setError("Server is not responding. Please try again.");
       setLoading(false)
     }
    }
  }
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">LoveConnect</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="fullname"
              onChange={handleChange}
              value={userInfo.fullname}
              className="w-full border mt-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name='email'
              value={userInfo.email}
              onChange={handleChange}
              className="w-full border mt-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name='password'
              value={userInfo.password}
              onChange={handleChange}
              className="w-full border mt-1 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Create a password"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-700 text-sm">{message}</p>}
          <button
            type="submit"
            disabled = {loading}
            className={`w-full bg-pink-600 ${loading ? 'opacity-50' : ''} text-white py-2 rounded-md hover:bg-pink-700 transition`}
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-pink-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
