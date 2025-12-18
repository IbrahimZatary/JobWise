import '../Styles/navbar.css';

const NavBar = function () {
  return (
    <nav className="menu-container">
      {/* Logo on the left */}
      <div className="navbar-logo">
        <a>JobWise.</a>
      </div>

      {/* Menu items on the right */}
      <div className="navbar-lists">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#footer">About us</a></li>
          <li><button className='call-to-action'>Start Your Journey</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
