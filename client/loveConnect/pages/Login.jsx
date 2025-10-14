
import React, { use } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../context/Context';

const Login = () => {

  const {baseURL,setUser} = useGlobalContext()
  const [userInfo,setUserInfo] = useState({
    email:"",
    password:""
  });
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError('');
    if(!userInfo.email){
      setError("Email is required")
    }else if(!emailRegex.test(userInfo.email)){
      setError("Email is not valid")
    } else if(!userInfo.password){
      setError("Password is required")
    }else{
      try {
        setLoading(true)
        const res = await axios.post(`${baseURL}/api/users/login`, userInfo,{withCredentials:true});
        if(res.data.success){
         localStorage.setItem("user",JSON.stringify(res.data.user))
         setUser(res.data.user)
         navigate("/")
        }
        setLoading(false)
      } catch (err) {
        setLoading(false)
        if(err.response){
          if(err.response.data.message){
            console.log(err.response.data.message);
            setError(err.response.data.message)
          }
        }else{
          console.error("Server is not responding:", err);
          setError("Server is not responding. try again!")
        }
      }
    }
  }
 
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-pink-600 mb-6">LoveConnect</h1>
        <h2 className="text-xl font-semibold text-center mb-4">Login to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 ${loading ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} text-white py-2 rounded-md hover:bg-pink-700 transition`}
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pink-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
