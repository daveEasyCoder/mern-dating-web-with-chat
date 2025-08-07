import React, { useState } from 'react'
import {Link} from 'react-router-dom'
const Navbar = () => {

    const [activeTab,setActiveTab] = useState(0)
    const link = [{
        name:'Home',
        to:'',
    },{
        name:'Profile',
        to:'Profile',
    },{
        name:'Discover',
        to:'discover',
    },{
        name:'Register',
        to:'signup',
    }]
  return (
      <nav className="bg-white shadow px-6 py-2 flex justify-between items-center">
        <h1 className="text-pink-600 font-bold text-xl">LoveConnect</h1>
        <ul className="flex space-x-6 text-sm">
            {
                link.map((lnk,index) => (
                    <Link to={`/${lnk.to}`} onClick={() => setActiveTab(index)} className={`${index === activeTab ? 'bg-black text-white hover:bg-gray-800 duration-150' : ''} px-4 py-1  rounded cursor-pointer`}>{lnk.name}</Link>
                ))
            }
        
        </ul>
      </nav>
  )
}

export default Navbar