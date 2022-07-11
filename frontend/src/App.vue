<template>
  <div id="app">
    <testcomponent />
  </div>
</template>

<script>
import testcomponent from './components/testcomponent'

export default {
  name: 'App',
  components: {
    testcomponent
  }
}

// sessionStorage.setItem("key", "value") // TODO this will be the way of storing game data

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
