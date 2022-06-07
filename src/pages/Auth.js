import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Auth.css';
import cookie, { Cookies, useCookies } from 'react-cookie';

import { Navigate } from 'react-router-dom';

import { toast } from 'react-toastify';

import api from '../api';

import Button from '../components/Button';

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
  const { onChange, inputField, submit } = props;

  return (
    <div className="login-wrapper">
      <form>
        <h3 className="form-heading">Login</h3>
        <label>
          <h3>Username</h3>
          {' '}
          <input name="username" onChange={onChange} value={inputField.username} type="text" placeholder="Username" />
        </label>
        <label>
          <h3>Password</h3>
          {' '}
          <input name="password" onChange={onChange} value={inputField.password} type="password" placeholder="Password" />
        </label>
        <Button onClick={submit} title="Login" />
      </form>
    </div>
  );
}

Login.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputField: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }).isRequired,
  submit: PropTypes.func.isRequired,
};

function Register(props) {
  const { onChange, inputField, submit } = props;

  return (
    <div className="register-wrapper">
      <form>
        <h3 className="form-heading">Register</h3>
        <label>
          <h3>Name</h3>
          {' '}
          <input name="full_name" onChange={onChange} value={inputField.full_name} type="text" placeholder="Full Name" />
        </label>
        <label>
          <h3>Username</h3>
          {' '}
          <input name="username" onChange={onChange} value={inputField.username} type="text" placeholder="Username" />
        </label>
        <label>
          <h3>Account Type</h3>
          <select name="type" onChange={onChange} value={inputField.type}>
            <option value="seller">Seller</option>
            <option value="buyer">Buyer</option>
          </select>
        </label>
        <label>
          <h3>Password</h3>
          {' '}
          <input name="password" onChange={onChange} value={inputField.password} type="password" placeholder="Password" />
        </label>
        <label>
          <h3>Confirm Password</h3>
          {' '}
          <input name="confirm_password" onChange={onChange} value={inputField.confirm_password} type="password" placeholder="Reenter Password" />
        </label>
        <Button onClick={submit} title="Register" />
      </form>
    </div>
  );
}

Register.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputField: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    confirm_password: PropTypes.string.isRequired,
  }).isRequired,
  submit: PropTypes.func.isRequired,
};

export default Auth;
