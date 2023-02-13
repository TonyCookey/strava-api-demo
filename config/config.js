require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env

module.exports = {
  'development': {
    'host': DB_HOST,
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'port': DB_PORT,
    'database': 'strava_api_demo_dev',
    'dialect': 'postgres'
  },
  'test': {
    'host': DB_HOST,
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'port': DB_PORT,
    'database': 'strava_api_demo_test',
    'dialect': 'postgres'
  },
  'production': {
    'host': DB_HOST,
    'username': DB_USERNAME,
    'password': DB_PASSWORD,
    'port': DB_PORT,
    'database': 'strava_api_demo_prod',
    'dialect': 'postgres'
  }
}
