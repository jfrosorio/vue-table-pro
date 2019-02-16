import VueTablePro from './VueTablePro.vue'

const VueTableProPlugin = {
  install (Vue, options) {
    Vue.component(VueTablePro.name, VueTablePro)
  }
}

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTableProPlugin)
}

export default VueTableProPlugin
export { VueTablePro }
