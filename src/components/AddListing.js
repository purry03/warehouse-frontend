import React, { useState, useContext } from 'react';
import "./AddListing.css";

import Button from '../components/Button';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api from '../api';

import { UserContext } from '../context';



function AddListing() {

    const { cookies, dispatchCookieEvent } = useContext(UserContext);

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
                formData.append(key, value);
            }
            formData.append('img', selectedFile);
            await api.listing.create(formData, cookies.accessToken);
            toast.success("Listing created");
            setInputField({
                title: '',
                description: '',
                price: 0,
                inventory: 0,
            });
            setSelectedFile(null);
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    return (
        <div className='addlistings-wrapper'>
            <h3>Add Listing</h3>
            <form>
                <label><span>Title: </span><input name="title" onChange={onChange} type="text" placeholder='Product Name' value={inputField.title}></input></label>
                <label><span>Price: </span><input name="price" onChange={onChange} type="number" min={0} placeholder='Product Price' value={inputField.price} ></input></label>
                <label><span>Inventory: </span><input name="inventory" onChange={onChange} type="number" min={0} placeholder='Inventory' value={inputField.inventory}></input></label>
                <label><span>Description: </span><textarea name="description" onChange={onChange} type="text" placeholder='Product Name' value={inputField.description}></textarea></label>
                <label><span>Image: </span><input onChange={(e) => setSelectedFile(e.target.files[0])} type="file"></input></label>
                <Button onClick={submitForm} title="Add" />
            </form>
        </div>);

}



export default AddListing;
