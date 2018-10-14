<template>
  <div class="vuetable">
    <Search
        :config=this.search
        @search="setShowData"
    />

    <table>
      <caption>{{ tableTitle }}</caption>
      <thead>
      <tr>
        <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(entry, index) in showData" :key="index">
        <td v-for="(property, index) in entry" :key="index">{{ property }}</td>
      </tr>
      </tbody>
    </table>

    <Pagination :config=this.Pagination @pagination="setShowData"/>
  </div>
</template>

<script>
import Pagination from '@/components/Features/Pagination.vue'
import Search from '@/components/Features/Search'

export default {
  name: 'VueTablePro',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    Search,
    Pagination
  },
  data () {
    return {
      tableTitle: this.config.title || 'Features Title',
      tableData: this.config.data || [],
      globalData: [],
      showData: [],
      tableHeaders: this.config.headers || [],
      Pagination: this.config.pagination || null,
      search: this.config.search
    }
  },
  methods: {
    _addColumnsByHeader () {
      this.tableData.forEach(entry => {
        const rowEntry = {}

        // Loop through each entry keys and check if
        // they match any of the table headers
        Object.keys(entry).forEach(key => {
          if (this.tableHeaders.includes(key)) {
            rowEntry[key] = entry[key]
          }
        })

        if (Object.keys(rowEntry).length) {
          this.showData.push(rowEntry)
        }
      })

      this.globalData = this.showData
    },
    _addAllCollumns () {
      this.tableData.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (this.tableHeaders.indexOf(key) === -1) {
            this.tableHeaders.push(key)
          }
        })
      })

      this.showData = this.tableData
      this.globalData = this.showData
    },
    setShowData (data) {
      this.showData = data
    }
  },
  created () {
    if (this.tableHeaders.length) {
      this._addColumnsByHeader()
    } else {
      this._addAllCollumns()
    }
  }
}
</script>

<style scoped>
table {
  width: 100%;
  margin: 0 auto;
}

caption {
  text-align: center;
  background-color: #f1f1f1;
  font-weight: 700;
  padding: 10px;
}

th {
  background-color: #f2f2f2;
  text-align: left;
  padding: 10px;
}

td {
  background-color: #f8f8f8;
  text-align: left;
  padding: 10px;
}
</style>
