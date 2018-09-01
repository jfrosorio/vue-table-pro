<template>
  <div id="app">
    <VueTablePro :config = config />
  </div>
</template>

<script>
import VueTablePro from './components/Table.vue'
import data from './data/animals.js'

export default {
  name: 'app',
  components: {
    VueTablePro
  },
  data () {
    return {
      config: {
        title: 'hello',
        data: data.animals,
        headers: ['name', 'weight']
      }
    }
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
