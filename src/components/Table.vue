<template>
  <table>
    <caption>{{ caption }}</caption>
    <thead>
      <tr>
        <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in tableData" :key="index">
        <td v-for="(property, index) in entry" :key="index">{{ property }}</td>
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
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tableData: this.data,
      headers: []
    }
  },
  methods: {
  },
  mounted () {
    this.tableData.forEach((entry) => {
      Object.keys(entry).forEach((key) => {
        if (this.headers.indexOf(key) === -1) {
          this.headers.push(key)
        }
      })
    })
  }
}
</script>

<style scoped>

  table {
    width: 100%;
    max-width: 910px;
    margin: 0 auto;
  }

  caption {
    text-align: center;
    background-color: #f1f1f1;
    font-weight: 700;
    padding: 10px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
    padding: 10px;
  }

  td {
    background-color: #f8f8f8;
    text-align: left;
    padding: 10px;
  }

</style>
