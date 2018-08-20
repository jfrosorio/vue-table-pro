<template>
  <div id="app">
    <VueTablePro caption="hello" />
  </div>
</template>

<script>
import VueTablePro from './components/Table.vue'

export default {
  name: 'app',
  components: {
    VueTablePro
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
