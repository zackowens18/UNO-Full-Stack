import 'mocha';
import {UNO_Game, UNO_hand, Card} from '../Uno';
var assert = require('assert');
describe('UNO_GAME Test',
    function(){
        it('Creates correct number of Cards for each player',function (){
            let players = ['P1','P2','P3'];
            let game = new UNO_Game(1);
            for(let player_id in players){
                game.CreatePlayer(player_id)
            }
            game.GameStart();
            
            let hand_cards = 0;
            for(let player_id in players){
                hand_cards += game.getHand(player_id).hand.length;
            }

            assert.equal(hand_cards,21);
        });

        it('Checks to see if players are shuffled',function(){
            let game = new UNO_Game(1);
            // create 50 players
            let players:string[] = []; 
            for(let i = 1; i<51;i++){
                players.push(`P${i}`);
            }
            for(let i = 0; i<players.length;i++){ 
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            let playersAreThere = true
            for(let i = 0;i<players.length;i++){
                if(!game.playerList.includes(players[i]))
                playersAreThere = false;
            }
            
            assert(playersAreThere,true);
        });
        
        it('Checks if players can play correct color cards', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.deck.Play_Stack = [new Card('red','')];
            for(let i = 0;i<players.length;i++){
                game.player_hand.set(players[i], new UNO_hand([
                    new Card('red',''),
                    new Card('red',''),
                    new Card('red',''),
                    new Card('red',''),
                    new Card('red',''),
                    new Card('red',''),
                    new Card('red',''),
                ]));
            }
            // plays one card from each hand
            for(let i = 0;i<game.playerList.length;i++){
                let player_id = game.playerList[game.playerList.length-1];
                let player_hand = game.getHand(player_id)
                game.Play(player_id,player_hand.hand[0]);
            }

            let isCardGone = true
            for(let i = 0;i<game.playerList.length;i++){
                if(game.getHand(players[i]).hand.length != 6){
                    isCardGone = false;
                }
            }

            assert(isCardGone, true);
        });

        it('Checks if Reverse reverses player order', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.playerList = ['A','B','C'];
            game.deck.Play_Stack = [new Card('blue','3')];
            game.player_hand.set('C',new UNO_hand([
                new Card('blue','reverse')
            ]));
            game.Play('C',game.player_hand.get('C').hand[0]);

            assert(game.playerList, ['C','B','A']);
        });

        it('Checks if draw 2 adds 2 cards', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.playerList = ['A','B','C'];
            game.deck.Play_Stack[0] = new Card('blue','3');
            game.player_hand.set('C',new UNO_hand([
                new Card('blue','+2')
            ]));
            game.Play('C',game.player_hand.get('C').hand[0]);
            
            assert(game.player_hand.get('B').hand.length, 9);
        });

        it('Checks if draw 4 adds 4 cards', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.playerList = ['A','B','C'];
            game.deck.Play_Stack[0] = new Card('blue','3');
            game.player_hand.set('C',new UNO_hand([
                new Card('pick-green','+4')
            ]));
            game.Play('C',game.player_hand.get('C').hand[0]);

            assert(game.player_hand.get('B').hand.length,11 );
        });
        
        it('Checks draw actually draws ', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.playerList = ['A','B','C'];
            game.Play('C',undefined ,true)
            assert(game.player_hand.get('C').hand.length, 8);
        });  
        
        it('Checks draw passes player', function(){
            let players = ['A','B','C'];
            let game = new UNO_Game(1);
            for(let i = 0; i<players.length;i++){
                game.CreatePlayer(players[i]);
            }
            game.GameStart();
            game.playerList = ['A','B','C'];
            game.Play('C',undefined ,true)
            assert(game.playerList, ['C','A','B']);
        });
    


        // TEMPLATE
        // it('Checks STUFF ', function(){

        //     assert(VALUE, VALUE);
        // });
    });

/*
Functionality to test
[x] Reverse
[x] Draw 2
[x] Draw 4
[x] Regular Draw
[ ] play with same color
[ ] play with same number 
[ ] wildcard/draw 
*/