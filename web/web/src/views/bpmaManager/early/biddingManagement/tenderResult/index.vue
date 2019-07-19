<template>
  <basic-split-pane class="tenderResult-container "
                    :default-percent='75'
                    :min-percent='25'
  >
        <template slot="leftContainer">
        <div class="left-container">

          <div class="handler-container">
              <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                         @click="addClick('add')">新增结果</el-button>
              <el-button  v-if="viewBtnShowFlag"  type="primary" plain icon="el-icon-if-see" size="small"
                         :disabled="viewBtnDisabledFlag"
                         @click="addClick">查看</el-button>
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </div>
            <template>
              <el-table

                ref="tableData"
                :data="tableData"
                border
                fit
                stripe
                :height="heightTableLeft"
                highlight-current-row
                @current-change="handleCurrentChange"
              >
                <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
                <el-table-column
                  prop="validateStatus"
                  label="审核状态"
                  width="80" align="center" :formatter="formatValidateStatus">
                </el-table-column>
                <el-table-column
                  :formatter="format"
                  v-for="item in tableTitle"
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :align="item.align"
                  :min-width="item.minWidth"
                  :header-align="item.headerAlign"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </template>
          <!--<pagination  :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getUserManagerData" />   分页模板-->
          <pagination  :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getAlltenderResult"/>
        </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :selectData="selectData" :data="tenderResultData" v-model="selectValue"  @change="tenderResultChange" @refreshData="getAllItem"></page-select-filter>
          </div>
        </template>
  </basic-split-pane>
</template>

