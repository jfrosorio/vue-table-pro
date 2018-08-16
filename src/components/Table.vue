<template>
  <table>
    <caption v-if="caption">{{ caption }}</caption>
    <thead>
      <tr>
        <th v-for="header in headers" @click="headingClicked">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in tableData">
        <td v-for="property in entry">{{ property }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      'caption': null,
      'data': {
        type: Array,
        required: true,
      },
    },
    data () {
      return {
        tableData: [
          {
            name: 'Lion',
            age: 4,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 4,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 4,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 4,
            weight: 20,
          },
        ],
        headers: [],
      }
    },
    methods: {
      headingClicked () {
      },
      sort () {
      },
    },
    mounted () {
      this.tableData.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (this.headers.indexOf(key) === -1) {
            this.headers.push(key)
          }
        })
      })
    },
  }
</script>

<style scoped>

</style>
