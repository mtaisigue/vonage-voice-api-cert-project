require('dotenv').config()
const app = require("express")();
const express = require('express');
const bodyParser = require("body-parser");
const base_url = process.env.NGROK_URL;

app.use(bodyParser.json());
app.use(express.static('static'));

app.get("/webhooks/answer", (req, res) => {
  const ncco = [
    {
      action: "talk",
      bargeIn: true,
      voiceName: "Brian",
      text:
        "Hello, Thank you for calling. If you want to hear a cool song press 1, If you want to know the time press 2, or press 3 to talk with someone",
    },
    {
      action: "input",
      maxDigits: 1,
      eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/dtmf`],
    },
  ];

  res.json(ncco);
});

app.post("/webhooks/events", (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

app.post("/webhooks/dtmf", (req, res) => {
  let ncco = new Array();
  console.log('pressed', req.body.dtmf);
  switch (req.body.dtmf) {
    case "1":
      ncco.push({
        action: "stream",
        streamUrl: [`${base_url}/hold.mp3`],
      });
      break;
    case "2":
      const date = new Date();
      ncco.push({
        action: "talk",
	voiceName: "Brian",
        text: `<speak> 
        Today is 
        <say-as interpret-as="date" format="mdy">${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</say-as>. 
        It is ${date.getHours()} with ${date.getMinutes()} minutes</speak>`,
      });
      break;
    case "3":
      ncco.push({
        action: "talk",
	voiceName: "Brian",
        text:
          "Great, We are now connecting you to someone who will be able to help you",
      });
      ncco.push({
        action: "connect",
        eventUrl: [`${req.protocol}://${req.get("host")}/webhooks/events`],
        timeout: "45",
        from: process.env.VIRTUAL_NUMBER,
        endpoint: [
          {
            type: "phone",
            number: process.env.YOUR_NUMBER,
            dtmfAnswer: "2p02p"
          }
        ]
      });
      break;
    default:
      ncco.push({
        action: "talk",
	voiceName: "Brian",
        text: "I'm sorry, You did not pressed any key, please try again later. Goodbye",
      });
      break;
  }

  res.json(ncco);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
