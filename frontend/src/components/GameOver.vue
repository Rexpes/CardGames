<template>
  <div class="gameboard__choosing-table" v-if="playerWin">
    Vyhrál jsi!
    <div style="display: flex; justify-content: center;">
      <div class="gameboard__button" @click="playAgain">Hrát znovu</div>
    </div>
</div>
<div class="gameboard__choosing-table" v-if="opponentWin">
    Prohrál jsi!
    <div style="display: flex; justify-content: center;">
      <div class="gameboard__button" @click="playAgain">Hrát znovu</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "GameOver",

  props: {
    playerWin: Boolean,
    opponentWin: Boolean
  },

  methods: {
    playAgain() {
      location.reload();
    }
  },

}
</script>
<style scoped lang="scss">
.gameboard__choosing-table {
    background-color: #763C2C;
    color: #ECB069;
    position: absolute;
    font-size: 30px;
    padding: 35px 20px 0px 20px;
    border-radius: 15px;
    height: 150px;
    width: 400px;
    top: 220px;
    left: -250px;
}
.gameboard__button {
    background-color: #ECB069;
    color: #763C2C;
    padding: 5px 15px 5px 15px;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
}
</style>