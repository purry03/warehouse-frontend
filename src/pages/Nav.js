import React, { useState, useContext } from 'react';
import "./Nav.css";

import { Link } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';


import { UserContext } from '../context';


function Nav() {
    const { cookies, dispatchCookieEvent } = useContext(UserContext);


    function logout() {
        dispatchCookieEvent("REMOVE", "username");
        dispatchCookieEvent("REMOVE", "accessToken");
        dispatchCookieEvent("REMOVE", "refreshToken");
        dispatchCookieEvent("REMOVE", "type");
    }

    return (
        <div className='nav'>
            <h1>Warehouse</h1>
            {
                cookies.username !== undefined && <div className='user-wrapper'>
                    <h3>Welcome, {cookies.username}</h3>
                    <Link to="/auth" onClick={logout}>Logout</Link>
                </div>
            }
        </div >);

}



export default Nav;
