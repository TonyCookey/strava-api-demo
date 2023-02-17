const { Router } = require('express');

const AuthController = require('../controllers/AuthController')

const router = Router();

router.get('/authorize', AuthController.authorize)
router.get('/callback', AuthController.StravaOauthCallback)
// router.get('/test/:refresh_token', AuthController.refreshAthleteAccessToken)


module.exports = router