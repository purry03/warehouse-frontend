import axios from 'axios';

const refresh = (username:string, refreshToken:string):Promise<User> => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://127.0.0.1:8080/api/auth/refresh',
    data: {
      username,
      refresh_token: refreshToken,
    },
  }).then((response) => {
    resolve({
      username: response.data.username,
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
    });
  }).catch((err:any) => {
    reject(err);
  });
});

const verify = (accessToken:string):Promise<boolean> => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: 'http://127.0.0.1:8080/api/auth/verify',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    resolve(true);
  }).catch((err) => {
    reject(err);
  });
});

export default {
  refresh,
  verify,
};
