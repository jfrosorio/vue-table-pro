<template>
  <div id="app">
    <VueTablePro :caption = title :data = myData :myHeaders = myHeaders />
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
      mapping: {
        name: 'Nome',
      },
      headers: [
        'name'
      ],
      expandables: [
        'name'
      ],
      data: [
        {
          name: 'Lion',
          age: 5,
          weight: 30,
          size: 100
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
      ],
	  //Note: if headers are not defined we should show all.
	  myHeaders: ['name', 'age']
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
