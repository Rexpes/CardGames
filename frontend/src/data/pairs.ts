export class Pairs {
    public static numberOfPairs = 12;

    static generatePairs(): Pairs {
        let pairs: number[] = [];

        pairs = Array.from(this.generateIndividualPairs());
        pairs = this.shufflePairs(pairs);

        return pairs;
    }

    private static generateIndividualPairs(): Array<number> {
        const newPairs: Array<number> = new Array(this.numberOfPairs*2);

        for (let i = 0; i < this.numberOfPairs; i++) {
            const value = i + 1;

            newPairs[i] = value;
            newPairs[i+this.numberOfPairs] = value;
        }

        return newPairs;
    }

    private static shufflePairs(pairsArray: number[]): Array<number> {
        const shuffledPairsArray: Array<number> = new Array(this.numberOfPairs*2);

        for (let i = 0; i < this.numberOfPairs*2; i++) {
            const indexOfPair = Math.floor(Math.random() * pairsArray.length);

            shuffledPairsArray[i] = pairsArray[indexOfPair];
            pairsArray.splice(indexOfPair, 1);
        }

        return shuffledPairsArray;
    }
}