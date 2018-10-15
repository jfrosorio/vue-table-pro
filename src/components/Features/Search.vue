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
  data () {
    return {
      className: this.config.className || '',
      placeholder: this.config.placeholder || '',
      value: ''
    }
  },
  props: {
    config: Object
  },
  methods: {
    _search () {
      const needle = this.value.toLowerCase()
      const headers = this.$parent.config.headers
      let rows = this.$parent.globalData

      const data = rows.filter((row) => {
        let hasMatch = false

        for (let header of headers) {
          if (row.hasOwnProperty(header)) {
            const haystack = String(row[header]).toLowerCase()

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
