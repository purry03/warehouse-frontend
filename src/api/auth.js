const axios = require('axios').default;

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/login',
            data: {
                username,
                password
            }
        }).then((response) => {
            resolve({ accessToken: response.data.access_token, refreshToken: response.data.refresh_token, type: response.data.type });
        }).catch((err) => {
            reject(err);
        });
    });
}


const register = (username, password, type) => {
    console.log({ username, password, type })
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/register',
            data: {
                username,
                password,
                type
            }
        }).then((response) => {
            console.log(response);
            resolve(true);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports = { login, register };