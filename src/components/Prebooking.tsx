import React, { useState } from 'react';
import './Prebooking.css';
import { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Button from './Button';

import 'react-toastify/dist/ReactToastify.css';

import api from '../api';

import PrebookingDetails from './PrebookingDetails';

function Prebooking() {
  const [cookies, setCookies] = useCookies(['username', 'accessToken', 'refreshToken']);

  const [inputField, setInputField] = useState({
    prebookingNumber: '',
  });

  const [prebookingDetails, setPrebookingDetails] = useState({
    username: '', quantity: 0, productTitle: '', productPrice: '',
  });
  const [detailsFetched, setDetailsFetched] = useState(false);

  function onChange(e) {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  async function getPrebookingDetails(elm) {
    const { prebookingNumber } = inputField;
    try {
      const prebooking:Prebooking = await api.prebookings.get(prebookingNumber, cookies.accessToken);
      setPrebookingDetails(prebooking);
      setDetailsFetched(true);
      toast.success('Prebooking Fetched');
    } catch (err:any) {
      toast.error(err.toString());
    }
  }

  async function cancelPrebooking() {
    const { prebookingNumber } = inputField;
    try {
      const prebooking:Prebooking = await api.prebookings.cancel(prebookingNumber, cookies.accessToken);
      setPrebookingDetails(prebooking);
      setDetailsFetched(true);
      toast.success('Prebooking Canceled');
    } catch (err:any) {
      toast.error(err.toString());
    }
  }

  async function approvePrebooking() {
    const { prebookingNumber } = inputField;
    try {
      const prebooking:Prebooking = await api.prebookings.approve(prebookingNumber, cookies.accessToken);
      setPrebookingDetails(prebooking);
      setDetailsFetched(true);
      toast.success('Prebooking Aprroved');
    } catch (err:any) {
      toast.error(err.toString());
    }
  }

  // @ts-ignore
  const details = detailsFetched ? <PrebookingDetails details={prebookingDetails} onApprove={approvePrebooking} onCancel={cancelPrebooking} /> : null;

  return (
    <div className="verifyprebooking-wrapper">
      <h3>Verify Prebooking</h3>
      <form>
        <label>
          <span>Prebooking Number: </span>
          <input name="prebookingNumber" onChange={onChange} type="text" placeholder="Prebooking Number" value={inputField.prebookingNumber} />
        </label>
        <Button onClick={getPrebookingDetails} title="Verify" />
      </form>
      {details}
    </div>
  );
}

export default Prebooking;
