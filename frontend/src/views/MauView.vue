<template>
  <div class="content">
    <div class="content__selection-box">
      <div class="gameboard">
        <div class="gameboard__cardRow">
          <div v-for="card in cards.opponentCards" :key="card.id">
            <Card :is-visible="false" :card="card" />
          </div>
        </div>
        <div class="gameboard__cardRow">
          <div class="gameboard__typeSymbol" :style="symbolPosition" v-if="typeSymbol"></div>
          <div class="gameboard__talon" id="talon">
            <div v-for="card in cards.playedCards" :key="card.id">
              <Card style="position: absolute;" :is-visible="true" :card="card" />
            </div>
          </div>
          <div class="gameboard__deck" @click="drawCard">
            <Card :is-visible="false" :card="cards.deck" />
          </div>
        </div>
        <div class="gameboard__cardRow">
          <div v-for="(card, index) in cards.playerCards" :key="index" @click="movePlayerCard(card, index)">
            <Card :is-visible="true" :card="card" />
          </div>
        </div>
      </div>
      <div class="gameboard__choosing-table" v-if="queen">
        Na co měníš?
        <div class="gameboard__types">
          <div class="gameboard__type" style="background-position: 0 0;" @click="changeType(0)"></div>
          <div class="gameboard__type" style="background-position: 80px 0;" @click="changeType(1)"></div>
          <div class="gameboard__type" style="background-position: 160px 0;" @click="changeType(2)"></div>
          <div class="gameboard__type" style="background-position: 240px 0;" @click="changeType(3)"></div>
        </div>
      </div>
      <div class="gameboard__choosing-table" v-if="ace">
        Stojíš?
        <div style="display: flex; justify-content: center;">
          <div class="gameboard__ace-button" @click="aceToggle">Ano</div>
        </div>
      </div>
      <div class="gameboard__choosing-table" style="line-height: 150px;" v-if="seven">
        Bereš nebo hrej sedmičku!
      </div>
      <div class="gameboard__win-lose" v-if="gameState.playerWin">
        Vyhrál jsi!
      </div>
      <div class="gameboard__win-lose" v-if="gameState.opponentWin">
        Prohrál jsi!
      </div>
    </div>
  </div>
</template>
<script>
import {Deck} from "@/data/deck";
import Card from "@/components/CardComponent";

