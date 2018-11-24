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
        <th v-if="expandable"></th>
        <th v-for="(header, index) in columns" :key="index">{{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(row, rowIndex) in showData">
        <tr :key="rowIndex">
          <td v-if="expandable" @click="_toggleExpandable(rowIndex)" class="vuetable__expandable-toggler"></td>
          <td v-for="colKey in _getDisplayableKeys(columns)" :key="colKey">
            <slot :name="colKey">{{ row[colKey] }}</slot>
          </td>
        </tr>
        <tr :key="`expandable-${rowIndex}`" v-if="_isExpanded(rowIndex)" class="vuetable__expandable-row">
          <td :colspan="tableHeadersLength">
            <div v-for="(colKey, colField) in expandableFields" :key="colKey">
              <slot :name="colKey">{{ expandableFields[colField] + ": " + row[colField] }}</slot>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

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
    },
    expandable: {
      type: Object,
      default: null,
      validator: obj => {
        return obj.hasOwnProperty('attachFields') || obj.hasOwnProperty('withColumns')
      }
    }
  },
  components: {
    Search,
    Pagination
  },
  data () {
    return {
      showData: [],
      tableData: [],
      expandableFields: {},
      expandedRows: []
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
    _setTableData (data) {
      this.tableData = data

      // If there's no pagination set the show data to all table data
      if (!this.pagination) {
        this._setShowData(data)
      }
    },
    _setExpandableFields () {
      if (!this.expandable) {
        return
      }

      const expandWithColumns = Array.isArray(this.expandable.withColumns)
      const expandAttachedFields = typeof this.expandable.attachFields === 'object'

      if (expandWithColumns) {
        let customColumns = {}
        for (const column in this.columns) {
          if (this.columns.hasOwnProperty(column) && this.expandable.withColumns.includes(column)) {
            const element = { [column]: this.columns[column] }
            customColumns = { ...customColumns, ...element }
          }
        }
        this.expandableFields = customColumns
      }

      if (expandAttachedFields) {
        this.expandableFields = { ...this.expandableFields, ...this.expandable.attachFields }
      }
    },
    _toggleExpandable (index) {
      const expandedRowIndex = this.expandedRows.indexOf(index)

      if (expandedRowIndex >= 0) {
        this.expandedRows.splice(expandedRowIndex, 1)
      } else {
        this.expandedRows.push(index)
      }
    },
    _isExpanded (index) {
      return this.expandedRows.includes(index)
    }
  },
  created () {
    this._setShowData(this.rows)
    this._setTableData(this.rows)
    this._setExpandableFields()
  },
  computed: {
    tableHeadersLength () {
      const expandableHeader = this.expandable ? 1 : 0
      return Object.keys(this.columns).length + expandableHeader
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
