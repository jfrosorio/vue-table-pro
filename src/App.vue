<template>
  <div id="app">
    <VueTablePro :config=config>
      <div slot="searchBar" class="form-group">
        <Search
            placeholder="Type your search"
            className="form-control"
        >
        </Search>
      </div>
    </VueTablePro>
  </div>
</template>

<script>
import VueTablePro from './components/Table.vue'
import data from './data/cars'
import Search from './components/Features/Search'

export default {
  name: 'app',
  components: {
    Search,
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
