<template>
  <div class="vuetable__pagination" v-show="enabled && isNecessary">
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
  </div>
</template>

<script>
export default {
  name: 'TablePagination',
  props: {
    config: {
      type: Object,
      required: false
    }
  },
  data () {
    return {
      first: 1,
      size: 5,
      paged: 1,
      currentPage: 1,
      perPage: 10,
      enabled: true,
      isNecessary: false,
      settings: this.config || null
    }
  },
  methods: {
    _paginateTableData () {
      const end = this.currentPage * this.perPage
      const start = end - this.perPage

      const paginatedData = this.allShowData.filter((entry, index) => {
        return index >= start && index < end
      })
      this.$emit('pagination', paginatedData)
    },
    _loadPagination () {
      this.allShowData = this.$parent.showData
      this.total = this.$parent.showData.length

      this.enabled = this.settings !== null ? this.enabled : !this.enabled
      this.size = this.settings.size ? this.settings.size - this.first : this.size
      this.perPage = this.settings.perPage || this.perPage
      this.isNecessary = this.total > this.perPage

      this.needsMoreNavigation = this.total > this.perPage * this.size
      this.hasMoreUntilLast = this.needsMoreNavigation
      this.hasMoreUntilFirst = this.needsMoreNavigation && this.paged > 1
      this.last = Math.ceil(this.total / this.perPage)
      this.pagesLength = this.hasMoreUntilLast ? this.size - 1 : this.last - 2
      this.navigationPages = Array.from({length: this.pagesLength}, (v, k) => k + 2)

      if (this.isNecessary && this.enabled) {
        this._paginateTableData()
      }
    },
    _isCurrentPage (page) {
      return page === this.currentPage ? 'vuetable__pagination-page--current' : ''
    },
    _updatePagination (page) {
      this.currentPage = page

      const isFirstItemOfNav = this.currentPage === this.navigationPages[0]
      const isFirstPage = this.currentPage === this.first
      const isLastItemOfNav = this.currentPage === this.navigationPages[this.navigationPages.length - 1]
      const isLastPage = this.currentPage === this.last
      const remainingPages = this.last - this.currentPage
      const madePagination = this.paged !== 1

      if (this.needsMoreNavigation) {
        if (isFirstItemOfNav && this.currentPage <= this.size) {
          this.hasMoreUntilFirst = false
        } else if (isLastItemOfNav || this.currentPage > this.size) {
          this.hasMoreUntilFirst = true
        }

        if (isFirstItemOfNav || this.currentPage + this.size < this.last) {
          this.hasMoreUntilLast = true
        } else if (isLastItemOfNav && remainingPages < this.size) {
          this.hasMoreUntilLast = false
        }

        if (isFirstItemOfNav && madePagination) {
          this.navigationPages = this.navigationPages.map(page => page - (this.size - 2)).filter(page => page > this.first)
          const stepPagesLength = (this.size - 1)

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
        }

        if (isFirstPage) {
          this.hasMoreUntilFirst = false
          this.navigationPages = []
          this.paged = 1

          for (let index = this.first + 1; this.navigationPages.length < this.size - 1; index++) {
            this.navigationPages.push(index)
          }
        }

        if (isLastItemOfNav) {
          const startingPoint = this.currentPage
          const endingPoint = startingPoint + (this.size - 1)
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
        }

        if (isLastPage && this.hasMoreUntilLast) {
          this.hasMoreUntilLast = false
          this.navigationPages = []
          this.paged = Math.round(this.last / (this.size - 2))

          const lastPagesLength = this.size - 1

          for (let index = this.last - 1; this.navigationPages.length < lastPagesLength; index--) {
            this.navigationPages.unshift(index)
          }
        }
      }

      this._paginateTableData()
    }
  },
  created () {
    this._loadPagination()
  }
}
</script>

<style scoped>
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
