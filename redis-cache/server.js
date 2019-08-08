var redis = require('redis');
var client = redis.createClient();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");


client.on('connect', function () {
    console.log("Successfully connected to redis...")
});

client.on('error', (err) => {
    console.log("Error " + err)
});

app.use(bodyParser.json())
app.use(cors())

/*
user query
*/
app.post("/user", (req, res) => {
    credentials = {
        "username": req.body.username,
        "destTag": req.body.destTag,
        "balance": req.body.balance
    }
    client.hmset(req.body.destTag, credentials, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json(credentials)
            console.log("posted!")
        }
    });
    //for reverse lookup
    client.set(req.body.username, req.body.destTag)
})

//login with username (reverse lookup)
app.get("/user/:username", (req, res) => {
    getUser(req, res)
})

async function getUser(req, res) {
    try {
        client.get(req.params.username, function (err, reply) {
            console.log(err)
            console.log(reply)
            client.hgetall(reply, function (err, object) {
                if (!object) {
                    res.status(404).json({ message: "Invalid Username" })
                } else {
                    res.setHeader("Access-Control-Allow-Origin", "*")
                    res.status(200).json(object)
                }
                console.dir(object)
            })
        })

        
    } catch (error) {
        console.log(error)
    }
}

//query with destination tag
app.get("/tag/:destTag", (req, res) => {
    client.hgetall(req.params.destTag, function (err, object) {
        if (!object) {
            res.status(404).json({ message: "Invalid Tag" })
        } else {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.status(200).json(object)
        }
        console.dir(object)
    })
})


/*
counter mutation
*/
app.post("/counter", (req, res) => {
    client.set("counter", req.body.amount, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({ counter: req.body.amount })
        }
    })
})

app.get("/counter", (req, res) => {
    client.get("counter", function (err, reply) {
        if (err) {
            console.log(err)
        } else {
            res.status(200).json({ "amount": reply })
        }
    })
})



app.listen(4000)

