const axios = require("axios");

const refresh = (username, refreshToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/auth/refresh',
            data: {
                username,
                refresh_token: refreshToken
            }
        }).then((response) => {
            resolve({ username: response.data.username, accessToken: response.data.access_token, refreshToken: response.data.refresh_token });
        }).catch((err) => {
            reject(err);
        });
    });
}

const verify = (accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/auth/verify',
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then((response) => {
            resolve(true);
        }).catch((err) => {
            reject(err);
        })
    });
}

module.exports = { refresh, verify };