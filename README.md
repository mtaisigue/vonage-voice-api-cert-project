# Voice API certification project

This repo contains the code for Voice API certification project.

## Running the application 

First clone the repo and install dependencies

```
git clone https://github.com/mtaisigue/vonage-voice-api-cert-project.git
cd vonage-voice-api-cert-project
npm install
```
Run ngrok on port 3000

```
ngrok http 3000
 ```

Then copy `env-example` to `.env`. Set YOUR_NUMBER to your regular phone number, VIRTUAL_NUMBER to a valid Vonage virtual number and NGROK_URL to the output url from the previous (ngrok) command.

Run the app

```
node server.js
```

## Configuring Vonage

Login into your [dashboard](https://dashboard.nexmo.com) and create a new application.

Select/switch Voice on and add the following webhooks:

* Events: https://ngrok-generated-url/webhooks/event
* Answer: https://ngrok-generated-url/webhooks/answer

Save the application and link your nexmo virtual number to it.

## Testing the application

Call from any phone number other than the one you set as "YOUR_NUMBER" to the VIRTUAL_NUMBER linked to the application.

Follow the IVR's directions

* Press 1 to hear a song
* Press 2 to hear the current date and time
* Press 3 to call YOUR_NUMBER
