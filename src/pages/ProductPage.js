import React, { useEffect, useState } from 'react';
import "./ProductPage.css";

import api from "../api";

import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useParams } from 'react-router-dom';


import { toast } from 'react-toastify';

function ProductPage() {

    const { id } = useParams();
    const [productsState, setProductsState] = useState({ product: {} });


    useEffect(() => {
        async function fetchProducts() {
            try {
                const listing = await api.listing.getByID(id);
                console.log(listing);
                setProductsState({ product: listing });
            }
            catch (err) {
                toast.error(err.toString());
            }
        }
        fetchProducts();
    }, []);

    return (<div className='product-wrapper'>
        <div className='image-wrapper'>
            <img src={`http://localhost:8080/${productsState.product.img}`} alt="Product" />
        </div>
        <div className='content-wrapper'>
            <h1>{productsState.product.title}</h1>
            <p>{productsState.product.description}</p>
            <h3>Price : {productsState.product.price}</h3>
            <h3>Inventory Left : {productsState.product.inventory}</h3>
        </div>

    </div>)

}

export default ProductPage;
