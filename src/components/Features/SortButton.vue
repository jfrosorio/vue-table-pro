<template>
  <span
      :class="className"
      @click="_sort"
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
    _resetState (attribute) {
      if (this.attribute !== attribute) {
        this.currentStateIndex = 0
      }
    },
    _getCurrentState: function () {
      return this.states[this.currentStateIndex]
    },
    _sort: function () {
      this._updateStateIndex()
      this._sortTableData()
      this._emitSortedData()
      this._resetPreviousSorted()
    },
    _sortTableData () {
      this.sortedData = this.initialData.slice()

      if (this._getCurrentState() !== 'initial') {
        this.sortedData.sort(this._compareValues)
      }
    },
    _emitSortedData () {
      this.$emit('sort', this.sortedData)
    },
    _resetPreviousSorted () {
      this.$root.$emit('resetState', this.attribute)
    },
    _compareValues: function (a, b) {
      let x = this._sanitize(a[this.attribute])
      let y = this._sanitize(b[this.attribute])

      if (this._getCurrentState() === 'asc') {
        return (x < y) ? -1 : (x > y) ? 1 : 0
      } else {
        return (x > y) ? -1 : (x < y) ? 1 : 0
      }
    },
    _sanitize (value) {
      if (typeof value === 'string') {
        value = value.toLowerCase()
      }

      return value
    },
    _updateStateIndex: function () {
      this.currentStateIndex++

      if (this.currentStateIndex === this.states.length) {
        this.currentStateIndex = 0
      }
    },
    _setInitialState () {
      this.initialData = this.tableData.slice()
    }
  },
  mounted () {
    this.$root.$on('resetState', this._resetState)
    this.$root.$on('madeSearch', debounce(() => {
      this._setInitialState()
      this._sortTableData()
      this._emitSortedData()
    }, 150))
  },
  computed: {
    className () {
      return 'vuetablepro__sortable-state--' + this._getCurrentState()
    }
  },
  created () {
    this._setInitialState()
  }
}
</script>
