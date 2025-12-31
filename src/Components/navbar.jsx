import '../Styles/navbar.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NavBar = () => { 
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  
  // Check if we're NOT on the user route (to hide button on /user and its subroutes)
  const isNotUserRoute = !location.pathname.startsWith("/user");

  const handleSubmit = () => {
    navigate('/user');
  }

  // Navbar sticky or fixed
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    // If NOT home → always fixed, no scroll logic
    if (!isHome) {
      setIsSticky(false);
      return;
    }
    
    // Home page → sticky on scroll
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup phase
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  return (
    <nav
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
            {/* Show button only on home route */}
            {isHome && isNotUserRoute && (
              <button
                type='button'
                onClick={handleSubmit}
                className="call-to-action"
              >
                Start Your Journey
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;