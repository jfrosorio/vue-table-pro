<template>
  <div class="vuetable">
    <Search
        v-if="search"
        :className="search.className"
        :placeholder="search.placeholder"
        @search="_setShowData"
    />

    <table>
      <caption>{{ tableTitle }}</caption>
      <thead v-if="tableHeader">
      <tr>
        <th v-if="expandable">More</th>
        <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(row, rowIndex) in showData">
        <tr :key="rowIndex">
          <td v-if="expandable" @click="toggleExpandable(rowIndex)">More</td>
          <td v-for="colKey in _getDisplayableKeys(columns)" :key="colKey">
            <slot :name="colKey">{{ row[colKey] }}</slot>
          </td>
        </tr>
        <tr :key="rowIndex" v-if="expandableIsActive">
          <div v-for="colKey in _getDisplayableKeys(expandable)" :key="colKey">
            <slot :name="colKey">{{ row[colKey] }}</slot>
          </div>
        </tr>
      </template>
      </tbody>
    </table>

    <Pagination
        v-if="pagination"
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
    },
    expandable: {
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
      expandableData: [],
      expandableIsActive: false
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
    _getDisplayableKeys (displayableKeys) {
      let attrs = []
      let dataSet = {}

      if (displayableKeys) {
        dataSet = displayableKeys
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
    _setExpandableData (data) {
      this.expandableData = data
    },
    toggleExpandable () {
      this.expandableIsActive = !this.expandableIsActive
    }
  },
  created () {
    this._setShowData(this.rows)
    this._setExpandableData(this.expandable)
    console.log(this.columns)
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
