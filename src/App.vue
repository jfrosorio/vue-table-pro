<template>
  <div id="app">
    <VueTablePro :config = config />
  </div>
</template>

<script>
import VueTablePro from './components/Table.vue'
import data from './data/cars'

export default {
  name: 'app',
  components: {
    VueTablePro
  },
  data () {
    return {
      config: {
        title: 'Cars List',
        data,
        headers: ['car_brand', 'car_model', 'car_model_year', 'car_price'],
        pagination: {
          enable: true,
          perPage: 15,
          size: 6
        }
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
