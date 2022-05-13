const axios = require("axios");

const tokens = require("../utils/tokens");

const book = (accessToken, productID, quantity) => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: "http://localhost:8080/api/prebooking/book",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            },
            data: {
                listing_id: productID,
                quantity
            }
        }).then((response) => {
            resolve(response);
        }).catch((err) => {
            reject(err.response.data.err);
        })

    })

};

module.exports = { book };