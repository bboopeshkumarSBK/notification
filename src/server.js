// const express = require('express')
// const path = require('path')
import express from 'express';
import path from 'path'
import https from 'https'
import fs from 'fs'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename);
const app = express()
import fetch from "node-fetch";
import cors from "cors";

app.use((req, res, next) => {
  console.log(req.method + "  " + req.path + " " + res.statusCode);

  next(); // this will invoke next middleware function
});
app.use(cors());
app.use(express.static(__dirname + "./../public"));

const serverConfig = {
  
  key: fs.readFileSync(path.join(__dirname, 'cert',"key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert","cert.pem")),
};

const sslServer = https.createServer(serverConfig, app);
app.get("/", express.static(path.join(__dirname, 'public')));
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "./../public/demo.html"));
// });
// app.get("/firebase-messaging-sw.js", (req, res) => {
//   res.sendFile(path.join(__dirname, "./../firebase-messaging-sw.js"));
// });
app.get("/notify/:token", (req, res) => {
  let token = req.params.token;
  console.log(req.params)
  console.log(token);
  console.log("hi ");
  let notification = {
    title: "welcome to notifying",
    text: "This is Web Team !!!",
  };
  let notification_body = {
    notification: notification,

    registration_ids: [
      "ez1rKcmRL0xOjl5oyFcN93:APA91bE1l0RbPbKWscI3qLrOImNIvmSZ9uHTX1bsmoNqqU8y1pXqYQCPeiDMqBqRzJElDQx6XzekcQ5gT3ofqpF8A9FcqYMpGCHMOooJaHR2ADcNc9a88lz9m09oNL6OIM2tuZ_IEo1a",
      "fLVBNcy78VVZfF2LMf6qKz:APA91bHCOp1Z4hkRNFD5pBzHyfv-H6K8Z3phKLzQlS1NyVEimYXfjQLMhrUS5x-wrWd8YPJBepJdGjY1dpoMMzJ6-AOyGZz0YflIYaHeccp0vx8nPwbAGbjHB7eWtu5aqTOZlpKqfXLl",
      token,
    ],
  };
  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAA6vDNNlE:APA91bEKPM_5DpGv18DEFazkgkhRq1h2YyXmPWQYm5M2A2gKwK_AO7aX9QVqNRPFkJM1AvcdTC0flf7kxgmpn30lQaCbBCBD6tLlbiNSuoMHG7YpK2Uuy_e8eMLtgHdOcQyyh7nO9DMw",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then((data) => {
      res
        .status(200)
        .json({
          success: true,
          message: "successfully send notification",
          data: data,
        });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: JSON.stringify(err) });
    });
});
 

sslServer.listen(5000, "0.0.0.0", () => {
  console.log("server running on https://localhost:5000/");
});