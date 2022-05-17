import React, { useState } from 'react';
import "./Dashboard.css";
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';


import { toast } from 'react-toastify';

import Listings from '../components/Listings';

function Dashboard() {

    return (
        <div className='dashboard-wrapper'>
            <h1>Dashboard</h1>

            <Listings />
        </div>);

}



export default Dashboard;
