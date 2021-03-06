import React, { useContext } from 'react';

import "./Invoice.css"

import { UserContext } from '../context';



function Invoice(props) {

    const { cookies, dispatchCookieEvent } = useContext(UserContext);

    function getCurrentDate(separator = '-') {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
    }


    function print() {
        window.print();
    }


    return (

        <div className="container mt-5 mb-5">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="text-left logo p-2 px-5">
                            <img src="https://imgur.com/zBVXXdd.png" width={50} />
                        </div>
                        <div className="invoice p-5">
                            <h5>Your order Confirmed!</h5>
                            <span className="font-weight-bold d-block mt-4 mb-3">Hello, {cookies.username}</span>
                            <span>You prebooking has been confirmed and will be valid for 24 hours!</span>
                            <div className="payment border-top mt-3 mb-3 border-bottom table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="py-2">
                                                    <span className="d-block text-muted">Order Date</span>
                                                    <span>{getCurrentDate()}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="py-2">
                                                    <span className="d-block text-muted">Prebooking No</span>
                                                    <span>{props.prebookingNumber}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="py-2">
                                                    <span className="d-block text-muted">Payment</span>
                                                    <span><img src="https://img.icons8.com/color/48/000000/mastercard.png" width={20} /></span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="py-2">
                                                    <span className="d-block text-muted">Warehouse Address</span>
                                                    <span>414 Advert Avenue, NY,USA</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="product border-bottom table-responsive">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td width="60%">
                                                <span className="font-weight-bold">{props.product}</span>
                                                <div className="product-qty mt-2">
                                                    <span className="d-block">Quantity: {props.quantity}</span>
                                                </div>
                                            </td>
                                            <td width="20%">
                                                <div className="text-right">
                                                    <span className="font-weight-bold">${props.price} <span class="text-muted">per unit</span></span>
                                                </div>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div className="row d-flex justify-content-end">
                                <div className="col-md-5">
                                    <table className="table table-borderless">
                                        <tbody className="totals">
                                            <tr className="border-top border-bottom">
                                                <td>
                                                    <div className="text-left">
                                                        <span className="font-weight-bold">Subtotal</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="text-right">
                                                        <span className="font-weight-bold">${props.totalPrice}</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <p>Show this invoice at the warehouse to pickup the product.</p>
                            <p className="font-weight-bold mb-0">Thanks for shopping with us!</p>
                            <span>The Warehouse</span>
                        </div>
                        <div className="d-flex justify-content-between footer p-3">
                            <span><a href="#" onClick={print}>Download Invoice</a></span>
                            <span>{getCurrentDate()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Invoice;
