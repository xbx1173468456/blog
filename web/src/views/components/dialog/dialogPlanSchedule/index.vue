<!-- 项目计划 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <span v-show="this.isShowChecked">
      <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                 @click="clickDefaultExpandAll">全部展开
      </el-button>
      <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                 @click="clickDefaultExpandAll">全部折叠
      </el-button>
    </span>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <el-form :inline="true" class="right">
      <el-form-item>
        <el-input clearable placeholder="请输入关键字" v-model="filterText" size="small" >
          <i class="el-icon-search el-input__icon"
             slot="suffix">
          </i>
        </el-input>
      </el-form-item>
    </el-form>
  </basic-handler>
  <basic-table-tree ref="refPlanScheduleTreeData" :default-expand-all="defaultExpandAll"
              :data="planSchedule.treeData" :columns="planSchedule.treeColumns"
              @selection-change="selectionChangePlanSchedule" :height="400" @current-change="currentChangePlanSchedule" :formatter="formatter">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectablePlanSchedule" />
    </template>
    <template slot-scope="obj" slot="changedValue">
      {{formatToThousands(obj.scope.row.changedValue)}}
    </template>
    <template slot-scope="obj" slot="changedBeginDate">
      {{obj.scope.row.changedBeginDate ? obj.scope.row.changedBeginDate.split(' ')[0] : ''}}
    </template>
    <template slot-scope="obj" slot="changedExpiryDate">
      {{obj.scope.row.changedBeginDate ? obj.scope.row.changedExpiryDate.split(' ')[0] : ''}}
    </template>
  </basic-table-tree>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getSchedulePlanMaster,
  } from '@/api/common/dialog/dialogPlanSchedule'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'dialogPlanSchedule',
    mixins: [computed, methods, formatBasic],
    props:{
      personTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean,
      filterUnit: Boolean,
      proId: [String, Number],
      formData: [Array]
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        tableShow: false,
        //岗位选择
        planSchedule: {
          treeData: [],
          treeColumns: [
            {
              text: '任务编码',
              value: 'code',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 140,
              expand: true
            },
            {
              text: '任务名称',
              value: 'name',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 200
            },
            {
              text: '任务产值',
              value: 'changedValue',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 130
            },
            {
              text: '责任人员',
              value: 'changedPerson',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 100
            },
            {
              text: '前置任务',
              value: 'changedPreTask',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 100
            },
            {
              text: '计划开始',
              value: 'changedBeginDate',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 140
            },
            {
              text: '计划完成',
              value: 'changedExpiryDate',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 140
            },
            {
              text: '计划日历天',
              value: 'changedDays',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 110
            },
            {
              text: '计划工时天',
              value: 'changedWorkDays',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 110
            },
            {
              text: '备注',
              value: 'changedRemark',
              align: 'left',
              headerAlign: 'center',
              showOverflowTooltip: true,
              width: 140
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray:[]
        },
      }
    },
    created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.getSchedulePlanMaster();
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getSchedulePlanMaster();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getSchedulePlanMaster();
      }
    },
    watch: {
      filterText(filterStr) {
        //  this.roles.treeData.filter(val);
      }
    },
    methods: {
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getSchedulePlanMaster();
      },
      clickRefresh() {
        this.getSchedulePlanMaster();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getSchedulePlanMaster() {
        this.tableShow = true
        getSchedulePlanMaster(this.proId).then((response) => {
          this.tableShow = false
          if(response.data&&response.data.detailList.length>0){
            if (this.filterValid) {
              response.data.detailList = response.data.detailList.filter(item => {
                if (item.type == 1 || item.type == 2 || item.type == 5) return true
              })
            }
            // response.data.detailList = response.data.detailList.map(item => {
            //   item.changedValue = this.formatToThousands(item.changedValue)
            //   item.changedBeginDate = item.changedBeginDate ? item.changedBeginDate.split(' ')[0] : ''
            //   item.changedExpiryDate = item.changedBeginDate ? item.changedExpiryDate.split(' ')[0] : ''
            //   return item
            // })
            response.data.detailList = this.computedTreeData(response.data.detailList)
            this.planSchedule.treeData = response.data.detailList;
            //单选和多选
            if(!this.isShowChecked){
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refPlanScheduleTreeData.setCurrentRow(this.personTypeData[0], true);
              });
            }else {
              //得到已选择岗位
              if(this.personTypeData&&this.personTypeData.length>0){
                let personTypeData = this.personTypeData;
                this.planSchedule.personTypeSelectedIdArray = personTypeData.map(row => {
                  return row.id;
                });
              }
            }
          }
        })
      },
      computedTreeData(data) {
        let arr = []
        data.forEach(item => {
          if (item.parentId == '-1') arr.push(item)
          else {
            data.some(res => {
              if (res.code == item.parentCode) {
                Array.isArray(res.children) ? res.children.push(item) : this.$set(res, 'children', [item])
                return res.children = res.children.sort((a, b) => a.code - b.code)
              }
            })
          }
        })
        arr = arr.sort((a, b) => a.code - b.code)
        return arr
      },
      /**
       * 选择当前选择框
       */
      selectionChangePlanSchedule(selection) {
        this.planSchedule.selectedRows = selection;
        this.$emit('selectionChange',this.planSchedule);
      },
      /**
       * 选择当前行
       */
      currentChangePlanSchedule(selection){
        this.planSchedule.selectedRow = selection;
        this.$emit('selectionChange',this.planSchedule);
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectablePlanSchedule(row, index) {
        let lock
        if (row.ifLastLevel == 1 && (row.type == 1 || row.type == 2)) lock = true
        this.formData.forEach(item => {
          if(item.planDetailId == row.id) lock = false
        })
        if (lock)
          return 1;//不可勾选
        else
          return 0;//可勾选
      },
      formatter(val) {
      }
    }
  }
</script>
