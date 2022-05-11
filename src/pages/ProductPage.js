import React, { useEffect, useState } from 'react';
import "./ProductPage.css";

import api from "../api";

import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useParams } from 'react-router-dom';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

    return (<div>{JSON.stringify(productsState.product)}</div>)

}

export default ProductPage;
