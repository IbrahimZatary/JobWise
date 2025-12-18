import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage'
import UserInfo from './pages/UserInfotmation'
import CareerView from './pages/CareerOverView'
import NavBar from './Components/navbar';
import Footer from './Components/footer';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/UserInfo' element={<UserInfo />} />
        <Route path='/CareerView' element={<CareerView />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
