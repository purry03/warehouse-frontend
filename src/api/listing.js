const axios = require('axios').default;

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
            console.log(response);
            resolve(response.data);
        }).catch((err) => {
            reject(err);
        });
    });
}


module.exports = { getAll, getByID };