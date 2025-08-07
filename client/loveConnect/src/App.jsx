
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateProfile from '../pages/CreateProfile'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Discover from '../pages/Discover'
import Navbar from '../components/Navbar'
import Signup from '../pages/Register'
function App() {
 

  return (
    <div>
       <BrowserRouter>
           <Navbar />
          <Routes>
             <Route path='/' element= {<Home />}/>
             <Route path='/create-profile' element= {<CreateProfile />}/>
             <Route path='/login' element= {<Login />}/>
             <Route path='/signup' element= {<Signup />}/>
             <Route path='/discover' element= {<Discover />}/>
          </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
