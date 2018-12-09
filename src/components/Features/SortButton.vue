<template>
  <span
      :class="className"
      @click="_sort"
  >
    <slot></slot>
  </span>
</template>

<script>
export default {
  data () {
    return {
      states: ['initial', 'asc', 'desc'],
      currentStateIndex: 0,
      initialData: []
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

      const state = this._getCurrentState()

      if (state !== 'initial') {
        this.tableData.sort(this._compareValues)
      }

      this.$emit('sort', state === 'initial' ? this.initialData.slice() : this.tableData)
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
    }
  },
  mounted () {
    this.$root.$on('resetState', this._resetState)
  },
  computed: {
    className () {
      return 'vuetable__sortable-state--' + this._getCurrentState()
    }
  },
  created () {
    this.initialData = this.tableData.slice()
  }
}
</script>