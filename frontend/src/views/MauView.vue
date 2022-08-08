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
      <div class="gameboard__changing-type" v-if="queen">
        Na co měníš?
        <div class="gameboard__types">
          <div class="gameboard__type" style="background-position: 0 0;" @click="changeType(0)"></div>
          <div class="gameboard__type" style="background-position: 80px 0;" @click="changeType(1)"></div>
          <div class="gameboard__type" style="background-position: 160px 0;" @click="changeType(2)"></div>
          <div class="gameboard__type" style="background-position: 240px 0;" @click="changeType(3)"></div>
        </div>
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
      typeSymbol: false,
      symbolPos: 0,
      gameState: {
        playerTurn: true
      }
    }
  },

  methods: {
    movePlayerCard(card, index) {
      if (!this.gameState.playerTurn) return;

      let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length - 1];
      if (lastPlayedCard.value === card.value || lastPlayedCard.cardType === card.cardType || card.value === 12) {
        this.cards.playedCards.push(card);
        this.cards.playerCards.splice(index, 1);

        this.typeSymbol = false;

        if (card.value === 7) {
          for (let i = 0; i < 2; i++) {
            this.takeCardFromDeck(this.cards.opponentCards);
          }
        } else if(card.value === 12) {
          this.queen = true;
        } else if (card.value === 13 && card.cardType === 2) {
          for (let i = 0; i < 3; i++) {
            this.takeCardFromDeck(this.cards.opponentCards);
          }
        } else {
          this.gameState.playerTurn = false;
          this.moveOpponentCard();
        }
      }
    },

    moveOpponentCard() {
      if (this.gameState.playerTurn) return;

      let i = 0;
      while (i < this.cards.opponentCards.length) {
        let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length-1];
        if (this.cards.opponentCards[i].value === lastPlayedCard.value || this.cards.opponentCards[i].cardType === lastPlayedCard.cardType || this.cards.opponentCards[i].value === 12) {
          this.cards.playedCards.push(this.cards.opponentCards[i]);

          if(this.cards.opponentCards[i].value === 7) {
            for(let i = 0; i < 2; i++) {
              this.takeCardFromDeck(this.cards.playerCards);
            }
          } else if (this.cards.opponentCards[i].value === 12 && this.cards.opponentCards.length > 1) {
            if (i === 0){
              this.opponentChangeType(this.cards.opponentCards[1].cardType);
            } else {
              this.opponentChangeType(this.cards.opponentCards[0].cardType);
            }
          } else if (this.cards.opponentCards[i].value === 13 && this.cards.opponentCards[i].cardType === 2) {
            for (let i = 0; i < 3; i++) {
              this.takeCardFromDeck(this.cards.playerCards);
            }
          }

          this.cards.opponentCards.splice(i, 1);

          this.gameState.playerTurn = true;
          break;
        }
        i++;
      }

      if (!this.gameState.playerTurn) {
        this.takeCardFromDeck(this.cards.opponentCards)

        this.gameState.playerTurn = true;
      }
    },

    drawCard() {
      if (this.cards.deck.length > 0 && this.gameState.playerTurn) {
        this.takeCardFromDeck(this.cards.playerCards);

        this.gameState.playerTurn = false;
        this.moveOpponentCard();
      }
    },

    takeCardFromDeck(pushTo) {
      pushTo.push(this.cards.deck[0]);
      this.cards.deck.splice(this.cards.deck[0], 1);
    },

    changeType(type) {
      this.queen = false;
      this.cards.playedCards[this.cards.playedCards.length-1].cardType = type;
      this.symbolPos = type*80;
      this.typeSymbol = true;
      this.gameState.playerTurn = false;
      this.moveOpponentCard();
    },

    opponentChangeType(type) {
      this.cards.playedCards[this.cards.playedCards.length-1].cardType = type;
      this.symbolPos = type*80;
      this.typeSymbol = true;
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
    }
</style>