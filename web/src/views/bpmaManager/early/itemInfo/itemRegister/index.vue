<template>
  <basic-container class="handler-table itemRegister-container-list">

    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addLog()" plain>新增项目</el-button>
      <el-button type="primary" size="small" icon="el-icon-if-see" @click="showDetail" plain
                 :disabled="!rowId"

      >查看
      </el-button>
      <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                    @clickSearchFilter="clickSearchFilter"></basic-search>
    </basic-handler>
    <div class="table-container">
      <basic-table ref="refProjectPersonTableData"
                   :dataTable="itemRegisterTableData"
                   :columns="columns"
                   @current-change="handleCurrentChange"
                   :pagination="modelSearchFilter"
                   @pagination="getItems"

      >
        <template slot-scope="obj" slot="validateStatus">
          {{formatValidateStatus(obj.scope.row)}}
        </template>

      </basic-table>
    </div>
  </basic-container>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
import {
    selectInfo
} from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'

export default {
    name: 'itemRegister',
  mixins: [computed, methods, formatEnum,formatBasic],
    data() {
        return {
           // editableTabsValue: '',
            rowId: '',
            // fuzzy: '',
            columns: [
              {
              text: '审核状态',
              value: 'validateStatus',
              width: '80',
              align: "center",
            }, {
                text: '系统编码',
                value: 'code',
                width: '130',
                align: "center",
                showOverflowTooltip: true
              }, {
                text: '项目名称',
                value: 'name',
                minWidth: '200',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '项目全称',
                value: 'fullName',
                width: '160',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '原始编码',
                value: 'orignalCode',
                width: '130',
                align: "center",
                showOverflowTooltip: true
              }, {
                text: '项目类型',
                value: 'typeName',
                width: '160',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '年度批次',
                value: 'year',
                width: '80',
                align: "center",
                showOverflowTooltip: true
              }, {
                text: '建设性质',
                value: 'nature',
                width: '160',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '项目阶段',
                value: 'stage',
                width: '100',
                align: "center",
                showOverflowTooltip: true
              }, {
                text: '业务区域',
                value: 'area',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '行政区划',
                value: 'district',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '详细地址',
                value: 'address',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '建设单位',
                value: 'buildEnterprise',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '设计单位',
                value: 'designEnterprise',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },{
                text: '监理单位',
                value: 'superviseEnterprise',
                width: '150',
                align: "left",
                headerAlign: "center",
                showOverflowTooltip: true
              },
              {
                text: '登记人员',
                value: 'inputPerson',
                width: '100',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              }, {
                text: '登记时间',
                value: 'inputTime',
                width: '160',
                align: "center",
                headerAlign: "center",
                showOverflowTooltip: true
              },
            ],
           /* page: {
                total: 0,
                pageSize: 10,
                currentPage: 1
            },*/
          modelSearchFilter: {
            page:1,
            limit:10,
            fuzzy: '',
            fuzzyKeys:''
          },
          itemRegisterTableData:{
            data: [],
            total:0
          }
           

        }
    },
  mounted() {
    this.getItems()
  },
  activated() {
    this.getItems()
  },
  created() {

    //初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
    ]);
  },
    methods: {
        //获取
        getItems() {
            selectInfo(this.modelSearchFilter).then(res => {
                if (res.status == 200) {
                    this.itemRegisterTableData.data = res.data.rows
                    this.itemRegisterTableData.total = res.data.total
                }
            }).catch(err => {
                this.$message.warning(err.$message)
            })
        },
        //添加日志
        addLog() {
          this.$store.dispatch("cacheId",'0');
            this.$router.push({
                name: 'itemDetail',
              params: {id: 0},
            })
        },
      
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refProjectPersonTableData, this.modelSearchFilter, () => {
          this.getItems();
        });
      },
        //查看详情
        showDetail() {
          this.$store.dispatch("cacheId",'0');
            this.$router.push({
                name: 'itemDetail',
                params: {
                    id: this.rowId
                }
            })
        },
        
        handleCurrentChange(v) {
        if(!v) return
            this.rowId = v.id
        }
    },

}
</script>
