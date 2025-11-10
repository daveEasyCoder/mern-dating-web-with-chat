import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context/Context'
import axios from 'axios'
import { BiMenu } from 'react-icons/bi'
import MobileSidebar from './MobileSidebar'
const Navbar = () => {

    const {user,setUser,baseURL} = useGlobalContext()
    const [activeTab,setActiveTab] = useState(0)
    const [mobileActiveTab,setMobileActiveTab] = useState(0)
    const [showMobileSidebar,setShowMobileSideBar] = useState(false)
    const navigate = useNavigate()

    const link = [{
        name:'Home',
        to:'',
    },{
        name:'Profile',
        to:'profile-view',
    },{
        name:'Discover',
        to:'discover',
    }]

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${baseURL}/api/users/logout`, { withCredentials: true });
            if(res.data.success){
                localStorage.removeItem("user")
                setUser(null)
                console.log("logged out successfully");  
                navigate("/login")   
            }
        } catch (err) {
            console.log(err);
            
        }
    }
 
  return (
      <nav className="bg-white shadow px-6 py-2 flex justify-between items-center">
        <h1 className="text-pink-600 font-bold text-xl">LoveConnect</h1>
        <ul className="hidden md:flex items-center space-x-6 text-sm">
            {
                link.map((lnk,index) => (
                    <Link key={index} to={`/${lnk.to}`} onClick={() => setActiveTab(index)} className={`${index === activeTab ? 'bg-black text-white hover:bg-gray-800 duration-150' : ''} px-4 py-1  rounded cursor-pointer`}>{lnk.name}</Link>
                ))
            }

            {
                user?.email ? <li><button onClick={handleLogout} className='py-1 px-2 text-sm bg-red-600 text-white rounded-sm cursor-pointer hover:bg-red-700'>Logout</button></li>
                 : <li><Link to="/signup" className='bg-pink-600 px-2 py-1.5 rounded-sm text-white hover:bg-pink-700 duration-150 cursor-pointer'>Register</Link></li>
             }

            {user?.email ? <li className='font-bold bg-gray-300 rounded-full p-2'>{user?.fullname.split(" ")[0].slice(0,1).toUpperCase() + user?.fullname.split(" ")[1].slice(0,1).toUpperCase()}</li> : '' }
        
        </ul>

        <BiMenu onClick={() => setShowMobileSideBar(true)} className='md:hidden text-3xl cursor-pointer' />

        {/* Mobile sidebar */}
        { showMobileSidebar && <MobileSidebar link={link} 
                                              user = {user}
                                              setMobileActiveTab = {setMobileActiveTab}
                                              handleLogout = {handleLogout} 
                                              mobileActiveTab = {mobileActiveTab} 
                                              setShowMobileSideBar = {setShowMobileSideBar}
                                              /> }
      </nav>
  )
}

export default Navbar