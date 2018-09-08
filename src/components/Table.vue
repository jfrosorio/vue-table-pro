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
          <td v-for="(property, index) in entry" :key="index">{{ property }}</td>
        </tr>
      </tbody>
    </table>

    <div class="vuetable__pagination" v-show="tablePagination.enable">
      <a class="vuetable__pagination-page" @click="_updatePagination(page)" :class="_isCurrentPage(page)" v-for="page in tablePagination.navigationPages" :key="page">
        {{ page }}
      </a>
      <span class="vuetable__pagination-ellipsis" v-show="tablePagination.hasLargeSize">...</span>
      <a class="vuetable__pagination-page" v-show="tablePagination.hasLargeSize" @click="_updatePagination(tablePagination.last)" :class="_isCurrentPage(tablePagination.last)">
        {{ tablePagination.last }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vue_table_pro',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableTitle: this.config.title || 'Table Title',
      tableData: this.config.data || [],
      showData: [],
      tableHeaders: this.config.headers || [],
      tablePagination: {
        size: 5,
        paged: 1,
        currentPage: 1,
        perPage: 10,
        enable: false,
        settings: this.config.pagination || {}
      }
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
    _paginateTableData () {
      const end = this.tablePagination.currentPage * this.tablePagination.perPage
      const start = end - this.tablePagination.perPage

      this.showData = this.tablePagination.data.filter((entry, index) => {
        return index >= start && index < end
      })
    },
    _loadPagination () {
      this.tablePagination.data = this.showData
      this.tablePagination.total = this.showData.length

      this.tablePagination.enable = this.tablePagination.settings.enable || this.tablePagination.enable
      this.tablePagination.size = this.tablePagination.settings.size || this.tablePagination.size
      this.tablePagination.navigationPages = Array.from({length: this.tablePagination.size}, (v, k) => k + 1)
      this.tablePagination.perPage = this.tablePagination.settings.perPage || this.tablePagination.perPage
      this.tablePagination.needsNavigation = this.tablePagination.total > this.tablePagination.perPage
      this.tablePagination.last = this.tablePagination.needsNavigation ? this.tablePagination.total / this.tablePagination.perPage : null
      this.tablePagination.hasLargeSize = this.tablePagination.total > this.tablePagination.perPage * this.tablePagination.size

      if (this.tablePagination.needsNavigation && this.tablePagination.enable) {
        this._paginateTableData()
      }
    },
    _isCurrentPage (page) {
      return page === this.tablePagination.currentPage ? 'vuetable__pagination-page--current' : ''
    },
    _updatePagination (page) {
      this.tablePagination.currentPage = page

      const isFirstItemOfNav = this.tablePagination.currentPage === this.tablePagination.navigationPages[0]
      const isLastItemOfNav = this.tablePagination.currentPage === this.tablePagination.navigationPages[this.tablePagination.size - 1]

      if (this.tablePagination.needsNavigation) {
        if (isFirstItemOfNav || this.tablePagination.currentPage + this.tablePagination.size < this.tablePagination.last) {
          this.tablePagination.hasLargeSize = true
        } else if (isLastItemOfNav && this.tablePagination.currentPage + this.tablePagination.size >= this.tablePagination.last) {
          this.tablePagination.hasLargeSize = false
        }
      }

      if (isFirstItemOfNav && this.tablePagination.paged !== 1) {
        this.tablePagination.navigationPages = this.tablePagination.navigationPages.map(page => page - (this.tablePagination.size - 1))
        this.tablePagination.paged--
      } else if (isLastItemOfNav && this.tablePagination.currentPage !== this.tablePagination.last) {
        this.tablePagination.navigationPages = this.tablePagination.navigationPages.map(page => page + (this.tablePagination.size - 1))
        this.tablePagination.paged++
      }

      this._paginateTableData()
    }
  },
  created () {
    if (this.tableHeaders.length) {
      this._addColumnsByHeader()
    } else {
      this._addAllCollumns()
    }

    this._loadPagination()
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

  /** Pagination **/
  .vuetable__pagination {
    margin: 20px auto;
  }

  .vuetable__pagination-page {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0 10px;
    background-color: #E1E8ED;
    font-size: 17px;
    line-height: 40px;
    color: #66757F;
    border-radius: 3px;
    cursor: pointer;
    box-shadow: 0 0px 1px rgba(0, 0, 0, .4);
  }

  .vuetable__pagination-page:not(.vuetable__pagination-page--current):hover {
    background-color: #CCD6DD;
  }

  .vuetable__pagination-page--current {
    background-color: #607D8B;
    color: #F5F8FA;
  }

  .vuetable__pagination-ellipsis {
    display: inline-block;
    height: 40px;
    font-size: 22px;
    line-height: 27px;
    letter-spacing: 1px;
    vertical-align: top;
    color: #66757F;
  }
</style>
