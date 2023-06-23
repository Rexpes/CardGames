<template>
  <div class="content">
    <div class="content__selection-box">
      <div v-for="(pair, index) in pairs" :key="pair" @click="choosePairs(pair, index)">
        <Pair :pair="pair" :playerTurn="playerTurnToggle"/>
      </div>
    </div>
  </div>
</template>
<script>
import {Pairs} from "@/data/pairs";
import Pair from "@/components/PairComponent";

export default {
  name: "PairsView",

  components: {
    Pair
  },

  data() {
    const pairs = Pairs.generatePairs();
    if (!localStorage.getItem('pairs')) {
      localStorage.setItem('pairs', JSON.stringify(pairs));
    }

    return {
      pairs: pairs,
      chosenPairs: [],
      lastChosenPair: Number,
      playerTurnToggle: true
    }
  },

  methods: {
    choosePairs(pair, index) {
      if (index !== this.lastChosenPair && this.playerTurnToggle) {
        this.lastChosenPair = index;

        this.chosenPairs.push(pair);

        if (this.chosenPairs.length > 1) {
          this.playerTurnToggle = false;

          if (this.chosenPairs[0] === this.chosenPairs[1]) {
            // TO DO add pairs to players array
          }
        }
      } else if (this.chosenPairs.length === 0) {
        this.playerTurnToggle = true;
      } else {
        let indexOfLastChosenPair = this.chosenPairs.indexOf(pair);

        if (indexOfLastChosenPair !== -1) {
          this.chosenPairs.splice(indexOfLastChosenPair, 1);
        }
      }
    }
  }
}
</script>