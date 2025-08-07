import React from 'react'
import { FaUser,FaSearch,FaCalendar } from 'react-icons/fa'
import { HiOutlineChat  } from 'react-icons/hi';
const Step = () => {
  return (
    <div className=' bg-gray-100 py-12 px-2 mb-3'>
         <div className='max-w-2xl md:max-w-4xl mx-auto'>  
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-2 '>How It Work</h1>
                <p className='text-sm text-gray-600'>Simple step to find your soulmate</p>
            </div>
            <div className='grid gap-y-8 grid-cols-2 md:grid-cols-4 mt-12'>
                <div className='text-center flex items-center flex-col'>
                    <button className='btn relative mb-2 h-12 w-12 rounded-full text-white bg-indigo-500 flex items-center justify-center '>
                        <FaUser />
                    </button>
                    <h2 className='text-md font-semibold text-gray-800 mb-3'>Create Profile</h2>
                    <p className='text-sm text-gray-600 w-[60%] md:w-full'>Sign up and create your detailed profile with photos</p>
                </div>
                <div className='text-center flex items-center flex-col'>
                    <button className='btn relative mb-2 h-12 w-12 rounded-full text-white bg-indigo-500 flex items-center justify-center '>
                        <FaSearch size={20} />
                    </button>
                    <h2 className='text-md font-semibold text-gray-800 mb-3'>Browse Matches</h2>
                    <p className='text-sm text-gray-600 w-[95%] md:w-full'>Discover compatible based on your preferences and filters</p>
                </div>
                <div className='text-center flex items-center flex-col'>
                    <button className='btn relative mb-2 h-12 w-12 rounded-full text-white bg-indigo-500 flex items-center justify-center '>
                        <HiOutlineChat size={24} />
                    </button>
                    <h2 className='text-md font-semibold text-gray-800 mb-3'>Connect & Chat</h2>
                    <p className='text-sm text-gray-600 w-[60%] md:w-full'>Show interest, get matched, and start private conservation</p>
                </div>
                <div className='text-center flex items-center flex-col'>
                    <button className='btn relative mb-2 h-12 w-12 rounded-full text-white bg-indigo-500 flex items-center justify-center '>
                        <FaCalendar />
                    </button>
                    <h2 className='text-lg font-semibold text-gray-800 mb-3'>Meet & Date</h2>
                    <p className='text-sm text-gray-600 w-[60%] md:w-full'>Take your connection and build meaningful relationship</p>
                </div>
            </div>
         </div>
    </div>
  )
}

export default Step