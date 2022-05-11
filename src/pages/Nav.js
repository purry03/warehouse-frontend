import React, { useState } from 'react';
import "./Nav.css";
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

function Nav() {

    return (
        <div className='nav'>
            <h1>Warehouse</h1>
        </div>);

}



export default Nav;
