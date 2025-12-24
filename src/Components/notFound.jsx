// components/NotFound.jsx
import { Link } from "react-router-dom";
import '../Styles/NotFound.css'

const NotFound = () => {
  return (
    <div className="error">
      <h1>404</h1>
      <p>Sorry, the page you are looking for does not exist.</p>

      <Link className="link_me" to="/">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
