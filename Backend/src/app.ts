import express = require('express');
import { router } from './routes';
import { UNO_deck, Card }  from './Uno'

// Create a new express application instance
const app: express.Application = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

app.get('/', function (req, res) {
  res.status(200).send(''+Math.random());
});
app.use(router)
let UnoDeck:UNO_deck = new UNO_deck([]);
UnoDeck.print();

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});