import React, { useState } from 'react';
import "./Auth.css";
import { Cookies, useCookies } from 'react-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const axios = require('axios').default;

function Auth() {

    const [inputField, setInputField] = useState({
        username: '',
        password: '',
        full_name: '',
        confirm_password: ''
    });
    const [accessToken, setAccessToken] = useCookies(['accessToken']);
    const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);



    function onChange(e) {
        setInputField({ ...inputField, [e.target.name]: e.target.value })
    }

    async function onLogin() {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/login',
            data: {
                username: inputField.username,
                password: inputField.password
            }
        }).then((response) => {
            setAccessToken('accessToken', response.data.access_token, { path: '/' });
            setRefreshToken('refreshToken', response.data.refresh_token, { path: '/' });
            toast.success("Logged In", {
                hideProgressBar: true
            });
        }).catch((err) => {
            toast.error("Incorrect Credentials");
        });
    }

    return (
        <div className="auth-wrapper">
            <ToastContainer limit={5} />
            <Login onChange={onChange} inputField={inputField} submit={onLogin} />
            <Register onChange={onChange} inputField={inputField} />
        </div>
    );
}

function Login(props) {

    return (
        <div className='login-wrapper'>
            <form>
                <h3 className='form-heading'>Login</h3>
                <label><h3>Username</h3> <input name="username" onChange={props.onChange} value={props.inputField.username} type="text" placeholder='Username'></input></label>
                <label><h3>Password</h3> <input name="password" onChange={props.onChange} value={props.inputField.password} type="password" placeholder='Password'></input></label>
                <button type="button" onClick={props.submit}>LOGIN</button>
            </form>
        </div>
    )

}

function Register(props) {
    return (
        <div className='register-wrapper'>
            <form>
                <h3 className='form-heading'>Register</h3>
                <label><h3>Name</h3> <input name="full_name" onChange={props.onChange} value={props.inputField.full_name} type="text" placeholder='Full Name'></input></label>
                <label><h3>Username</h3> <input name="username" onChange={props.onChange} value={props.inputField.username} type="text" placeholder='Username'></input></label>
                <label><h3>Password</h3> <input name="password" onChange={props.onChange} value={props.inputField.password} type="password" placeholder='Password'></input></label>
                <label><h3>Confirm Password</h3> <input name="confirm_password" onChange={props.onChange} value={props.inputField.confirm_password} type="password" placeholder='Reenter Password'></input></label>
                <button type="button">Register</button>
            </form>
        </div>
    )
}

export default Auth;