<template>
  <!-- <el-tooltip :content="String(data)" :disabled="data == null || data == ''" :open-delay="500" class="item" effect="dark" placement="top-start"> -->
    <el-input
      size="small"
      :disabled="disabled"
      @input="handleInput"
      :placeholder="placeholder"
      v-model="isFormat ? foData : data"
      :type="type"
      :min="min"
      :max="max"
      :maxlength="maxlength"
      @blur="blur"
      @focus="focus"
      ref="input"
      clearable
    >
      <slot name="append" slot="append"></slot>
      <slot></slot>
    </el-input>
  <!-- </el-tooltip> -->
</template>

<script>
  export default {
    name: 'basicInput',
    data() {
      return {
        data: this.value,
        foData: ''
      }
    },
    watch: {
      value() {
        this.data = this.value
        this.handleInput()
      }
    },
    computed: {
      isFormat() {
        return typeof this.formatData === 'function'
      }
    },
    created() {
      // this.blur()
      this.handleInput()
    },
    mounted() {
      this.$refs.input.focus()
      this.$refs.input.blur()
    },
    props: {
      value: {
        default: () => {''}
      },
      disabled: Boolean,
      placeholder: String,
      type: {
        type: String,
        default: () => 'text'
      },
      min: Number,
      max: Number,
      maxlength: Number,
      format: {
        type: Function,
        default: val => val
      },
      formatMoney: Boolean,
      formatData: Function
    },
    methods: {
      handleInput() {
        if (this.isFormat) {
          this.foData = this.formatData(this.data)
        }
        this.$emit('input', this.data)
      },
      blur() {
        this.data = this.format(this.data)
      },
      focus() {
        if (this.formatMoney) {
          this.data = String(this.data)
          this.data = this.data.replace(/,/g, '')
        }
      }
    }
  }
</script>

<style scoped>
.el-input >>> input {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-input >>> input::-webkit-outer-spin-button,
.el-input >>> input::-webkit-inner-spin-button{
   -webkit-appearance: none !important;
}
.el-input >>> input[type="number"]{-webkit-appearance:textfield;}
</style>
