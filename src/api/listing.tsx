import axios from 'axios';

const create = (formData:FormData, accessToken:string):Promise<Listing[]> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/listing/add',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'content-type': 'multipart/form-data',
    },
    data: formData,
  }).then((response) => {
    resolve(response.data);
  }).catch((err:any) => {
    reject(err);
  });
});

const getAll = ():Promise<Listing[]> => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: 'http://localhost:8080/api/listing/search',
  }).then((response) => {
    resolve(response.data);
  }).catch((err:any) => {
    reject(err);
  });
});

const getByID = (id:string):Promise<Listing> => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `http://localhost:8080/api/listing/id/${id}`,
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err);
  });
});

const removeByID = (id:string, accessToken:string):Promise<Listing> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: `http://localhost:8080/api/listing/remove/${id}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err);
  });
});

const getByUsername = (username:string, accessToken:string):Promise<Listing[]> => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: `http://localhost:8080/api/listing/seller/${username}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((response) => {
    resolve(response.data);
  }).catch((err) => {
    reject(err);
  });
});

export default {
  create, getAll, getByID, removeByID, getByUsername,
};
