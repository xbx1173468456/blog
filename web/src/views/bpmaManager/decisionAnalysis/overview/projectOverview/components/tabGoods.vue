<template>
  <!-- v-if="'goods' === activeName"    :showSummary="true"-->
  <basic-table ref="refGoodsTableData"
               :dataTable="goodsTableData"
               :columns="columnsObj.columns"
               :mergeColumn="mergeColumn"
               @current-change="handleCurrentChange"
               :isPagination="false"
               :height="goodsTableHeight"
  >
    <template slot="slot-many-column">
      <el-table-column label="预算" header-align="center" >
        <el-table-column
          v-for="item in columnsObj.budget"
          :prop="item.value"
          :label="item.text"
          :key="item.value"
          :min-width="item.minWidth"
          :width="item.width"
          :align="item.align||'center'"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :class-name="item.className"
          :formatter="format"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column label="实际" header-align="center" >
        <el-table-column
          v-for="item in columnsObj.actual"
          :prop="item.value"
          :label="item.text"
          :key="item.value"
          :min-width="item.minWidth"
          :width="item.width"
          :align="item.align||'center'"
          :header-align="item.headerAlign"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :class-name="item.className"
          :formatter="format"
        >
        </el-table-column>
      </el-table-column>
      <el-table-column
        v-for="item in columnsObj.diffValue"
        :prop="item.value"
        :label="item.text"
        :key="item.value"
        :min-width="item.minWidth"
        :width="item.width"
        :align="item.align||'center'"
        :header-align="item.headerAlign"
        :show-overflow-tooltip="item.showOverflowTooltip"
        :class-name="item.className"
        :formatter="format"
      >
      </el-table-column>
    </template>

  </basic-table>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";

  import formatBasic from "@/utils/mixins/formatBasic";
  /**
   * api
   * */
  import {
    getGoodsTable
  } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'
    export default {
        name: 'tabGoods',
      mixins: [computed, methods,formatBasic],
      props:{
        initIdsData:String,
        activeNameData:String,
      },
      data(){
          return {
            filterIds: undefined,
            goodsTableHeight:500,
            goodsTableData:{
              data: [],
              total:0
            },
            modelSearchFilter:{},
            mergeColumn:{ // 合并单元格索引
              indexs: [1],
              name: 'proName'
            },
            columnsObj: {
              columns:[
                {
                  text: '项目名称',
                  value: 'proName',
                  minWidth: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '物资编码',
                  value: 'code',
                  width: '130',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '物资名称',
                  value: 'name',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '计量单位',
                  value: 'units',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],
              budget:[
                {
                  text: '预算总量',
                  value: 'budgetSum',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '预算均价',
                  value: 'budgetUnitPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '预算总价',
                  value: 'budgetTotalPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '预算百分占比(%)',
                  value: 'budgetPercent',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],
              actual:[
                {
                  text: '实际总量',
                  value: 'actualSum',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '实际均价',
                  value: 'actualUnitPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '实际总价',
                  value: 'actualTotalPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '实际百分占比(%)',
                  value: 'actualPercent',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],
              diffValue:[
                {
                  text: '预实量差',
                  value: 'defSum',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },{
                  text: '预实价差',
                  value: 'defPrice',
                  width: '200',
                  align: "right",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ]
            },

          }
      },
      mounted(){
        let _this = this
        this.bus.$on('change',function (ids) {
          _this.filterIds = ids
          console.log('bus on  goods _this.filterIds', _this.filterIds)
        })
      },
      computed:{
        initIds(){
          return this.initIdsData
        },
        activeName(){
          return this.activeNameData
        }
      },
      watch:{
        initIds(newVal){
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getGoodsTableData()
        },
        filterIds(newVal) {
          this.$set(this.modelSearchFilter,'proId',newVal)
          this.getGoodsTableData()
        },
        activeName(newVal){
          if(newVal === 'goods'){
            let _this = this
            this.$nextTick(() => {
              _this.heightInit(_this.getInnerHeight());
            });
          }
        },
        screenHeight(innerHeight) {
          this.heightInit(innerHeight);
        }
      },
      methods:{
        /**
         * 高度初始化
         * @param innerHeight
         */
        heightInit(innerHeight) {
          if (!this.$refs.refGoodsTableData) return
          const offsetTop = this.$refs.refGoodsTableData.$el.getBoundingClientRect().top;
          this.goodsTableHeight = innerHeight - offsetTop - 20;
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row){
          console.log(row)
        },
        getGoodsTableData(){
          return getGoodsTable(this.modelSearchFilter).then((res) =>{
            console.log('goods',res)
            if(res&& res.status ===200){
              this.goodsTableData.data = res.data
            }else{
              this.$message({ message:res.message,type:'warning' })
            }
          }).catch(err=>console.log(err))

        },
        format(row, column, cellValue, index){
          return this.$utilsBasic.toThousands(cellValue)
        },
      }
    }
</script>

<style scoped>

</style>
