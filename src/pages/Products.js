import React, { useEffect, useState } from 'react';
import "./Products.css";

import api from "../api";

import { Cookies, useCookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Product from "../components/Product";

function Products() {

    const [productsState, setProductsState] = useState({ products: [] });
    const [currentProduct, setCurrentProductState] = useState({ id: 0, selected: false });

    useEffect(() => {
        async function fetchProducts() {
            try {
                const listings = await api.listing.getAll();
                setProductsState({ products: listings });
            }
            catch (err) {
                toast.error(err.toString());
            }
        }
        fetchProducts();
    }, []);


    function gotoProduct(e) {
        const id = e.currentTarget.getAttribute("data-index");
        setCurrentProductState({ id, selected: true });
    }


    const productDivs = productsState.products.map(item => { return <Product onClick={gotoProduct} key={item.listing_id} id={item.listing_id} title={item.title} description={item.description} price={item.price} /> })


    if (currentProduct.selected) {
        return (<Navigate to={"/product/" + currentProduct.id} />);
    }
    else {
        return (
            <div className='main-wrapper'>
                <h1 className='main-heading'>Products</h1>
                <div className='products-wrapper'>
                    {productDivs}
                </div>
            </div>);
    }
}

export default Products;
