import React from 'react'
import { FaUser } from 'react-icons/fa'
import { BiMessageRounded } from 'react-icons/bi'
import { AiFillHeart,AiOutlineHeart  } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Hero = () => {
  return (
<div className='hero h-[100vh] w-full flex items-center justify-center'>
        <div className='flex flex-1 items-center flex-col'>
             <div className='rounded-full flex items-center gap-3 px-6 mb-12 py-2 text-white bg-gray-100/25 text-sm font-medium'>
                <AiOutlineHeart className="  text-pink-300 rounded-full" size={24} />
                 <span>Join 10,000+ Happy Couples</span>
             </div>
             <div>
                <h1 className='text-6xl font-bold text-center  '>
                    <span className='text-white'>Find Your</span> <br />
                    <span className='text-pink-300'>Perfect Match</span>
                </h1>
                <p className='text-center text-lg text-white mt-3'>Connect with like-minded people and discover meaningful <br /> relationships that last last a lifetime</p>
                <div className='flex items-center gap-4 justify-center mt-8'>
                    <Link to = "/discover" className='bg-gradient-to-r from-pink-500 to-purple-500 px-9 py-2 rounded-full font-medium text-white flex items-center gap-3'><FaUser /> <span>Find Matches</span></Link>
                    <button className='border border-pink-600/80 px-6 py-2 rounded-full font-medium text-white flex items-center gap-2'><BiMessageRounded size={18}/> <span>Message</span></button>
                </div>
                
                <div className='flex items-center justify-between gap-8 mt-10'>
                    <div className='flex flex-col  text-center'>
                        <p className='font-bold text-2xl text-pink-200'>50K+</p>
                        <p className='text-white text-sm'>Active Users</p>
                    </div>
                    <div className='flex flex-col  text-center'>
                        <p className='font-bold text-2xl text-pink-200'>10K+</p>
                        <p className='text-white text-sm'>Happy Couples</p>
                    </div>
                    <div className='flex flex-col  text-center'>
                        <p className='font-bold text-2xl text-pink-200'>95%</p>
                        <p className='text-white text-sm'>Success Rate</p>
                    </div>
                </div>
             </div>
        </div>

        {/* absolute heart icons */}
        <AiFillHeart size={12} className='absolute animate-bounce top-[20%] right-[8%] opacity-65 text-pink-300'/>
        <AiFillHeart size={16} className='absolute animate-bounce top-[10%] left-[5%] opacity-65 text-pink-300'/>
        <AiFillHeart size={16} className='absolute animate-bounce bottom-[10%] right-[5%] opacity-45 text-pink-300'/>
        <AiFillHeart size={16} className='absolute animate-bounce bottom-[20%] left-[5%] opacity-45 text-pink-300'/>
    </div>
  )
}

export default Hero