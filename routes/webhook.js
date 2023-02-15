const { Router } = require('express');
const verifyWebhook = require('../middlewares/verifyWebhook');
const ActivityController = require('../controllers/ActivityController')


const router = Router();

router.get('/', verifyWebhook)

router.post('/', async (req, res) => {
    console.log("EVENT_RECEIVED", req.query);
    if (req.body.object_type == 'activity') {
        // Sending the Response earlier to meet up the response time of 2 seconds
        console.log("hello");
        const data = await ActivityController.index(req.body)
        res.status(200).json({
            data
        });
        // res.status(200).send('EVENT_RECEIVED');

    }
})

module.exports = router
