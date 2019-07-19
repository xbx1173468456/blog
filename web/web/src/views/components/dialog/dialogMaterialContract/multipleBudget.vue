<!--分包合同预算（多选）-->
<template>
<div class="dialog-container">
  <div class="handler-container">
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
  </div>
  <basic-table-tree ref="refSubContractTreeData" :default-expand-all="defaultExpandAll"
              :data="subContract.treeData" :columns="subContract.treeColumns"
              @selection-change="selectionChangeSubContract" :height="400" @current-change="currentChangeSubContract">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableSubContract"/>
    </template>
    <template slot-scope="treeObj" slot="ifLastLevel">
      {{formatIfLastLevel(treeObj.scope.row)}}
    </template>
    <template slot-scope="treeObj" slot="sum">
      {{formatToThousands(treeObj.scope.row.sum)}}
    </template>
    <template slot-scope="treeObj" slot="unitPrice">
      {{formatToThousands(treeObj.scope.row.unitPrice)}}
    </template>
    <template slot-scope="treeObj" slot="totalPrice">
      {{formatToThousands(treeObj.scope.row.totalPrice)}}
    </template>


  </basic-table-tree>
</div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import {
    getSubContractTreeData
  } from '@/api/common/dialog/dialogSubContract/multipleBudget'
  export default {
    name: "dialogSubContractMultipleBudget",
    mixins: [computed, methods, formatEnum, formatBasic],
    props:{
      subContractData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      contractId:[Number, String],
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        //岗位选择
        subContract: {
          treeData: [],
          treeColumns: [
            {
              expand: true,
              text:'编码',
              value:'code',
              width: 200,
              align: 'left',
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'名称',
              value:'name',
              minWidth: 140,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'是否末级',
              value:'ifLastLevel',
              width: 80
            },
            {
              text:'特征',
              value:'feature',
              width: 80
            },
            {
              text:'单位',
              value:'unit',
              width: 120,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'数量',
              value:'sum',
              width: 120
            },
            {
              text:'单价',
              value:'unitPrice',
              width: 120
            },
            {
              text:'金额',
              value:'totalPrice',
              width: 160
            },
            {
              text:'摘要',
              value:'summary',
              width: 60,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          subContractSelectedIdArray:[]
        },
      }
    },
    created(){
      this.getSubContractTreeData();

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);
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
        this.getSubContractTreeData();
      },
      clickRefresh() {
        this.getSubContractTreeData();
      },
      /**
       * 获得所有合同
       */
      getSubContractTreeData() {
        getSubContractTreeData({contractId:this.contractId}).then((response) => {
          console.log("获得所有合同",response)
          if(response.data&&response.data.length>0){
            this.subContract.treeData = response.data;
            //单选和多选
            if(!this.isShowChecked){
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refSubContractTreeData.setCurrentRow(this.subContractData[0], true);
              });
            }else {
              //得到已选择ID
              if(this.subContractData&&this.subContractData.length>0){
                let subContractData = this.subContractData;
                this.subContract.subContractSelectedIdArray = subContractData.map(row => {
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
      selectionChangeSubContract(selection) {
        this.subContract.selectedRows = selection;
        this.$emit('selectionChange',this.subContract);
      },
      /**
       * 选择当前行
       */
      currentChangeSubContract(selection){
        this.subContract.selectedRow = selection;
        this.$emit('selectionChange',this.subContract);
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectableSubContract(row, index) {
        if (row.ifLastLevel != 1 || this.subContract.subContractSelectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
