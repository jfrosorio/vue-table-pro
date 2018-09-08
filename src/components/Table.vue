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

    <div class="vuetable__pagination" v-show="tablePagination.enabled && tablePagination.isNecessary">
      <a class="vuetable__pagination-page" @click="_updatePagination(tablePagination.first)" :class="_isCurrentPage(tablePagination.first)">
        {{ tablePagination.first }}
      </a>
      <span class="vuetable__pagination-ellipsis" v-show="tablePagination.hasMoreUntilFirst">...</span>
      <a class="vuetable__pagination-page" @click="_updatePagination(page)" :class="_isCurrentPage(page)" v-for="page in tablePagination.navigationPages" :key="page">
        {{ page }}
      </a>
      <span class="vuetable__pagination-ellipsis" v-show="tablePagination.hasMoreUntilLast">...</span>
      <a class="vuetable__pagination-page" @click="_updatePagination(tablePagination.last)" :class="_isCurrentPage(tablePagination.last)">
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
        first: 1,
        size: 5,
        paged: 1,
        currentPage: 1,
        perPage: 10,
        enabled: true,
        settings: this.config.pagination || null
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

      this.showData = this.tablePagination.allShowData.filter((entry, index) => {
        return index >= start && index < end
      })
    },
    _loadPagination () {
      this.tablePagination.allShowData = this.showData
      this.tablePagination.total = this.showData.length

      this.tablePagination.enabled = this.tablePagination.settings !== null ? this.tablePagination.enabled : !this.tablePagination.enabled
      this.tablePagination.size = this.tablePagination.settings.size ? this.tablePagination.settings.size - this.tablePagination.first : this.tablePagination.size
      this.tablePagination.perPage = this.tablePagination.settings.perPage || this.tablePagination.perPage
      this.tablePagination.isNecessary = this.tablePagination.total > this.tablePagination.perPage

      this.tablePagination.needsMoreNavigation = this.tablePagination.total > this.tablePagination.perPage * this.tablePagination.size
      this.tablePagination.hasMoreUntilLast = this.tablePagination.needsMoreNavigation
      this.tablePagination.hasMoreUntilFirst = this.tablePagination.needsMoreNavigation && this.tablePagination.paged > 1
      this.tablePagination.last = Math.ceil(this.tablePagination.total / this.tablePagination.perPage)
      this.tablePagination.pagesLength = this.tablePagination.hasMoreUntilLast ? this.tablePagination.size - 1 : this.tablePagination.last - 2
      this.tablePagination.navigationPages = Array.from({length: this.tablePagination.pagesLength}, (v, k) => k + 2)

      if (this.tablePagination.isNecessary && this.tablePagination.enabled) {
        this._paginateTableData()
      }
    },
    _isCurrentPage (page) {
      return page === this.tablePagination.currentPage ? 'vuetable__pagination-page--current' : ''
    },
    _updatePagination (page) {
      this.tablePagination.currentPage = page

      const isFirstItemOfNav = this.tablePagination.currentPage === this.tablePagination.navigationPages[0]
      const isFirstPage = this.tablePagination.currentPage === this.tablePagination.first
      const isLastItemOfNav = this.tablePagination.currentPage === this.tablePagination.navigationPages[this.tablePagination.navigationPages.length - 1]
      const isLastPage = this.tablePagination.currentPage === this.tablePagination.last
      const remainingPages = this.tablePagination.last - this.tablePagination.currentPage
      const madePagination = this.tablePagination.paged !== 1

      if (this.tablePagination.needsMoreNavigation) {
        if (isFirstItemOfNav && this.tablePagination.currentPage <= this.tablePagination.size) {
          this.tablePagination.hasMoreUntilFirst = false
        } else if (isLastItemOfNav || this.tablePagination.currentPage > this.tablePagination.size) {
          this.tablePagination.hasMoreUntilFirst = true
        }

        if (isFirstItemOfNav || this.tablePagination.currentPage + this.tablePagination.size < this.tablePagination.last) {
          this.tablePagination.hasMoreUntilLast = true
        } else if (isLastItemOfNav && remainingPages < this.tablePagination.size) {
          this.tablePagination.hasMoreUntilLast = false
        }

        if (isFirstItemOfNav && madePagination) {
          let navLengthDifference = (this.tablePagination.size - 1) - this.tablePagination.navigationPages.length

          if (navLengthDifference > 0) {
            while (navLengthDifference) {
              const lastPageIndex = this.tablePagination.navigationPages.length - 1
              const lastNavPage = this.tablePagination.navigationPages[lastPageIndex]
              const newLastPage = lastNavPage + 1
              this.tablePagination.navigationPages.push(newLastPage)
              navLengthDifference--
            }
          }

          this.tablePagination.navigationPages = this.tablePagination.navigationPages.map(page => page - (this.tablePagination.size - 2))
          this.tablePagination.paged--
        }

        if (isFirstPage) {
          this.tablePagination.hasMoreUntilFirst = false
          this.tablePagination.navigationPages = []
          this.tablePagination.paged = 1

          for (let index = this.tablePagination.first + 1; this.tablePagination.navigationPages.length < this.tablePagination.size - 1; index++) {
            this.tablePagination.navigationPages.push(index)
          }
        }

        if (isLastItemOfNav && this.tablePagination.currentPage < this.tablePagination.last - (this.tablePagination.size - 1)) {
          this.tablePagination.navigationPages = this.tablePagination.navigationPages
            .map(page => page + (this.tablePagination.size - 2))
            .filter(page => page < this.tablePagination.last)
          this.tablePagination.paged++
        }

        if (isLastPage) {
          this.tablePagination.hasMoreUntilLast = false
          this.tablePagination.navigationPages = []
          this.tablePagination.paged = Math.round(this.tablePagination.last / (this.tablePagination.size - 1))

          const lastPagesLength = this.tablePagination.size - 1

          for (let index = this.tablePagination.last - 1; this.tablePagination.navigationPages.length < lastPagesLength; index--) {
            this.tablePagination.navigationPages.unshift(index)
          }
        }
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
    user-select: none;
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
