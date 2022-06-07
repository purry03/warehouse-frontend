import React, { useState } from 'react';
import './AddListing.css';
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Button from './Button';

import 'react-toastify/dist/ReactToastify.css';

import api from '../api';

function AddListing() {
  const [cookies, setCookies] = useCookies(['username', 'accessToken', 'refreshToken']);

  const [inputField, setInputField] = useState({
    title: '',
    description: '',
    price: 0,
    inventory: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);

  function onChange(e) {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  async function submitForm() {
    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(inputField)) {
        formData.append(key, value.toString());
      }
      // @ts-ignore
      formData.append('img', selectedFile);
      await api.listing.create(formData, cookies.accessToken);
      toast.success('Listing created');
      setInputField({
        title: '',
        description: '',
        price: 0,
        inventory: 0,
      });
      setSelectedFile(null);
    } catch (err: any) {
      toast.error(err.toString());
    }
  }

  return (
    <div className="addlistings-wrapper">
      <h3>Add Listing</h3>
      <form>
        <label>
          <span>Title: </span>
          <input name="title" onChange={onChange} type="text" placeholder="Product Name" value={inputField.title} />
        </label>
        <label>
          <span>Price: </span>
          <input name="price" onChange={onChange} type="number" min={0} placeholder="Product Price" value={inputField.price} />
        </label>
        <label>
          <span>Inventory: </span>
          <input name="inventory" onChange={onChange} type="number" min={0} placeholder="Inventory" value={inputField.inventory} />
        </label>
        <label>
          <span>Description: </span>
          <textarea name="description" onChange={onChange} placeholder="Product Name" value={inputField.description} />
        </label>
        <label>
          <span>Image: </span>
          <input onChange={(e) => setSelectedFile(e.target.files[0])} type="file" />
        </label>
        <Button onClick={submitForm} title="Add" />
      </form>
    </div>
  );
}

export default AddListing;
