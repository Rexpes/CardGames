import {CardTypes} from "@/data/CardTypes";
import {Card} from "@/interfaces/card";

export class Deck {
    public playerCards: Card[] = [];
    public opponentCards: Card[] = [];
    public deck: Card[] = [];
    public playedCards: Card[] = [];

    private static alreadyGenerated: Map<string, Card>;
    private static cardRowValues = [14, 13, 12, 11, 10, 9, 8, 7];
    private static cardColumnTypes = [CardTypes.HEARTS, CardTypes.BELLS, CardTypes.LEAVES, CardTypes.ACORNS];
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
            const x = Math.floor(Math.random() * 8) * this.cardWidth;
            const y = Math.floor(Math.random() * 4) * this.cardHeight;
            const card: Card = {
                x: x,
                y: y,
                cardType: this.cardColumnTypes[y],
                value: this.cardRowValues[x],
            };

            if (!Deck.alreadyGenerated.has(JSON.stringify(card))) {
                newCards.add(card);
                Deck.alreadyGenerated.set(JSON.stringify(card), card);
            }
        }
        return newCards;
    }

}