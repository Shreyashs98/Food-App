import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/users/userActions';
import './Header.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [isNavOpen, setIsNavOpen] = useState(false);

  // Function to close the Navbar
  const closeNavbar = () => {
    setIsNavOpen(false);
  };

  // Logout handler
  const logoutHandler = () => {
    dispatch(logoutUser());
    closeNavbar();
    window.location.href = '/';
  };

  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-expand-md navbar-expand-sm navbar-dark bg-dark navbar-custom'>
        <Link className='navbar-brand' to='/' onClick={closeNavbar}>
        {/* <i class="bi bi-journals"></i>  */}
        Food App
        </Link>
        <button
  className='navbar-toggler'
  type='button'
  onClick={() => setIsNavOpen(!isNavOpen)}>
  <i className="bi bi-card-list" style={{ fontSize: '25px' }}></i>
</button>


        <div className={`collapse navbar-collapse show-custom${isNavOpen ? ' show' : ''}`} id='navbarColor01'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item active'>
              <Link className='nav-link' to='/'>
              <i class="bi bi-house"></i> Home <span className='sr-only'>(current)</span>
              </Link>
            </li>
            {userInfo ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/books' onClick={closeNavbar}>
                  {/* <i class="bi bi-book"></i>  */}
                  Restaurants
                  </Link>
                </li>
                <li className='nav-item dropdown'>
                  <Link
                    className='nav-link dropdown-toggle'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                    onClick={closeNavbar}>
                    <i class="bi bi-person-circle"></i> {userInfo.name}
                  </Link>
                  <div className='dropdown-menu'>
                    {/* <Link className='dropdown-item' to='/profile' onClick={closeNavbar}>
                      Profile
                    </Link> */}
                    <Link className='dropdown-item' to='/user-update' onClick={closeNavbar}>
                      Change Password
                    </Link>
                    <div className='dropdown-divider'></div>
                    <button onClick={logoutHandler} className='dropdown-item text-danger'>
                    <i class="bi bi-box-arrow-in-left"></i> Logout
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/login' onClick={closeNavbar}>
                  Login <i class="bi bi-box-arrow-in-right"></i> 
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
