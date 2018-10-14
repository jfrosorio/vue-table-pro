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
      value: ''
    }
  },
  props: {
    className: String,
    placeholder: String
  },
  methods: {
    _search () {
      this.$emit('input', this.value)
    }
  }
}
</script>
