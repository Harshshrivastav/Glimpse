import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt');

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    navigate('/signin');
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">Glimpse</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {token ? (
            <>
              <li><Link to="/createpost">Create Post</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><button className="btn" onClick={handleLogout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/signin">Signin</Link></li>
              <li><Link to="/signup">Signup</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
