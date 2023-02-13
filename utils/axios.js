const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: process.env.STRAVA_API_URL,
    // headers: { 'Authorization': `Basic ${process.env.BASIC_ENCODED_AUTH}` }
});
module.exports = axiosInstance
