<template>
  <div class="contractBudget-container-list flex-layout">
    <div :style="windowHeight">
      <div class="handler-container">
        <el-col :span="18">
          <el-button @click="addClick('root')" icon="el-icon-plus" plain size="small" type="primary">新增根</el-button>
          <el-button @click="addClick('sameLevel')" icon="el-icon-circle-plus-outline" plain size="small"
                     type="primary">新增同级
          </el-button>
          <el-button @click="addClick('subordinate')" icon="el-icon-circle-plus-outline" plain size="small"
                     type="primary">新增下级
          </el-button>
          <el-button icon="el-icon-if-save" plain size="small" type="primary">保存</el-button>
          <el-button icon="el-icon-delete" plain size="small" type="danger">删除</el-button>
        </el-col>
        <el-col :span="6">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
              <el-input clearable placeholder="请输入关键字">
                <i class="el-icon-search el-input__icon" slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </div>
      <pop-table :data="data" :titleData="titleTable" @rowChange="rowChange" row-key="keyId"></pop-table>
    </div>
  </div>
</template>

<script>
  import popTable from '@/views/components/dialog/popDialog/popDialogTable'
  import bubgetTable from './budgetTable.json'

  export default {
    name: 'contractBudget',
    data() {
      return {
        titleTable: bubgetTable,
        data: [],
        selectRow: {}
      }
    },
    props: {
      formData: {
        type: Object,
        default: () => {
        }
      }
    },
    components: {
      popTable
    },
    computed: {
      windowHeight() {
        return {
          minheight: this.$store.state.app.screenHeight - 120 + 'px'
        }
      }
    },
    methods: {
      rowChange(row) {
        this.selectRow = row
      },
      addClick(type) {
        switch (type) {
          case 'root':
            this.addRoot()
            break
          case 'sameLevel':
            this.addSameLevel()
            break
          case 'subordinate':
            this.subordinate()
            break
        }
      },
      addRoot() {
        const { proCode, proFeature, proId, proLabel, proName } = this.formData
        const num = this.createCode(this.data)
        const data = {
          parentCode: -1,
          proCode,
          proFeature,
          proId,
          proLabel,
          proName,
          keyId: Math.random(),
          code: num
        }
        this.data.push(data)
      },
      addSameLevel() {
        if (this.selectRow.parentCode == -1) {
          return this.addRoot()
        }
        let parentData = this.getObjData(this.data, this.selectRow)
        const { budgetCode, id, name, code, proCode, proFeature, proId, proLabel, proName, keyId } = parentData
        parentData.children.push({
          budgetCode, id, name, proCode, proFeature, proId, proLabel, proName,
          keyId: Math.random(),
          code: this.createCode(parentData)
        })
        this.data = JSON.parse(JSON.stringify(this.data))
      },
      subordinate() {
        const { budgetCode, id, name, code, proCode, proFeature, proId, proLabel, proName, keyId } = this.selectRow
        if (!Array.isArray(this.selectRow.children)) {
          this.$set(this.selectRow, 'children', [])
        }
        this.selectRow.children.push({
          proCode, proFeature, proId, proLabel, proName,
          keyId: Math.random(),
          parentBudgetCode: budgetCode,
          parentBudgetName: name,
          parentCode: code,
          parentId: id || keyId,
          code: this.createCode(this.selectRow)
        })
        this.data = JSON.parse(JSON.stringify(this.data))
      },
      getObjData(data, target) {
        return data.filter(item => {
          if (item.code === target.parentCode || item.code === target.parentCode) {
            return item
          } else if (Array.isArray(item.children)) {
            return this.getObjData(item.children, target)
          }
        })[0]
      },
      createCode(data) {
        let result = []
        let res
        if (!Array.isArray(data)) {
          res = data.children.map(item => item.code)
          if (res.length === 0) {
            return data.code + '01'
          } else {
            const arr = res.sort((a, b) => a - b)
            let num = arr[arr.length - 1]
            num = String(num).replace(data.code, '')
            num = Number(num) + 1
            return data.code + this.prefixInteger(num, 2)
          }
        } else {
          res = data.map(item => item.code)
          if (res.length === 0) {
            return '01'
          } else {
            const arr = res.sort((a, b) => a - b)
            let num = arr[arr.length - 1]
            num = String(num).replace(data[0].parentCode, '')
            num = Number(num) + 1
            return this.prefixInteger(num, 2)
          }
        }
      },
      prefixInteger(number, n) {
        let len = String(number).length
        while (len < n) {
          number = '0' + number
          len++
        }
        return number
      }
    }
  }
</script>

<style scoped>
  .search {
    text-align: right;
    display: inline-block;
  }
</style>
