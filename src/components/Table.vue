<template>
  <div class="vuetable">
    <table>
      <caption>{{ tableTitle }}</caption>
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in showData" :key="index">
          <td v-for="(property, index) in entry" :key="index">
            <slot :name="property">{{ property }}</slot>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :config = this.pagination @pagination = "_setShowData" />
  </div>
</template>

<script>
import Pagination from '@/components/Features/Pagination.vue'

export default {
  name: 'Vue_table_pro',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  components: {
    Pagination
  },
  data () {
    return {
      tableTitle: this.config.title || 'Features Title',
      tableData: this.config.data || [],
      showData: [],
      tableHeaders: this.config.headers || [],
      pagination: this.config.pagination || null,
      extraColumns: this.config.extraColumns || [],
      customHeaders: this.config.customHeaders || null
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
    },
    _addExtraColumns () {
      this.extraColumns.forEach((extraCol, key) => {
        if (extraCol) {
          this.tableHeaders.push(extraCol)
          this.showData.forEach(entry => {
            const colKey = `extraCol${key}`
            entry[colKey] = extraCol
          })
        }
      })
    },
    _setShowData (data) {
      this.showData = data
    },
    _addCustomHeaders () {
      for (let headerProp in this.customHeaders) {
        this.tableHeaders.forEach(header => {
          if (this.customHeaders.hasOwnProperty(header)) {
            let index = this.tableHeaders.indexOf(headerProp)
            this.tableHeaders[index] = this.customHeaders[headerProp]
          }
        })
      }
    }
  },
  created () {
    if (this.tableHeaders.length) {
      this._addColumnsByHeader()
    } else {
      this._addAllCollumns()
    }

    if (this.extraColumns.length) {
      this._addExtraColumns()
    }

    if (this.customHeaders) {
      this._addCustomHeaders()
    }
  }
}
</script>

<style scoped>

  table {
    width: 100%;
    max-width: 910px;
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
