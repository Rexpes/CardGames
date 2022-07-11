import { Cookies } from "typescript-cookie";
import { Deck } from "./deck";

let deckCookieString = Cookies.get("deck");

if (typeof deckCookieString === "string") {
    deckCookieString = deckCookieString.split("\\054 ").join(',');
    deckCookieString = deckCookieString.split("\\").join('');
}

let deckObject = JSON.parse(deckCookieString);

let deck = Object.assign(new Deck(), deckObject);

console.log(deck.getDeckArray());
console.log(deck.getPlayerCardsArray());
console.log(deck.getOpponentCardsArray());
