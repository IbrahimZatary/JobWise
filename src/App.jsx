import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage'
import UserInfo from './pages/UserInfotmation'
import CareerView from './pages/CareerOverView'
import NavBar from './Components/navbar';
import Footer from './Components/footer';
import NotFound from './Components/notFound';

function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/user' element={<UserInfo />} />
        <Route path='/career' element={<CareerView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
