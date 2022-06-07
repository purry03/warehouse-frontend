const axios = require('axios');

const refresh = (username, refreshToken) => new Promise((resolve, reject) => {
  axios({
    method: 'post',
    url: 'http://localhost:8080/api/auth/refresh',
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
  }).catch((err) => {
    reject(err);
  });
});

const verify = (accessToken) => new Promise((resolve, reject) => {
  axios({
    method: 'get',
    url: 'http://localhost:8080/api/auth/verify',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then(() => {
    resolve(true);
  }).catch((err) => {
    reject(err);
  });
});

module.exports = {
  refresh,
  verify,
};
