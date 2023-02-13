const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {

    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
    // Parses the query params
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Verifies that the mode and token sent are valid
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.json({ 'hub.challenge': challenge });
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
})

router.post('/', (req, res) => {
    console.log("webhook event received!", req.query, req.body);
    res.status(200).send('EVENT_RECEIVED');
})

module.exports = router
