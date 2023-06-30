<template>
  <div class="gameStatus">
    <div class="gameStatus__playerOne">
        <div :style="playerSwitch ? {'fontWeight': 'bold'} : {}">Hráč 1</div>
        Skóre: {{ this.playerOneScore }}
    </div>
    <div class="gameStatus__playerTwo">
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
  <div class="gameboard__choosing-table" v-if="gameEnd">
    {{ this.winner }}
    <div class="gameboard__button" @click="playAgain">Hrát znovu?</div>
  </div>
</template>
<script>
import {Pairs} from "@/data/pairs";
import Pair from "@/components/PairComponent";

export default {
  name: "PairsView",

  components: {
    Pair,
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
      gameEnd: false,
      foundPairValue: -1,
      playerOneScore: 0,
      playerTwoScore: 0,
      winner: String
    }
  },

  methods: {
    choosePairs(index) {
      if (index !== this.chosenPairs[0] && this.playerTurnToggle && this.$refs.visibilityValue[index].visibleToHidden === "visible") {
        this.chosenPairs.push(index);

        if (this.chosenPairs.length > 1) {
          this.playerTurnToggle = false;

          if (this.pairs[this.chosenPairs[0]] === this.pairs[this.chosenPairs[1]]) {
            this.foundPair = true;
            this.foundPairValue = this.pairs[this.chosenPairs[0]];

            if (this.playerSwitch) {
              this.playerOneScore++;
            } else {
              this.playerTwoScore++;
            }
          } else {
            this.foundPair = false;
          }
        }
      } else {
        if (index === this.chosenPairs[0] && !this.playerTurnToggle) {
          this.chosenPairs.splice(0, 1);
        } else if (index === this.chosenPairs[1] && !this.playerTurnToggle) {
          this.chosenPairs.splice(1, 1);
        }

        if (this.chosenPairs.length === 0) {
          if (this.playerOneScore + this.playerTwoScore === 12) {
            this.gameEnd = true;
            if (this.playerOneScore > this.playerTwoScore) {
                this.winner = "Vyhrál hráč 1!";
            } else if(this.playerOneScore < this.playerTwoScore) {
                this.winner = "Vyhrál hráč 2!";
            } else {
                this.winner = "Remíza!";
            }
          }

          if (this.foundPair && this.chosenPairs.length === 0) {
            this.playerTurnToggle = true;
          } else if (this.$refs.visibilityValue[index].visibleToHidden === "visible") {
            this.playerTurnToggle = true;
            this.playerSwitch = !this.playerSwitch;
          }
        }
      }
    },

    playAgain() {
      this.pairs.splice(0, this.pairs.length);
      this.pairs = Pairs.generatePairs();
      for (let i = 0; i < this.pairs.length; i++) {
        this.$refs.visibilityValue[i].visibility = false;
        this.$refs.visibilityValue[i].visibleToHidden = "visible";
      }
      this.playerTurnToggle = true;
      this.playerSwitch = true;
      this.playerOneScore = 0;
      this.playerTwoScore = 0;
      this.gameEnd = false;
    }
  }
}
</script>
<style scoped lang="scss">
.gameboard__choosing-table {
    background-color: #763C2C;
    color: #ECB069;
    position: absolute;
    text-align: center;
    font-size: 30px;
    padding: 20px;
    border-radius: 15px;
    height: 150px;
    width: 400px;
    top: 220px;
    left: 35.5%;
}
.gameboard__button {
    background-color: #ECB069;
    color: #763C2C;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
    margin-top: 30px;
    cursor: pointer;
}
</style>