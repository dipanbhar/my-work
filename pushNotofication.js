const webpush = require('web-push');
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "client")));

app.use(bodyParser.json());
//const vapidKeys = webpush.generateVAPIDKeys();
const publicVapidKey ="BJyHe5EFnNCK-tDdJl7i6cLdRz416N1nwz4k3VN89k-hzX7TvYDcgo4dl-GzOxNgsOtVcOoGGxUR-30gM8AEHDM";
const privateVapidKey = "c3-wODdh9a5AlgbSimx7IGQEMJE7FyGqNNCrnrpuXvo";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {

  console.log('sunscribe is called');
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  setTimeout(function () {
    webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
  }, 10000);

  
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
