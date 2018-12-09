<template>
  <div id="app">
    <VueTablePro
        :columns="columns"
        :rows="rows"
        :caption="title"
        :pagination="pagination"
        :search="search"
        :expandable="expandable"
    >
      <a slot-scope="extraCol" slot="edit_row">Edit</a>
      <a slot-scope="extraCol" slot="delete_row">Delete</a>

      <div slot="search_empty_results">
        <p>No results found.</p>
      </div>
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
      columns: {
        'car_brand': 'Brand',
        'car_model': 'Model',
        'car_model_year': 'Year',
        'car_price': 'Price',
        'edit_row': 'Edit',
        'delete_row': 'Delete'
      },
      expandable: {
        withColumns: ['car_brand', 'car_model', 'car_model_year', 'car_price'],
        attachFields: {
          'car_fuel': 'Fuel',
          'car_color': 'Color',
          'car_doors': 'Doors',
          'car_seats': 'Seats'
        }
      },
      rows: data,
      title: 'Cars List',
      pagination: {
        perPage: 15,
        size: 6,
        arrows: true
      },
      search: {
        placeholder: 'Type your search',
        className: 'vuetable__search-input'
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
