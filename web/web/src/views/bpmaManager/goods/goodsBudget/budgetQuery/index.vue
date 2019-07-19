<!--todo: 待调样式，对api-->

<template>
  <basic-split-pane class="goodsBudget-budgetQuery-container bpmaManager-container-list"
                    :default-percent='75'
                    :min-percent='25'
  >
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-form :inline="true" class="form-inline-search left">
            <el-form-item label="物资类型">
              <el-input  size="small" readonly
                         v-model="modelSearchFilter.type"
                         placeholder="请选择物资类型">
                <el-button
                  size="small"
                  slot="append"
                  icon="el-icon-plus"
                  @click="toipClick('materialDictionary')"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="物资名称">
              <el-input size="small" clearable v-model="modelSearchFilter.name" placeholder="请输入物资名称"></el-input>
            </el-form-item>
            <el-form-item label="规格型号">
              <el-input size="small" clearable v-model="modelSearchFilter.model" placeholder="请输入规格型号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button size="small" @click="handleBudgetQuery" icon="el-icon-search" type="primary">搜索</el-button>
              <el-button size="small" icon="el-icon-minus" type="primary" plain>重置</el-button>
            </el-form-item>
          </el-form>
        </basic-handler>

        <basic-table ref="refBudgetTableData"
                     :dataTable="budgetTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllBudgetData"
        >

        <!--  <template slot-scope="obj" slot="price">
            {{formatToThousands(obj.scope.row.price)}}
          </template>
          <template slot-scope="obj" slot="payedPrice">
            {{formatToThousands(obj.scope.row.payedPrice)}}
          </template>-->

        </basic-table>

        <!--引入物资类型弹窗-->
        <basic-dialog v-el-drag-dialog title="引入物资类型-选择"
                       :visible.sync="visibleSyncMaterialDictionary"
        >
          <dialog-material-dictionary @selectionChange="selectionChange"
                                      filterValid v-if="visibleSyncMaterialDictionary"
          >
          </dialog-material-dictionary>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
            <el-button @click="handleChange" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
      </div>
    </template>

    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="budgetData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
      </div>
    </template>

  </basic-split-pane>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'

  /**
   * api
   * */
  import {
    getAllGoodsBudget,
    getAllGoodsBudgetItem
  } from "@/api/bpmaManager/goods/goodsBudget/budgetQuery/index.js"
  import { getDictionaryDataByTypeFilter }from '@/api/common/dataDictionary.js'

    export default {
        name: 'budgetQuery',
      mixins: [computed, methods, formatEnum,formatBasic],
      components:{
        dialogMaterialDictionary
      },
      data () {
            return {
              modelSearchFilter: {
                page:1,
                limit:10,
                fuzzy: '',
                fuzzyKeys:'',
                proId:undefined,
                validateStatus: 1
              },
              budgetTableData:{
                data: [],
                total:0
              },
              currentRow:null, //表格当前行
              columns: [ //表格列

                {
                  text: '编码',
                  value: 'code',
                  width: '130',
                  align: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '名称',
                  value: 'name',
                  minWidth: 100,
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '规格型号',
                  value: 'model',
                  width: '100',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '计量单位',
                  value: 'unit',
                  width: '80',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '预算总量',
                  value: 'sum',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '预算总价',
                  value: 'totalPrice',
                  width: '100',
                  align: "center",
                  showOverflowTooltip: true
                }, {
                  text: '变更总量',
                  value: 'changedSum',
                  width: '100',
                  align: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '变更总价',
                  value: 'changedTotalPrice',
                  width: '100',
                  align: "center",
                  showOverflowTooltip: true
                }, {
                  text: '变更后总量',
                  value: 'changedAllSum',
                  width: '100',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }, {
                  text: '变更后总价',
                  value: 'changedAllTotalPrice',
                  width: '140',
                  align: "center",
                  headerAlign: "center",
                  showOverflowTooltip: true
                }
              ],

              proData:{},
              selectData: {
                data: [],
                key: 'id',
                name: 'name'
              },
              budgetData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],

              /**
               * 物资类型 弹窗
               * */
              type: null,
              visibleSyncMaterialDictionary: false,
              selectedRow: {},

            }
      },
      created() {
        this.getAllItem();
        this.getStage();
      },
      methods: {
        contractChange(data) {

          this.proData = data;
          console.log('data', data)
          if (!data) {

            return this.budgetTableData.data = []
          }
          this.modelSearchFilter.proId = data.id;
          this.modelSearchFilter.proName = data.name;
          this.getAllBudgetData();
        },

        /**
         * 获取预算列表所有数据
         * */
        getAllBudgetData () {
          // console.log('this.modelSearchFilter',this.modelSearchFilter)
          getAllGoodsBudget(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.budgetTableData.data = res.data.rows;
              this.budgetTableData.total = res.data.total;
              console.log('获取预算列表所有数据',res)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 获取预算项目所有数据
         * */
        getAllItem () {
          getAllGoodsBudgetItem().then((res) =>{

            if(res.status && res.status === 200){
              console.log('获取预算项目所有数据',res)

              //this.subContractChangeData.data = res.data.rows;
              this.$set(this.budgetData,'data',res.data.rows)
              console.log('budgetData',this.budgetData.data)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
          this.currentRow = row
        },
        /**
         * 关键字搜索
         */
       /* clickSearchFilter() {
          this.$refs.refBasicSearch.searchFilter(this.$refs.refBudgetTableData, this.modelSearchFilter, () => {
            this.getAllBudgetData();
          });
        },*/

        /**
         * 条件搜索
        * */
        handleBudgetQuery(){
          this.getAllBudgetData();
        },
        /**
         * 前 中 后期
         * */
        getStage () {
          getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
            .then( (res) => {
              if(res.status && res.status === 200){
                this.selectData.data = res.data;
                console.log('this.selectData.data',this.selectData.data)
                this.selectValue = this.selectData.data.map(item => item.id)
                console.log(this.selectValue)


              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            })
        },

        /**
         * 点击显示哪种弹窗 物资类型
         * */
        toipClick(type) {
          if (this.disabled) return
          this.type = type
          this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
        },
        selectionChange(row) {
          console.log('回传row',row)
          this.selectedRow = row.selectedRow
        },

        /**
         * 弹窗传回的名称
         * */
        handleChange() {
          const row = this.selectedRow
          if(!this.isSelectedRow(row)) return false;
          if (Object.keys(row).length === 0) return
          switch (this.type) {
            case 'materialDictionary':
              //todo:回传物资类型id  name
              this.modelSearchFilter.type = row.name
              // this.countForm.proName = row.name
              // this.countForm.proId = row.id
              break
          }
          this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        },
      }

    }
</script>

<style scoped>
/*.goodsBudget-budgetQuery-container >>> .form-container{
  overflow-x: hidden!important;
  margin-bottom: 2px;
  background-color: transparent;
}*/
</style>
