import { Cookies } from "typescript-cookie";

let deckCookieString = Cookies.get("deck")
if (typeof deckCookieString === "string") {
    deckCookieString = deckCookieString.split("\\054 ").join(',');
    deckCookieString = deckCookieString.split("\\").join('');
    console.log(deckCookieString)
    console.log(JSON.parse(deckCookieString));

    // TODO create class to parse the json to
}