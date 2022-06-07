import axios from 'axios';

const login = (username: string, password: string):Promise<User> => new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/login',
        data: {
            username,
            password,
        },
    }).then((response) => {
        resolve({
            username: response.data.username,
            accessToken: response.data.access_token,
            refreshToken: response.data.refresh_token,
            type: response.data.type,
        });
    }).catch((err:any) => {
        reject(err);
    });
});

const register = (username:string, password:string, type:string):Promise<boolean> => new Promise((resolve, reject) => {
    axios({
        method: 'post',
        url: 'http://localhost:8080/api/auth/register',
        data: {
            username,
            password,
            type,
        },
    }).then((response) => {
        resolve(true);
    }).catch((err) => {
        reject(err);
    });
});

export default {
    login,
    register,
};
