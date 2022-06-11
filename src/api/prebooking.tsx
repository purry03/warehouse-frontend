import axios from 'axios';

const book = (accessToken:string, productID:number, quantity:number) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/api/prebooking/book',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    data: {
      listing_id: productID,
      quantity,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err.response.data.err);
  });
});

const get = (prebookingNumber:string, accessToken:string):Promise<Prebooking> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/api/prebooking/get',
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

const approve = (prebookingNumber:string, accessToken:string):Promise<Prebooking> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/api/prebooking/approve',
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

const cancel = (prebookingNumber:string, accessToken:string):Promise<Prebooking> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/api/prebooking/cancel',
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

export default {
  book, get, approve, cancel,
};
