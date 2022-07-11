<template>
  <div id="app">
    <h1 @click="onClick()">{{ counter }}</h1>
  </div>
</template>

<script>
export default {
  name: 'TestComponent',
  data () {
    return {
      counter: 0
    }
  },
  methods: {
    onClick () {
      this.counter++
    }
  }
}
</script>

<style>

</style>
