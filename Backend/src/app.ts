import express = require('express');
import { router } from './routes';
import { UNO_deck, Card, UNO_Game }  from './Uno'

// Create a new express application instance
const app: express.Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get('/', function (req, res) {
  res.status(200).send(req.ip);
});
app.use(router)
let players = ['P1','P2','P3'];
let game = new UNO_Game(1);
players.forEach(element => {
    game.CreatePlayer(element);
});
game.GameStart();


app.listen(3000, function () {
  console.log(`running on ${process.env.IP}:3000!`);
});