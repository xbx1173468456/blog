import Vue from 'vue'
import processPersonnelSelect from './index.vue'

const ProcessPersonnelSelect = Vue.extend(processPersonnelSelect)
const PPSelect = function () { }
PPSelect.open = (config) => {
  return new Promise((reslove, reject) => {
    const body = document.body
    const el = new ProcessPersonnelSelect({
      el: document.createElement('div'),
      data: {
        vIf: true,
        ...config,
        success: reslove,
        error: reject
      }
    })
    initEl(el)
    body.append(el.$el)
  })
}

function initEl(el) {
  el.close = close
}

function close() {
  this.vIf = false
}

export default PPSelect
