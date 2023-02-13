require('dotenv').config()
const express = require('express');

const cors = require('cors');

const AppRoutes = require('./routes/app')
const WebHookRoutes = require('./routes/webhook')

// const db = require('./models');
// db.sequelize.sync();

const app = express();

app.use(cors())
app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get('/', (_req, res) => {
    res.json({
        message: 'Welcome to Strava API Demo. Click on the Authorization Link to Authenticate and Authorize a Strava Athlete',
        'Authorization Link': `${process.env.APP_URL}app/authorize`
    });
})
app.use('/webhook', WebHookRoutes);
app.use('/app', AppRoutes);
;

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Strava API Demo listening at http://localhost:${PORT}`);
});
