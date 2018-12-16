<template>
  <div class="vuetable__pagination" v-if="hasTableData" v-show="isNecessary">
    <a class="vuetable__pagination-arrow vuetable__pagination-arrow--previous" v-if="arrows && hasMoreUntilFirst" @click="_updatePagination(currentPage - 1)"></a>
    <a class="vuetable__pagination-page" @click="_updatePagination(first)" :class="_isCurrentPage(first)">
      {{ first }}
    </a>
    <span class="vuetable__pagination-ellipsis" v-show="hasMoreUntilFirst">...</span>
    <a class="vuetable__pagination-page" @click="_updatePagination(page)" :class="_isCurrentPage(page)" v-for="page in navigationPages" :key="page">
      {{ page }}
    </a>
    <span class="vuetable__pagination-ellipsis" v-show="hasMoreUntilLast">...</span>
    <a class="vuetable__pagination-page" @click="_updatePagination(last)" :class="_isCurrentPage(last)">
      {{ last }}
    </a>
    <a class="vuetable__pagination-arrow vuetable__pagination-arrow--next" v-if="arrows && hasMoreUntilLast" @click="_updatePagination(currentPage + 1)"></a>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    tableData: {
      type: Array,
      default: () => [],
      required: true
    },
    hasShownData: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: Number,
      default: 10
    },
    size: {
      type: Number,
      default: 5,
      validator: function (size) {
        // Minimum size required for pagination
        return size >= 4
      }
    },
    arrows: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      first: 1,
      paged: 1,
      currentPage: 1,
      isNecessary: false,
      navigationPages: []
    }
  },
  methods: {
    _paginateTableData () {
      // Set paginated data limits
      const end = this.currentPage * this.perPage
      const start = end - this.perPage

      // Build paginated data
      const paginatedData = this.tableData.filter((entry, index) => {
        return index >= start && index < end
      })

      // Serve paginated data
      this.$emit('pagination', paginatedData)
    },
    _loadPagination () {
      // Get table data
      this.total = this.tableData.length

      // Set pagination configuration defaults
      this.pageSize = this.size - this.first
      this.isNecessary = this.total > this.perPage

      // Set conditional pagination
      this.needsMoreNavigation = this.total > this.perPage * this.size
      this.hasMoreUntilLast = this.needsMoreNavigation
      this.hasMoreUntilFirst = this.needsMoreNavigation && this.paged > 1
      this.last = Math.ceil(this.total / this.perPage)
      this.pagesLength = this.hasMoreUntilLast ? this.pageSize - 1 : this.last - 2
      this.navigationPages = Array.from({ length: this.pagesLength }, (v, k) => k + 2)

      if (this.isNecessary) {
        this._paginateTableData()
      } else if (this.tableData.length && !this.hasShownData) {
        this.$emit('pagination', this.tableData)
      }
    },
    _isCurrentPage (page) {
      return page === this.currentPage ? 'vuetable__pagination-page--current' : ''
    },
    _checkIfHasMoreUntilFirst () {
      if (this.isFirstItemOfNav && this.currentPage <= this.pageSize) {
        this.hasMoreUntilFirst = false
      } else if (this.isLastItemOfNav || this.currentPage > this.pageSize) {
        this.hasMoreUntilFirst = true
      }
    },
    _checkIfHasMoreUntilLast () {
      const remainingPages = this.last - this.currentPage

      if (this.isFirstItemOfNav || this.currentPage + this.pageSize < this.last) {
        this.hasMoreUntilLast = true
      } else if (this.isLastItemOfNav && remainingPages < this.pageSize) {
        this.hasMoreUntilLast = false
      }
    },
    _navigateBack () {
      this.navigationPages = this.navigationPages.map(page => page - (this.pageSize - 2)).filter(page => page > this.first)
      const stepPagesLength = (this.pageSize - 1)

      if (stepPagesLength !== this.navigationPages.length) {
        let difference = stepPagesLength - this.navigationPages.length
        const endingPoint = this.currentPage
        const completePagesNavigation = []

        while (difference) {
          completePagesNavigation.unshift(endingPoint + difference)
          difference--
        }

        this.navigationPages = this.navigationPages.concat(completePagesNavigation)
      }

      this.paged--
    },
    _goToFirstPage () {
      this.hasMoreUntilFirst = false
      this.navigationPages = []
      this.paged = 1

      for (let index = this.first + 1; this.navigationPages.length < this.pageSize - 1; index++) {
        this.navigationPages.push(index)
      }
    },
    _navigateForwards () {
      const startingPoint = this.currentPage
      const endingPoint = startingPoint + (this.pageSize - 1)
      const pointsInterval = endingPoint - startingPoint

      this.navigationPages = new Array(pointsInterval).fill().map((_, page) => page + startingPoint).filter(page => page < this.last)

      if (pointsInterval !== this.navigationPages.length) {
        let difference = pointsInterval - this.navigationPages.length
        const completePagesNavigation = []

        while (difference) {
          completePagesNavigation.push(startingPoint - difference)
          difference--
        }

        this.navigationPages = completePagesNavigation.concat(this.navigationPages)
      }

      this.paged++
    },
    _goToLastPage () {
      this.hasMoreUntilLast = false
      this.navigationPages = []
      this.paged = Math.round(this.last / (this.pageSize - 2))

      const lastPagesLength = this.pageSize - 1

      for (let index = this.last - 1; this.navigationPages.length < lastPagesLength; index--) {
        this.navigationPages.unshift(index)
      }
    },
    _updatePagination (page) {
      if (page < this.first || page > this.last) return
      this.currentPage = page
      this.isFirstItemOfNav = this.currentPage === this.navigationPages[0]
      this.isLastItemOfNav = this.currentPage === this.navigationPages[this.navigationPages.length - 1]

      const isFirstPage = this.currentPage === this.first
      const isLastPage = this.currentPage === this.last
      const madePagination = this.paged !== 1

      if (this.needsMoreNavigation) {
        this._checkIfHasMoreUntilFirst()
        this._checkIfHasMoreUntilLast()

        if (this.isFirstItemOfNav && madePagination) {
          this._navigateBack()
        }

        if (isFirstPage) {
          this._goToFirstPage()
        }

        if (this.isLastItemOfNav) {
          this._navigateForwards()
        }

        if (isLastPage && this.hasMoreUntilLast) {
          this._goToLastPage()
        }
      }

      this._paginateTableData()
    }
  },
  computed: {
    hasTableData () {
      return this.tableData.length > 0
    }
  },
  created () {
    this._loadPagination()
  },
  watch: {
    tableData () {
      // Reset pagination
      this._updatePagination(this.first)

      // Paginate new data
      this._loadPagination()
    }
  }
}
</script>

<style lang="scss" scoped>
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

.vuetable__pagination-arrow {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 40px;
  height: 40px;
  margin: 0 10px;
  background-color: #e1e8ed;
  font-size: 17px;
  line-height: 40px;
  color: #66757F;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 0px 1px rgba(0, 0, 0, .4);

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 10px;
    height: 10px;
    margin: auto;
    border: solid #607d8b;
    border-width: 0 2px 2px 0;
    content: '';
  }

  &:hover {
    background-color: #607D8B;

    &::before {
      border-color: #F5F8FA;
    }
  }
}

.vuetable__pagination-arrow--previous::before {
  left: 17px;
  transform: rotate(135deg);
}

.vuetable__pagination-arrow--next::before {
  left: 11px;
  transform: rotate(-45deg);
}
</style>
