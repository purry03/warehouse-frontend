import React from 'react';
import './Nav.css';
import { useCookies } from 'react-cookie';

import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';

function Nav() {
  const [cookies, setCookies, removeCookie] = useCookies(['username', 'accessToken', 'refreshToken']);

  function logout() {
    removeCookie('username');
    removeCookie('accessToken');
    removeCookie('refreshToken');
  }

  return (
    <div className="nav">
      <h1>Warehouse</h1>
      {
        cookies.username !== undefined && (
          <div className="user-wrapper">
            <h3>
              Welcome,
              {cookies.username}
            </h3>
            <Link to="/auth" onClick={logout}>Logout</Link>
          </div>
        )
      }
    </div>
  );
}

export default Nav;
