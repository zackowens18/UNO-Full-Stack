"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.UNO_deck = exports.UNO_hand = void 0;
var Card = /** @class */ (function () {
    function Card(color, number) {
        this.color = color;
        this.number = number;
    }
    return Card;
}());
exports.Card = Card;
var UNO_deck = /** @class */ (function () {
    function UNO_deck(deck) {
        this.Card_Colors = ["yellow", "red", "green", "blue"];
        this.Card_numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "+2", "reverse", "skip"];
        this.Card_Colorless_extra = [
            new Card("pick", "+4"),
            new Card("pick", "+4"),
            new Card("pick", "+4"),
            new Card("pick", "+4"),
            new Card("pick", ""),
            new Card("pick", ""),
            new Card("pick", ""),
            new Card("pick", ""),
        ];
        this.Cards_with_zero = [
            new Card("yellow", "0"),
            new Card("red", "0"),
            new Card("green", "0"),
            new Card("blue", "0"),
        ]; // because 0 only Occurs in a UNO deck once 
        this.deck = deck;
        if (this.deck.length === 0)
            this.reset();
        this.Play_Card = new Card("", "");
    }
    UNO_deck.prototype.reset = function () {
        this.deck = new Array();
        for (var i = 0; i < this.Card_Colors.length; i++) {
            for (var j = 0; j < this.Card_numbers.length; j++) {
                this.deck.push(new Card(this.Card_Colors[i], this.Card_numbers[j]));
                this.deck.push(new Card(this.Card_Colors[i], this.Card_numbers[j]));
            }
        }
        this.deck = this.deck.concat(this.Card_Colorless_extra);
        this.deck = this.deck.concat(this.Cards_with_zero);
        return this.deck;
    };
    UNO_deck.prototype.Start_Game = function () {
        this.shuffle();
        this.Play_Card = this.draw();
    };
    UNO_deck.prototype.CheckValidMove = function (Given_Card) {
        if (Given_Card.color == this.Play_Card.number || Given_Card.number == this.Play_Card.number || Given_Card.color == "pick")
            return true;
        else
            return false;
    };
    UNO_deck.prototype.draw = function () {
        return this.deck.pop() || new Card("", "");
    };
    UNO_deck.prototype.deal = function (players) {
        var player_hands = new Array();
        for (var i = 0; i < players; i++) {
            var hand = this.deck.slice(Math.max(this.deck.length - 7), 0);
            player_hands.push(hand);
            this.deck.splice(-1, 7);
        }
        return player_hands;
    };
    UNO_deck.prototype.print = function () {
        for (var _i = 0, _a = this.deck; _i < _a.length; _i++) {
            var card = _a[_i];
            console.log("Color = " + card.color + " : Number = " + card.number);
        }
        console.log("deck length = " + this.deck.length);
    };
    UNO_deck.prototype.shuffle = function () {
        for (var i = this.deck.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j] = this.deck[j], this.deck[i]];
        }
    };
    return UNO_deck;
}());
exports.UNO_deck = UNO_deck;
var UNO_hand = /** @class */ (function () {
    function UNO_hand(hand) {
        this.hand = hand;
    }
    UNO_hand.prototype.draw = function (deck) {
        var Drawn_Card = deck.draw();
        this.hand.push(Drawn_Card);
    };
    return UNO_hand;
}());
exports.UNO_hand = UNO_hand;