export default {
  name: "MauView",

  components: {
    Card,
  },

  data() {
    const deck = Deck.generateDeck(32);
    if (!localStorage.getItem('deck')) {
      localStorage.setItem('deck', JSON.stringify(deck));
    }

    return {
      cards: deck,
      queen: false,
      ace: false,
      seven: false,
      typeSymbol: false,
      sevenNumberOfCards: 0,
      symbolPos: 0,
      gameState: {
        playerTurn: true,
        playerWin: false,
        opponentWin: false
      }
    }
  },

  methods: {
    movePlayerCard(card, index) {
      if (!this.gameState.playerTurn) return;

      let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length - 1];

      if (this.seven === true && card.value === 7) {
        this.cards.playedCards.push(card);
        this.cards.playerCards.splice(index, 1);
        this.sevenNumberOfCards += 2;
        this.seven = false;
        this.sevenDraw();
      } else if (this.ace === true && card.value === 14) {
        this.cards.playedCards.push(card);
        this.cards.playerCards.splice(index, 1);
        this.ace = false;
        this.playerWinCheck();
        if (!this.gameState.playerWin) {
          this.opponentAceCheck();
        }
      } else if ((lastPlayedCard.value === card.value || lastPlayedCard.cardType === card.cardType || card.value === 12) && this.ace === false && this.seven === false) {
        this.cards.playedCards.push(card);
        this.cards.playerCards.splice(index, 1);

        this.typeSymbol = false;

        if (card.value === 7) {
          this.sevenNumberOfCards += 2;
          this.sevenDraw();
        } else if(card.value === 12) {
          this.queen = true;
          this.gameState.playerTurn = false;
        } else if (card.value === 13 && card.cardType === 2) {
          for (let i = 0; i < 3; i++) {
            this.takeCardFromDeck(this.cards.opponentCards);
          }
        } else if(card.value === 14) {
          this.playerWinCheck();
          if (!this.gameState.playerWin) {
            this.opponentAceCheck();
          }
        } else {
          this.gameState.playerTurn = false;
          this.moveOpponentCard();
        }
      }
    },

    moveOpponentCard() {
      if (this.gameState.playerTurn) {
        return;
      }

      this.playerWinCheck();

      let i = 0;
      while (i < this.cards.opponentCards.length) {
        let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length-1];
        if (this.cards.opponentCards[i].value === lastPlayedCard.value || this.cards.opponentCards[i].cardType === lastPlayedCard.cardType || this.cards.opponentCards[i].value === 12) {
          this.cards.playedCards.push(this.cards.opponentCards[i]);

          this.typeSymbol = false;

          if (this.cards.opponentCards[i].value === 7) {
            this.sevenNumberOfCards += 2;
            this.seven = true;
          } else if (this.cards.opponentCards[i].value === 12) {
            if (this.cards.opponentCards.length === 1) {
              this.opponentChangeType(this.cards.opponentCards[0].cardType);
            } else if (i === 0){
              this.opponentChangeType(this.cards.opponentCards[1].cardType);
            } else {
              this.opponentChangeType(this.cards.opponentCards[0].cardType);
            }
          } else if (this.cards.opponentCards[i].value === 13 && this.cards.opponentCards[i].cardType === 2) {
            for (let i = 0; i < 3; i++) {
              this.takeCardFromDeck(this.cards.playerCards);
            }
          } else if (this.cards.opponentCards[i].value === 14) {
            this.ace = true;
            this.gameState.playerTurn = false;
          }

          this.cards.opponentCards.splice(i, 1);

          this.gameState.playerTurn = true;
          this.opponentWinCheck();
          break;
        }
        i++;
      }

      if (!this.gameState.playerTurn && !this.gameState.opponentWin) {
        this.takeCardFromDeck(this.cards.opponentCards)

        this.gameState.playerTurn = true;
      }
    },

    drawCard() {
      if (this.gameState.playerTurn && !this.gameState.playerWin && this.ace === false && this.seven === false) {
        this.takeCardFromDeck(this.cards.playerCards);

        this.gameState.playerTurn = false;
        this.moveOpponentCard();
      } else if (this.gameState.playerTurn && !this.gameState.playerWin && this.ace === false) {
        for (let i = 0; i < this.sevenNumberOfCards; i++) {
          this.takeCardFromDeck(this.cards.playerCards);
        }
        this.sevenNumberOfCards = 0;
        this.seven = false;
        this.gameState.playerTurn = false;
        this.moveOpponentCard();
      }
    },

    takeCardFromDeck(pushTo) {
      if (this.cards.deck.length === 0) {
        this.shuffleNewDeck(this.cards.playedCards);
      }
      pushTo.push(this.cards.deck[0]);
      this.cards.deck.splice(this.cards.deck[0], 1);
    },

    changeType(type) {
      this.queen = false;
      this.cards.playedCards[this.cards.playedCards.length-1].cardType = type;
      this.symbolPos = type*80;
      this.typeSymbol = true;
      this.moveOpponentCard();
    },

    opponentChangeType(type) {
      this.cards.playedCards[this.cards.playedCards.length-1].cardType = type;
      this.symbolPos = type*80;
      this.typeSymbol = true;
    },

    shuffleNewDeck(cardsToShuffle) {
      cardsToShuffle.sort(() => Math.random() - 0.5);
      for (let i = 0; i < cardsToShuffle.length-2; i++) {
        this.cards.deck.push(cardsToShuffle[i]);
      }
      this.cards.playedCards.splice(0, this.cards.playedCards.length-1);
    },

    aceToggle() {
      this.gameState.playerTurn = false;
      this.ace = false;
      this.moveOpponentCard();
    },

    opponentAceCheck() {
      for (let i = 0; i < this.cards.opponentCards.length; i++) {
        if(this.cards.opponentCards[i].value === 14) {
          this.cards.playedCards.push(this.cards.opponentCards[i]);
          this.cards.opponentCards.splice(i, 1);
          this.ace = true;
          this.opponentWinCheck();
          break;
        }
      }
    },

    sevenDraw() {
      let counterSeven = false;

      for (let i = 0; i < this.cards.opponentCards.length; i++) {
        if (this.cards.opponentCards[i].value === 7) {
          this.cards.playedCards.push(this.cards.opponentCards[i]);
          this.cards.opponentCards.splice(i, 1);
          this.sevenNumberOfCards += 2;
          this.seven = true;
          this.gameState.playerTurn = true;
          counterSeven = true;
          break;
        }
      }

      if (!counterSeven) {
        for (let i = 0; i < this.sevenNumberOfCards; i++) {
          this.takeCardFromDeck(this.cards.opponentCards);
        }
        this.sevenNumberOfCards = 0;
      }
    },

    opponentWinCheck() {
      if (this.cards.opponentCards.length === 0) {
        this.gameState.opponentWin = true;
        this.gameState.playerTurn = false;
        this.ace = false;
      }
    },

    playerWinCheck() {
      if (this.cards.playerCards.length === 0) {
        this.gameState.playerWin = true;
        this.gameState.playerTurn = false;
      }
    }
  },

  computed: {
    symbolPosition() {
        return 'background-position: ' + this.symbolPos + 'px 0;';
    }
  }
}
</script>
<style scoped lang="scss">
    .gameboard__typeSymbol {
        position: absolute;
        left: 250px;
        margin-top: 55px;
        width: 80px;
        height: 80px;
        border-radius: 5px;
        background-image: url('../assets/images/CardTypes.png');
    }
    .gameboard__types {
        display: flex;
        justify-content: center;
        margin-top: 15px;
    }
    .gameboard__type {
        width: 80px;
        height: 80px;
        margin: 0 10px 0 10px;
        border-radius: 5px;
        background-image: url('../assets/images/CardTypes.png');
        cursor: pointer;
    }
    .gameboard__choosing-table {
        background-color: #245501;
        color: #AAD576;
        position: absolute;
        font-size: 30px;
        padding: 20px;
        border-radius: 15px;
        height: 150px;
        width: 400px;
        top: 220px;
        left: -250px;
    }
    .gameboard__win-lose {
        background-color: #245501;
        color: #AAD576;
        position: absolute;
        font-size: 30px;
        padding: 20px;
        border-radius: 15px;
        height: 150px;
        width: 400px;
        top: 220px;
        line-height: 150px;
    }
    .gameboard__ace-button {
        background-color: #AAD576;
        color: #143601;
        width: 80px;
        border-radius: 5px;
        margin-top: 40px;
        cursor: pointer;
    }
</style>