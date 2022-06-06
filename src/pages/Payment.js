import React, { useEffect, useState } from 'react';
import './ProductPage.css';

import { Cookies, useCookies } from 'react-cookie';
import { Navigate, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import api from '../api';

import Button from '../components/Button';
import './Payment.css';

function Payment(props) {
  const [cookies, setCookies] = useCookies('username', 'accessToken', 'refreshToken');

  return (
    <div className="product-wrapper">
      <div className="container">
        <div className="row m-10">
          <div className="col-md-7 col-12">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="row box-right">
                  <div className="col-md-8 ps-0 ">
                    <p className="ps-3 textmuted fw-bold h6 mb-0">TOTAL DUE</p>
                    <p className="h1 fw-bold d-flex mt-3">
                      {' '}
                      <span className=" fas fa-dollar-sign textmuted pe-1 h6 align-text-top mt-1" />
                      {props.totalPrice}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="col-md-5 col-12 ps-md-5 p-0 ">
            <div className="box-left">
              <p className="textmuted h8">Invoice</p>
              <p className="fw-bold h7 mb-3">{cookies.username}</p>
              <div className="h8">
                <div className="row m-0 border mb-3">
                  <div className="col-6 h8 pe-0 ps-2">
                    <p className="textmuted py-2">Items</p>
                    <span className="d-block py-2 border-bottom">{props.product}</span>
                  </div>
                  <div className="col-2 text-center p-0">
                    <p className="textmuted p-2">Qty</p>
                    <span className="d-block p-2 border-bottom">{props.quantity}</span>
                  </div>
                  <div className="col-2 p-0 text-center h8 border-end">
                    <p className="textmuted p-2">Price</p>
                    <span className="d-block border-bottom py-2">
                      <span className="fas fa-dollar-sign" />
                      {props.price}
                    </span>
                  </div>
                  <div className="col-2 p-0 text-center">
                    <p className="textmuted p-2">Total</p>
                    <span className="d-block py-2 border-bottom">
                      <span className="fas fa-dollar-sign" />
                      {props.totalPrice}
                    </span>
                  </div>
                </div>
                <div className="d-flex h7 mb-2">
                  <p className>Total Amount</p>
                  <p className="ms-auto">
                    <span className="fas fa-dollar-sign" />
                    {props.totalPrice}
                  </p>
                </div>
                <div className="h8 mb-5">
                  <p className="textmuted">Taxes Excluded</p>
                </div>
              </div>
              <div className>
                <p className="h7 fw-bold mb-1">Pay this Invoice</p>
                <p className="textmuted h8 mb-2">Make payment for this invoice by filling in the details</p>
                <div className="form">
                  <div className="row">
                    <div className="col-12">
                      <div className="card border-0">
                        {' '}
                        <input className="form-control ps-5" type="text" placeholder="Card number" />
                        {' '}
                        <span className="far fa-credit-card" />
                        {' '}
                      </div>
                    </div>
                    <div className="col-6">
                      {' '}
                      <input className="form-control my-3" type="text" placeholder="MM/YY" />
                      {' '}
                    </div>
                    <div className="col-6">
                      {' '}
                      <input className="form-control my-3" type="text" placeholder="cvv" />
                      {' '}
                    </div>
                  </div>
                  <div className="btn btn-primary d-block h8" onClick={props.onPayment}>
                    PAY
                    <span className="fas fa-dollar-sign ms-2" />
                    {props.totalPrice}
                    <span className="ms-3 fas fa-arrow-right" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
