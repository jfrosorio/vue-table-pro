<template>
  <span
      :class="$_vueTablePro_className"
      @click="$_vueTablePro_sort"
  >
    <slot></slot>
  </span>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  data () {
    return {
      states: ['initial', 'asc', 'desc'],
      currentStateIndex: 0,
      initialData: [],
      sortedData: []
    }
  },
  props: {
    attribute: {
      type: String,
      default: null
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    $_vueTablePro_resetState (attribute) {
      if (this.attribute !== attribute) {
        this.currentStateIndex = 0
      }
    },
    $_vueTablePro_getCurrentState: function () {
      return this.states[this.currentStateIndex]
    },
    $_vueTablePro_sort: function () {
      this.$_vueTablePro_updateStateIndex()
      this.$_vueTablePro_sortTableData()
      this.$_vueTablePro_emitSortedData()
      this.$_vueTablePro_resetPreviousSorted()
    },
    $_vueTablePro_sortTableData () {
      this.sortedData = this.initialData.slice()

      if (this.$_vueTablePro_getCurrentState() !== 'initial') {
        this.sortedData.sort(this.$_vueTablePro_compareValues)
      }
    },
    $_vueTablePro_emitSortedData () {
      this.$emit('sort', this.sortedData)
    },
    $_vueTablePro_resetPreviousSorted () {
      this.$root.$emit('resetState', this.attribute)
    },
    $_vueTablePro_compareValues: function (a, b) {
      let x = this.$_vueTablePro_sanitize(a[this.attribute])
      let y = this.$_vueTablePro_sanitize(b[this.attribute])

      if (this.$_vueTablePro_getCurrentState() === 'asc') {
        return (x < y) ? -1 : (x > y) ? 1 : 0
      } else {
        return (x > y) ? -1 : (x < y) ? 1 : 0
      }
    },
    $_vueTablePro_sanitize (value) {
      if (typeof value === 'string') {
        value = value.toLowerCase()
      }

      return value
    },
    $_vueTablePro_updateStateIndex: function () {
      this.currentStateIndex++

      if (this.currentStateIndex === this.states.length) {
        this.currentStateIndex = 0
      }
    },
    $_vueTablePro_setInitialState () {
      this.initialData = this.tableData.slice()
    }
  },
  mounted () {
    this.$root.$on('resetState', this.$_vueTablePro_resetState)
    this.$root.$on('madeSearch', debounce(() => {
      this.$_vueTablePro_setInitialState()
      this.$_vueTablePro_sortTableData()
      this.$_vueTablePro_emitSortedData()
    }, 150))
  },
  computed: {
    $_vueTablePro_className () {
      return 'vuetablepro_$_vueTablePro_sortable-state--' + this.$_vueTablePro_getCurrentState()
    }
  },
  created () {
    this.$_vueTablePro_setInitialState()
  }
}
</script>
