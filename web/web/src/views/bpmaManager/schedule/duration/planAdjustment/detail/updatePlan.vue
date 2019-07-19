<template>
  <div class="content-container">
    <basic-handler>
      <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain @click="expandHandle">
        全部折叠
      </el-button>
      <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
        @click="expandHandle">全部展开</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="refDataPush" plain>刷新</el-button>
      <el-button :disabled="disabled" type="primary" size="small" icon="el-icon-plus" @click="clickLevel(1, -1)" plain>
        新增根</el-button>
      <el-button
        :disabled="disabled || Object.keys(this.selectRow).length == 0 || selectRow.type == 3 || selectRow.type == 4"
        type="primary" size="small" icon="el-icon-circle-plus-outline" @click="clickLevel(1,1)" plain>新增同级</el-button>
      <el-button
        :disabled="disabled || Object.keys(this.selectRow).length == 0 || selectRow.type == 3 || selectRow.type == 4"
        type="primary" size="small" icon="el-icon-circle-plus-outline" @click="clickLevel(2,1)" plain>新增下级</el-button>
      <el-button
        :disabled="disabled || Object.keys(this.selectRow).length == 0 || selectRow.type == 3 || selectRow.type == 4"
        type="danger" size="small" icon="el-icon-delete" @click="deleteData" plain>删除</el-button>
    </basic-handler>
    <basic-table-tree :data="showData" @current-change="rowChange" border :columns="tableTitle"
      :default-expand-all="defaultExpandAll" ref="refBudgetDataTableTree" :pushData="data">
      <template slot-scope="treeObj" slot="name">
        <el-form :model="treeObj.scope.row" :ref="'formName' + treeObj.scope.$index" :show-message="false"
          :rules="rules">
          <el-form-item :prop="(treeObj.scope.row.type == 1 || treeObj.scope.row.type == 2 || treeObj.scope.row.type == 5) ? 'name' : ''">
            <basic-input
              :disabled="treeObj.scope.row.type != 5 && (!treeObj.scope.row.isAdd || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4)"
              placeholder="任务名称" v-model="treeObj.scope.row.name"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedValue">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input
              :disabled="disabled || treeObj.scope.row.ifLastLevel == 2 || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4"
              :format="formatToThousands" :formatValue="formatToMoney" type="number" placeholder="任务产值"
              @input="handleValueChange" v-model="treeObj.scope.row.changedValue" price>
            </basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedPerson">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4"
              placeholder="责任人员" v-model="treeObj.scope.row.changedPerson" :maxlength="50"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedPreTask">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4"
              placeholder="前置任务" v-model="treeObj.scope.row.changedPreTask" :maxlength="50"></basic-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedBeginDate">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <el-date-picker
              :disabled="disabled || treeObj.scope.row.ifLastLevel == 2 || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4"
              :prefix-icon="disabled ? 'a' : ''" v-model="treeObj.scope.row.changedBeginDate" value-format="timestamp"
              align="center" size="small" type="date" @change="dateChange(treeObj.scope.row)" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedExpiryDate">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <el-date-picker :disabled="disabled ||
                         !treeObj.scope.row.changedBeginDate ||
                         treeObj.scope.row.ifLastLevel == 2 ||
                         treeObj.scope.row.type == 3 ||
                         treeObj.scope.row.type == 4" :prefix-icon="disabled ? 'a' : ''"
              v-model="treeObj.scope.row.changedExpiryDate" value-format="timestamp" align="center" size="small"
              type="date" :picker-options="pickerOptions" @change="dateChange(treeObj.scope.row)" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="treeObj" slot="changedDays">
        <span class="span-text">{{treeObj.scope.row.changedDays || 0}}</span>
      </template>
      <template slot-scope="treeObj" slot="changedWorkDays">
        <span class="span-text">{{treeObj.scope.row.changedWorkDays || 0}}</span>
      </template>
      <template slot-scope="treeObj" slot="type">
        <span class="span-text">{{formatEnabledEnumSchedule(treeObj.scope.row.type)}}</span>
      </template>
      <template slot-scope="treeObj" slot="changedRemark">
        <el-form :model="data[treeObj.scope.$index]">
          <el-form-item>
            <basic-input :disabled="disabled || treeObj.scope.row.type == 3 || treeObj.scope.row.type == 4"
              placeholder="备注" v-model="treeObj.scope.row.changedRemark" :maxlength="100"></basic-input>
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
    postSchedulePlanChangeDetail,
    deleteSchedulePlanChangeDetail
  } from '@/api/bpmaManager/schedule/duration/planAdjustment'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import {
    deepCloneByObject
  } from '@/utils'
  export default {
    name: 'addPlan',
    mixins: [formatBasic, formatEnum, methods, computed],
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
            return time.getTime() < that.selectRow.changedBeginDate
          }
        },
        rules: {
          name: [{ required: true, trigger: 'change', max: 100 }]
        }
      }
    },
    props: {
      disabled: Boolean,
      value: Array,
      formData: Object,
      getSchedulePlanDetail: Function,
      getSchedulePlanChangeDetail: Function
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
          this.$emit('planChange', this.data)
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
    created() {
      this.getEnumData(['GetEnabledEnumSchedule'])
    },
    methods: {
      handleDate(data) {
        data.forEach(item => {
          if (item.ifLastLevel == 2) {
            item.children = this.handleDate(item.children)
          }
          item.changedBeginDate = item.changedBeginDate ? new Date(item.changedBeginDate).getTime() : ''
          item.changedExpiryDate = item.changedExpiryDate ? new Date(item.changedExpiryDate).getTime() : ''
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
        this.getSchedulePlanChangeDetail()
      },
      rowChange(row) {
        this.selectRow = row || {}
      },
      sumDays(idx) {
        const { startDate, endDate } = this.data[idx]
        this.$set(this.data[idx], 'days', ((endDate - startDate) / 86400000 + 1) || 0)
      },
      dateChange(data) {
        if (data.changedBeginDate > data.changedExpiryDate) data.changedExpiryDate = undefined
        this.computedDate(this.data)
        this.$set(data, 'changedDays', ((data.changedExpiryDate - data.changedBeginDate) / 86400000 + 1) || 0)
        this.$emit('planChange', this.data)
      },
      handleValueChange(row) {
        this.data = this.data.map(item => {
          return this.computedValue(item)
        })
        this.$emit('handleValueChange')
      },
      computedValue(data) {
        if ((data.type == 1 || data.type == 2 || data.type == 5) && data.children && data.children.length > 0) {
          let sum = 0
          data.children.forEach(res => {
            if ((res.type == 1 || res.type == 2 || res.type == 5) && res.children && res.children.length > 0) {
              res = this.computedValue(res)
            }
            if (res.type == 1 || res.type == 2 || res.type == 5 && res.persistStatus != 'fdel') {
              sum += Number(res.changedValue)
            }
          })
          data.changedValue = sum
        }
        return data
      },
      // 新增
      clickLevel(type, pid) {
        const scroll = this.$refs.refBudgetDataTableTree.$el.querySelector('.el-table__body-wrapper')
        const { scrollLeft, scrollTop } = scroll
        const date = new Date()
        date.setHours(0)
        date.setMinutes(0)
        date.setSeconds(0)
        date.setMilliseconds(0)
        let addRowData = {
          changedBeginDate: date.getTime(),
          changedExpiryDate: date.getTime(),
          changedValue: '0.00',
          masterId: this.formData.planId,
          isAdd: true,
          type: 5,
          ifLastLevel: 1
        }
        //追加菜单树
        if (type == 1 && pid == -1) {
          //新增根
          this.$set(addRowData, "parentCode", '00');
          this.$set(addRowData, "parentId", -1);
          this.$set(addRowData, "level", 1);
          this.$set(addRowData, "orgPathName", '/');
          let treeId = this.data.length;
          let row = { tree_parent: '', tree_id: treeId, treeId: treeId };
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
          this.$set(addRowData, "changedPerson", this.selectRow.changedPerson);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children) > 0 ? this.selectRow.children.length : '0');
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
          this.$set(addRowData, "changedPerson", this.selectRow.changedPerson);
          this.$refs.refBudgetDataTableTree.toggleExpandedRow(this.selectRow.tree_id);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children) > 0 ? this.selectRow.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addChild(this.selectRow, addRowData);
          this.$nextTick(() => {
            this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
          })
        }
        this.$set(addRowData, 'changedDays', ((addRowData.changedExpiryDate - addRowData.changedBeginDate) / 86400000 + 1) || 0)
        this.$nextTick(function () {
          this.$set(addRowData, 'code', addRowData.tree_code)
          //  this.$refs.refName.focus();
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
        let changedBeginDate = []
        let changedExpiryDate = []
        data.forEach(item => {
          if ((item.type == 1 || item.type == 2 || item.type == 5) && item.ifLastLevel == 2) {
            const lock = item.children.some(detail => {
              return detail.type == 1 || detail.type == 2 || detail.type == 5
            })
            if (lock) {
              const data = this.computedDate(item.children)
              this.$set(item, 'changedBeginDate', data[0])
              this.$set(item, 'changedExpiryDate', data[1])
              this.$set(item, 'changedDays', ((item.changedExpiryDate - item.changedBeginDate) / 86400000 + 1) || 0)
            }
          }
          if (item.type == 1 || item.type == 2 || item.type == 5 && item.persistStatus != 'fdel') {
            changedBeginDate.push(item.changedBeginDate)
            changedExpiryDate.push(item.changedExpiryDate)
          }
        })
        changedBeginDate = changedBeginDate.sort((a, b) => b - a).filter(item => item)
        changedExpiryDate = changedExpiryDate.sort((a, b) => a - b).filter(item => item)
        return [changedBeginDate[changedBeginDate.length - 1], changedExpiryDate[changedExpiryDate.length - 1]]
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
          if (this.selectRow.type == 5) {
            if(this.selectRow.id) {
              // await deleteSchedulePlanChangeDetail(this.selectRow.id)
              this.deleteChildren(this.selectRow)
            } else {
              this.data = this.setAllDataIsOnly(this.data, this.selectRow)
            }
            // if (this.selectRow.parentId != '-1') {
            //   let parentData = this.computedParentData(this.selectRow, this.data)
            //   parentData.children = parentData.children.filter(item => item != this.selectRow)
            //   let brothersData = parentData.children.filter(item => (item.type == 1 || item.type == 2 || item.type == 5) && (item != this.selectRow))
            //   if (brothersData.length == 0) parentData.ifLastLevel = 1
            //   if(this.selectRow.id) {
            //     let saveData = this.computedSaveData(this.data)
            //     let res = await postSchedulePlanChangeDetail(deepCloneByObject(saveData))
            //   }
            // } else {
            //   this.data = this.data.filter(item => item != this.selectRow)
            // }
            this.data = this.computedTreeCode(this.data)
            this.computedDate(this.data)
            this.data = this.data.map(item => {
              return this.computedValue(item)
            })
            this.$emit('planChange', this.data)
            this.$emit('handleValueChange')
          } else {
            if (this.selectRow.type == 1) this.selectRow.type = 3
            else this.selectRow.type = 4
            this.changeChildrenIfLastLevel(this.selectRow, this.selectRow.type)
            if (this.selectRow.id) {
              let saveData = this.computedSaveData(this.data)
              let res = await postSchedulePlanChangeDetail(deepCloneByObject(saveData))
            }
            if (this.selectRow.parentId != '-1') {
              let parentData = this.computedParentData(this.selectRow, this.data)
              let brothersData = parentData.children.filter(item => (item.type == 1 || item.type == 2 || item.type == 5) && (item != this.selectRow))
              if (brothersData.length == 0) parentData.ifLastLevel = 1
            }
            this.computedDate(this.data)
            this.data = this.data.map(item => {
              return this.computedValue(item)
            })
            this.$emit('planChange', this.data)
            this.$emit('handleValueChange')
            // this.data = this.setAllDataIsOnly(this.data, this.selectRow)
            this.$message.success(res.message || '操作成功')
          }
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
          if (item.ifLastLevel == 2) {
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
      },
      changeChildrenIfLastLevel(data, type) {
        if (data.ifLastLevel == 2) {
          data.children.forEach(item => {
            item.type = type
            if (item.ifLastLevel == 2) {
              this.changeChildrenIfLastLevel(item, type)
            }
          })
        }
      }
    }
  }
</script>

<style>
</style>