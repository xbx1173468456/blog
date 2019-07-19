<!--搜索布局-->
<!--参考页面：src\views\sysManager\groupAuth\userManager\detail.vue    @open="handleOpen"-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="visibleSync"
    :width="width"
    lock-scroll
    v-bind="$attrs"
    v-on="$listeners"
    :top="top"
    append-to-body
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    @close="handleClose"
  >
    <template slot="title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template slot="footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: "basicDialog",
    props: {
      title: {
        type: String,
        default: ''
      },
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      closeOnPressEscape: {
        type: Boolean,
        default: false
      },
      showClose: {
        type: Boolean,
        default: true
      },
      width: {
        type: String,
        default: '70%'
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      top: {
        type: String,
        default: '15vh'
      },
      visible: {
        type: Boolean,
        default: false
      },
      handleClose: {
        type: Function,
        default: () => () => {}
      }
    },
    computed: {
      visibleSync: {
        get() {
          return this.visible
        },
        set(val) {
          this.$emit('update:visible', val)
        }
      },
    },
    methods: {
      handleOpen() {
       // this.$emit('open')
      }
    }
  }
</script>
