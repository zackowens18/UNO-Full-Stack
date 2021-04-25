class Card {
  color: string;
  number: string;

  constructor(color: string, number: string) {
    this.color = color;
    this.number = number;
  }
}
// Creates a deck of cards an has all constants
class UNO_deck {
  readonly Card_Colors: string[] = ["yellow", "red", "green", "blue"];
  readonly Card_numbers: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+2",
    "reverse",
    "skip",
  ];
  readonly Card_Colorless_extra: Array<Card> = [
    new Card("pick", "+4"),
    new Card("pick", "+4"),
    new Card("pick", "+4"),
    new Card("pick", "+4"),
    new Card("pick", ""),
    new Card("pick", ""),
    new Card("pick", ""),
    new Card("pick", ""),
  ];
  readonly Cards_with_zero: Card[] = [
    new Card("yellow", "0"),
    new Card("red", "0"),
    new Card("green", "0"),
    new Card("blue", "0"),
  ]; // because 0 only Occurs once per color in a UNO deck
  // Who would have known ????

  deck: Array<Card>;
  Play_Stack: Array<Card>;
  constructor(deck: Array<Card>) {
    this.deck = deck;
    if (this.deck.length === 0) this.reset();

    this.Play_Stack = [];
  }

  CreateDecks(NumDecks: number) {
    for (let n = 0; n < NumDecks; n++) {
      for (let i = 0; i < this.Card_Colors.length; i++) {
        for (let j = 0; j < this.Card_numbers.length; j++) {
          this.deck.push(new Card(this.Card_Colors[i], this.Card_numbers[j]));
          this.deck.push(new Card(this.Card_Colors[i], this.Card_numbers[j]));
        }
      }
      this.deck = this.deck.concat(this.Card_Colorless_extra);
      this.deck = this.deck.concat(this.Cards_with_zero);
    }
  }

  reset(numDecks: number = 1) {
    this.deck = new Array<Card>();
    this.CreateDecks(numDecks);
    return this.deck;
  }

  Start_Game() {
    this.shuffle();
    this.Play_Stack.push(this.draw());
  }
  CheckValidMove(Given_Card: Card): boolean {
    if (
      Given_Card.color == this.Play_Stack[this.Play_Stack.length - 1].color ||
      Given_Card.number == this.Play_Stack[this.Play_Stack.length - 1].number ||
      Given_Card.color.includes("pick-")
    )
      return true;
    else return false;
  }
  draw(): Card {
    return this.deck.pop() || new Card("", "");
  }

  deal(players: number): Array<Array<Card>> {
    let player_hands: Array<Array<Card>> = new Array<Array<Card>>();
    for (let i = 0; i < players; i++) {
      let hand = this.deck.slice(-7, this.deck.length);
      player_hands.push(hand);
      this.deck.splice(-7, 7);
    }
    return player_hands;
  }
  print() {
    for (let card of this.deck) {
      console.log(`Color = ${card.color} : Number = ${card.number}`);
    }
    console.log(`deck length = ${this.deck.length}`);
  }
  shuffle() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }
  play_card(play_card: Card) {
    this.Play_Stack.push(play_card);
  }
}
class UNO_hand {
  hand: Array<Card>;
  constructor(hand: Array<Card>) {
    this.hand = hand;
  }
  draw(deck: UNO_deck): void {
    let Drawn_Card: Card = deck.draw();
    this.hand.push(Drawn_Card);
  }
  play(deck: UNO_deck, card: Card): boolean {
    if (this.hand.indexOf(card) != -1) {
      if (deck.CheckValidMove(card)) {
        let index = this.hand.findIndex(c=>
          c.color==card.color&&c.number==card.number);
          this.hand.splice(index,1)
        return true;
      }
    }
    return false;
  }
}
/*
Summary. End use Class for entire Uno Game

Properties:
deck -> uno deck contains a # of decks
player_hand -> a dictionary(Map) for a string (player_id) to Uno Hand
game_started -> boolean for keeping track of state of game
playerList -> array of players used as a queue for next player

Work Flow: 
1. Create a game with a # of decks for a game
2. use CreatePlayer for each player(players cannot be added once game starts) 
3. use GameStart to begin a game
    - shuffles hand
    - shuffles deck
4. When player plays
    - Normal card -> just play
    - Pick -> set card color to "pick-color" 
*/
class UNO_Game {
  deck: UNO_deck;
  player_hand: Map<string, UNO_hand>;
  private game_started: boolean;
  playerList: string[];

