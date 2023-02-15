const { Activity, Athlete } = require('../models')
const axios = require('axios')
const AuthController = require('./AuthController')


const index = async (payload) => {
    try {
        if (payload.aspect_type == 'create') {
            await createActivity(payload)
        } else if (payload.aspect_type == 'update') {
            return await createActivity(payload)
        } else {
            await deleteActivity(payload)
        }
    } catch (error) {
        console.error(error)
    }
}
const createActivity = async (payload) => {
    try {
        const athlete = await Athlete.findByPk(payload.owner_id)
        if (!athlete) {
            return
        }
        const isTokenExpired = Date.now() > (Number.parseInt(athlete.expires_at) * 1000)
        console.log("Expire", Date.now(), Number.parseInt(athlete.expires_at) * 1000);

        if (isTokenExpired) {

            // await AuthController.refreshAthleteAccessToken()
        }
        const axiosInstance = axios.create({
            baseURL: process.env.STRAVA_API_URL,
            headers: { Authorization: `Bearer ${athlete.access_token}` }
        });
        let { data } = await axiosInstance.get(`/api/v3/activities/${payload.object_id}`)
        console.log(data);
        const activity = await Activity.create({
            id: data.id,
            athlete_id: data.athlete.id,
            distance: data.distance,
            moving_time: data.moving_time,
            elapsed_time: data.elapsed_time,
            type: data.type,
            description: data.description,
            calories: data.calories

        })
        return activity
    } catch (error) {
        console.error(error)
    }
}

const updateActivity = async (payload) => {
    try {

    } catch (error) {
        console.error(error)
    }
}

const deleteActivity = async (payload) => {
    try {


    } catch (error) {
        console.error(error)
    }
}
module.exports = {
    index,
    createActivity,
    updateActivity,
    deleteActivity
}