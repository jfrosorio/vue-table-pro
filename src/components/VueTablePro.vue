<template>
  <div class="vuetablepro" v-if="rows">
    <Search
        v-if="search"
        :className="search.className"
        :placeholder="search.placeholder"
        @search="$_vueTablePro_setTableData"
    />

    <table>
      <caption v-if="tableCaption">{{ tableCaption }}</caption>
      <thead v-if="tableHeader">
      <tr>
        <th
            v-if="expandable"
            class="vuetablepro__expandable-header">
        </th>
        <th v-for="(value, key, index) in columns" :key="index">
          <SortButton
              :attribute="key"
              :tableData="tableData"
              @sort="$_vueTablePro_setTableData"
              v-if="sortableColumns"
          >
            {{ value }}
          </SortButton>
          <template v-else>
            {{ value }}
          </template>
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-for="(row, rowIndex) in showData">
        <tr :key="rowIndex">
          <td
              v-if="expandable"
              @click="$_vueTablePro_toggleExpandable(rowIndex)"
              :class="{ 'is-active': $_vueTablePro_isExpanded(rowIndex) }"
              class="vuetablepro__expandable-toggler">
          </td>
          <td v-for="colKey in $_vueTablePro_getDisplayableKeys(columns)" :key="colKey">
            <slot :name="colKey">{{ row[colKey] }}</slot>
          </td>
        </tr>
        <tr
            v-show="$_vueTablePro_isExpanded(rowIndex)"
            :key="`expandable-${rowIndex}`">
          <td :colspan="$_vueTablePro_tableHeadersLength" class="vuetablepro__expandable-panel">
            <div class="vuetablepro__expandable-list">
              <div
                  v-for="(colKey, colField) in expandableFields"
                  :key="colKey"
                  class="vuetablepro__expandable-item">
                <slot :name="colKey">
                  <span class="vuetablepro__expandable-label">{{ expandableFields[colField] }}</span>
                  <span class="vuetablepro__expandable-value">{{ row[colField] }}</span>
                </slot>
              </div>
            </div>
          </td>
        </tr>
      </template>
      </tbody>
    </table>

    <slot name="search_empty_results" v-if="!tableData.length"></slot>

    <Pagination
        v-if="pagination"
        :$_vueTablePro_tableData="tableData"
        :perPage="pagination.perPage"
        :size="pagination.size"
        :arrows="pagination.arrows"
        :hasShownData="showData.length > 0"
        @pagination="$_vueTablePro_setShowData"
    />
  </div>
</template>

<script>
import Pagination from '@/components/VueTableProPagination'
import Search from '@/components/VueTableProSearch'
import SortButton from '@/components/VueTableProSortButton'

export default {
  name: 'VueTablePro',
  props: {
    columns: {
      type: Object,
      default: null
    },
    rows: {
      type: Array,
      default: null,
      required: true
    },
    tableHeader: {
      type: Boolean,
      default: true
    },
    tableCaption: {
      type: String,
      default: null
    },
    search: {
      type: Object,
      default: null
    },
    sortableColumns: {
      type: Boolean,
      default: true
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
    SortButton,
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
    $_vueTablePro_hasDataAvailable () {
      return this.rows !== null && typeof this.rows !== 'undefined'
    },
    /**
     * If a columns mapping is provided, its keys will be used for building the table
     * headers. If not, the app will default to the data (if any) keys provided.
     *
     * @returns {Array}
     * @private
     */
    $_vueTablePro_getDisplayableKeys (displayableKeys) {
      let attrs = []
      let dataSet = {}

      if (displayableKeys) {
        dataSet = displayableKeys
      } else if (this.$_vueTablePro_hasDataAvailable()) {
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
    $_vueTablePro_setShowData (data) {
      this.showData = data
    },
    $_vueTablePro_setTableData (data) {
      this.tableData = data

      // If there's no pagination set the show data to all table data
      if (!this.pagination) {
        this.$_vueTablePro_setShowData(data)
      }
    },
    $_vueTablePro_setExpandableFields () {
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
    $_vueTablePro_toggleExpandable (index) {
      const expandedRowIndex = this.expandedRows.indexOf(index)

      if (expandedRowIndex >= 0) {
        this.expandedRows.splice(expandedRowIndex, 1)
      } else {
        this.expandedRows.push(index)
      }
    },
    $_vueTablePro_isExpanded (index) {
      return this.expandedRows.includes(index)
    }
  },
  created () {
    this.$_vueTablePro_setShowData(this.rows)
    this.$_vueTablePro_setTableData(this.rows)
    this.$_vueTablePro_setExpandableFields()
  },
  computed: {
    $_vueTablePro_tableHeadersLength () {
      const columnsLength = this.columns ? Object.keys(this.columns).length : 0
      const expandableHeader = this.expandable ? 1 : 0
      return columnsLength + expandableHeader
    }
  }
}
</script>
