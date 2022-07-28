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
          <div class="gameboard__talon">
              <b style="color: white;">Odhazovací balíček</b>
          </div>
          <div class="gameboard__deck">
            <Card :is-visible="false" :card="deck.deck" />
          </div>
        </div>
        <div class="gameboard__cardRow">
          <div v-for="card in deck.playerCards" :key="card.id">
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
      deck: deck
    }
  }
}
</script>
<style scoped lang="scss">
.gameboard__cardRow {
  display: flex;
  justify-content: center;
}
</style>