import React, { useState, useContext } from 'react';
import "./Listings.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../api';

import { UserContext } from '../context';



function Listings() {

    const { cookies, dispatchCookieEvent } = useContext(UserContext);

    const [listings, setListings] = useState([]);

    useState(() => {
        getListings();
    }, []);

    async function getListings() {
        try {
            const listings = await api.listing.getByUsername(cookies.username, cookies.accessToken);
            setListings(listings);
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    async function removeListing(elm) {
        try {
            const id = elm.target.getAttribute("id");
            await api.listing.removeByID(id, cookies.accessToken);
            setListings(listings.filter(listing => listing.listing_id != id))
            toast.success("Deleted Listing");
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    const listingRows = listings.map(listing => { return <tr key={listing.listing_id}><td id="title">{listing.title}</td><td id="description">{listing.description}</td><td id="price">{listing.price}</td><td id="inventoy">{listing.inventory}</td><td><button id={listing.listing_id} onClick={removeListing}>Remove</button></td></tr> })


    return (
        <div className='listings-wrapper'>
            <h3>My Listings</h3>
            <table>
                <thead>
                    <tr>
                        <th id="title">Title</th>
                        <th id="description">Description</th>
                        <th id="price">Price</th>
                        <th id="inventory">Inventory</th>
                        <th id="action">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listingRows}
                </tbody>
            </table>
        </div>);

}



export default Listings;
