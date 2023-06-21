<template>
  <div class="gameBoard__cardBox">
    <div class="card-edge">
      <div :class="[isVisible ? 'visiblecard' : 'invisiblecard']" :style="pairImage"/>
    </div>
  </div>
</template>
<script>

export default {
  name: "PairComponent",

  props: {
    isVisible: Boolean,
    pair: Number
  },

  computed: {
    pairImage() {
      return {
        '--pairUrl': `url(${require('../assets/images/pairs/' + this.pair + '.png')})`
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
    margin-top: 5px;
    margin-bottom: 5px;

    .card-edge {
      background-color: white;
      padding: 8px;
      margin-right: 5px;
      margin-left: 5px;
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