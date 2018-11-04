<template>
  <input
      type="text"
      :class="className"
      :placeholder="placeholder"
      v-model="value"
      @input="_search"
  >
</template>

<script>
export default {
  name: 'Search',
  props: {
    className: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Type your search'
    }
  },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    _search () {
      const needle = this.value.toLowerCase()
      let rows = this.$parent.rows

      const data = rows.filter((row) => {
        let hasMatch = false

        for (let key of this.$parent._getDisplayableKeys()) {
          if (row.hasOwnProperty(key)) {
            const haystack = String(row[key]).toLowerCase()

            hasMatch = haystack.includes(needle)

            if (hasMatch) break
          }
        }

        return hasMatch
      })

      this.$emit('search', data)
    }
  }
}
</script>
