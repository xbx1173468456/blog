<!--角色（多选）-->
<template>
<div class="dialog-container">
  <div class="handler-container">
    <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
               @click="clickDefaultExpandAll">全部展开
    </el-button>
    <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
               @click="clickDefaultExpandAll">全部折叠
    </el-button>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                  @clickSearchFilter="clickSearchFilter"></basic-search>
  </div>
  <basic-table-tree ref="refRoleTreeData" :default-expand-all="defaultExpandAll"
              :data="role.treeData" :columns="role.treeColumns" :filterNodeMethod="filterNodeMethod"
              @selection-change="selectionChangeRole" :height="400">
    <template slot="selection">
      <el-table-column type="selection" align="center" width="55" :selectable="selectableRole"/>
    </template>
  </basic-table-tree>
</div>
</template>

<script>
  import {
    getRoleTreeData
  } from '@/api/common/dialog/dialogRole'
  export default {
    name: "dialogRole",
    props:{
      roleData: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        //角色选择
        role: {
          defaultExpandAll: false,
          treeData: [],
          treeColumns: [
            {
              expand: true,
              text:'编码',
              value:'code',
              width: 160,
              align: "left",
              headerAlign: "center"
            },
            {
              text:'名称',
              value:'name',
              align: "left",
              headerAlign: "center"
            }
          ],
          roleSelectionChange: [],
          roleSelectedIdArray:[]
        },
        modelSearchFilter: {
          fuzzy: '',
          fuzzyKeys: ''
        },
      }
    },
    created(){
      this.getRoleTreeData();
    },
    watch: {
      filterText(filterStr) {
        //  this.role.treeData.filter(val);
      },
      roleData(data) {
        if (!this.$utils.length(data)) {
          this.$refs.refRoleTreeData.toggleSelection();
        }
      }
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refRoleTreeData, this.modelSearchFilter, () => {
          try {
            this.$refs.refRoleTreeData.filter(this.modelSearchFilter.fuzzy);
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
        this.$refs.refRoleTreeData.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy = '';
        this.getRoleTreeData();
      },
      /**
       * 获取角色数据
       */
      getRoleTreeData() {
        getRoleTreeData().then((response) => {
          if (response.data) {
            this.role.treeData = response.data;
            //得到已选择ID
            if(this.roleData&&this.roleData.length>0){
              let roleData = this.roleData;
              this.role.roleSelectedIdArray = roleData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeRole(selection) {
        this.role.selectedRows = selection;
        this.$emit('selectionChange',this.role);
      },
      /**
       * 当前选择框，角色可勾选，其他不能勾选
       */
      selectableRole(row, index) {
        if (row.typeCode === "1" || this.role.roleSelectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      },
    }
  }
</script>
