<template>
  <div class="chart-container">
    <div :id="id"  :style="{height:height,width:width}" ></div>
    <div class="chart-empty" ref="refEmpty" :style="{display: display}">暂无数据</div>
  </div>
</template>
<script>
  export default {
    name: "basicChart",
    props: {
        /***
         * 父组件需要传递的参数：id，width，height，option
         */
      id: {
        type: String,
        default: 'echarts-dom' + Date.now() + Math.random()
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "350px"
      },
      chartTypeData:{
        type:String,
        default:'bar'
      },
      option: {
        type: Object,
        default: () =>{}
      }
    },
    data() {
      return {
        chart: "" , //echarts实例
        display:'none',
        defaultOpt:{
          title: {
            text: 'title',
            x: '12%',
            top: '20',
          },
          grid: { // 图表位置
            left: '15%',
            bottom:'10%'
          },
          tooltip: {
            position: function (pos, params, dom, rect, size) {
              // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
              var obj = {top: 60};
              obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
              return obj;
            }
          },
       //    color: ['#4f81bd', '#c0504d'], //图例颜色
          legend: { //图例
            left: '10%',
            top: '10%',
            textStyle: {
              color: '#90979c'
            },
          },
        },
      }
    },
    computed:{
      initOpt(){
        return Object.assign({},this.defaultOpt,this.option)
      }
    },
    mounted() {
      this.$nextTick( () =>{
        this.init();
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose() //释放图表组件
      this.chart = null

    },
    destroyed(){
      window.removeEventListener("resize",this.chartResize)
    },
    watch:{
      initOpt(newOption) {
        if(this.chartTypeData ==='bar' && !(newOption.xAxis && newOption.xAxis.data.length > 0)){
          this.display = 'block'
          return
        }

        if(this.chartTypeData ==='pie'&& !(newOption.series && newOption.series[0].data.length > 0)){
          this.display = 'block'
          return
        }
        this.checkAndSetOption(newOption)
      }
    },
    methods: {
      init() {
        this.chart = this.$echarts.init(document.getElementById(this.id),'shine');
        this.checkAndSetOption(this.initOpt)
        window.addEventListener("resize",this.chartResize)
      },
      chartResize(){
        this.chart.resize()
      },
      checkAndSetOption(option){
        //console.log('option',option)
        if(this.isValidOption(option)){
          this.chart.setOption(option);//渲染出来
         //this.chart.hideLoading();    //隐藏加载动画
        }else{
        // this.chart.showLoading();   //加载动画
        }
      },

      /**
       * 判断option
       * 1. 是否为对象；
       * 2. 是否为空对象；
       * 3. 是否包含 series 键；
       * 4. series 是否为数组；
       * 5. series 数组是否为空。
       * */
      isValidOption(option) {
        return this.isObject(option) && !this.isEmptyObject(option)
          && this.hasSeriesKey(option)
          && this.isSeriesArray(option) && !this.isSeriesEmpty(option)
      },

      isObject(option) {
        return Object.prototype.isPrototypeOf(option)
      },

      isEmptyObject(option) {
        return Object.keys(option).length === 0
      },

      hasSeriesKey(option) {
        return !!option['series']
      },

      isSeriesArray(option) {
        return Array.isArray(option['series'])
      },

      isSeriesEmpty(option) {
        return option['series'].length === 0
      },
    }

  };
</script>
<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    min-height: 350px;
    height: 100%;
  }
  .chart-empty{
    position: absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    line-height: 2;
    font-size: 14px;
   background-color: #f3f6fa;
    text-align: center;
    color:#909399;
  }
  
</style>
