import Vue from 'vue'
import VueTablePro from './Table.vue'

const Components = {
  VueTablePro
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