<script>
  import pagination from '@/components/Pagination'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {dateFormat} from "@/utils";
  import selectData from '../selectData.json'
  export default {
    name: 'TenderResult',
    components: {
      pagination,
    },
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        addBtnShowFlag:true, //待系统菜单配置
        viewBtnShowFlag:true,

       // heightSplitPane:0, //左右拖动，需设高
        heightTableLeft:0,
        total: 0,

        modelSearchFilter: {
          page:1,
          limit:10,
          fuzzy: '',
          fuzzyKeys:'',
          proId:undefined,
        },
        tableData: [],
        currentRow:null, //表格当前行

        proData:{},
        selectData: {
          data: [],
          key: 'id',
          name: 'name'
        },
        tenderResultData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        selectValue: [],
        tableTitle:[
          {
            "prop": "code",
            "label": "单据编码",
            "align": "center",
            "width": 130,
          },
          {
            "prop": "proName",
            "label": "项目名称",
            "align": "left",
            "headerAlign":"center",
            "minWidth": 200,
          },{
            "prop": "result",
            "label": "投标结果",
            "align": "center",
            "width": 110,
          },
          {
            "prop": "date",
            "label": "公布日期",
            "align": "center",
            "width": 100,
          },
          {
            "prop": "controlTotalPrice",
            "label": "总控制价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },
          {
            "prop": "averagePrice",
            "label": "投标均价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },
          {
            "prop": "estimateTotalPrice",
            "label": "评标总价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },
          {
            "prop": "winTotalPrice",
            "label": "中标总价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },

          {
            "prop": "firstWinPerson",
            "label": "第一中标人",
            "align": "center",
            "width": 110,
          },{
            "prop": "secondWinPerson",
            "label": "第二中标人",
            "align": "center",
            "width": 110,
          },{
            "prop": "thirdWinPerson",
            "label": "第三中标人",
            "align": "center",
            "width": 110,
          },{
            "prop": "firstWinTotalPrice",
            "label": "第一中标总价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },{
            "prop": "secondWinTotalPrice",
            "label": "第二中标总价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },{
            "prop": "thirdWinTotalPrice",
            "label": "第三中标总价",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },
          {
            "prop": "remark",
            "label": "补充说明",
            "align": "left",
            "headerAlign":"center",
            "width": 160,
          },
          {
            "prop": "inputPerson",
            "label": "登记人员",
            "align": "center",
            "width": 120,
          },
          {
            "prop": "inputTime",
            "label": "登记时间",
            "align": "center",
            "width": 160,
          }
        ], //表头


      }
    },
    activated(){
      this.getAlltenderResult()
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);

      this.getAllItem();
      //this.getAlltenderResult();
      this.getStage();
    },
    mounted () {
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight());
      });
    },
    computed: {
      viewBtnDisabledFlag () {
        return !(this.currentRow && this.currentRow.id);

      }

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
        const offsetTopLeft = this.$refs.tableData.$el.getBoundingClientRect().top;

        this.heightTableLeft = innerHeight - offsetTopLeft - 55;

      },

      tenderResultChange(data) {

        this.proData = data;
        if (!data) {

          return this.tableData = []
        }
        this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
          proId : data.id,
          proName : data.name,
          proCode: data.code
        })
        this.getAlltenderResult();
      },

      addClick(param) {
        this.$store.dispatch("cacheId",'0');
        if (param === 'add') {
          if(!this.$utils.isEmpty(this.proData)){
          this.$router.push({name: 'TenderResultDetail',
            params: {id: 0},
            query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
          })
          }else{
            this.$message({message:'当前无项目，无法新增结果!',type:'warning'})
          }
        } else {
          this.$router.push({name: 'TenderResultDetail', params: {id: this.currentRow.id}})
        }
      },
      /**
       * 获取招标结果列表所有数据
       * */
      getAlltenderResult () {
        // console.log('this.modelSearchFilter',this.modelSearchFilter)
        this.$store.dispatch('GetAllTenderResult',this.modelSearchFilter).then( (res) => {
          if(res.status && res.status === 200){

            this.tableData = res.data.rows;
            this.total = res.data.total;
            console.log('获取招标结果列表所有数据',res)
          }else{
            this.$message({message: res.message,type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 获取招标结果项目所有数据
       * */
      getAllItem () {
        this.$store.dispatch('GetAllTenderResultItem',{page: 1, limit: 10000}).then((res) =>{

          if(res.status && res.status === 200){
            console.log('获取招标结果项目所有数据',res)

            //this.tenderResultData.data = res.data.rows;
            this.$set(this.tenderResultData,'data',res.data.rows)
            console.log('tenderResultData',this.tenderResultData.data)
          }else{
            this.$message({message: res.message,type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 前 中 后期
       * */
      getStage () {
        this.$store.dispatch('GetDictionaryDataByTypeFilterTenderResult','SYS_PRO_STAGE')
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
       * 搜索按钮
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.tableData, this.modelSearchFilter, () => {
          this.getAlltenderResult();
        });
      },
      /**
       * 当前行
       * */
      handleCurrentChange(row) {
        console.log(row)
        this.currentRow = row
      },

      /**
       * 金额 日期 格式化
       * */
      format(row, column, cellValue, index) {
        let controlTotalPrice = Number(row.controlTotalPrice),
          averagePrice = Number(row.averagePrice),
          estimateTotalPrice = Number(row.estimateTotalPrice),
          winTotalPrice = Number(row.winTotalPrice),
          firstWinTotalPrice = Number(row.firstWinTotalPrice),
          secondWinTotalPrice = Number(row.secondWinTotalPrice),
          thirdWinTotalPrice = Number(row.thirdWinTotalPrice)
        switch (column.property) {
          case 'controlTotalPrice':
            return this.$utilsBasic.toThousands(controlTotalPrice);
          case 'averagePrice':
            return this.$utilsBasic.toThousands(averagePrice);
          case 'estimateTotalPrice':
            return this.$utilsBasic.toThousands(estimateTotalPrice);
          case 'winTotalPrice':
            return this.$utilsBasic.toThousands(winTotalPrice);
          case 'firstWinTotalPrice':
            return this.$utilsBasic.toThousands(firstWinTotalPrice);
          case 'secondWinTotalPrice':
            return this.$utilsBasic.toThousands(secondWinTotalPrice);
          case 'thirdWinTotalPrice':
            return this.$utilsBasic.toThousands(thirdWinTotalPrice);
          case'date':
           return dateFormat(row.date)
          default:
            return cellValue
        }
      },


    }
  }
</script>

<style scoped>
/*  .table-row {
    padding: 10px 0;
  }
  .left-container {
    display: flex;
    flex-direction: column;
  }
  .table-row {
    flex: 1;
    overflow: hidden;
  }
  .el-table {
    height: 100%;
    overflow: auto;
  }*/
</style>
