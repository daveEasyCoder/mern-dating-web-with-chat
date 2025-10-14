import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";

const VerifyEmail = () => {

    const {token} = useParams();
    console.log(token);
    const [error,setError] = useState("")
    const [message,setMessage] = useState("")
    const [loading,setLoading] = useState(false)

    const navigate = useNavigate()
    
    const verifyToken = async () => {
       try {
        setLoading(true)
         const res = await axios.get(`http://localhost:301/api/users/verify-email/${token}`);
         if(res.data.success){
            setMessage(res.data.message)
         }
         setLoading(false)
       } catch (err) {
        setLoading(false)
          if(err.response){
            setError(err.response.data?.message)
          }else{
            setError("Server is not responding")
          }
       }
    }

    useEffect(() => {
        verifyToken();
    },[])

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-blue-500 w-16 h-16 mb-4" />
            <p className="text-gray-700 font-medium">Verifying your email...</p>
          </div>
        )}

        {/* Success */}
        {!loading && message && (
          <div className="flex flex-col items-center">
            <AiOutlineCheckCircle className="text-green-500 w-20 h-20 mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{message}</h2>
            <p className="text-gray-600 mb-6">
              Your email has been successfully verified! 🎉
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 cursor-pointer bg-pink-600 text-white rounded-xl shadow hover:bg-pink-700 transition"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex flex-col items-center">
            <AiOutlineCloseCircle className="text-red-500 w-20 h-20 mb-4" />
            <h2 className="text-xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-gray-700 text-white rounded-xl shadow hover:bg-gray-800 transition"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyEmail