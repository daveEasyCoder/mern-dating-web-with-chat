import React from 'react'
import { useEffect } from 'react'
import { BiMessageRounded } from 'react-icons/bi'
import { FaRegHeart } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import axios from 'axios'
import { useState } from 'react'

const DetailPerson = () => {

    const {baseURL,user} = useGlobalContext()
    const {id} = useParams()
    const navigate = useNavigate()
    const [person,setPerson] = useState({})
    
    const getPersonDetail = async () => {
        try {
            const res = await axios.get(`${baseURL}/api/users/get-single-user/${id}`,{withCredentials:true})
            if(res.data.success){
               setPerson(res.data.user)
               console.log(res.data.user);
               
            }
        } catch (err) {
            console.log(err);
            
        }
    }
    useEffect(() => {
       window.scrollTo(0,0)
       getPersonDetail()
    },[])
    return (
        <div className='bg-gray-100 min-h-screen pt-12 pb-8'>
            <div className='max-w-3xl m-auto'>
                <div className='px-2'>
                    <button onClick={() => navigate(-1)} className='cursor-pointer mb-4'>Back to Discover</button>
                    <div className='grid grid-cols-3 gap-2 md:gap-3 md:mx-0'>
                        {/* left content */}
                        <div className='col-span-1 bg-white rounded-md overflow-hidden pb-3 '>
                            <div className='h-50 overflow-hidden bg-gray-300 rounded-b-full'>
                                 <img className='h-full w-full object-cover' src={`${baseURL}/uploads/${person?.profilePicture}`} alt="Image" />
                            </div>
                            <div className='pl-1.5 md:pl-4 pt-6'>
                                <h2 className='font-bold  text-gray-800 mb-1'>{person?.fullname}</h2>
                                <p className='text-gray-700 text-sm mb-1'>{person?.age} years old</p>
                                <p className='text-gray-700 text-sm mb-1'>{person?.job}</p>
                                <p className='text-gray-700 text-sm mb-1'>{person?.location}</p>
                                <p className='text-gray-700 text-sm mb-1'>{person?.height}</p>
                            </div>
                        </div>

                        {/* right content */}
                        <div className='col-span-2'>

                           <div className='border border-gray-200 rounded-md p-3 bg-white mb-4'>
                              <h2 className='text-2xl text-gray-700 font-bold mb-2'>About Me</h2>
                              <p className='text-gray-600 text-sm'>{person?.bio}</p>
                           </div>

                           <div className='border border-gray-200 rounded-md p-3 bg-white mb-4'>
                              <h2 className='text-2xl text-gray-700 font-bold mb-2'>Interests</h2>
                               <div className='flex flex-wrap gap-1.5'>
                                  <button className='px-3 py-1 rounded-full border border-gray-400 text-sm'>{person?.hobbies}</button>
                                  <button className='px-3 py-1 rounded-full border border-gray-400 text-sm'>Cooking</button>
                                  <button className='px-3 py-1 rounded-full border border-gray-400 text-sm'>Hiking</button>
                               </div>
                           </div>

                           <div className='border border-gray-200 rounded-md p-3 bg-white'>
                             <h2 className='text-2xl text-gray-700 font-bold mb-2'>Details</h2>
                              <div className='grid grid-cols-2'>
                                 <div>
                                    <p className='text-gray-600 text-sm'>Gender</p>
                                    <p>{person?.gender}</p>
                                 </div>
                                 <div>
                                    <p className='text-gray-600 text-sm'>Skin Color</p>
                                    <p>{person?.skinColor}</p>
                                 </div>
                              </div>
                           </div>

                           <div className='flex items-center justify-between gap-1.5 md:gap-3 mt-4'>
                                <button className="bg-gray-300 w-1/2 hover:bg-gray-400 cursor-pointer duration-150 py-2 rounded-md text-xs md:text-sm font-medium">
                                       <FaRegHeart className="inline-block mr-2" />
                                       Interested
                                </button>
                                <button className="bg-gray-900 text-white w-1/2 hover:bg-gray-700 cursor-pointer duration-150 py-2 rounded-md text-xs  md:text-sm font-medium">
                                       <BiMessageRounded size={15} className="inline-block mr-2"/>
                                       Send Message
                                </button>
                           </div>
                        </div>
                    </div>
                </div>

                {/* Gallery */}
                <div className='mt-8 px-2'>
                    <h1 className='text-2xl font-bold text-gray-800 mb-3'>Photos</h1>
                    <div className='grid grid-cols-2 gap-2'>
                        {
                            person && person?.photos && person.photos.map((photo) => (
                              <img className={`h-90 w-full object-cover rounded`} src={`${baseURL}/uploads/${photo}`} alt="Image" />
                            ))
                        }
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailPerson