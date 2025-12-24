import '../Styles/navbar.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  //Navigate to route when press a button 
  const navigate = useNavigate();
  const handleSubmit =()=>{
    navigate('/user');
  }

  // Navbar sticky or fixed
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [isSticky, setIsSticky] = useState(false);
// check one time 


  useEffect(() => {
    // If NOT home → always fixed, no scroll logic
    if (!isHome) {
      setIsSticky(false);
      return;
    }
    /// if you are in home now >> 
    // Home page  → sticky on scroll
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    //  Cleanup phase
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);





  return (
    <nav
    // Way to decide & apply after result 
      className={`menu-container
        ${isHome ? "nav-home" : "nav-fixed"} 
        ${isSticky ? "nav-sticky" : ""}`}
    >
      {/* Logo */}
      <div className="navbar-logo">
        <a>JobWise.</a>
      </div>

      {/* Menu */}
      <div className="navbar-lists">
        <ul>
          <li><a href="#Home">Home</a></li>
          <li><a href="#Footer">About us</a></li>
          <li>
          
  
    <button
      type='button'
      onClick={handleSubmit}
      className="call-to-action"> Start Your Journey
      </button>
      
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
