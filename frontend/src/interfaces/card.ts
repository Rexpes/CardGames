import {CardTypes} from "@/data/CardTypes";

export interface Card {
    x: number,
    y: number,
    cardType: CardTypes,
    value: number
}