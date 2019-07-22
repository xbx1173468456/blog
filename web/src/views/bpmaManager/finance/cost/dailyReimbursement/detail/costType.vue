<template>
  <div class="content-container">
    <div class="right-container">
      <basic-handler>
        <el-button :disabled="disabled" @click="visibleSync = true" icon="el-icon-plus" plain size="small"
                   type="primary">引入费用类型
        </el-button>
        <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteClick" icon="el-icon-delete" plain
                   size="small"
                   type="danger">删除
        </el-button>
      </basic-handler>
      <el-table :height="286" :data="showData" @row-click="rowChange" border highlight-current-row stripe>
        <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="费用类型编码">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <el-input clearable disabled size="small"
                          v-model="scope.row.feeTypeCode"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="费用类型名称">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <el-input clearable disabled size="small"
                          v-model="scope.row.feeTypeName"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" label="计量单位">
          <template slot-scope="scope">
            <span class="span-text">项</span>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="报销金额">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]" :ref="'formName' + scope.$index" :rules="rules"
                     :show-message="false">
              <el-form-item prop="price">
                <!-- <el-input clearable size="small" :disabled="disabled"
                          v-model="scope.row.price"></el-input> -->
                <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入报销金额"
                           v-model="scope.row.price" allowNegative price></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="摘要">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <el-input :disabled="disabled" clearable placeholder="请输入摘要"
                          size="small" v-model="scope.row.summary"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSync" title="引入费用-选择" >
      <dialog-cost-type @selectionChange="selectionChange" filterValid isShowChecked :linkData="showData"
                        v-if="visibleSync"></dialog-cost-type>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button @click="clickOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import dialogCostType from '@/views/components/dialog/dialogCostType'
  import { deleteFinanceDailyExpenseMasterDetail } from '@/api/bpmaManager/finance/cost/dailyReimbursement.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'costType',
    mixins: [formatBasic],
    components: {
      dialogCostType
    },
    data() {
      const that = this
      return {
        row: {},
        visibleSync: false,
        rowList: [],
        data: [],
        rules: {
          price: [{ validator: that.validatePass, trigger: 'change' }]
        }
      }
    },
    props: {
      disabled: Boolean,
      value: Array,
      parentDatas: Object,
      tableShow: Boolean
    },
    watch: {
      value: {
        handler(val) {
          this.data = val
          this.row = {}
        },
        deep: true
      },
      data: {
        handler(val) {
          this.$emit('input', val)
        },
        deep: true
      }
    },
    computed: {
      showData() {
        return this.data.filter(item => item.persistStatus != 'fdel')
      }
    },
    methods: {
      deleteClick() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          if (this.row.id) {
            // deleteFinanceDailyExpenseMasterDetail(this.row.id).then(res => {
            //   if (res.rel) {
            //     this.data = this.data.filter(item => item.id != this.row.id)
            //     this.row = {}
            //     this.$message.success(res.message)
            //   } else {
            //     this.$message.warning(res.message)
            //   }
            // })
            this.data = this.data.map(item => {
              if(item == this.row) {
                this.$set(item, 'persistStatus', 'fdel')
              }
              return item
            })
          } else {
            this.data = this.data.filter(item => item != this.row)
          }
          this.row = {}
        }).catch(err => '')
      },
      clickOk() {
        this.rowList.forEach(item => {
          this.data.unshift({
            feeTypeCode: item.code,
            feeTypeId: item.id,
            feeTypeName: item.name,
            masterId: this.parentDatas.id,
            price: '0.00'
          })
        })
        this.rowList = []
        this.visibleSync = false
      },
      selectionChange(rowList) {
        this.rowList = rowList.selectedRows
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if (isNaN(value) || value == 0) return callback(new Error())
        callback()
      },
      validate() {
        return new Promise((reslove, reject) => {
          let lock = true
          let arr = []
          if(this.showData.length == 0) reslove(true)
          this.showData.forEach(async(item, idx) => {
            this.$refs['formName' + idx].validate().then(() => {
              arr.push(idx)
              if (arr.length == this.showData.length) {
                reslove(true)
              }
            }).catch(err => {
              if (lock) {
                this.$message.warning('亲，请先完善和修正错误数据！')
                this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
                lock = false
              }
              reslove(false)
            })
          })
        })
      },
      rowChange(row) {
        this.row = row
      }
    }
  }
</script>

<style scoped>

</style>
