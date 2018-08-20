<template>
  <table>
    <caption>{{ caption }}</caption>
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
    name: 'Vue_table_pro',
    props: {
      caption: {
         type: String
      },
    },
    data () {
      return {
        tableData: [
          {
            name: 'Lion',
            age: 5,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 3,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 2,
            weight: 20,
          },
          {
            name: 'Lion',
            age: 7,
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
