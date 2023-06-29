<template>
  <div class="gameStatus">
    <div class="playerOne">
        <div :style="playerSwitch ? {'fontWeight': 'bold'} : {}">Hráč 1</div>
        Skóre: {{ this.playerOneScore }}
    </div>
    <div class="playerTwo">
        <div :style="!playerSwitch ? {'fontWeight': 'bold'} : {}">Hráč 2</div>
        Skóre: {{ this.playerTwoScore }}
    </div>
  </div>
  <div class="content">
    <div class="content__selection-box">
      <div v-for="(pair, index) in pairs" :key="index" @click="choosePairs(index)">
        <Pair :pair="pair" :playerTurn="playerTurnToggle" :foundPair="foundPair" :foundPairValue="foundPairValue" ref="visibilityValue"/>
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
      playerSwitch: true,
      foundPair: false,
      foundPairValue: -1,
      playerOneScore: 0,
      playerTwoScore: 0,
      playerFontWeight: "medium"
    }
  },

  methods: {
    choosePairs(index) {
      if (index !== this.chosenPairs[0] && this.playerTurnToggle && !this.foundPair && this.$refs.visibilityValue[index].visibleToHidden === "visible") {
        this.chosenPairs.push(index);

        if (this.chosenPairs.length > 1) {
          this.playerTurnToggle = false;

          if (this.pairs[this.chosenPairs[0]] === this.pairs[this.chosenPairs[1]]) {
            this.foundPair = true;
            this.foundPairValue = this.pairs[this.chosenPairs[0]];

            if (this.playerSwitch) {
              this.playerOneScore++;
              console.log("Player1 WON! - " + this.playerOneScore);
            } else {
              this.playerTwoScore++;
              console.log("Player2 WON! - " + this.playerTwoScore);
            }
          }
        }
      } else {
        if (index === this.chosenPairs[0] && !this.playerTurnToggle) {
          this.chosenPairs.splice(0, 1);
        } else if (index === this.chosenPairs[1] && !this.playerTurnToggle) {
          this.chosenPairs.splice(1, 1);
        }

        if (this.chosenPairs.length === 0) {
          this.playerTurnToggle = true;
          this.foundPair = false;
          this.playerSwitch = !this.playerSwitch;
        }
      }
    }
  }
}
</script>