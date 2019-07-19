<template>
  <div>
    <basic-form-item :label="label">
      <basic-input disabled v-model="data" :format="formatIsOrNot"></basic-input>
    </basic-form-item>
  </div>
</template>

<script>
import formatEnum from '@/utils/mixins/formatEnum.js'
import methods from '@/utils/mixins/methods'
import computed from '@/utils/mixins/computed'
export default {
  name: 'basicIfOrNot',
  mixins: [formatEnum, methods, computed],
  data() {
    return {
      data: null
    }
  },
  props: {
    value: [String, Number],
    label: {
      type: String,
      default: () => '是否'
    }
  },
  created() {
    this.getEnumData(['GetValidateStatusData', 'GetIsOrNotData'])
  },
  watch: {
    data(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.data = val
    }
  }
}
</script>

<style>
</style>
