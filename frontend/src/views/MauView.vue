<template>
  <div class="content">
    <div class="content__selection-box">
      <div class="gameboard">
        <div class="gameboard__cardRowOpponentCards">
          <div v-for="(card, index) in cards.opponentCards" :key="card" :id="index + 100" :style="{ 'z-index': index }">
            <Card :is-visible="false" :card="card" />
          </div>
        </div>
        <div class="gameboard__cardRowPlayground">
          <div class="gameboard__typeSymbol" :style="symbolPosition" v-if="typeSymbol"></div>
          <div class="gameboard__playground" id="playground" style="z-index: -1;">
            <div v-for="card in cards.playedCards" :key="card">
              <Card style="position: absolute;" :is-visible="true" :card="card" />
            </div>
          </div>
          <div class="gameboard__deck" id="drawingCard" style="z-index: 500;">
            <Card :is-visible="false" :card="cards.deck" />
          </div>
          <div class="gameboard__deck" @click="drawCard" style="z-index: 501;">
            <Card :is-visible="false" :card="cards.deck" />
          </div>
        </div>
        <div class="gameboard__cardRowPlayerCards">
          <div v-for="(card, index) in cards.playerCards" :key="card" :id="index" @click="playerMove(card, index)" :style="{ 'z-index': index }">
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
      <div class="gameboard__choosing-table" style="line-height: 150px;" v-if="kingJustDraw">
        Bereš 4 karty!
      </div>
      <div class="gameboard__choosing-table" style="line-height: 150px;" v-if="gameState.playerWin">
        Vyhrál jsi!
      </div>
      <div class="gameboard__choosing-table" style="line-height: 150px;" v-if="gameState.opponentWin">
        Prohrál jsi!
      </div>
      <div class="gameboard__choosing-table" v-if="king">
        Máš Zeleného Krále?
        <div style="display: flex; justify-content: center;">
          <div class="gameboard__ace-button" @click="kingToggle">Ne</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {Deck} from "@/data/deck";
