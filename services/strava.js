const Axios = require('../utils/axios')

const getWebhookSubscription = async () => {
    const { data } = await Axios.get(`/api/v3/push_subscriptions?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`)
    console.log(' Get Subscription Data', data);
    return data
}

const createWebhookSubscription = async () => {
    try {
        const { data } = await Axios.post(`/api/v3/push_subscriptions`, {
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            callback_url: `${process.env.APP_URL}webhook`,
            verify_token: process.env.VERIFY_TOKEN
        })
        console.log('CREATE Subscription Data', data);

        return data

    } catch (error) {
        console.log(error);
        return error
    }

}

const deleteWebhookSubscription = async (subscription_id) => {
    const { data } = await Axios.delete(`/api/v3/push_subscriptions/${subscription_id}`, {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
    })

    return data
}
const setupWebhookSubscription = async () => {

    const webhookSubscription = await getWebhookSubscription()
    console.log(webhookSubscription);

    if (webhookSubscription.length > 0) {
        if (webhookSubscription[0].callback_url == `${process.env.APP_URL}webhook`) {
            // You have a Valid and Active Webhook Subscription
            console.log('You have a Valid and Active Webhook Subscription');
            return {
                id: webhookSubscription[0].id
            }
        }
        // You DON'T have a Valid Webhook Subscription
        await deleteWebhookSubscription(webhookSubscription[0].id)

    }
    // You DON'T have a Webhook Subscription
    return await createWebhookSubscription()
}

module.exports = {
    setupWebhookSubscription
}

