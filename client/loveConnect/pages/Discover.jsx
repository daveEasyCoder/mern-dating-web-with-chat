import React, { useEffect, useState } from 'react';
import PersonCard from '../components/PersonCard';
import Navbar from '../components/Navbar';
import { useGlobalContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Filter from '../components/Filter';


const Discover = () => {

  const {user,setUser,baseURL,people,setPeople} = useGlobalContext()
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const [showFilterOption,setShowFilterOption] = useState(true)

  
  const navigate = useNavigate()
  
  
  const getAllUser = async () => {
  try {
     setLoading(true)
     const res = await axios.get(`${baseURL}/api/users/get-all-users`,{withCredentials:true})
     if(res.data.success){
      setPeople(res.data.user)
     }
     setLoading(false)
  } catch (err) {
    setLoading(false)
    if(err.response){
      if(err.response.status === 401 || err.response.status === 403){
         console.log("You are not authenticated. please login");
         localStorage.removeItem("user")
         setUser(null)
         navigate("/login")
      }
      if(err.response.data.message){
        setError(err.response.data.message)
      }
    }else{
      setError("Server is not responding. try again!")
    }
  }
}

  useEffect(() => {
   if(!user || !user.email){
    navigate('/login')
   }
   getAllUser()
},[])

  return (
    <div className="px-2 md:px-8 pt-6 bg-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Find Your Match</h1>
        <button onClick={() => setShowFilterOption(prev => !prev)} className="border px-4 py-2 rounded-md hover:bg-gray-100">
          <span className="mr-2">🔍</span> Filters
        </button>
      </div>

      { showFilterOption && <Filter />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {people.map((person, index) => (
           person?.email !== user?.email && <PersonCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default Discover;
