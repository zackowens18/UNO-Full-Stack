

class Card{
    color: string;
    number: string;

    constructor(color:string,number:string){
        this.color = color;
        this.number = number;
    }
}
class UNO_deck{
    readonly Card_Colors:string[] = ["yellow","red","green","blue"];
    readonly Card_numbers:string[] = ["1","2","3","4","5","6","7","8","9","+2","reverse","skip"];
    readonly Card_Colorless_extra:Array<Card> = [
        new Card("pick","+4"),
        new Card("pick","+4"),
        new Card("pick","+4"),
        new Card("pick","+4"),
        new Card("pick",""),
        new Card("pick",""),
        new Card("pick",""),
        new Card("pick",""),
    ]; 
    readonly Cards_with_zero:Card[] = [
        new Card("yellow","0"),
        new Card("red","0"),
        new Card("green","0"),
        new Card("blue","0"),
    ]; // because 0 only Occurs in a UNO deck once 
    // Who would have known ????

    deck: Array<Card>;
    Play_Card:Card;
    constructor(deck:Array<Card>){
        this.deck = deck;
        if (this.deck.length === 0)
         this.reset();
        this.Play_Card = new Card("","");
    }
    reset(){
        this.deck = new Array<Card>();
        for(let i = 0; i<this.Card_Colors.length;i++){
            for(let j =0;j<this.Card_numbers.length;j++){
                this.deck.push(new Card(this.Card_Colors[i],this.Card_numbers[j]));
                this.deck.push(new Card(this.Card_Colors[i],this.Card_numbers[j]));
            }
        }
        this.deck = this.deck.concat(this.Card_Colorless_extra);
        this.deck = this.deck.concat(this.Cards_with_zero);
        return this.deck;
    }

    Start_Game(){
        this.shuffle();
        this.Play_Card = this.draw();
    }
    CheckValidMove(Given_Card:Card):boolean{
        if(Given_Card.color==this.Play_Card.number||Given_Card.number==this.Play_Card.number||Given_Card.color=="pick")
            return true;
        else
            return false; 
    }
    draw():Card {
       return this.deck.pop() || new Card("","");
    }   

    deal(players:number):Array<Array<Card>> 
    {
        let player_hands:Array<Array<Card>> = new Array<Array<Card>>();
        for(let i = 0;i<players;i++){
            let hand = this.deck.slice(Math.max(this.deck.length-7),0);
            player_hands.push(hand);
            this.deck.splice(-1,7);
        }
        return player_hands
    }
    print(){
        for(let card of this.deck){
            console.log(`Color = ${card.color} : Number = ${card.number}`)
        }
        console.log(`deck length = ${this.deck.length}`)
    }
    shuffle(){
        for(let i = this.deck.length-1;i>0;i--){
            let j = Math.floor(Math.random()*(i+1));
            [ this.deck[i], this.deck[j]= this.deck[j], this.deck[i]]
        }
    }
}
class UNO_hand{
    hand: Array<Card>
    constructor(hand:Array<Card>){
        this.hand = hand;
    }
    draw(deck:UNO_deck):void{
        let Drawn_Card:Card = deck.draw();
        this.hand.push(Drawn_Card);
    }
    play(deck:UNO_deck,card:Card):boolean{
        if(this.hand.indexOf(card)!=-1){
            if(deck.CheckValidMove(card)){
                return true;
            }
        }
        return false;
    }
    
}
export {UNO_hand,UNO_deck,Card};