import { BiX } from 'react-icons/bi'
import { Link } from 'react-router-dom'

const MobileSidebar = ({user,link,setMobileActiveTab,handleLogout,mobileActiveTab,setShowMobileSideBar}) => {
  return (
          <div className='z-50 md:hidden pl-5 pt-2 fixed text-white top-0 right-0 px-3 h-[100vh] w-50 bg-black/85'>
           <div className='flex justify-end mb-3'>
              <BiX onClick={() => setShowMobileSideBar(false)} className='text-3xl cursor-pointer mr-3' />
           </div>
           <ul className='flex flex-col gap-2'>
                
                {
                    link.map((lnk,index) => (
                        <li onClick={() => setMobileActiveTab(index)} className={`${mobileActiveTab === index ? 'mobile-link' : ''} relative py-2`}> <Link to={`/${lnk.to}`}>{lnk.name}</Link> </li>
                    )) 
                }
                {
                    user?.email ? <li className='mt-2'><button onClick={handleLogout} className='py-1 px-2 text-sm bg-red-600 text-white rounded-sm cursor-pointer hover:bg-red-700'>Logout</button></li>
                    : <li className='mt-2'><Link to="/signup" className='bg-pink-600 px-2 py-1.5 rounded-sm text-white hover:bg-pink-700 duration-150 cursor-pointer'>Register</Link></li>
                }
            </ul>
        </div>
  )
}

export default MobileSidebar