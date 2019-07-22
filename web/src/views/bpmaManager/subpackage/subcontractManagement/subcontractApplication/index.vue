<template>
  <basic-split-pane class="bpmaManager-container-list subcontractApplication-container"
                    :default-percent='75'
                    :min-percent='25'>
        <template  slot="leftContainer">
        <div class="left-container">

          <div class="handler-container">
              <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                         @click="addClick('add')">新增分包申请</el-button>
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
                  prop="code"
                  label="单据编码"
                  width="130" align="center"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="分包项名称"
                  min-width="200" align="left" header-align="center"  show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                  prop="proName"
                  label="项目名称"
                  width="200"
                  align="left" header-align="center"  show-overflow-tooltip>
                </el-table-column>
               <el-table-column
                  prop="type"
                  label="分包类型"
                  width="120" align="center" show-overflow-tooltip>
                </el-table-column>
               <el-table-column
                  prop="ifInviteBid"
                  label="是否招标"
                  width="80" align="center" :formatter="formatIfInviteBid">
                </el-table-column>
                <el-table-column
                  :formatter="format"
                  v-for="(item, index) in tableTitle"
                  :key="item.index"
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
          <!--<pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getUserManagerData" />   分页模板-->
          <pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getAllsubcontractApplication"/>
        </div>
        </template>
      <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :selectData="selectData" :data="subcontractApplicationData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
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
  export default {
    name: 'SubcontractApplication',
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
        subcontractApplicationData: {
          name: 'name',
          key: 'stageId',
          data: []
        },
        selectValue: [],
        tableTitle:[
          {
            "prop": "beginDate",
            "label": "计划开工日期",
            "align": "center",
            "width": 120,
          },{
            "prop": "expiryDate",
            "label": "计划完工日期",
            "align": "center",
            "width": 120,
          },{
            "prop": "days",
            "label": "计划日历天",
            "align": "center",
            "width": 100,
          },{
            "prop": "contractPrice",
            "label": "原承包总价",
            "headerAlign": "center",
            "align": "right",
            "width": 110,
          },{
            "prop": "subPrice",
            "label": "拟分包总价",
            "headerAlign": "center",
            "align": "right",
            "width": 110,
          },{
            "prop": "beforeTaxPrice",
            "label": "税前利润总价",
            "headerAlign": "center",
            "align": "right",
            "width": 110,
          },{
            "prop": "inputPerson",
            "label": "登记人员",
            "align": "center",
            "width": 110,
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
      this.getAllsubcontractApplication()
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);

      this.getAllItem();
      //this.getAllsubcontractApplication()
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

      contractChange(data) {

        this.proData=data;
        console.log('data',data)
        if (!data) {

          return this.tableData = []
        }
        this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
          proId : data.id,
          proName : data.name,
          proCode : data.code
        })
        this.getAllsubcontractApplication();
      },

      addClick(param) {
        this.$store.dispatch("cacheId",'0');
        if (param === 'add') {
          if(!this.$utils.isEmpty(this.proData)){
            this.$router.push({
              name: 'SubcontractApplicationDetail',
              params: {id: 0},
              query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
            })
          }else{
            this.$message({message:'当前无项目，无法新增申请!',type:'warning'})
          }

        } else {
          this.$router.push({name: 'SubcontractApplicationDetail', params: {id: this.currentRow.id}})
        }
      },
      /**
       * 获取分包申请列表所有数据
       * */
      getAllsubcontractApplication () {
        // console.log('this.modelSearchFilter',this.modelSearchFilter)
        this.$store.dispatch('GetAllSubcontractApplication',this.modelSearchFilter).then( (res) => {
          if(res.status && res.status === 200){

            this.tableData = res.data.rows;
            this.total = res.data.total;
            console.log('获取分包申请列表所有数据',res)
          }else{
            this.$message({message: res.message,type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 获取分包申请项目所有数据
       * */
      getAllItem () {
        this.$store.dispatch('GetAllSubcontractApplicationItem',{page: 1, limit: 10000}).then((res) =>{

          if(res.status && res.status === 200){
            console.log('获取分包项目所有数据',res)

            //this.subcontractApplicationData.data = res.data.rows;
            this.$set(this.subcontractApplicationData,'data',res.data.rows)
            console.log('subcontractApplicationData',this.subcontractApplicationData.data)
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
        this.$store.dispatch('GetDictionaryDataByTypeFilterSubcontractApplication','SYS_PRO_STAGE')
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
          this.getAllsubcontractApplication();
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
       *  日期 格式化
       * */
      format(row, column, cellValue, index) {
        switch(column.property) {
          case'beginDate':
            return dateFormat(row.beginDate);
          case'expiryDate':
            return dateFormat(row.expiryDate);
          case'days':
            return isNaN(this.$utils.date.howManyDays(row.beginDate,row.expiryDate)) ? '0': this.$utils.date.howManyDays(row.beginDate,row.expiryDate) + 1;
          case'contractPrice':
            return this.$utilsBasic.toThousands(Number(row.contractPrice));
          case'subPrice':
            return this.$utilsBasic.toThousands(Number(row.subPrice));
          case'beforeTaxPrice':
            return this.$utilsBasic.toThousands(Number(Number(row.contractPrice) - Number(row.subPrice)));
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
