<!--分栏左右布局-->
<!--参考页面1：src\views\sysManager\sysBaseSet\monthYearManager-->
<!--参考页面2：src\views\bpmaManager\early\itemInfo\itemAuth\index.vue-->
<template>
  <div class="flex-layout">
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
      <split-pane :split="split" :min-percent="minPercent" :default-percent="defaultPercent">
        <template slot="paneL">
          <slot name="leftContainer">
            左边容器
          </slot>
        </template>
        <template slot="paneR">
          <slot name="rightContainer">
            右边容器
          </slot>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
  import splitPane from 'vue-splitpane'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";

  export default {
    name: "basicSplitPane",
    components: {
      splitPane
    },
    mixins: [computed, methods],
    props: {
      split:{
        type:String,
        default:'vertical' //horizontal,vertical
      },
      minPercent: {
        type: Number,
        default: 30
      },
      defaultPercent: {
        type: Number,
        default: 50
      },
      subtractSplitPaneHeight: {
        type: Number,
        default: 14
      }
    },
    data() {
      return {
        heightSplitPane: 100,
      }
    },
    mounted() {
      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        if (!this.$refs.refSplitPane) return
        const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
        this.heightSplitPane = innerHeight - offsetTopSplitPane - this.subtractSplitPaneHeight;
      },
    }
  }
</script>
