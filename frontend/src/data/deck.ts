import {CardTypes} from "@/data/CardTypes";
import {Card} from "@/interfaces/card";

export class Deck {
    public playerCards: Card[] = [];
    public opponentCards: Card[] = [];
    public deck: Card[] = [];
    public playedCards: Card[] = [];

    private static alreadyGenerated: Map<string, Card>;
    private static cardRowValues = [7, 8, 9, 10, 11, 12, 13, 14];
    private static cardColumnTypes = [CardTypes.ACORNS, CardTypes.LEAVES, CardTypes.BELLS, CardTypes.HEARTS];
    private static cardWidth = 112;
    private static cardHeight = 187;

    static generateDeck(): Deck {
        this.alreadyGenerated = new Map();
        const deck = new Deck();

        deck.playerCards = Array.from(this.generateCards(4));
        deck.opponentCards = Array.from(this.generateCards(4));
        deck.deck = Array.from(this.generateCards(23));
        deck.playedCards = Array.from(this.generateCards(1));

        return deck;
    }

    private static generateCards(numberOfCards: number): Set<Card> {
        const newCards: Set<Card> = new Set();
        while (newCards.size < numberOfCards && this.alreadyGenerated.size < 32) {
            let xValue = Math.floor(Math.random() * 8);
            let yType = Math.floor(Math.random() * 4);
            const x = xValue * this.cardWidth;
            const y = yType * this.cardHeight;
            if(xValue == 0) {
                xValue = 8;
            }
            if(yType == 0) {
                yType = 4;
            }
            const card: Card = {
                x: x,
                y: y,
                cardType: this.cardColumnTypes[yType-1],
                value: this.cardRowValues[xValue-1],
            };

            if (!Deck.alreadyGenerated.has(JSON.stringify(card))) {
                newCards.add(card);
                Deck.alreadyGenerated.set(JSON.stringify(card), card);
            }
        }
        return newCards;
    }

}