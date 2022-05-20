import React, { useState } from 'react';
import "./PrebookingDetails.css";
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';
import Button from '../components/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import api, { listing } from '../api';

function PrebookingDetails(props) {

    const details = props.details;

    return (
        <>

            {
                details.username && <div className='verifyprebooking-wrapper'>

                    <h4>Prebooking Details</h4>

                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Name
                                </th>
                                <th>
                                    Product
                                </th>
                                <th>
                                    Price
                                </th>
                                <th>
                                    Quantity
                                </th>
                                <th>
                                    Total Price
                                </th>
                                <th >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    {details.username}
                                </td>
                                <td>
                                    {details.productTitle}
                                </td>
                                <td>
                                    {details.productPrice}
                                </td>
                                <td>
                                    {details.quantity}
                                </td>
                                <td>
                                    {details.productPrice * details.quantity}
                                </td>
                                <td className='actions-wrapper'>
                                    <button onClick={props.onApprove}>Approve</button>
                                    <button onClick={props.onCancel}>Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>  </div>
            }
        </>
    );

}



export default PrebookingDetails;
