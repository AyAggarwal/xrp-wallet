var redis = require('redis');
var client = redis.createClient();
const express = require("express");
const app = express();


client.on('connect', function() {
    console.log("Successfully connected to redis...")
});

client.on('error', (err) => {
    console.log("Error " + err)
});

app.post("/user", (req, res) => {
    setUser(req.username, req.credentials)
})

app.get("/user/:username", (req, res) => {
    getUser(req.params.username)
})

//username is a string, credentials is an object defined in wallet.js
function setUser(username, credentials) {
    client.hmset(username, credentials, redis.print);
}

function getUser(username) {
    client.hgetall(username, function(err, object) {
        return object;
    })
}

app.listen(4000)

