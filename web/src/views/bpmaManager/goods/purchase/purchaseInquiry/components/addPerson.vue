<template>
  <div class="personDialog">
    <basic-dialog v-el-drag-dialog title="添加接收人员" :visible.sync="dialogTableVisible">
      <el-row :gutter="10" class="h100">
        <el-col :span="10" class="mt10">
          <TreeGrid :data="dataSource" :columns="columns" :expand-all="expandAll" @rowClick="rowClick" ref="TreeGrid"
            default-children="children" :hasselection="false" />
        </el-col>
        <el-col :span="14">
          <tablePerson :columns="columns2" :tableData="tableData" :page="page" :type="selection"
            @handleSelectionChange="handleSelectionChange" :highlight="false"></tablePerson>
          <div class="btnPerson">
            <el-button type="success" @click="save">确定添加</el-button>
            <el-button @click="closeDialog">取消添加</el-button>
          </div>
        </el-col>
      </el-row>

    </basic-dialog>
  </div>

</template>
<script>
  import TreeGrid from '@/components/TreeTable'
  // import { getGroupMechanismData } from '@/api/sysManager/groupAuth/groupMechanism'
  import { selectPerson, getGroupMechanismData } from '@/api/eoaManager/work'

  import tablePerson from './logTable'
  export default {
    data() {
      return {
        dialogTableVisible: false,
        columns: [
          {
            text: '编码',
            value: 'code',
          },
          {
            text: '名称',
            value: 'name'
          }
        ],
        columns2: [
          {
            text: '编码',
            value: 'code',
          },
          {
            text: '姓名',
            value: 'name'
          },
          {
            text: '主岗岗位',
            value: 'mainName'
          }
        ],
        expandAll: true,
        selection: 'selection',
        dataSource: [],
        tableData: [],
        recvPerson: [],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
      }
    },
    methods: {
      getOrgInfos() {

        getGroupMechanismData().then((res) => {
          this.dataSource = res.data
        }).catch((err) => {
          console.log(err)
        })
      },
      rowClick(e) {
        let data = {
          id: e.id,
          page: 1,
          limit: 10
        }
        selectPerson(data).then(res => {
          this.tableData = res.data.rows
          this.total = res.data.total
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      handleSelectionChange(v) {
        this.recvPerson = v
      },
      save() {
        let arr = this.recvPerson.concat(this.$store.getters.getselectP)
        var result = [];
        var obj = {};
        for (var i = 0; i < arr.length; i++) {
          if (!obj[arr[i].id]) {
            result.push(arr[i]);
            obj[arr[i].id] = true;
          }
        }
        this.$store.dispatch('setSelectP', result)
        this.$emit('getrecvPerson', this.$store.getters.getselectP)
        this.closeDialog()
      },
      closeDialog() {
        this.dialogTableVisible = false
      },
      openDialog() {
        this.dialogTableVisible = true
      }
    },
    components: {
      TreeGrid,
      tablePerson
    },
    created() {
      this.getOrgInfos()

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

  .btnPerson {
    text-align: center
  }
</style>
