import React, { useState } from 'react';
import './Listings.css';
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Button from './Button';

import 'react-toastify/dist/ReactToastify.css';

import api, { listing } from '../api';

function Listings() {
  const [cookies, setCookies] = useCookies(['username', 'accessToken', 'refreshToken']);

  const [listings, setListings] = useState([]);

  async function getListings() {
    try {
      const apiListings = await api.listing.getByUsername(cookies.username, cookies.accessToken);
      setListings(apiListings);
    } catch (err) {
      toast.error(err.toString());
    }
  }

  useState(() => {
    getListings();
  }, []);

  async function removeListing(elm) {
    try {
      const id = elm.target.getAttribute('id');
      await api.listing.removeByID(id, cookies.accessToken);
      setListings(listings.filter((itm) => itm.listing_id !== id));
      toast.success('Deleted Listing');
    } catch (err) {
      toast.error(err.toString());
    }
  }

  const listingRows = listings.map((itm) => (
    <tr key={itm.listing_id}>
      <td id="title">{itm.title}</td>
      <td id="description">{itm.description}</td>
      <td id="price">{itm.price}</td>
      <td id="inventoy">{itm.inventory}</td>
      <td><button type="button" id={itm.listing_id} onClick={removeListing}>Remove</button></td>
    </tr>
  ));

  return (
    <div className="listings-wrapper">
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
    </div>
  );
}

export default Listings;
