<template>
  <div class="template-container-list flex-layout">
    <div ref="refSplitPane" class="splitPane-container">
      <basic-split-pane class="bpmaManager-container-list" :default-percent='45' :min-percent='25'>
        <div slot="leftContainer">
          <basic-handler>
            <el-button icon="el-icon-plus" plain size="small" type="primary" @click="listData.unshift({l:1})">新增
            </el-button>
            <el-button icon="el-icon-if-save" plain size="small" type="primary"
              @click="saveLeftData">保存</el-button>
            <el-button :disabled="disabled" icon="el-icon-delete" plain size="small" type="danger"
              @click="deleteLeftData">删除</el-button>
          </basic-handler>
          <el-table :data="listData" @row-click="selecedRowLeft" highlight-current-row border stripe
            :height="heightUserManager" ref="refUserManager">
            <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
            <el-table-column header-align="center" label="名称" width="250" class-name="spacing-set">
              <template slot-scope="scope">
                <el-form :model="listData[scope.$index]" :ref="'formNameLeft' + scope.$index" :show-message="false"
                :rules="rules">
                  <el-form-item prop="name">
                    <basic-input v-model="listData[scope.$index].name"></basic-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column header-align="center" label="备注" class-name="spacing-set">
              <template slot-scope="scope">
                <basic-input v-model="listData[scope.$index].remark" :maxlength="5000"></basic-input>
              </template>
            </el-table-column>
          </el-table>
          <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
            @pagination="getGoodslist" />
        </div>
        <div slot="rightContainer">
          <basic-handler>
            <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                       @click="clickDefaultExpandAll">全部展开
            </el-button>
            <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                       @click="clickDefaultExpandAll">全部折叠
            </el-button>
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
            <el-button :disabled="disabled || !row.id" type="primary" size="small" icon="el-icon-plus"
              @click="clickLevel(1, -1)" plain>新增根</el-button>
            <el-button :disabled="disabled || Object.keys(selectRow).length == 0" type="primary" size="small"
              icon="el-icon-circle-plus-outline" @click="clickLevel(1,1)" plain>新增同级
            </el-button>
            <el-button :disabled="disabled || Object.keys(selectRow).length == 0" type="primary" size="small"
              icon="el-icon-circle-plus-outline" @click="clickLevel(2,1)" plain>新增下级
            </el-button>
            <el-button :disabled="disabled || !row.id" icon="el-icon-if-save" plain size="small" type="primary"
                       @click="saveRightData">保存</el-button>
            <el-button :disabled="disabled || Object.keys(selectRow).length == 0" type="danger" size="small"
              icon="el-icon-delete" plain @click="deleteRightData">删除</el-button>
          </basic-handler>
          <basic-table-tree :data="data" @current-change="rowChange" border :columns="tableTitle"
            :default-expand-all="defaultExpandAll" ref="refBudgetDataTableTree" :height="heightUserManager + 43">
            <template slot-scope="treeObj" slot="name">
              <el-form :model="treeObj.scope.row" :ref="'formName' + treeObj.scope.$index" :show-message="false"
                :rules="rules">
                <el-form-item prop="name">
                  <basic-input placeholder="任务名称" v-model="treeObj.scope.row.name"></basic-input>
                </el-form-item>
              </el-form>
            </template>
            <!-- <template slot-scope="treeObj" slot="value">
              <el-form :model="data[treeObj.scope.$index]">
                <el-form-item>
                  <basic-input :disabled="treeObj.scope.row.ifLastLevel == 2" :format="formatToThousands"
                    :formatValue="formatToMoney" type="number" placeholder="任务产值" @input="handleValueChange"
                    v-model="treeObj.scope.row.value">
                  </basic-input>
                </el-form-item>
              </el-form>
            </template> -->
            <template slot-scope="treeObj" slot="preTask">
              <el-form :model="data[treeObj.scope.$index]">
                <el-form-item>
                  <basic-input placeholder="前置任务" v-model="treeObj.scope.row.preTask" :maxlength="100"></basic-input>
                </el-form-item>
              </el-form>
            </template>
            <template slot-scope="treeObj" slot="remark">
              <el-form :model="data[treeObj.scope.$index]">
                <el-form-item>
                  <basic-input placeholder="备注" v-model="treeObj.scope.row.remark" :maxlength="5000"></basic-input>
                </el-form-item>
              </el-form>
            </template>
          </basic-table-tree>
        </div>
      </basic-split-pane>
    </div>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed"
  import methods from "@/utils/mixins/methods"
  import pagination from '@/components/Pagination'
  import tableTitle from './tableTitle'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import {
    getScheduleTempleteMaster,
    saveScheduleTempleteMaster,
    deleteScheduleTempleteMaster,
    getScheduleTempleteDetail,
    saveScheduleTempleteDetail,
    deleteScheduleTempleteDetail
  } from '@/api/bpmaManager/schedule/basicSetting/template.js'
  import {
    deepCloneByObject
  } from '@/utils'
  export default {
    name: 'basicSettingTemplate',
    mixins: [computed, methods, formatBasic],
    components: {
      pagination
    },
    data() {
      return {
        listData: [],
        tableTitle,
        defaultExpandAll: false,
        heightUserManager: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        },
        total: 0,
        data: [],
        selectRow: {},
        rules: {
          name: [{ required: true, trigger: 'change', max: 50 }]
        },
        row: {},
        isUpdate: true
      }
    },
    computed: {
      disabled() {
        return Object.keys(this.row).length == 0
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      },
      listData: {
        handler() {
          this.isUpdate = false
        },
        deep: true
      }
    },
    created() {
      this.getScheduleTempleteMaster()
    },
    mounted() {
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight())
      })
    },
    methods: {
      getScheduleTempleteMaster() {
        getScheduleTempleteMaster(this.modelSearchFilter).then(res => {
          this.total = res.data.total
          this.listData = res.data.rows
          this.$nextTick(() => {
            this.isUpdate = true
          })
        })
      },
      async deleteLeftData() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          if (this.row.id) {
            var res = await deleteScheduleTempleteMaster(this.row.id)
          }
          this.listData = this.listData.filter(item => item != this.row)
          this.$message.success(res.message)
          this.row = {}
          this.data = []
        })
      },
      saveLeftData() {
        this.$confirm('亲，您是否确定保存当前数据，保存后右侧未保存数据将被清空且不可恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          let lock = await this.validate(this.listData, 'formNameLeft')
          if(!lock) return
          saveScheduleTempleteMaster(this.listData).then(res => {
            this.listData = res.data
            this.$message.success(res.message)
            this.$nextTick(() => {
              this.isUpdate = true
              this.row = {}
              this.selectRow = {}
              this.data = []
            })
          })
        })
      },
      deleteRightData() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          if (this.selectRow.id) {
            let res = await deleteScheduleTempleteDetail({code: this.selectRow.code})
          }
          this.data = this.setAllDataIsOnly(this.data, this.selectRow)
          this.$nextTick(() => {
            this.computedTreeCode(this.data)
            let data = this.computedSaveData(this.data)
            data = data.map(item => {
              delete item.children
              return item
            })
            this.data = this.computedTreeData(data)
            if(this.data.length > 0) {
              this.saveRightData()
            } else {
              this.$message.success(res.message || '操作成功')
            }
          })
        }).catch(err => console.log(err))
      },
      computedTreeCode(data, parent) {
        return data.map(item => {
          if(item.children && item.children.length > 0) {
            item.children = this.computedTreeCode(item.children, item)
          }
          item.code = item.tree_code
          if(parent) {
            item.parentCode = parent.code
          }
          return item
        })
      },
      async saveRightData() {
        if (!this.row.id) return this.$message.warning('请先保存左侧列表')
        let data = this.computedSaveData(this.data)
        data = deepCloneByObject(data)
        data = data.map(item => {
          delete item.children
          item.value = Number(item.value)
          return item
        })
        let lock = await this.validate(data, 'formName')
        if(!lock) return
        saveScheduleTempleteDetail(data).then(res => {
          this.data = this.computedTreeData(res.data)
          this.$message.success(res.message)
          this.selectRow = {}
        })
      },
      validate(data, name) {
        return new Promise((reslove, reject) => {
          const len = data.length
          data.forEach((item, idx) => {
            this.$refs[name + idx].validate(valid => {
              if(valid && len == idx + 1) {
                reslove(true)
              } else if(!valid) {
                reslove(false)
                this.$message.warning('亲，请先完善和修正错误数据！')
                return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
              }
            })
          })
        })
      },
      setAllDataIsOnly(data, target) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.setAllDataIsOnly(item.children, target)
            item.children.length > 0 ? item.ifLastLevel = '2' : item.ifLastLevel = '1'
          }
          return item != target
        })
      },
      selecedRowLeft(row) {
        this.row = row;
        this.getScheduleTempleteDetail();
      },
      getScheduleTempleteDetail(){
        if (this.row.id) {
          getScheduleTempleteDetail({ masterId: this.row.id, page: 1, limit: 100000 }).then(res => {
            res.data.rows = this.computedTreeData(res.data.rows)
            this.data = res.data.rows
          })
        } else {
          this.data = []
        }
      },
      heightInit(innerHeight) {
        if (!this.$refs.refUserManager) return
        const offsetTopUserManager = this.$refs.refUserManager.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
      getGoodslist() {
        this.getScheduleTempleteMaster()
      },
      rowChange(row) {
        this.selectRow = row || {}
      },
      handleValueChange(row) {
        this.data = this.data.map(item => {
          return this.computedValue(item)
        })
      },
      computedValue(data) {
        if (data.children && data.children.length > 0) {
          let sum = 0
          data.children.forEach(res => {
            if (res.children && res.children.length > 0) {
              res = this.computedValue(res)
            }
            sum += Number(res.value)
          })
          data.value = sum
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
          ifLastLevel: '1',
          value: '0.00',
          masterId: this.row.id
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
          this.$refs.refBudgetDataTableTree.setCurrentRow(row);
        }
        else if (type == 1) {
          //新增同级
          if (this.selectRow.parentId != '-1') {
            let parentData = this.computedParentData(this.selectRow, this.data)
            parentData.ifLastLevel = '2'
          }
          this.$set(addRowData, "parentCode", this.selectRow.parentCode);
          this.$set(addRowData, "parentId", this.selectRow.parentId);
          this.$set(addRowData, "parentName", this.selectRow.parentName);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children) > 0 ? this.selectRow.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addBrother(this.selectRow, addRowData);
          this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
        } else {
          //新增下级
          this.selectRow.ifLastLevel = '2'
          this.$refs.refBudgetDataTableTree.toggleExpandedRow(this.selectRow.tree_id);
          let treeId = this.selectRow.tree_id + '-' + (this.$utils.length(this.selectRow.children) > 0 ? this.selectRow.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refBudgetDataTableTree.addChild(this.selectRow, addRowData);
          this.$refs.refBudgetDataTableTree.setCurrentRow(addRowData);
        }
        this.$set(addRowData, 'code', addRowData.tree_code)
        this.$nextTick(function () {
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
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.$refs.refBudgetDataTableTree.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefresh() {
        this.getScheduleTempleteDetail();
      }
    }
  }
</script>

<style scoped>

</style>
