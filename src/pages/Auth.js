import React, { useState } from 'react';
import './Auth.css';
import cookie, { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../api';

import Button from '../components/Button';
import { login, register } from '../api/auth';

function Auth() {
  const [inputField, setInputField] = useState({
    username: '',
    password: '',
    type: 'seller',
    full_name: '',
    confirm_password: '',
  });
  const [cookies, setCookies] = useCookies(['username', 'type', 'accessToken', 'refreshToken']);
  const [loggedIn, setLoggedIn] = useState(false);
  const [type, setType] = useState('');

  if (cookies.username && loggedIn === false) {
    setLoggedIn(true);
    setType(cookies.type);
  }

  function onChange(e) {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  }

  async function login() {
    try {
      const response = await api.auth.login(inputField.username, inputField.password);
      toast.success('Logged In');
      setCookies('username', response.username, { path: '/' });
      setCookies('accessToken', response.accessToken, { path: '/' });
      setCookies('refreshToken', response.refreshToken, { path: '/' });
      setCookies('type', response.type, { path: '/' });
      setType(response.type);
      setLoggedIn(true);
    } catch (err) {
      if (err.status === 401) {
        toast.error('Incorrect Credentials');
        return;
      }
      toast.error(err.toString());
    }
  }

  async function register() {
    try {
      if (inputField.password !== inputField.confirm_password) {
        toast.error('Passwords do not match');
        return;
      }
      await api.auth.register(inputField.username, inputField.password, inputField.type);
      toast.success('Successfully Registered');
      login();
    } catch (err) {
      toast.error(err.toString());
    }
  }

  if (loggedIn) {
    if (type === 'seller') {
      return (<Navigate to="/dashboard" />);
    }
    if (type === 'buyer') {
      return (<Navigate to="/products" />);
    }
  } else {
    return (
      <div>
        <div className="auth-wrapper">
          <Login onChange={onChange} inputField={inputField} submit={login} />
          <Register onChange={onChange} inputField={inputField} submit={register} />
        </div>
      </div>
    );
  }
}

function Login(props) {
  return (
    <div className="login-wrapper">
      <form>
        <h3 className="form-heading">Login</h3>
        <label>
          <h3>Username</h3>
          {' '}
          <input name="username" onChange={props.onChange} value={props.inputField.username} type="text" placeholder="Username" />
        </label>
        <label>
          <h3>Password</h3>
          {' '}
          <input name="password" onChange={props.onChange} value={props.inputField.password} type="password" placeholder="Password" />
        </label>
        <Button onClick={props.submit} title="Login" />
      </form>
    </div>
  );
}

function Register(props) {
  return (
    <div className="register-wrapper">
      <form>
        <h3 className="form-heading">Register</h3>
        <label>
          <h3>Name</h3>
          {' '}
          <input name="full_name" onChange={props.onChange} value={props.inputField.full_name} type="text" placeholder="Full Name" />
        </label>
        <label>
          <h3>Username</h3>
          {' '}
          <input name="username" onChange={props.onChange} value={props.inputField.username} type="text" placeholder="Username" />
        </label>
        <label>
          <h3>Account Type</h3>
          <select name="type" onChange={props.onChange} value={props.inputField.type}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </label>
        <label>
          <h3>Password</h3>
          {' '}
          <input name="password" onChange={props.onChange} value={props.inputField.password} type="password" placeholder="Password" />
        </label>
        <label>
          <h3>Confirm Password</h3>
          {' '}
          <input name="confirm_password" onChange={props.onChange} value={props.inputField.confirm_password} type="password" placeholder="Reenter Password" />
        </label>
        <Button onClick={props.submit} title="Register" />
      </form>
    </div>
  );
}

export default Auth;
