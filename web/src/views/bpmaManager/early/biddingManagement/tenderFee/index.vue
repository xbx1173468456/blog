<template>
  <basic-split-pane class="tenderFee-container "
                    :default-percent='75'
                    :min-percent='25'
  >
        <template slot="leftContainer">
        <div class="left-container">

          <div class="handler-container">
              <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
                         @click="addClick('add')">新增费用</el-button>
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
                  v-for="item in tableTitle"
                  :key="item.id"
                  :prop="item.prop"
                  :label="item.label"
                  :width="item.width"
                  :align="item.align"
                  :min-width="item.minWidth"
                  :header-align="item.headerAlign"
                  show-overflow-tooltip
                  :formatter="format"
                ></el-table-column>
              </el-table>
            </template>
          <!--<pagination  :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getUserManagerData" />   分页模板-->
          <pagination  :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getAlltenderFee"/>
        </div>
        </template>
        <template slot="rightContainer">
          <div class="right-container">
            <page-select-filter :selectData="selectData" :data="tenderFeeData" v-model="selectValue" @change="tenderFeeChange" @refreshData="getAllItem"></page-select-filter>
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
    name: 'TenderFee',
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
          proId:undefined,
          page:1,
          limit:10,
          fuzzy: '',
          fuzzyKeys:'',
        },
        tableData: [],
        currentRow:null, //表格当前行

        proData:{},
        selectData: {
          data: [],
          key: 'id',
          name: 'name'
        },
        tenderFeeData: {
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
            "prop": "name",
            "label": "费用名称",
            "align": "left",
            "headerAlign":"center",
            "minWidth": 200,
          },
          {
            "prop": "date",
            "label": "发生日期",
            "align": "center",
            "width": 100,
          },
          {
            "prop": "sum",
            "label": "费用金额",
            "headerAlign":"center",
            "align": "right",
            "width": 150,
          },
          {
            "prop": "person",
            "label": "经办人员",
            "align": "center",
            "width": 110,
          },
          {
            "prop": "detail",
            "label": "费用明细",
            "align": "left",
            "headerAlign":"center",
            "width": 160,
          },{
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
      this.getAlltenderFee()
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);

      this.getAllItem();
      //this.getAlltenderFee();
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

      tenderFeeChange(data) {

        this.proData = data;
        console.log('data',data)
        if (!data) {

          return this.tableData = []
        }
        this.modelSearchFilter = Object.assign({},this.modelSearchFilter,{
          proId : data.id,
          proName : data.name,
          proCode: data.code
        })
        this.getAlltenderFee();
      },

      addClick(param) {
        this.$store.dispatch("cacheId",'0');
        if (param === 'add') {
          if(!this.$utils.isEmpty(this.proData)){
          this.$router.push({name: 'TenderFeeDetail',
            params: {id: 0},
            query: {name: this.modelSearchFilter.proName,proId:this.modelSearchFilter.proId,proCode:this.modelSearchFilter.proCode}
          })
          }else{
            this.$message({message:'当前无项目，无法新增费用!',type:'warning'})
          }
        } else {
          this.$router.push({name: 'TenderFeeDetail', params: {id: this.currentRow.id}})
        }
      },
      /**
       * 获取投标费用列表所有数据
       * */
      getAlltenderFee () {
        // console.log('this.modelSearchFilter',this.modelSearchFilter)
        this.$store.dispatch('GetAllTenderFee',this.modelSearchFilter).then( (res) => {
          if(res.status && res.status === 200){

            this.tableData = res.data.rows;
            this.total = res.data.total;
            console.log('获取投标费用列表所有数据',res)
          }else{
            this.$message({message: res.message,type: 'warning'})
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 获取投标费用项目所有数据
       * */
      getAllItem () {
        this.$store.dispatch('GetAllTenderFeeItem',{page: 1, limit: 10000}).then((res) =>{

          if(res.status && res.status === 200){
            console.log('获取投标费用项目所有数据',res)

            //this.tenderFeeData.data = res.data.rows;
            this.$set(this.tenderFeeData,'data',res.data.rows)
            console.log('tenderFeeData',this.tenderFeeData.data)
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
        this.$store.dispatch('GetDictionaryDataByTypeFilterTenderFee','SYS_PRO_STAGE')
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
          this.getAlltenderFee();
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
        let sum = Number(row.sum)
        switch(column.property) {
          case 'sum':
            return this.$utilsBasic.toThousands(sum);
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
