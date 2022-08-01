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
    }
  },

  methods: {
    movePlayerCard(card, index) {
      this.deck.playedCards.push(card);
      this.deck.playerCards.splice(index, 1);
    },

    drawCard() {
      if (this.deck.deck.length > 0) {
        this.cardsInDeck = true;
        this.deck.playerCards.push(this.deck.deck[0]);
        this.deck.deck.splice(0, 1);
      } else {
        this.cardsInDeck = false;
      }
    }
  },
}
</script>
<style scoped lang="scss"></style>