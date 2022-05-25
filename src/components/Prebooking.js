import React, { useState, useContext } from 'react';
import "./Prebooking.css";

import Button from '../components/Button';

import { toast } from 'react-toastify';

import api from '../api';

import PrebookingDetails from './PrebookingDetails';


import { UserContext } from '../context';



function Prebooking() {

    const { cookies, dispatchCookieEvent } = useContext(UserContext);

    const [inputField, setInputField] = useState({
        prebookingNumber: ''
    });

    const [prebookingDetails, setPrebookingDetails] = useState({ username: '', quantity: 0, productTitle: '', productPrice: '' });
    const [detailsFetched, setDetailsFetched] = useState(false);

    function onChange(e) {
        setInputField({ ...inputField, [e.target.name]: e.target.value });
    }

    async function getPrebookingDetails(elm) {
        const prebookingNumber = inputField.prebookingNumber;
        try {
            const prebooking = await api.prebookings.get(prebookingNumber, cookies.accessToken)
            console.log(prebooking);
            if (!prebooking.err) {
                setPrebookingDetails(prebooking);
                setDetailsFetched(true);
                toast.success("Prebooking Fetched");
            }
            else {
                toast.error("Prebooking Not Found");
            }
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    async function cancelPrebooking() {
        const prebookingNumber = inputField.prebookingNumber;
        try {
            const prebooking = await api.prebookings.cancel(prebookingNumber, cookies.accessToken)
            setPrebookingDetails(prebooking);
            setDetailsFetched(true);
            toast.success("Prebooking Canceled");
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    async function approvePrebooking() {
        const prebookingNumber = inputField.prebookingNumber;
        try {
            const prebooking = await api.prebookings.approve(prebookingNumber, cookies.accessToken)
            setPrebookingDetails(prebooking);
            setDetailsFetched(true);
            toast.success("Prebooking Aprroved");
        }
        catch (err) {
            toast.error(err.toString());
        }
    }

    const details = detailsFetched ? <PrebookingDetails details={prebookingDetails} onApprove={approvePrebooking} onCancel={cancelPrebooking} /> : null;

    return (
        <div className='verifyprebooking-wrapper'>
            <h3>Verify Prebooking</h3>
            <form>
                <label><span>Prebooking Number: </span><input name="prebookingNumber" onChange={onChange} type="text" placeholder='Prebooking Number' value={inputField.prebookingNumber}></input></label>
                <Button onClick={getPrebookingDetails} title="Verify" />
            </form>
            {details}
        </div>);

}



export default Prebooking;
