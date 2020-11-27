"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express = require("express");
var router = express.Router();
exports.router = router;
router.get('/Game/:Game/Player/:Player', function (req, res) {
    console.log(req.params); // gives the Game and Player in JSON
    // TO DO Start game
});
router.get('/CreateGame', function (req, res) {
    // TO DO Create new game
    console.log("TO DO CREATE NEW GAME");
    res.send("New game");
});
router.post('Play/Game/:Game/Player/:Player', function (req, res) {
    console.log("TO DO CREATE NEW GAME");
});
