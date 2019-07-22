<!--项目类型（多选和单选）-->
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
    <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                  @clickSearchFilter="clickSearchFilter"></basic-search>
  </div>
  <basic-table-tree ref="refProjectTypeTreeData" :default-expand-all="defaultExpandAll"
              :data="projectType.treeData" :columns="projectType.treeColumns" :filterNodeMethod="filterNodeMethod"
              @selection-change="selectionChangeProjectType" :height="400" @current-change="currentChangeProjectType">
    <template slot-scope="treeObj" slot="validateStatus">
      {{formatValidateStatus(treeObj.scope.row)}}
    </template>
    <template slot-scope="treeObj" slot="ifLastLevel">
      {{formatIfLastLevel(treeObj.scope.row)}}
    </template>
    <template slot-scope="treeObj" slot="enable">
      {{formatEnable(treeObj.scope.row)}}
    </template>
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableProjectType"/>
    </template>
  </basic-table-tree>
</div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";

  import {
    getProjectTypeTreeData,
  } from '@/api/common/dialog/dialogProjectType'
  export default {
    name: "dialogProjectType",
    mixins:[computed,methods,formatEnum],
    props:{
      projectTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        //项目选择
        projectType: {
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
              width: 80,
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'审核状态',
              value:'validateStatus',
              width: 80,
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'启用状态',
              value:'enable',
              width: 80,
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          projectTypeSelectedIdArray:[]
        },
        modelSearchFilter: {
          fuzzy: '',
          fuzzyKeys: ''
        },
      }
    },
    created(){
      this.getProjectTypeTreeData();
    },
    watch: {
      filterText(filterStr) {
        //  this.roles.treeData.filter(val);
      }
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refProjectTypeTreeData, this.modelSearchFilter, () => {
          try {
            this.$refs.refProjectTypeTreeData.filter(this.modelSearchFilter.fuzzy);
          } catch (error) {
            console.log(error.message)
          }
        });
      },
      filterNodeMethod(value, data, node) {
        if (!value) return true;
        if (node.children && node.children.length > 0) return true;
        const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilter);
        return result;
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.$refs.refProjectTypeTreeData.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefresh() {
        this.getProjectTypeTreeData();
      },
      /**
       * 获得所有项目类型
       */
      getProjectTypeTreeData() {
        getProjectTypeTreeData({enable:1,validateStatus:1}).then((response) => {
          if(response.data&&response.data.length>0){
            this.projectType.treeData = response.data;
            //单选和多选
            if(!this.isShowChecked){
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refProjectTypeTreeData.setCurrentRow(this.projectTypeData[0], true);
              });
            }else {
              //得到已选择ID
              if(this.projectTypeData&&this.projectTypeData.length>0){
                let projectTypeData = this.projectTypeData;
                this.projectType.projectTypeSelectedIdArray = projectTypeData.map(row => {
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
      selectionChangeProjectType(selection) {
        this.projectType.selectedRows = selection;
        this.$emit('selectionChange',this.projectType);
      },
      /**
       * 选择当前行
       */
      currentChangeProjectType(selection){
        this.projectType.selectedRow = selection;
        this.$emit('selectionChange',this.projectType);
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectableProjectType(row, index) {

        if (row.ifLastLevel != 1 || this.projectType.projectTypeSelectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
