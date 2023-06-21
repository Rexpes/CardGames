<template>
  <div class="content">
    <div class="content__selection-box">
      <div v-for="(pair) in pairs" :key="pair">
        <Pair :is-visible="true" :pair="pair" />
      </div>
    </div>
  </div>
</template>
<script>
import {Pairs} from "@/data/pairs";
import Pair from "@/components/PairComponent";

export default {
  name: "PairsView",

  components: {
    Pair
  },

  data() {
    const pairs = Pairs.generatePairs();
    if (!localStorage.getItem('pairs')) {
      localStorage.setItem('pairs', JSON.stringify(pairs));
    }

    return {
      pairs: pairs
    }
  },
}
</script>