<template>
  <!-- <el-tooltip :content="String(data)" :disabled="data == null || data == ''" :open-delay="500" class="item" effect="dark" placement="top-start"> -->
  <div class="inputBox" @mousedown="clickInput">
    <el-input
      size="small"
      :disabled="disabled"
      @input="input"
      :placeholder="placeholder"
      v-model="data"
      :type="type"
      :min="min"
      :max="max"
      :maxlength="maxlength"
      @blur="blur"
      @focus="focus"
      ref="input"
      clearable
      :class="formatClass"
      @clear="clear"
      @change="change"
      :rows="rows"
      :readonly="readonly"
    >
      <slot name="append" slot="append"></slot>
      <slot></slot>
    </el-input>
    <div v-if="typeof format == 'function'" class="format el-input el-input--small el-input--suffix" :class="{isDisabled: disabled}">
      <div class="format el-input__inner" :style="{zIndex: isFocus ? '-1' : ''}" :class="{isDisabled: disabled, price: price}">{{format(data)}}</div>
    </div>
    <div v-else-if="price" class="format el-input el-input--small el-input--suffix" :class="{isDisabled: disabled}">
      <div class="format el-input__inner" :style="{zIndex: isFocus ? '-1' : ''}" :class="{isDisabled: disabled, price: price}">{{data}}</div>
    </div>
  </div>
  <!-- </el-tooltip> -->
</template>

<script>
  export default {
    name: 'basicInput',
    data() {
      return {
        data: this.value,
        isFocus: false
      }

    },
    watch: {
      value() {
        this.data = this.value
      },
      data() {
        this.$emit('input', this.data)
      }
    },
    computed: {
      formatClass() {
        return {
          notIsFocus: !this.isFocus,
          isFormat: typeof this.format == 'function' || this.price,
          isDisabled: this.disabled && typeof this.format == 'function',
          price: this.price
        }
      }
    },
    created() {
    },
    mounted() {
      this.$refs.input.focus()
      this.$refs.input.blur()
      this.blur()
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
      format: Function,
      formatValue: Function,
      allowNegative: Boolean,
      rows: [String, Number],
      readonly: Boolean,
      price: Boolean
    },
    methods: {
      blur() {
        this.isFocus = false
        this.formatFun()
      },
      formatFun() {
        if (!this.allowNegative) {
          if (this.data < 0) this.data = 0
        }
        // 格式化value
        if (typeof this.formatValue == 'function') {
          this.data = this.formatValue(this.data)
        }
        // 格式化输入框失去焦点时的显示
        if (typeof this.format == 'function') {
          this.format(this.data)
        }
      },
      clickInput() {
        if (this.disabled) return
        this.isFocus = true
        this.$refs.input.focus()
      },
      clear() {
        this.$nextTick(() => {
          this.blur()
        })
      },
      change() {
        this.$emit('change', this.data)
      },
      input() {
        this.$emit('input', this.data)
      },
      focus() {
        if(Number(this.data) == 0) this.data = ''
        this.isFocus = true
        this.$emit('focus', this.data)
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
.inputBox {
  position: relative;
}
.format {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  background: transparent!important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'sans-serif';
  /* border: 1px solid #ccc; */
  border-color: transparent;
}
.format .price {
  text-align: right;
  padding-right: 10px;
}
.format.isDisabled {
  pointer-events: auto;
  cursor:no-drop;
  /*padding-right: 10px;*/
  /*text-align: right;*/
}
.notIsFocus.isFormat >>> input {
  color: transparent!important;
}
.el-table--medium td.spacing-set .cell .isDisabled >>> input.el-input__inner {
  color: transparent!important;
  visibility: hidden;
}
table.el-table__body .isDisabled {
  border-color: transparent!important;
  cursor: pointer;
}
.el-table--medium td.spacing-set .cell .el-form-item.is-error .el-input__inner {
  border-color: transparent;
}
</style>
