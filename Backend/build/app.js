"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var routes_1 = require("./routes");
var Uno_1 = require("./Uno");
// Create a new express application instance
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.get('/', function (req, res) {
    res.status(200).send('' + Math.random());
});
app.use(routes_1.router);
var UnoDeck = new Uno_1.UNO_deck([]);
UnoDeck.print();
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
