<template>
  <div class="content-container">
    <basic-handler>
      <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain @click="expandHandle">全部折叠
      </el-button>
      <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain @click="expandHandle">全部展开</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="refDataPush" plain>刷新</el-button>
      <el-button :disabled="disabled" type="primary" size="small" icon="el-icon-plus" @click="clickLevel(1, -1)" plain>新增根</el-button>
      <el-button :disabled="disabled || Object.keys(this.selectRow).length == 0" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="clickLevel(1,1)" plain>新增同级</el-button>
      <el-button :disabled="disabled || Object.keys(this.selectRow).length == 0" type="primary" size="small" icon="el-icon-circle-plus-outline" @click="clickLevel(2,1)" plain>新增下级</el-button>
      <el-button :disabled="disabled || Object.keys(this.selectRow).length == 0" type="danger" size="small" icon="el-icon-delete" @click="deleteData" plain>删除</el-button>
    </basic-handler>
    <basic-table-tree
      :data="showData"
      @current-change="rowChange"
      border
      :columns="tableTitle"
      :default-expand-all="defaultExpandAll"
      :pushData="data"
      ref="refBudgetDataTableTree">
      <template slot-scope="treeObj" slot="name">
        <el-form :model="treeObj.scope.row" :ref="'formName' + treeObj.scope.$index" :show-message="false" :rules="rules">
          <el-form-item prop="name">
            <basic-input :disabled="disabled" placeholder="任务名称"  v-model="treeObj.scope.row.name"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planValue">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input
              :disabled="disabled || treeObj.scope.row.ifLastLevel == 2"
              :format="formatToThousands"
              :formatValue="formatToMoney"
              type="number"
              placeholder="任务产值"
              @input="handleValueChange"
              v-model="treeObj.scope.row.planValue" price>
            </basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planPerson">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled" placeholder="责任人员" v-model="treeObj.scope.row.planPerson" :maxlength="100"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planPreTask">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled" placeholder="前置任务" v-model="treeObj.scope.row.planPreTask" :maxlength="100"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planBeginDate">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <el-date-picker
              :disabled="disabled || treeObj.scope.row.ifLastLevel == 2"
              :prefix-icon="disabled ? 'a' : ''"
              v-model="treeObj.scope.row.planBeginDate"
              value-format="timestamp"
              align="center"
              size="small"
              type="date"
              @change="dateChange(treeObj.scope.row)"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planExpiryDate">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <el-date-picker
              :disabled="disabled || !treeObj.scope.row.planBeginDate || treeObj.scope.row.ifLastLevel == 2"
              :prefix-icon="disabled ? 'a' : ''"
              v-model="treeObj.scope.row.planExpiryDate"
              value-format="timestamp"
              align="center"
              size="small"
              type="date"
              :picker-options="pickerOptions"
              @change="dateChange(treeObj.scope.row)"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="planDays">
        <span class="span-text">{{treeObj.scope.row.planDays || 0}}</span>
      </template>
      <template slot-scope="treeObj" slot="playWorkDays">
        <span class="span-text">{{treeObj.scope.row.playWorkDays || 0}}</span>
      </template>
      <template slot-scope="treeObj" slot="planRemark">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled" placeholder="备注" v-model="treeObj.scope.row.planRemark" :maxlength="5000"></basic-input>
          </el-form-item>
        </el-form>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
  import tableTitle from './tabltTitle.json'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import {
    deleteSchedulePlanDetail
  } from '@/api/bpmaManager/schedule/duration/planEdit'
  export default {
    name: 'addPlan',
    mixins: [formatBasic],
    data() {
      const that = this
      return {
        data: [],
        tableTitle,
        index: 0,
        selectRow: {},
        defaultExpandAll: true,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() < that.selectRow.planBeginDate
          }
        },
        rules: {
          name: [{ required: true, trigger: 'change', max: 50 }]
        }
      }
    },
    props: {
      disabled: Boolean,
      value: Array,
      formData: Object,
      getSchedulePlanDetail: Function,
      save: Function
    },
    watch: {
      data: {
        handler(val) {
          this.$emit('input', val)
        },
        deep: true
      },
      value: {
        handler(val) {
          this.data = this.handleDate(val)
        },
        deep: true
      }
    },
    computed: {
      showData() {
        let data = this.computedShowTreeData(this.data)
        return data
      }
    },
    methods: {
      handleDate(data) {
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.handleDate(item.children)
          }
          item.planBeginDate = item.planBeginDate ? new Date(item.planBeginDate).getTime() : ''
          item.planExpiryDate = item.planExpiryDate ? new Date(item.planExpiryDate).getTime() : ''
        })
        return data
      },
      computedShowTreeData(data) {
        return data.filter(item => {
          if(item.persistStatus != 'fdel' && item.children && item.children.length > 0) {
            item.children = this.computedShowTreeData(item.children)
          }
          return item.persistStatus != 'fdel'
        })
      },
      refDataPush() {
        if (!this.formData.id) return
        this.getSchedulePlanDetail()
      },
      rowChange(row) {
        this.selectRow = row || {}
      },
      sumDays(idx) {
        const { startDate, endDate } = this.data[idx]
        this.$set(this.data[idx], 'days', ((endDate - startDate) / 86400000 + 1) || 0)
      },
      dateChange(data) {
        if (data.planBeginDate > data.planExpiryDate) data.planExpiryDate = undefined
        this.computedDate(this.data)
        if(!data.planExpiryDate || !data.planBeginDate) {
          this.$set(data, 'planDays', 0)
          this.$set(data, 'playWorkDays', 0)
        } else {
          this.$set(data, 'planDays', ((data.planExpiryDate - data.planBeginDate) / 86400000 + 1) || 0)
          this.$set(data, 'playWorkDays', ((data.planExpiryDate - data.planBeginDate) / 86400000 + 1) || 0)
        }
        this.$emit('planChange', this.data)
      },
      handleValueChange(row) {
        this.data = this.data.map(item => {
          return this.computedValue(item)
        })
        this.$emit('handleValueChange')
      },
      computedValue(data) {
        if (data.children && data.children.length > 0) {
          let sum = 0
          data.children.forEach(res => {
            if (res.children && res.children.length > 0) {
              res = this.computedValue(res)
            }
            if(res.persistStatus != 'fdel') {
              sum += Number(res.planValue)
            }
          })
          data.planValue = sum
        }
        return data
      },
      // 新增
      clickLevel(type, pid) {
        const scroll = this.$refs.refBudgetDataTableTree.$el.querySelector('.el-table__body-wrapper')
        const {scrollLeft, scrollTop} = scroll
        const date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        let addRowData = {
          planBeginDate: date.getTime(),
          planExpiryDate: date.getTime(),
          planValue: '0.00',
          masterId: this.formData.id,
          type: 1,
          ifLastLevel: 1
        }
        //追加菜单树
        if (type == 1 && pid == -1) {
          //新增根
          this.$set(addRowData, "parentCode", '00');
          this.$set(addRowData, "parentId", -1);
          this.$set(addRowData, "level", 1);
          this.$set(addRowData, "orgPathName", '/');
          let treeId = this.showData.length;
          let row = {tree_parent: '', tree_id: treeId, treeId: treeId};
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addBrother(row, addRowData);
          this.$nextTick(() => {
            this.$refs.refBudgetDataTableTree.setCurrentRow(row);
          })
        }
        else if (type == 1) {
          //新增同级
          if (this.selectRow.parentId != '-1') {
            let parentData = this.computedParentData(this.selectRow, this.data)
            parentData.ifLastLevel = 2
          }
          this.$set(addRowData, "parentCode", this.selectRow.parentCode);
          this.$set(addRowData, "parentId", this.selectRow.parentId);
          this.$set(addRowData, "parentName", this.selectRow.parentName);
          this.$set(addRowData, "planPerson", this.selectRow.planPerson);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children)>0 ? this.selectRow.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addBrother(this.selectRow, addRowData);
          this.$nextTick(() => {
            this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
          })
        } else {
          //新增下级
          this.selectRow.ifLastLevel = 2
          this.$set(addRowData, "parentCode", this.selectRow.code);
          this.$set(addRowData, "parentId", this.selectRow.id);
          this.$set(addRowData, "parentName", this.selectRow.name);
          this.$set(addRowData, "planPerson", this.selectRow.planPerson);
          this.$refs.refBudgetDataTableTree.toggleExpandedRow(this.selectRow.tree_id);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children)>0 ? this.selectRow.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addChild(this.selectRow, addRowData);
          this.$nextTick(() => {
            this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
          })
        }
        this.$set(addRowData, 'planDays', ((addRowData.planExpiryDate - addRowData.planBeginDate) / 86400000 + 1) || 0)
        this.$set(addRowData, 'playWorkDays', ((addRowData.planExpiryDate - addRowData.planBeginDate) / 86400000 + 1) || 0)
        this.$nextTick(function () {
        //  this.$refs.refName.focus();
          this.$set(addRowData, 'code', addRowData.tree_code)
          this.saveBudgetBtnDisabledFlag = false
          this.computedDate(this.data)
          this.data = this.data.map(item => {
            return this.computedValue(item)
          })
          this.$emit('planChange', this.data)
          scroll.scrollTo(scrollLeft, scrollTop)
        })
      },
      computedParentData(selected, data) {
        data = this.computedSaveData(data)
        return data.filter(item => item.code == selected.parentCode)[0]
      },
      computedSaveData(data) {
        let arr = []
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            arr = arr.concat(this.computedSaveData((item.children)))
          }
          if (item.tree_parent) {
            this.$set(item, 'parentId', item.tree_parent.id)
            this.$set(item, 'parentCode', item.tree_parent.code)
          }
          arr.push(item)
        })
        return arr
      },
      computedDate(data) {
        let planBeginDate = []
        let planExpiryDate = []
        data.forEach(item => {
          if (item.children && item.children.length > 0) {
            const data = this.computedDate(item.children)
            this.$set(item, 'planBeginDate', data[0])
            this.$set(item, 'planExpiryDate', data[1])
            this.$set(item, 'planDays', ((item.planExpiryDate - item.planBeginDate) / 86400000 + 1) || 0)
            this.$set(item, 'playWorkDays', ((item.planExpiryDate - item.planBeginDate) / 86400000 + 1) || 0)
          }
          if(item.persistStatus != 'fdel') {
            planBeginDate.push(item.planBeginDate)
            planExpiryDate.push(item.planExpiryDate)
          }
        })
        planBeginDate = planBeginDate.sort((a, b) => b - a).filter(item => item)
        planExpiryDate = planExpiryDate.sort((a, b) => a - b).filter(item => item)
        return [planBeginDate[planBeginDate.length - 1], planExpiryDate[planExpiryDate.length - 1]]
      },
      expandHandle() {
        this.defaultExpandAll = !this.defaultExpandAll
        this.$refs.refBudgetDataTableTree.toggleExpandedAll(this.defaultExpandAll);
      },
      computedTreeCode(data) {
        return data.map(item => {
          if(item.children && item.children.length > 0) {
            item.children = this.computedTreeCode(item.children)
          }
          item.code = item.tree_code
          return item
        })
      },
      deleteData() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async res => {
          if (this.selectRow.id) {
            this.deleteChildren(this.selectRow)
            // this.$set(this.selectRow, 'persistStatus', 'fdel')
          } else {
            this.data = this.setAllDataIsOnly(this.data, this.selectRow)
          }
          if (this.selectRow.parentId != '-1') {
            let parentData = this.computedParentData(this.selectRow, this.data)
            parentData.planValue = 0
            let brothersData = parentData.children.filter(item => (item.type == 1 || item.type == 2) && (item != this.selectRow) && item.persistStatus != 'fdel')
            if (brothersData.length == 0) parentData.ifLastLevel = 1
          }
          this.computedDate(this.data)
          this.data = this.data.map(item => {
            return this.computedValue(item)
          })
          this.$nextTick(() => {
            this.data = this.computedTreeCode(this.data)
            this.$emit('planChange', this.data)
            this.$emit('handleValueChange')
          })
        }).catch(err => console.log(err))
      },
      deleteChildren(data) {
        this.$set(data, 'persistStatus', 'fdel')
        if(data.children && data.children.length > 0) {
          data.children.forEach(item => {
            this.deleteChildren(item)
          })
        }
      },
      setAllDataIsOnly(data, target) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.setAllDataIsOnly(item.children, target)
          }
          return item != target
        })
      },
      validate() {
        return new Promise((reslove, reject) => {
          let i = 0
          while (this.$refs['formName' + i]) {
            this.$refs['formName' + i].validate(res => {
              if (!res) reslove(false)
            })
            i++
          }
          reslove(true)
        })
      }
    }
  }
</script>

<style>
</style>
