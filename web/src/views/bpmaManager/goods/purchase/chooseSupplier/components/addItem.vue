<template>
  <div class="personDialog">
    <basic-dialog v-el-drag-dialog :title="title" :visible.sync="dialogTableVisible">
      <div v-if='this.type !=1'>
        <tableItem :columns="columns" :tableData="tableData" :page="page" :highlight="true"
          @handleCurrentChange="handleCurrentChange" :typeTable="true"></tableItem>
      </div>
      <div v-else>
        <el-row>
          <el-col :span="8" class="mt10 pdr10">
            <basic-table-tree :default-expand-all="defaultExpandAll" :data="treeTableData" :columns="treeColumns" border
              ref="MaterialTableTree" @current-change="rowClick">
              <template slot-scope="treeObj" slot="validateStatus">
                {{formatValidateStatus(treeObj.scope.row)}}
              </template>
              <template slot-scope="treeObj" slot="ifLastLevel">
                {{formatIfLastLevel(treeObj.scope.row)}}
              </template>
              <template slot-scope="treeObj" slot="enable">
                {{formatEnable(treeObj.scope.row)}}
              </template>
            </basic-table-tree>
          </el-col>
          <el-col :span="16">
            <tableItem :columns="columns" :tableData="tableData" :page="page" :highlight="true"
              @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange"
              :typeTable="true"></tableItem>
          </el-col>
        </el-row>
      </div>
      <div class="btnPerson mt10">
        <el-button type="success" @click="save">确定</el-button>
        <el-button @click="closeDialog">取消</el-button>
      </div>
    </basic-dialog>
  </div>
</template>
<script>
  import tableItem from './logTable'
  import splitPane from 'vue-splitpane'
  import { selectListOwn } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  export default {
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        columns: [],
        treeColumns: [],
        type: '',
        expandAll: true,
        title: '',
        dialogTableVisible: false,
        tableData: [],
        treeTableData: [],
        items: {},
        defaultExpandAll: false,
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
      }
    },
    methods: {
      rowClick(e) {
        this.$emit('getCheckTree', e)
      },
      handleCurrentChange(o) {
        this.items = o
      },
      handleSelectionChange(o) {
        // this.$emit('handleSelectionChange',o)
        this.items = o
      },
      save() {
        this.$emit('getItem', [this.items, this.type])
        this.closeDialog()
      },
      closeDialog() {
        this.dialogTableVisible = false
      },
      openDialog() {
        this.dialogTableVisible = true
      },
      checkTreeOne(num) {
        this.$refs.MaterialTableTree.setCurrentRow(num, true);
      }
    },
    components: {
      tableItem,
      splitPane
    }
  }
</script>
<style>
  .basic-dialog {
    width: 80%
  }

  .mt10 {
    margin-top: 10px;
  }

  .pdr10 {
    padding-right: 10px
  }

  .btnPerson {
    text-align: center
  }
</style>