import Card from "@/components/CardComponent";
import anime from 'animejs';

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
      king: false,
      kingJustDraw: false,
      typeSymbol: false,
      sevenNumberOfCards: 0,
      symbolPos: 0,
      gameState: {
        playerTurn: true,
        opponentTurn: false,
        playerWin: false,
        opponentWin: false
      }
    }
  },

  methods: {

    playerMove(card, index) {
      if (!this.gameState.playerTurn) return;

      let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length - 1];

      if (this.seven && card.value === 7) {
        this.gameState.playerTurn = false;
        this.playerCardAnimation(index);
        setTimeout(() => {
          this.cards.playedCards.push(card);
          this.cards.playerCards.splice(index, 1);
          this.sevenNumberOfCards += 2;
          this.seven = false;
          this.playerWinCheck();
          if (!this.gameState.playerWin) {
              this.sevenDraw();
          }
        }, 750);
      } else if (this.ace && card.value === 14) {
        this.gameState.playerTurn = false;
        this.ace = false;
        this.playerCardAnimation(index);
        setTimeout(() => {
          this.cards.playedCards.push(card);
          this.cards.playerCards.splice(index, 1);
          this.ace = false;
          this.playerWinCheck();
          if (!this.gameState.playerWin) {
            this.opponentAceCheck();
          }
        }, 750);
      } else if (this.king && card.value === 13 && card.cardType === 2) {
        this.king = false;
        this.gameState.playerTurn = false;
        this.playerCardAnimation(index);
        setTimeout(() => {
          this.cards.playedCards.push(card);
          this.cards.playerCards.splice(index, 1);
          this.kingDraw(this.cards.opponentCards, "opponent");
          setTimeout(() => {
            this.gameState.playerTurn = true;
            this.playerWinCheck();
          }, 3220);
        }, 750);
      } else if ((lastPlayedCard.value === card.value || lastPlayedCard.cardType === card.cardType || card.value === 12) && !this.ace && !this.seven && !this.king && !this.kingJustDraw) {
        this.gameState.playerTurn = false;
        this.playerCardAnimation(index);

        setTimeout(() => {
          this.cards.playedCards.push(card);
          this.cards.playerCards.splice(index, 1);

          this.typeSymbol = false;

          if (card.value === 7) {
            this.sevenNumberOfCards += 2;
            this.playerWinCheck();
            if (!this.gameState.playerWin) {
              this.sevenDraw();
            }
          } else if(card.value === 12) {
            this.queen = true;
          } else if (card.value === 13 && card.cardType === 2) {
            this.kingDraw(this.cards.opponentCards, "opponent");
            setTimeout(() => {
              this.gameState.playerTurn = true;
              this.playerWinCheck();
            }, 3220);
          } else if(card.value === 14) {
            this.playerWinCheck();
            if (!this.gameState.playerWin) {
              this.opponentAceCheck();
            }
          } else {
            this.opponentMove();
          }
        }, 750);
      }
    },

    playerCardAnimation(index) {
      let cardId = document.getElementById(index);
      let playground = document.getElementById('playground');

      let cardRect = cardId.getBoundingClientRect();
      let playgroundRect = playground.getBoundingClientRect();

      let posX = playgroundRect.x - cardRect.x;
      let posY = playgroundRect.y - cardRect.y;

      anime({
        targets: cardId,
        duration: 750,
        translateX: posX,
        translateY: posY,
        easing: 'easeInOutSine',
      });
    },

    opponentMove() {
      this.playerWinCheck();

      if (this.gameState.playerTurn || this.gameState.playerWin || this.gameState.opponentTurn) {
        return;
      }

      let i = 0;
      while (i < this.cards.opponentCards.length) {
        let lastPlayedCard = this.cards.playedCards[this.cards.playedCards.length-1];
        if (this.cards.opponentCards[i].value === lastPlayedCard.value || this.cards.opponentCards[i].cardType === lastPlayedCard.cardType || this.cards.opponentCards[i].value === 12) {
          this.opponentCardAnimation(i);

          setTimeout(() => {
            this.cards.playedCards.push(this.cards.opponentCards[i]);

            this.typeSymbol = false;

            if (this.cards.opponentCards[i].value === 7) {
              this.sevenNumberOfCards += 2;
              this.opponentWinCheck();
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
              this.kingJustDraw = true;
            } else if (this.cards.opponentCards[i].value === 14) {
              this.ace = true;
              this.gameState.playerTurn = false;
            }

            this.cards.opponentCards.splice(i, 1);

            this.opponentWinCheck();
            this.gameState.playerTurn = true;
          }, 750);
          break;
        }
        i++;
      }

      setTimeout(() => {
        if (!this.gameState.playerTurn && !this.gameState.opponentWin) {
          this.takeCardFromDeck(this.cards.opponentCards, "opponent", 0)

        setTimeout(() => {
            this.gameState.playerTurn = true;
        }, 750);
        }
      }, 751);
    },

    opponentCardAnimation(index) {
      let cardId = document.getElementById(index + 100);
      let playground = document.getElementById('playground');

      let cardRect = cardId.getBoundingClientRect();
      let playgroundRect = playground.getBoundingClientRect();

      let posX = playgroundRect.x - cardRect.x;
      let posY = playgroundRect.y - cardRect.y;

      anime({
        targets: cardId,
        duration: 750,
        translateX: posX,
        translateY: posY,
        easing: 'easeInOutSine',
      });
    },

    drawCard() {
      if (this.gameState.playerTurn && !this.gameState.playerWin && !this.ace && !this.seven && !this.king && !this.kingJustDraw) {
        this.gameState.playerTurn = false;
        this.takeCardFromDeck(this.cards.playerCards, "player", 0);

        setTimeout(() => {
          this.opponentMove();
        }, 750);
      } else if (this.gameState.playerTurn && !this.gameState.playerWin && !this.ace && !this.king && !this.kingJustDraw) {
        this.gameState.playerTurn = false;
        this.seven = false;
        for (let i = 0; i < this.sevenNumberOfCards; i++) {
          let animDelay = i * 755;
          setTimeout(() => {
            this.takeCardFromDeck(this.cards.playerCards, "player", (i * 50));
          }, animDelay);
        }
        setTimeout(() => {
          this.sevenNumberOfCards = 0;
          this.opponentMove();
        }, (805*this.sevenNumberOfCards));
      } else if (this.gameState.playerTurn && !this.gameState.playerWin && this.kingJustDraw) {
        this.gameState.playerTurn = false;
        this.kingJustDraw = false;
        this.kingDraw(this.cards.playerCards, "player");
        setTimeout(() => {
          this.opponentMove();
        }, 3220);
      }
    },

    takeCardFromDeck(pushTo, player, animDelay) {
      if (this.cards.deck.length === 0) {
        this.shuffleNewDeck(this.cards.playedCards);
      }
      this.drawAnimation(player, animDelay);
      setTimeout(() => {
        pushTo.push(this.cards.deck[0]);
        this.cards.deck.splice(this.cards.deck[0], 1);
      }, (755+animDelay));
    },

    drawAnimation(drawingHand, animDelay) {
      setTimeout(() => {
        let drawingCardId = document.getElementById('drawingCard');
        let drawingCardRect = drawingCardId.getBoundingClientRect();

        if (drawingHand === "player") {
          let handPosId = document.getElementById(this.cards.playerCards.length-1);

          let handPosRect = handPosId.getBoundingClientRect();

          let posX = handPosRect.x - drawingCardRect.x + 39;
          let posY = handPosRect.y - drawingCardRect.y;

          anime({
            targets: drawingCardId,
            duration: 750,
            translateX: posX,
            translateY: posY,
            easing: 'easeInOutSine',
            complete: function () {
              anime({
                targets: drawingCardId,
                duration: 0,
                translateX: 0,
                translateY: 0,
              });
            }
          });
          anime({
            targets: '.gameboard__cardRowPlayerCards',
            duration: 750,
            translateX: -39,
            easing: 'easeInOutSine',
            complete: function () {
              anime({
                targets: '.gameboard__cardRowPlayerCards',
                duration: 0,
                translateX: 0,
              });
            }
          });
        } else if(drawingHand === "opponent") {
          let handPosId = document.getElementById(this.cards.opponentCards.length-1 + 100);

          let handPosRect = handPosId.getBoundingClientRect();

          let posX = handPosRect.x - drawingCardRect.x + 39;
          let posY = handPosRect.y - drawingCardRect.y;

          anime({
            targets: drawingCardId,
            duration: 750,
            translateX: posX,
            translateY: posY,
            easing: 'easeInOutSine',
            complete: function () {
              anime({
                targets: drawingCardId,
                duration: 0,
                translateX: 0,
                translateY: 0,
              });
            }
          });
          anime({
            targets: '.gameboard__cardRowOpponentCards',
            duration: 750,
            translateX: -39,
            easing: 'easeInOutSine',
            complete: function () {
              anime({
                targets: '.gameboard__cardRowOpponentCards',
                duration: 0,
                translateX: 0,
              });
            }
          });
        }
      }, animDelay);
    },

    changeType(type) {
      this.queen = false;
      this.cards.playedCards[this.cards.playedCards.length-1].cardType = type;
      this.symbolPos = type*80;
      this.typeSymbol = true;
      this.opponentMove();
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
      this.opponentMove();
    },

    kingToggle() {
      this.king = false;
      this.gameState.opponentWin = true;
      this.gameState.playerTurn = false;
      this.ace = false;
      this.seven = false;
    },

    opponentAceCheck() {
      for (let i = 0; i < this.cards.opponentCards.length; i++) {
        if(this.cards.opponentCards[i].value === 14) {
          this.opponentCardAnimation(i);
          setTimeout(() => {
            this.cards.playedCards.push(this.cards.opponentCards[i]);
            this.cards.opponentCards.splice(i, 1);
            this.ace = true;
            this.opponentWinCheck();
          }, 751);
          break;
        }
      }
      setTimeout(() => {
        this.gameState.playerTurn = true;
      }, 751);
    },

    sevenDraw() {
      let counterSeven = false;

      for (let i = 0; i < this.cards.opponentCards.length; i++) {
        if (this.cards.opponentCards[i].value === 7) {
          counterSeven = true;
          this.opponentCardAnimation(i);
          setTimeout(() => {
            this.cards.playedCards.push(this.cards.opponentCards[i]);
            this.cards.opponentCards.splice(i, 1);
            this.sevenNumberOfCards += 2;
            this.seven = true;
            this.gameState.playerTurn = true;
          }, 750);
          break;
        }
      }

      this.opponentWinCheck();

      if (!counterSeven) {
        for (let i = 0; i < this.sevenNumberOfCards; i++) {
          let animDelay = i * 755;
          setTimeout(() => {
            this.takeCardFromDeck(this.cards.opponentCards, "opponent", (i * 50));
          }, animDelay);
        }
        setTimeout(() => {
          this.sevenNumberOfCards = 0;
          this.gameState.playerTurn = true;
        }, (805*this.sevenNumberOfCards));
      }
    },

    kingDraw(pushTo, hand) {
      for (let i = 0; i < 4; i++) {
        let animDelay = i * 755;
        setTimeout(() => {
          this.takeCardFromDeck(pushTo, hand, (i * 50));
        }, animDelay);
      }
    },

    opponentWinCheck() {
      if (this.cards.opponentCards.length === 0) {
        this.king = true;
        this.ace = false;
        this.seven = false;
      }
    },

    playerWinCheck() {
      if (this.cards.playerCards.length === 0) {
        this.gameState.playerWin = true;
        this.gameState.playerTurn = false;
        this.opponentKingCheck();
      }
    },

    opponentKingCheck() {
      for (let i = 0; i < this.cards.opponentCards.length; i++) {
        if (this.cards.opponentCards[i].value === 13 && this.cards.opponentCards[i].cardType === 2) {
          this.gameState.opponentTurn = true;
          this.sevenNumberOfCards = 0;
          this.typeSymbol = false;
          this.gameState.playerWin = false;
          this.opponentCardAnimation(i);
          setTimeout(() => {
            this.cards.playedCards.push(this.cards.opponentCards[i]);
            this.cards.opponentCards.splice(i, 1);
            this.kingDraw(this.cards.playerCards, "player");
            this.gameState.opponentTurn = false;
          }, 750);
          setTimeout(() => {
            this.opponentMove();
          }, 4730);
          break;
        }
      }
    },
  },

  computed: {
    symbolPosition() {
        return 'background-position: ' + this.symbolPos + 'px 0;';
    },
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
    .gameboard__ace-button {
        background-color: #AAD576;
        color: #143601;
        width: 80px;
        border-radius: 5px;
        margin-top: 40px;
        cursor: pointer;
    }
</style>