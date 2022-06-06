const axios = require('axios');

const tokens = require('../utils/tokens');

const book = (accessToken, productID, quantity) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/prebooking/book',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      listing_id: productID,
      quantity,
    },
  }).then((response) => {
    resolve(response);
  }).catch((err) => {
    reject(err.response.data.err);
  });
});

const get = (prebookingNumber, accessToken) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/prebooking/get',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      prebooking_number: prebookingNumber,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err.response.data.err);
  });
});

const approve = (prebookingNumber, accessToken) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/prebooking/approve',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      prebooking_number: prebookingNumber,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err.response.data.err);
  });
});

const cancel = (prebookingNumber, accessToken) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/prebooking/cancel',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      prebooking_number: prebookingNumber,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err.response.data.err);
  });
});

module.exports = {
  book, get, approve, cancel,
};
