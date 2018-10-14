<template>
  <div id="app">
    <VueTablePro :config = config>
      <a slot-scope="extraCol" slot="edit_row">Edit</a>
      <a slot-scope="extraCol" slot="delete_row">Delete</a>
    </VueTablePro>
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
          perPage: 15,
          size: 6
        },
        extraColumns: ['edit_row', 'delete_row'],
        customHeaders: {
          'car_brand': 'Brand',
          'car_model': 'Model',
          'car_model_year': 'Year',
          'car_price': 'Price',
          'edit_row': 'Edit',
          'delete_row': 'Delete',
          'qsdas': 'asdas'
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
