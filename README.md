# Strava API Demo

NodeJS API powered by the Strava API to track Athletes Activities

## Setup

### Setup Backend

####Install Dependencies

```
npm install

```

###Set Enviroment Variables

Create a `.env` file in the root folder and copy the content of the `.env.example` file into it and update the neccesary details

### Setup Postgres using Docker

If you do not have Postgres installed on your machine you can use a Postgres Docker Image

### Pull Postgres Image

```
docker pull postgres

```

### Run the Container

```
docker run --name <<CONTAINER_NAME>> -p 5432:5432 -e POSTGRES_USER=<<USER_NAME>> -e POSTGRES_PASSWORD=<<PASSWORD>> -d <<IMAGE_NAME>>

```

### Setup Database and Migrations

Create a Database using the command below

```
npm run create-db

```

Run Migrations

```
npm run migrate-db

```

## Prerequisites before Starting the Development Server

If you are on a development server, You need a forwarding URL for Strava to send subscription events to. You can use ngrok, Install ngrok

Start the ngrok server

```
ngrok http <<YOUR_APP_PORT>>

```

### Setting up your Strava Application

Log in or create a Strava account. After your account has been created, click here to link your Development server to your Strava account.

An important field in the App creation form is Authorization Callback Domain here you’ll want to use the forwarding URL from NGROK (e.g xyzabc123.ngrok.io) so that Strava knows where to push webhook events.

### Update your .env

Update the following credentials with cariables from your Strava App Account

```
CLIENT_ID=
CLIENT_SECRET=
VERIFY_TOKEN=
APP_URL=
```

## Start the Development Server

```
 npm run dev

```

# Using the API

Open the app link (NGROK) in the browser (e.g http://xyzabc123.ngrok.io),

## Webhook Subscription Setup

Automatically, The Server will setup the webhook event subscriptions, It will check if there is an existing subscription with your current APP_URL (Ngrok).

If you don't have a Valid and Active Susbsription. The Server will attempt to delete the existing subscription and create a new valid subscription using your APP_URL, which allows your API receive events from Strava.

When a subscription is created. You should see `WEBHOOK_VERIFIED` printed to the terminal console if the request was successful.

## Login/Authorization

Once on the homepage, you will be shown a link to authorize a strava athlete. This authorizes an athlete and allows our API to track his activty.
