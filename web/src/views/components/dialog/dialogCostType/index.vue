<!-- 引入费用 -->
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
  <basic-table-tree ref="refPersonTypeTreeData" :default-expand-all="defaultExpandAll"
              :data="personType.treeData" :columns="personType.treeColumns"
              @selection-change="selectionChangePersonType" :height="400" @current-change="currentChangePersonType" :formatter="formatter">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectablePersonType" />
    </template>
  </basic-table-tree>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getFeeTypeData,
  } from '@/api/common/dialog/dialogCostType'
  export default {
    name: "dialogUserManager",
    mixins: [computed, methods],
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
      linkData: Array
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        tableShow: false,
        //岗位选择
        personType: {
          treeData: [],
          treeColumns: [
            {
              expand: true,
              text:'编码',
              value:'code',
              align: "left",
              headerAlign: "center",
              minWidth: 140,
              showOverflowTooltip:true
            },
            {
              text:'名称',
              value:'name',
              align: "left",
              headerAlign: "center",
              minWidth: 200,
              showOverflowTooltip:true
            },
            {
              text:'上级编码',
              value:'parentCode',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'上级名称',
              value:'parentName',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray:[]
        },
      }
    },
    created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData'])
      this.getFeeTypeData();
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getFeeTypeData();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getFeeTypeData();
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
        this.getFeeTypeData();
      },
      clickRefresh() {
        this.getFeeTypeData();
      },
      /**
       * 获得所有岗位
       */
      getFeeTypeData() {
        this.tableShow = true
        getFeeTypeData({enable:1,validateStatus:1}).then((response) => {
          this.tableShow = false
          if(response.data&&response.data.length>0){
            if (this.filterValid) {
              this.personType.treeData = response.data.filter(item => {
                if (item.validateStatus == this.validateStatus.code && item.enable == this.enabled.code) return true
              })
            } else {
              this.personType.treeData = response.data;
            }
            //单选和多选
            if(!this.isShowChecked){
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refPersonTypeTreeData.setCurrentRow(this.personTypeData[0], true);
              });
            }else {
              //得到已选择ID
              if(this.personTypeData&&this.personTypeData.length>0){
                let personTypeData = this.personTypeData;
                this.personType.personTypeSelectedIdArray = personTypeData.map(row => {
                  return row.id;
                });
              }
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangePersonType(selection) {
        console.log(selection)
        this.personType.selectedRows = selection;
        this.$emit('selectionChange',this.personType);
      },
      /**
       * 选择当前行
       */
      currentChangePersonType(selection){
        this.personType.selectedRow = selection;
        this.$emit('selectionChange',this.personType);
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectablePersonType(row, index) {
        let lock = this.dataEnum.isOrNot.some(item => {
          if (item.code == row.ifLastLevel && item.name == '是') {
            if(this.linkData) {
              let okNot = this.linkData.some(res => res.feeTypeId == row.id)
              if(okNot) return false
            }
            return true
          }
        })
        if (lock)
          return 1;//不可勾选
        else
          return 0;//可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
