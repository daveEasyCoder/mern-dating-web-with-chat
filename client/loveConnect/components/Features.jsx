import React from 'react'
import { AiOutlineHeart  } from 'react-icons/ai';
import { HiOutlineChat  } from 'react-icons/hi';
import { FaCheck  } from 'react-icons/fa';
const Features = () => {
  return (
    <div className='py-14'>
        <div>
            <div className='text-center'>
                <h1 className='text-3xl font-bold mb-2'>Why choose LoveConnect?</h1>
                <p className='text-gray-600'>Discover what makes us different</p>
            </div>
            <div className='grid sm:grid-cols-3 px-3 gap-y-9 max-w-sm sm:max-w-5xl mx-auto mt-12'>
                <div className='text-center flex flex-col items-center justify-center border border-white hover:border hover:border-gray-200 py-6 rounded'>
                    <button className='h-12 w-12 rounded-lg bg-pink-200 flex items-center justify-center'>
                      <AiOutlineHeart className='text-pink-700 text-2xl' />
                    </button>
                    <h2 className='font-semibold mt-3 mb-2 text-gray-800'>Smart Matching</h2>
                    <p className='text-sm w-[80%] sm:w-[90%]'>Our advanced algorithm find our perfect match based on interests, values and compatibility</p>
                </div>
                <div className='text-center flex flex-col items-center justify-center border border-white hover:border hover:border-gray-200 py-6 rounded'>
                    <button className='h-12 w-12 rounded-lg bg-indigo-200 flex items-center justify-center'>
                      <HiOutlineChat className='text-blue-700 text-2xl' />
                    </button>
                    <h2 className='font-semibold mt-3 mb-2 text-gray-800'>Safe Messaging</h2>
                    <p className='text-sm w-[80%] sm:w-[90%]'>Connect safely with built in messaging, privacy, controls and verified profiles</p>
                </div>
                <div className='text-center flex flex-col items-center justify-center border border-white hover:border hover:border-gray-200 py-6 rounded'>
                    <button className='h-12 w-12 rounded-lg bg-green-300 flex items-center justify-center'>
                      <FaCheck className='text-green-700 text-lg' />
                    </button>
                    <h2 className='font-semibold mt-3 mb-2 text-gray-800'>Smart Matching</h2>
                    <p className='text-sm w-[80%] sm:w-[90%]'>All profile are verified to ensure authentic connection and meaningful relationship</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Features