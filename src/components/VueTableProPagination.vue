<template>
  <div
    v-if="$_vueTablePro_hasTableData"
    v-show="isNecessary"
    class="vuetablepro__pagination">

    <button
      v-if="arrows"
      v-show="hasMoreUntilFirst"
      class="vuetablepro__pagination-arrow vuetablepro__pagination-arrow--previous"
      @click="$_vueTablePro_updatePagination(currentPage - 1)"/>

    <button
      :class="$_vueTablePro_isCurrentPage(first)"
      class="vuetablepro__pagination-page"
      @click="$_vueTablePro_updatePagination(first)">
      {{ first }}
    </button>

    <span
      v-show="hasMoreUntilFirst"
      class="vuetablepro__pagination-ellipsis">...</span>

    <button
      v-for="page in navigationPages"
      :class="$_vueTablePro_isCurrentPage(page)"
      :key="page"
      class="vuetablepro__pagination-page"
      @click="$_vueTablePro_updatePagination(page)">
      {{ page }}
    </button>

    <span
      v-show="hasMoreUntilLast"
      class="vuetablepro__pagination-ellipsis">...</span>

    <button
      :class="$_vueTablePro_isCurrentPage(last)"
      class="vuetablepro__pagination-page"
      @click="$_vueTablePro_updatePagination(last)">
      {{ last }}
    </button>

    <button
      v-if="arrows"
      v-show="hasMoreUntilLast"
      class="vuetablepro__pagination-arrow vuetablepro__pagination-arrow--next"
      @click="$_vueTablePro_updatePagination(currentPage + 1)"/>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    $_vueTablePro_tableData: {
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
      default: 10,
      validator: function (perPage) {
        // Minimum rows required for pagination
        return perPage > 0
      }
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
    $_vueTablePro_paginateTableData () {
      // Set paginated data limits
      const end = this.currentPage * this.perPage
      const start = end - this.perPage

      // Build paginated data
      const paginatedData = this.$_vueTablePro_tableData.filter((entry, index) => {
        return index >= start && index < end
      })

      // Serve paginated data
      this.$emit('pagination', paginatedData)
    },
    $_vueTablePro_loadPagination () {
      // Get table data
      this.total = this.$_vueTablePro_tableData.length

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
        this.$_vueTablePro_paginateTableData()
      } else if (this.$_vueTablePro_tableData.length && !this.hasShownData) {
        this.$emit('pagination', this.$_vueTablePro_tableData)
      }
    },
    $_vueTablePro_isCurrentPage (page) {
      return page === this.currentPage ? 'vuetablepro__pagination-page--current' : ''
    },
    $_vueTablePro_checkIfHasMoreUntilFirst () {
      if (this.isFirstItemOfNav && this.currentPage <= this.pageSize) {
        this.hasMoreUntilFirst = false
      } else if (this.isLastItemOfNav || this.currentPage > this.pageSize) {
        this.hasMoreUntilFirst = true
      }
    },
    $_vueTablePro_checkIfHasMoreUntilLast () {
      const remainingPages = this.last - this.currentPage

      if (this.isFirstItemOfNav || this.currentPage + this.pageSize < this.last) {
        this.hasMoreUntilLast = true
      } else if (this.isLastItemOfNav && remainingPages < this.pageSize) {
        this.hasMoreUntilLast = false
      }
    },
    $_vueTablePro_navigateBack () {
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
    $_vueTablePro_goToFirstPage () {
      this.hasMoreUntilFirst = false
      this.navigationPages = []
      this.paged = 1

      for (let index = this.first + 1; this.navigationPages.length < this.pageSize - 1; index++) {
        this.navigationPages.push(index)
      }
    },
    $_vueTablePro_navigateForwards () {
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
    $_vueTablePro_goToLastPage () {
      this.hasMoreUntilLast = false
      this.navigationPages = []
      this.paged = Math.round(this.last / (this.pageSize - 2))

      const lastPagesLength = this.pageSize - 1

      for (let index = this.last - 1; this.navigationPages.length < lastPagesLength; index--) {
        this.navigationPages.unshift(index)
      }
    },
    $_vueTablePro_updatePagination (page) {
      if (page < this.first || page > this.last) return
      this.currentPage = page
      this.isFirstItemOfNav = this.currentPage === this.navigationPages[0]
      this.isLastItemOfNav = this.currentPage === this.navigationPages[this.navigationPages.length - 1]

      const isFirstPage = this.currentPage === this.first
      const isLastPage = this.currentPage === this.last
      const madePagination = this.paged !== 1

      if (this.needsMoreNavigation) {
        this.$_vueTablePro_checkIfHasMoreUntilFirst()
        this.$_vueTablePro_checkIfHasMoreUntilLast()

        if (this.isFirstItemOfNav && madePagination) {
          this.$_vueTablePro_navigateBack()
        }

        if (isFirstPage) {
          this.$_vueTablePro_goToFirstPage()
        }

        if (this.isLastItemOfNav) {
          this.$_vueTablePro_navigateForwards()
        }

        if (isLastPage && this.hasMoreUntilLast) {
          this.$_vueTablePro_goToLastPage()
        }
      }

      this.$_vueTablePro_paginateTableData()
    }
  },
  computed: {
    $_vueTablePro_hasTableData () {
      return this.$_vueTablePro_tableData.length > 0
    }
  },
  created () {
    this.$_vueTablePro_loadPagination()
  },
  watch: {
    $_vueTablePro_tableData () {
      // Reset pagination
      this.$_vueTablePro_updatePagination(this.first)

      // Paginate new data
      this.$_vueTablePro_loadPagination()
    }
  }
}
</script>
