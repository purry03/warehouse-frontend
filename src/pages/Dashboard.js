import React from 'react';
import "./Dashboard.css";

import Listings from '../components/Listings';
import AddListing from '../components/AddListing';
import Prebooking from '../components/Prebooking';



function Dashboard() {

    return (
        <div className='dashboard-wrapper'>
            <h1>Dashboard</h1>

            <Listings />

            <AddListing />

            <Prebooking />
        </div>);

}



export default Dashboard;
