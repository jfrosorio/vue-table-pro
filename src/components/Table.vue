<template>
  <div class="vuetable">
    <Search
        v-if="search"
        :className="search.className"
        :placeholder="search.placeholder"
        @search="_setTableData"
    />

    <table>
      <caption>{{ tableTitle }}</caption>
      <thead v-if="tableHeader">
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in showData" :key="rowIndex">
          <td v-for="colKey in _getDisplayableKeys()" :key="colKey">
            <slot :name="colKey">{{ row[colKey] }}</slot>
          </td>
        </tr>
      </tbody>
    </table>

    <slot name="search_empty_results" v-if="!tableData.length"></slot>

    <Pagination
        v-if="pagination"
        :tableData.sync="tableData"
        :perPage="pagination.perPage"
        :size="pagination.size"
        :arrows="pagination.arrows"
        @pagination="_setShowData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Features/Pagination'
import Search from '@/components/Features/Search'

export default {
  name: 'VueTablePro',
  props: {
    columns: {
      type: Object,
      default: null
    },
    rows: {
      type: Array,
      default: null
    },
    tableHeader: {
      type: Boolean,
      default: true
    },
    tableTitle: {
      type: String,
      default: 'Features Title'
    },
    search: {
      type: Object,
      default: null
    },
    pagination: {
      type: Object,
      default: null
    }
  },
  components: {
    Search,
    Pagination
  },
  data () {
    return {
      showData: [],
      tableData: []
    }
  },
  methods: {
    /**
     * Evaluates if valid data was provided.
     *
     * @TODO Perhaps we should evaluate the format too.
     * @returns {boolean}
     * @private
     */
    _hasDataAvailable () {
      return this.rows !== null && typeof this.rows !== 'undefined'
    },
    /**
     * If a columns mapping is provided, its keys will be used for building the table
     * headers. If not, the app will default to the data (if any) keys provided.
     *
     * @returns {Array}
     * @private
     */
    _getDisplayableKeys () {
      let attrs = []
      let dataSet = {}

      if (this.columns) {
        dataSet = this.columns
      } else if (this._hasDataAvailable()) {
        dataSet = this.rows[0]
      }

      for (let key in dataSet) {
        attrs.push(key)
      }

      return attrs
    },
    /**
     * Sets the data to be rendered.
     *
     * @param data
     * @private
     */
    _setShowData (data) {
      this.showData = data
    },
    _setTableData (data) {
      this.tableData = data

      // If there's no pagination set the show data to all table data
      if (!this.pagination) {
        this._setShowData(data)
      }
    }
  },
  created () {
    this._setShowData(this.rows)
    this._setTableData(this.rows)
  },
  computed: {
    tableHeaders () {
      let headers = []

      if (this.columns) {
        for (let key in this.columns) {
          headers.push(this.columns[key])
        }
      }

      return headers
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
