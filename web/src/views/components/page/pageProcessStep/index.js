import Vue from 'vue'
import pageProcessStep from './index.vue'

const pageProcessSteps = Vue.extend(pageProcessStep)
const ProcessStep = function () {}
ProcessStep.open = (config) => {
  console.log(config)
  return new Promise((reslove, reject) => {
    const body = document.body
    const el = new pageProcessSteps({
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

export default ProcessStep