  constructor(NumberofDecks: number) {
    this.deck = new UNO_deck([]);
    this.deck.CreateDecks(NumberofDecks);
    this.player_hand = new Map<string, UNO_hand>();
    this.game_started = false;
    this.playerList = [];
  }
  getHand(player_id: string) {
    return this.player_hand.get(player_id);
  }
  CreatePlayer(id: string) {
    if (this.game_started) {
      throw Error("UNO Game Started");
    } else {
      this.player_hand.set(id, new UNO_hand([]));
      this.playerList.push(id);
    }
  }

  /* Used to shuffle the players for Queue */
  private ShufflePlayers() {
    for (let i = this.playerList.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [
        this.playerList[i],
        (this.playerList[j] = this.playerList[j]),
        this.playerList[i],
      ];
    }
  }

  GameStart() {
    this.deck.shuffle();
    let temp_hands = this.deck.deal(this.playerList.length);
    this.player_hand.forEach((value: UNO_hand, key: string, hands) => {
      let temp_hand = temp_hands.pop();
      hands.set(key, new UNO_hand(temp_hand));
      if (temp_hand.length == 1) {
        throw new Error("Not Enough Cards");
      }
    });
    this.ShufflePlayers();
    this.game_started = true;
    this.deck.Start_Game();
  }
  print() {
    console.log(`deck length = ${this.deck.deck.length}`);
    console.log(`Number of Players = ${this.playerList.length}`);
  }

  Play(player_id: string, play_card: Card = new Card('',''),draw:boolean=false) {
    if (this.player_hand[player_id]!= undefined) {
      throw Error("Player Does not Exist");
    } else if (player_id == this.playerList[this.playerList.length-1]) {
      if(draw == true){
        this.player_hand.get(player_id).draw(this.deck);
        this.playerList.unshift(this.playerList.pop()); // add to beginning
        return;
      }
      let temp_player_hand: UNO_hand = this.player_hand.get(player_id);
      if (
        this.deck.CheckValidMove(play_card) &&
        temp_player_hand.play(this.deck, play_card)
      ) {
        // Reverse player list for reverse plays
        if (play_card.number == "reverse") {
          this.playerList.reverse(); // do not pop since reverse
        } else {
          this.playerList.unshift(this.playerList.pop()); // add to beginning
        }
        // Handle plus 2 and skips

        if (["+4","+2"].includes(play_card.number)) {
          let draw_player = this.playerList.pop();
          this.player_hand.get(draw_player).draw(this.deck);
          this.player_hand.get(draw_player).draw(this.deck);
          if (play_card.number == "+4") {
            // draw
            this.player_hand.get(draw_player).draw(this.deck);
            this.player_hand.get(draw_player).draw(this.deck);
          }
          this.playerList.unshift(draw_player);
        }

        // handle pick color
        if (play_card.color.startsWith("pick-")) {
          play_card = new Card(play_card.color.replace("pick-", ""), "");
        }
        // unshift the correct playcard onto stack
        this.deck.Play_Stack.unshift(play_card);
        //set player hand after all checks
        this.player_hand.set(player_id, temp_player_hand);
      } else {
        throw Error("Invalid Card Choice");
      }
    } else {
      throw Error("Not Players Turn");
    }
  }
}

export { UNO_Game, UNO_hand, UNO_deck, Card };


/*

TO DO:

Set up options for game
OPTIONS
- [ ] Draw until player can play 
- [ ] Reshuffle deck after empty

*/