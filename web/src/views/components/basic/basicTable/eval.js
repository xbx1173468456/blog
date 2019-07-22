import Vue from 'vue'

export function addAttrs(data) {
  data.forEach((item, index) => {
    const tableId = index + '';
    Vue.set(item, 'tableId', tableId)
    Vue.set(item, 'listId', tableId)//保存到后端
    const tableCode = (index < 9 ? '0' + (index + 1 + '') : (index + 1 + '')) + '';
    Vue.set(item, 'tableCode', tableCode)
  })
}
