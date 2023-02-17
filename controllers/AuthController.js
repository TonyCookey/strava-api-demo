const Axios = require('../utils/axios')
const { Athlete } = require('../models')
const { setupWebhookSubscription } = require('../services/strava')

const authorize = async (req, res) => {
    try {
        const setup = await setupWebhookSubscription()
        if (setup.id) {
            const URL = `http://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.APP_URL}app/callback&approval_prompt=auto&scope=${process.env.SCOPE}`
            return res.redirect(URL)
        }
        throw Error('Webhook Event Subscription Setup Failed')
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: error.message,
            'Home Link': `${process.env.APP_URL}app/authorize`
        })
    }
}

const refreshAthleteAccessToken = async (athlete) => {
    try {
        let { data } = await Axios.post('/api/v3/oauth/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            refresh_token: athlete.refresh_token,
            grant_type: 'refresh_token'
        })
        // console.log(data);
        athlete.access_token = data.access_token
        athlete.refresh_token = data.refresh_token
        athlete.expires_at = data.expires_at
        athlete.save()
    } catch (error) {
        console.error(error)

    }
}

const StravaOauthCallback = async (req, res) => {
    try {
        const auth_code = req.query.code

        if (!auth_code) {
            return res.status(400).json({
                message: 'Could not Find Authorization Code. Click the Link below to try again',
                'Login Link': `${process.env.APP_URL}app/authorize`
            })
        }

        let { data } = await Axios.post('/api/v3/oauth/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: auth_code,
            grant_type: 'authorization_code'
        })

        if (!data) {
            return res.status(500).json({
                message: 'Could not Authorize Strava Athlete',
                'Authorization Link': `${process.env.APP_URL}app/authorize`
            })
        }
        const athlete = await Athlete.findByPk(data.athlete.id)
        if (athlete) {
            athlete.access_token = data.access_token
            athlete.refresh_token = data.refresh_token
            athlete.expires_at = data.expires_at
            athlete.save()
        } else {
            await Athlete.create({
                id: data.athlete.id,
                firstname: data.athlete.firstname,
                lastname: data.athlete.lastname,
                access_token: data.access_token,
                refresh_token: data.refresh_token,
                expires_at: data.expires_at
            })
        }
        return res.status(200).json({
            message: 'Strava Athlete Authorization Complete',
            athlete: data.athlete
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'System Encountered Error Authorizing Strava Athlete',
            'Authorization Link': `${process.env.APP_URL}app/authorize`,
            error
        })
    }
}


module.exports = {
    authorize,
    StravaOauthCallback,
    refreshAthleteAccessToken
}