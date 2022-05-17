const axios = require('axios').default;

const create = (formData, accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/listing/add',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                'content-type': 'multipart/form-data'
            },
            data: formData
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            console.log(err);
            reject(err);
        });
    });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/listing/search',
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}

const getByID = (id) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/listing/id/' + id,
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}


const removeByID = (id, accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/listing/remove/' + id,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}


const getByUsername = (username, accessToken) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/listing/seller/' + username,
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        }).then((response) => {
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports = { create, getAll, getByID, removeByID, getByUsername };