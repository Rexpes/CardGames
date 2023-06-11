<template>
  <div class="content">
    <div class="content__selection-box">
      <h1>PEXESO</h1>
    </div>
  </div>
</template>
<script>
import {Pairs} from "@/data/pairs";

export default {
  name: "PairsView",

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