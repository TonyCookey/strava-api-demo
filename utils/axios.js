const axios = require('axios')

const axiosInstance = axios.create({
    baseURL: process.env.STRAVA_API_URL,
});
module.exports = axiosInstance
