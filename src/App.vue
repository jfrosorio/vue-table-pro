<template>
  <div id="vtp-demo">
    <VueTablePro
        :columns="columns"
        :rows="rows"
        :tableCaption="tableCaption"
        :pagination="pagination"
        :search="search"
        :sortableColumns="sortableColumns"
        :expandable="expandable"
    >
      <a slot="edit_row">Edit</a>
      <a slot="delete_row">Delete</a>

      <div slot="search_empty_results">
        <p>No results found.</p>
      </div>
    </VueTablePro>
  </div>
</template>

<script>
import VueTablePro from './components/VueTablePro.vue'
import data from './data/cars'

export default {
  name: 'vtp-demo',
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
      pagination: {
        perPage: 15,
        size: 6,
        arrows: true
      },
      rows: data,
      search: {
        placeholder: 'Type your search',
        className: 'vuetablepro__search-input'
      },
      sortableColumns: true,
      tableCaption: 'Cars List'
    }
  }
}
</script>
