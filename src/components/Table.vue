<template>
  <table>
    <caption>{{ tableTitle }}</caption>
    <thead>
      <tr>
        <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(entry, index) in showData" :key="index">
        <td v-for="(property, index) in entry" :key="index">{{ property }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Vue_table_pro',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tableTitle: this.config.title || 'Table Title',
      tableData: this.config.data || [],
      showData: [],
      tableHeaders: this.config.headers || []
    }
  },
  methods: {
    removeProperty (obj, property) {
      return  Object.keys(obj).reduce((acc, key) => {
        if (key !== property) {
          return {...acc, [key]: obj[key]}
        }
        return acc;
      }, {})
    },
    addColumnsByHeader () {
      this.tableData.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (this.tableHeaders.indexOf(key) === -1) {
            const filtered = this.removeProperty(entry, key)
            this.showData.push(filtered)
          }
        })
      })
    },
    addAllCollumns () {
      this.tableData.forEach((entry) => {
        Object.keys(entry).forEach((key) => {
          if (this.tableHeaders.indexOf(key) === -1) {
            this.tableHeaders.push(key)
          }
        })
      })
      this.showData = this.tableData
    }
  },
  created () {
    if (this.tableHeaders.length) {
      this.addColumnsByHeader()
    } else {
      this.addAllCollumns()
    }
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
