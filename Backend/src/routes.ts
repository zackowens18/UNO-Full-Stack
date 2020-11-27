import express = require('express');

const router: express.Router = express.Router();

router.get('/Game/:Game/Player/:Player',function(req,res){
    console.log(req.params); // gives the Game and Player in JSON
    // TO DO Start game
})

router.get('/CreateGame', function(req,res){
    // TO DO Create new game
    console.log("TO DO CREATE NEW GAME");
    res.send("New game")
})

router.post('Play/Game/:Game/Player/:Player', function(req,res){
    console.log("TO DO CREATE NEW GAME");
})


export {router}