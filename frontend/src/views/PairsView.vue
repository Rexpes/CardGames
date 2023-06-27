<template>
  <div class="content">
    <div class="content__selection-box">
      <div v-for="(pair, index) in pairs" :key="index" @click="choosePairs(index)">
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
      playerTurnToggle: true,
      playerSwitch: true
    }
  },

  methods: {
    choosePairs(index) {
      if (index !== this.chosenPairs[0] && this.playerTurnToggle) {
        this.chosenPairs.push(index);

        if (this.chosenPairs.length > 1) {
          this.playerTurnToggle = false;

          if (this.pairs[this.chosenPairs[0]] === this.pairs[this.chosenPairs[1]]) {
            if (this.playerSwitch) {
              console.log("Player1 WON!");
            } else {
              console.log("Player2 WON!");
            }
          }
        }
      } else {
        if (index === this.chosenPairs[0]) {
          this.chosenPairs.splice(0, 1);
        } else if (index === this.chosenPairs[1]) {
          this.chosenPairs.splice(1, 1);
        }

        if (this.chosenPairs.length === 0) {
          this.playerTurnToggle = true;
          this.playerSwitch = !this.playerSwitch;
        }

        console.log(this.playerSwitch);
      }
    }
  }
}
</script>