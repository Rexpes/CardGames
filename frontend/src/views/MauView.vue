<template>
  <div class="content">
    <div class="content__selection-box">
      <div class="gameboard">
        <div class="gameboard__cardRow">
          <div v-for="card in deck.opponentCards" :key="card.id">
            <Card :is-visible="false" :card="card" />
          </div>
        </div>
        <div class="gameboard__cardRow">
          <div class="gameboard__typeSymbol" :style="symbolPosition" v-if="typeSymbol"></div>
          <div class="gameboard__talon" id="talon">
            <div v-for="card in deck.playedCards" :key="card.id">
              <Card style="position: absolute;" :is-visible="true" :card="card" />
            </div>
          </div>
          <div class="gameboard__deck" @click="drawCard">
            <Card v-if="cardsInDeck" :is-visible="false" :card="deck.deck" />
          </div>
        </div>
        <div class="gameboard__cardRow">
          <div v-for="(card, index) in deck.playerCards" :key="index" @click="movePlayerCard(card, index)">
            <Card :is-visible="true" :card="card" />
          </div>
        </div>
      </div>
      <div class="gameboard__changing-type" v-if="dama">
        Na co měníš?
        <div class="gameboard__types">
          <div class="gameboard__type" style="background-position: 0px 0px;" @click="changeType(0)"></div>
          <div class="gameboard__type" style="background-position: 80px 0px;" @click="changeType(1)"></div>
          <div class="gameboard__type" style="background-position: 160px 0px;" @click="changeType(2)"></div>
          <div class="gameboard__type" style="background-position: 240px 0px;" @click="changeType(3)"></div>
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
      deck: deck,
      cardsInDeck: true,
      dama: false,
      typeSymbol: false,
      symbolPos: 0,
    }
  },

  methods: {
    movePlayerCard(card, index) {
      if(this.deck.playedCards[this.deck.playedCards.length-1].value == card.value || this.deck.playedCards[this.deck.playedCards.length-1].cardType == card.cardType || card.value == 12) {
        this.deck.playedCards.push(card);
        this.deck.playerCards.splice(index, 1);
        this.typeSymbol = false;
      }
      if(card.value == 12) {
        this.dama = true;
      }
    },

    drawCard() {
      if (this.deck.deck.length > 0) {
        this.cardsInDeck = true;
        this.deck.playerCards.push(this.deck.deck[0]);
        this.deck.deck.splice(0, 1);
      } else {
        this.cardsInDeck = false;
      }
    },

    changeType(type) {
        this.dama = false;
        this.deck.playedCards[this.deck.playedCards.length-1].cardType = type;
        this.symbolPos = type*80;
        this.typeSymbol = true;
    }
  },

  computed: {
    symbolPosition() {
        return 'background-position: ' + this.symbolPos + 'px 0px;';
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
        margin: 0px 10px 0px 10px;
        border-radius: 5px;
        background-image: url('../assets/images/CardTypes.png');
    }
</style>