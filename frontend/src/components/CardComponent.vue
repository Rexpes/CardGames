<template>
  <div class="gameBoard__cardBox">
    <div class="card-edge">
      <div :class="[isVisible ? 'visiblecard' : 'invisiblecard']" :style="cardPosition"/>
    </div>
  </div>
</template>
<script>

export default {
  name: "CardComponent",

  props: {
    isVisible: Boolean,
    card: {
      type: [Object, Array],
      required: true
    }
  },

  computed: {
    cardPosition() {
      return 'background-position: ' + this.card.x + "px" + " " + this.card.y + "px";
    }
  }
}
</script>
<style lang="scss" scoped>
  .gameBoard__cardBox {
    justify-content: center;
    display: flex;
    flex: 1;
    margin-bottom: 10px;

    .card-edge {
      background-color: white;
      padding: 8px;
      margin-right: 10px;
      border-radius: 10px;

      .invisiblecard, .visiblecard {
        width: 112px;
        height: 187px;
        overflow: hidden;
      }

      .visiblecard {
        background-image: url('../assets/images/Maumaucards.png');
      }

      .invisiblecard {
        background-image: url('../assets/images/card_rub.jpg');
      }
    }
  }
</style>