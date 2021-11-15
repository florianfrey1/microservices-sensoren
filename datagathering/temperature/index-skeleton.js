// dhbw exercise 6
//   build a datagathering program which will receive mqtt messages 
//   from the hivemq.com broker
//
//    remove the comment statements xxhs and put the correct js code in
// 

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
// required to handle the request body
app.use(express.json());

const axios = require('axios');

// add mqtt support
var mqtt = require('mqtt');
var Topic = 'microservice/temperature'; //subscribe to all topics from postapp
var Broker_URL = 'mqtt://localhost';

var options = {
    clientId: 'MyMQTT2',
    port: 1883,
    keepalive: 60
};

var client = mqtt.connect(Broker_URL, options);
client.on('connect', mqtt_connect);
client.on('reconnect', mqtt_reconnect);
client.on('error', mqtt_error);
client.on('message', mqtt_messsageReceived);
client.on('close', mqtt_close);

function mqtt_connect() {
    console.log("Connecting MQTT");
    client.subscribe(Topic, mqtt_subscribe);
}

function mqtt_subscribe(err, granted) {
    console.log("Subscribed to " + Topic);
    if (err) { console.log(err); }
}

function mqtt_reconnect(err) {
    console.log("Reconnect MQTT");

    if (err) {
        console.log(err);
    }

    client = mqtt.connect(Broker_URL, options);
}

function mqtt_error(err) {
    console.log("Error!");
    if (err) { console.log(err); }
}

function mqtt_close() {
    console.log("Close MQTT");
}

function after_publish() {
    //do nothing
}

jsonmsg = {};
co2data = [];
function mqtt_messsageReceived(topic, message, packet) {
    console.log('Topic=' + topic + '  Message=' + message);
    jsonmsg = JSON.parse(message);
    co2data.push(jsonmsg);
}

app.listen(4002, async () => {
    console.log('Listening on 4002');
});