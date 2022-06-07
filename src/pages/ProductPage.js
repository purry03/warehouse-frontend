import React, { useEffect, useState } from 'react';
import './ProductPage.css';

import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '../api';

import Payment from './Payment';
import Invoice from './Invoice';

import Button from '../components/Button';

function ProductPage() {
  const { id } = useParams();
  const [productsState, setProductsState] = useState({ product: {} });
  const [prebookingQuantity, setPrebookingQuantity] = useState(1);
  const [prebooked, setPrebooked] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cookies] = useCookies(['accessToken', 'refreshToken']);
  const [price, setPrice] = useState(0);
  const [prebookingNumber, setPrebookingNumber] = useState('');

  async function fetchProducts() {
    try {
      const listing = await api.listing.getByID(id);
      setProductsState({ product: listing });
    } catch (err) {
      toast.error(err.toString());
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function changeQuantity(e) {
    if (e.target.value < 1) {
      e.target.value = 1;
    }
    setPrebookingQuantity(e.target.value);
  }

  async function prebook() {
    setPrebooked(true);
    setPrice(productsState.product.price * parseInt(prebookingQuantity, 10));
  }

  async function onPayment() {
    try {
      const response = await api.prebookings.book(cookies.accessToken, productsState.product.listing_id, prebookingQuantity);
      setPrebookingNumber(response.data.prebooking_number);
      setPaymentCompleted(true);
    } catch (err) {
      toast.error(err.toString());
    }
  }

  if (prebooked && !paymentCompleted) {
    return (<Payment product={productsState.product.title} quantity={prebookingQuantity} price={productsState.product.price} totalPrice={price} onPayment={onPayment} />);
  }

  if (paymentCompleted) {
    return (<Invoice prebookingNumber={prebookingNumber} product={productsState.product.title} quantity={prebookingQuantity} price={productsState.product.price} totalPrice={price} />);
  }

  return (
    <div className="product-wrapper">
      <div className="image-wrapper">
        <img src={`http://localhost:8080/${productsState.product.img}`} alt="Product" />
      </div>
      <div className="content-wrapper">
        <h1>{productsState.product.title}</h1>
        <p>{productsState.product.description}</p>
        <h3>
          Price :
          {productsState.product.price}
        </h3>
        <h3>
          Inventory Left :
          {productsState.product.inventory}
        </h3>
        <div className="prebooking-wrapper">
          <label>
            Quantity:
            <input value={prebookingQuantity} onChange={changeQuantity} min="1" type="number" />
          </label>
          <Button className="prebooking-button" title="Prebook" onClick={prebook} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
