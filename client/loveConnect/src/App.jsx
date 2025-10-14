
import './App.css'
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import CreateProfile from '../pages/CreateProfile'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Discover from '../pages/Discover'
import Navbar from '../components/Navbar'
import Signup from '../pages/Register'
import ProfileView from '../pages/ProfileView'

import { ToastContainer } from 'react-toastify';
import VerifyEmail from '../pages/VerifyEmail'
import DetailPerson from '../pages/DetailPerson'
import ChatPage from '../pages/ChatPage'

function AppContent() {

    const location = useLocation();
    const hideNavbarPath = ['/verify-email'];
    const shouldHideNavbar = hideNavbarPath.some(path => location.pathname.startsWith(path))

  return (
    <>
          {!shouldHideNavbar && <Navbar />}
          <Routes>
             <Route path='/' element= {<Home />}/>
             <Route path='/profile-view' element= {<ProfileView />}/>
             <Route path='/profile-edit' element= {<CreateProfile />}/>
             <Route path='/login' element= {<Login />}/>
             <Route path='/signup' element= {<Signup />}/>
             <Route path='/discover' element= {<Discover />}/>
             <Route path='/detail-person/:id' element= {<DetailPerson />}/>
             <Route path="/chat/:userId" element={<ChatPage />} />


             <Route path='/verify-email/:token' element= {<VerifyEmail />}/>
          </Routes>
    </>
  )
}

function App() {
   return (
      <BrowserRouter>
         <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
         <AppContent />
      </BrowserRouter>
   )
}

export default App
