import './App.css'


// Routing import 
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// My app importing 
import Home from './pages/HomePage'
import UserInfo from './pages/UserInfotmation'
import CareerView from './/pages/CareerOverView'
import NavBar from './Components/navbar';
import Footer from './Components/footer';

function App() {


  return (
    
<BrowserRouter>
{/* Fixed NavBar */}
  <NavBar /> 
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/UserInfo' element={<UserInfo/>}></Route>
      <Route path='/CareerView' element={<CareerView/>}></Route>
    </Routes>

    {/* Fixed Footer */}
    
    <Footer />
</BrowserRouter>
)
}

export default App 
