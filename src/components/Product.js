import React, { useEffect, useState } from 'react';
import "./Product.css";


function Product(props) {

    return (
        <div className='product' data-index={props.id} onClick={props.onClick} >
            <div className='image-wrapper'>
                <img src={`http://localhost:8080/${props.img}`} alt="Product" />
            </div>
            <div className='content-wrapper'>
                <h3 className='title'>{props.title}</h3>
                <p className='description' >{props.description}</p>
                <h5 className='price'>{props.price}$</h5>
            </div>
        </div >
    )

}


export default Product;