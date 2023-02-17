const { Activity, Athlete } = require('../models')
const axios = require('axios')
const AuthController = require('./AuthController')

const index = async (payload) => {
    try {
        if (payload.aspect_type == 'create') {
            await createActivity(payload)
        } else if (payload.aspect_type == 'update') {
            await updateActivity(payload)
        } else {
            await deleteActivity(payload)
        }
        return
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
            await AuthController.refreshAthleteAccessToken(athlete)
        }

        const axiosInstance = axios.create({
            baseURL: process.env.STRAVA_API_URL,
            headers: { Authorization: `Bearer ${athlete.access_token}` }
        });
        let { data } = await axiosInstance.get(`/api/v3/activities/${payload.object_id}`)
        // console.log(data);
        await Activity.create({
            id: data.id,
            athlete_id: data.athlete.id,
            name: data.name,
            distance: data.distance,
            moving_time: data.moving_time,
            elapsed_time: data.elapsed_time,
            type: data.type,
            description: data.description,
            calories: data.calories

        })
    } catch (error) {
        console.error(error)
    }
}

const updateActivity = async (payload) => {
    try {
        const activity = await Activity.findOne({
            where: {
                athlete_id: payload.owner_id,
                id: payload.object_id
            }
        })
        if (!activity) {
            return createActivity(payload)
        }
        const athlete = await Athlete.findByPk(payload.owner_id)

        const isTokenExpired = Date.now() > (Number.parseInt(athlete.expires_at) * 1000)
        // console.log("Expire Times", Date.now(), Number.parseInt(athlete.expires_at) * 1000);

        if (isTokenExpired) {
            await AuthController.refreshAthleteAccessToken(athlete)
        }
        const axiosInstance = axios.create({
            baseURL: process.env.STRAVA_API_URL,
            headers: { Authorization: `Bearer ${athlete.access_token}` }
        });
        let { data } = await axiosInstance.get(`/api/v3/activities/${payload.object_id}`)
        // console.log(data)

        activity.id = data.id
        activity.name = data.name
        activity.distance = data.distance
        activity.moving_time = data.moving_time
        activity.elapsed_time = data.elapsed_time
        activity.type = data.type
        activity.description = data.description
        activity.calories = data.calories

        activity.save()

    } catch (error) {
        console.error(error)
    }
}

const deleteActivity = async (payload) => {
    try {
        const activity = await Activity.findOne({
            where: {
                athlete_id: payload.owner_id,
                id: payload.object_id
            }
        })
        if (activity) {
            await activity.destroy()
        }
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