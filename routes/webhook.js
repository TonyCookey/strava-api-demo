const { Router } = require('express');
const verifyWebhook = require('../middlewares/verifyWebhook');
const ActivityController = require('../controllers/ActivityController')


const router = Router();

router.get('/', verifyWebhook)

// POST Route to receive the Wehook Events  
router.post('/', async (req, res) => {
    console.log("EVENT_RECEIVED");
    const payload = req.body
    if (req.body.object_type == 'activity') {
        // Sending the response earlier to meet up the response time of 2 seconds
        res.status(200).send('EVENT_RECEIVED');
        //handle the incoming activity event
        await ActivityController.index(payload)
    }
})

module.exports = router
