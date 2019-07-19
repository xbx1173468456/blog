<template>
  <div class="content-container">
    <div class="right-container">
      <basic-handler>
        <el-button :disabled="disabled || !parentDatas.handlePersonId" @click="visibleSyncOutTheFront = true" icon="el-icon-plus" plain size="small" type="primary">引入物资直进直出单
        </el-button>
        <el-button :disabled="disabled || !parentDatas.handlePersonId" @click="visibleSyncPurchase = true" icon="el-icon-plus" plain size="small" type="primary">引入物资采购入库单
        </el-button>
        <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteClick" icon="el-icon-delete" plain
                   size="small"
                   type="danger">删除
        </el-button>
      </basic-handler>
      <el-table :height="286" :data="showData" @row-click="rowChange" border highlight-current-row stripe>
        <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="单据编码">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <el-input clearable disabled size="small"
                          v-model="scope.row.billCode"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="单据名称">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <el-input :disabled="disabled" clearable disabled
                          size="small" v-model="scope.row.billName"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="单据金额">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]" :ref="'formPrice' + scope.$index"
                     :show-message="false">
              <el-form-item>
                <!-- <el-input clearable size="small" :disabled="disabled"
                          v-model="scope.row.price"></el-input> -->
                <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入预算金额"
                           v-model="scope.row.billPrice" price></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="spacing-set" label="报销金额">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]" :ref="'formName' + scope.$index" :rules="rules"
                     :show-message="false">
              <el-form-item prop="payPrice">
                <!-- <el-input clearable size="small" :disabled="disabled"
                          v-model="scope.row.price"></el-input> -->
                <basic-input :disabled="disabled" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入预算金额"
                           v-model="scope.row.payPrice" allowNegative price></basic-input>
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
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncOutTheFront" title="引入直进直出单-选择" >
      <dialog-out-the-front @selectionChange="selectionChange" filterValid isShowChecked :payPersonId="parentDatas.handlePersonId" :proId="parentDatas.proId"
                        v-if="visibleSyncOutTheFront" :personTypeData="showData"></dialog-out-the-front>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncOutTheFront = false">取 消</el-button>
        <el-button @click="handleClick(1)" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncPurchase" title="引入采购入库单-选择" >
      <dialog-purchase @selectionChange="selectionChange" filterValid isShowChecked :payPersonId="parentDatas.handlePersonId" :proId="parentDatas.proId"
                        v-if="visibleSyncPurchase" :personTypeData="showData"></dialog-purchase>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncPurchase = false">取 消</el-button>
        <el-button @click="handleClick(2)" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import dialogOutTheFront from '@/views/components/dialog/dialogOutTheFront'
  import dialogPurchase from '@/views/components/dialog/dialogPurchase'
  import { deleteFinanceBusinessExpenseDetail } from '@/api/bpmaManager/finance/cost/businessReimbursement.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'costType',
    mixins: [formatBasic],
    components: {
      dialogOutTheFront,
      dialogPurchase
    },
    data() {
      const that = this
      return {
        row: {},
        visibleSyncOutTheFront: false,
        visibleSyncPurchase: false,
        rowList: [],
        data: [],
        rules: {
          payPrice: [{ validator: that.validatePass, trigger: 'change' }]
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
            // deleteFinanceBusinessExpenseDetail(this.row.id).then(res => {
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
      handleClick(type) {
        this.rowList.forEach(item => {
          this.data.unshift({
            billCode: item.code,
            billName: item.name,
            billId: item.id,
            payPrice: '0.00',
            billPrice: item.buyTotalPrice,
            billType: type,
            masterId: this.parentDatas.id
          })
        })
        this.visibleSyncOutTheFront = false
        this.visibleSyncPurchase = false
        this.rowList = []
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if (isNaN(value) || value == 0) return callback(new Error())
        callback()
      },
      validate() {
        return new Promise((reslove, reject) => {
          let arr = []
          let lock = true
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
      },
      addClick() {
        this.data.push({
          code: this.createdCode(this.data),
          masterId: this.parentDatas.id,
          payPrice: '0.00',
          price: '0.00'
        })
      },
      createdCode(data) {
        data = data.map(item => parseInt(item.code))
        return this.prefixInteger((data.sort((a, b) => a - b)[data.length - 1] + 1) || 0, 2)
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

</style>
