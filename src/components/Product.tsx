import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './Product.css';

function Product(props) {
  const {
    id,
    img,
    title,
    description,
    price,
    onClick,
  } = props;

  return (
    <div className="product" data-index={id} onClick={onClick} role="button">
      <div className="image-wrapper">
        <img src={`http://127.0.0.1:8080/${img}`} alt="Product" />
      </div>
      <div className="content-wrapper">
        <h3 className="title">{title}</h3>
        <p className="description">{description}</p>
        <h5 className="price">
          {price}
          $
        </h5>
      </div>
    </div>
  );
}

Product.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Product;
