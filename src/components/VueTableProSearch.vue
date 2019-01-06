<template>
  <input
      type="text"
      :class="className"
      :placeholder="placeholder"
      v-model="value"
      @input="$_vueTablePro_search"
  >
</template>

<script>
import debounce from 'lodash.debounce'

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
    $_vueTablePro_getFilteredResults (results, needles) {
      const fields = this.$parent.$_vueTablePro_getDisplayableKeys()

      return results.filter(row => {
        let needleMatches = 0

        for (let needleIndex = 0; needleIndex < needles.length; needleIndex++) {
          const currentNeedle = needles[needleIndex].trim()

          for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
            const field = fields[fieldIndex]

            if (row.hasOwnProperty(field)) {
              const haystack = String(row[field]).toLowerCase()
              const madeMatch = haystack.includes(currentNeedle)

              if (madeMatch) {
                needleMatches++
                break
              }
            }
          }

          if (needleMatches === needleIndex) break
        }

        return needleMatches === needles.length
      })
    },
    $_vueTablePro_search: debounce(function () {
      const needles = this.value.toLowerCase().split(' ').map(s => s.trim()).filter(s => s.length)
      let rows = this.$parent.rows
      let results = rows

      if (needles.length) {
        results = this.$_vueTablePro_getFilteredResults(results, needles)
      }

      this.$emit('search', results)
      this.$root.$emit('madeSearch')
    }, 300)
  }
}
</script>
