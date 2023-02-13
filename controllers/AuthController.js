const Axios = require('../utils/axios')
const { Athlete } = require('../models')
const authorize = async (req, res) => {
    try {
        const URL = `http://www.strava.com/oauth/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.APP_URL}app/callback&approval_prompt=force&scope=${process.env.SCOPE}`
        return res.redirect(URL)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Could not authorize',
            'Home Link': `${process.env.APP_URL}app/login`
        })
    }
}


const StravaOauthCallback = async (req, res) => {
    try {
        const auth_code = req.query.code
        if (!auth_code) {
            return res.status(400).json({
                message: 'Could not Authorize Strava Athlete',
                'Login Link': `${process.env.APP_URL}app/authorize`
            })
        }

        let { data } = await Axios.post('/oauth/token', {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            code: auth_code,
            grant_type: 'authorization_code'
        })
        console.log(data.data);

        data = data.data

        if (!data) {
            return res.status(500).json({
                message: 'Could not Authorize Strava Athlete',
                'Authorization Link': `${process.env.APP_URL}app/authorize`
            })
        }
        const athlete = await Athlete.findByPK(data.athlete.id)
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
            data
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Could not Authorize Strava Athlete',
            'Authorization Link': `${process.env.APP_URL}app/authorize`,
            error
        })
    }
}

module.exports = {
    authorize,
    StravaOauthCallback
}