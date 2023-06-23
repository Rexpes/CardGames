<template>
  <div class="gameBoard__cardBox" @click="changeVisibility">
    <div class="card-edge">
      <div :class="[visibility ? 'visiblecard' : 'invisiblecard']" :style="pairImage"/>
    </div>
  </div>
</template>
<script>

export default {
  name: "PairComponent",

  props: {
    pair: Number,
    playerTurn: Boolean,
  },

  data() {
    return {
        visibility: false
    }
  },

  computed: {
    pairImage() {
      return {
        '--pairUrl': `url(${require('../assets/images/pairs/' + this.pair + '.png')})`
      }
    }
  },

  methods: {
    changeVisibility() {
      if (this.playerTurn === true) {
        this.visibility = true;
      } else {
        this.visibility = false;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .gameBoard__cardBox {
    justify-content: center;
    display: flex;
    flex: 1;

    .card-edge {
      background-color: white;
      padding: 8px;
      margin: 5px;
      border-radius: 10px;

      .invisiblecard, .visiblecard {
        width: 120px;
        height: 120px;
        overflow: hidden;
      }

      .visiblecard {
        background-image: var(--pairUrl);
        background-size: 120px;
      }

      .invisiblecard {
        background-image: url('../assets/images/pair_rub.png');
        background-size: 120px;
      }
    }
  }
</style>