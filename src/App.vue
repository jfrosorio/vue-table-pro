<template>
  <div id="app">
    <VueTablePro :caption = title :data = myData />
  </div>
</template>

<script>
import VueTablePro from './components/Table.vue'

export default {
  name: 'app',
  components: {
    VueTablePro
  },
  data () {
    return {
      title: 'hello',
      myData: [
        {
          name: 'Lion',
          age: 5,
          weight: 30
        },
        {
          name: 'Tiger',
          age: 3,
          weight: 40
        },
        {
          name: 'Bear',
          age: 2,
          weight: 50
        },
        {
          name: 'Dolphin',
          age: 7,
          weight: 10
        }
      ]
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
