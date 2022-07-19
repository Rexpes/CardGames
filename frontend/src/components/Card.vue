<template>
  <div class="gameboard__cardbox">
    <div class="card-edge">
      <div class="card"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardComponent",

  props: {
    isVisible: Boolean,
    x: Number,
    y: Number,
  },
}
</script>