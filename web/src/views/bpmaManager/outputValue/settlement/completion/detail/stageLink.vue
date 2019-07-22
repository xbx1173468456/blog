<template>
  <div class="content-container">
    <basic-handler>
      <el-button :disabled="disabled" @click="topBasicDialog('stage')" icon="el-icon-plus" plain size="small"
                  type="primary">引入阶段结算单
      </el-button>
      <el-button :disabled="disabled" @click="topBasicDialog('visaData')" icon="el-icon-plus" plain size="small"
                  type="primary">引入签证单
      </el-button>
      <el-button :disabled="disabled" @click="topBasicDialog('evidence')" icon="el-icon-plus" plain size="small"
                  type="primary">引入索赔单
      </el-button>
      <el-button :disabled="disabled" @click="topBasicDialog('reward')" icon="el-icon-plus" plain size="small"
                  type="primary">引入奖励单
      </el-button>
      <el-button :disabled="disabled" @click="topBasicDialog('punishment')" icon="el-icon-plus" plain size="small"
                  type="primary">引入扣罚单
      </el-button>
      <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteClick" icon="el-icon-delete" plain
                  size="small"
                  type="danger">删除
      </el-button>
    </basic-handler>
    <el-table :height="286" :data="showData" @row-click="rowChange" border highlight-current-row>
      <el-table-column header-align="center" align="center" label="序号" type="index" width="60"></el-table-column>
      <el-table-column header-align="center" align="center" label="单据编码" show-overflow-tooltip width="130">
        <template slot-scope="props">
          <span class="span-text">{{props.row.billCode}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="单据类型" show-overflow-tooltip width="200">
        <template slot-scope="props">
          <span class="span-text">{{formatBillType(props.row)}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="right" label="款项金额" width="110" show-overflow-tooltip>
        <template slot-scope="props">
          <span class="span-text">{{(formatToThousands(props.row.billPrice))}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="right" label="未收金额" width="110" show-overflow-tooltip>
        <template slot-scope="props">
          <span class="span-text">{{formatToThousands(props.row.unincomePrice)}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="应收金额" width="110" show-overflow-tooltip className="spacing-set">
        <template slot-scope="props">
          <el-form :model="props.row" :rules="rules" :ref="'refFormShouldIncomePrice' + props.$index">
            <el-form-item prop="shouldIncomePrice" :show-message="false">
              <basic-input
                @click.native="index = props.$index"
                :format="formatToThousands"
                :formatValue="formatToMoney"
                :disabled="disabled"
                :allowNegative="props.row.billType == 5"
                v-model="props.row.shouldIncomePrice"
                price
                @input="handleComputedUnincomePrice(props)">
              </basic-input>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="结算说明" show-overflow-tooltip
        className="spacing-set">
        <template slot-scope="props">
          <basic-input :disabled="disabled" v-model="props.row.summary" :maxlength="500"></basic-input>
        </template>
      </el-table-column>
    </el-table>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncStage" title="阶段结算单-选择">
      <dialog-stage-settlement filterIfPay :linkData="showData" isShowChecked :proId="formData.proId" :contractId="formData.contractId" @selectionChange="selectionChange" filterValid
        v-if="visibleSyncStage"></dialog-stage-settlement>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncStage = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncVisaData" title="签证登记单-选择">
      <dialog-visa-data filterIfPay :linkData="showData" isShowChecked :proId="formData.proId" :contractId="formData.contractId" @selectionChange="selectionChange" filterValid
        v-if="visibleSyncVisaData"></dialog-visa-data>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncVisaData = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncEvidence" title="索赔登记单-选择">
      <dialog-evidence filterIfPay :linkData="showData" isShowChecked :proId="formData.proId" :contractId="formData.contractId" @selectionChange="selectionChange" filterValid
        v-if="visibleSyncEvidence"></dialog-evidence>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncEvidence = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncReward" title="奖励单-选择">
      <dialog-reward filterIfPay :linkData="showData" isShowChecked :proId="formData.proId" :contractId="formData.contractId" @selectionChange="selectionChange" filterValid
        v-if="visibleSyncReward"></dialog-reward>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncReward = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncPunishment" title="扣罚单-选择">
      <dialog-punishment filterIfPay :linkData="showData" isShowChecked :proId="formData.proId" :contractId="formData.contractId" @selectionChange="selectionChange" filterValid
        v-if="visibleSyncPunishment"></dialog-punishment>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncPunishment = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import dialogStageSettlement from '@/views/components/dialog/dialogStageSettlement'
  import dialogVisaData from '@/views/components/dialog/dialogVisaData'
  import dialogEvidence from '@/views/components/dialog/dialogEvidence'
  import dialogReward from '@/views/components/dialog/dialogReward'
  import dialogPunishment from '@/views/components/dialog/dialogPunishment'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import { deleteValueFinishPayDetail } from '@/api/bpmaManager/outputValue/settlement/completion.js'
  export default {
    name: 'stageLink',
    mixins: [ methods, computed, formatEnum, formatBasic ],
    components: {
      dialogStageSettlement,
      dialogVisaData,
      dialogEvidence,
      dialogReward,
      dialogPunishment
    },
    props: {
      formData: Object,
      disabled: Boolean,
      value: Array
    },
    data() {
      const that = this
      return {
        data: [],
        row: {},
        type: null,
        visibleSyncStage: false,
        visibleSyncVisaData: false,
        visibleSyncEvidence: false,
        visibleSyncReward: false,
        visibleSyncPunishment: false,
        selectedRow: [],
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzyKeys: '',
          fuzzy: ''
        },
        rules: {
          shouldIncomePrice: [{ validator: that.validatePass, trigger: 'change' }]
        },
        index: 0
      }
    },
    watch: {
      data: {
        handler(val) {
          this.$emit('input', val)
        }
      },
      value: {
        handler(val) {
          this.data = val
          this.$nextTick(() => {
            this.showData.forEach((item, idx) => {
              this.$refs['refFormShouldIncomePrice' + idx].clearValidate()
            })
          })
        }
      }
    },
    computed: {
      showData() {
        return this.data.filter(item => item.persistStatus != 'fdel')
      }
    },
    created() {
      this.getEnumData(['GetBillTypeData'])
    },
    methods: {
      deleteClick() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async res => {
          if (this.row.id) {
            // await deleteValueFinishPayDetail(this.row.id)
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
          this.index = 0
        })
      },
      rowChange(row) {
        this.row = row
      },
      topBasicDialog(type) {
        if (this.disabled) return
        if (!this.formData.contractId) return this.$message.warning('请先选择合同')
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      handleComputedUnincomePrice(scope) {
        // this.$set(this.data[scope.$index], 'unincomePrice', scope.row.billPrice - scope.row.shouldIncomePrice)
      },
      handleChange() {
        const row = this.selectedRow
        if (row.length === 0) return this.$message.warning('请至少勾选一个项目')
        switch(this.type) {
          case 'stage':
            row.forEach(item => {
              let { id, code, name, payPrice, totalPrice } = item
              payPrice = payPrice.replace(/,/g, '')
              totalPrice = totalPrice.replace(/,/g, '')
              this.data.unshift({
                billType: 1,
                billId: id,
                billName: name,
                billCode: code,
                billPrice: totalPrice,
                masterId: this.formData.id,
                shouldIncomePrice: '0.00',
                unincomePrice: totalPrice - payPrice
              })
            })
            break
          case 'visaData':
            row.forEach(item => {
              let { id, code, name, payPrice } = item
              payPrice = payPrice.replace(/,/g, '')
              this.data.unshift({
                billType: 2,
                billId: id,
                billName: name,
                billCode: code,
                billPrice: payPrice,
                masterId: this.formData.id,
                shouldIncomePrice: '0.00',
                unincomePrice: payPrice
              })
            })
            break
          case 'evidence':
            row.forEach(item => {
              let { id, code, name, payPrice } = item
              payPrice = payPrice.replace(/,/g, '')
              this.data.unshift({
                billType: 3,
                billId: id,
                billName: name,
                billCode: code,
                billPrice: payPrice,
                masterId: this.formData.id,
                shouldIncomePrice: '0.00',
                unincomePrice: payPrice
              })
            })
            break
          case 'reward':
            row.forEach(item => {
              let { id, code, name, price } = item
              price = price.replace(/,/g, '')
              this.data.unshift({
                billType: 4,
                billId: id,
                billName: name,
                billCode: code,
                billPrice: price,
                masterId: this.formData.id,
                shouldIncomePrice: '0.00',
                unincomePrice: price
              })
            })
            break
          case 'punishment':
            row.forEach(item => {
              let { id, code, name, price } = item
              price = price.replace(/,/g, '')
              this.data.unshift({
                billType: 5,
                billId: id,
                billName: name,
                billCode: code,
                billPrice: `-${price}`,
                masterId: this.formData.id,
                shouldIncomePrice: '0.00',
                unincomePrice: `-${price}`
              })
            })
            break
        }
        this.isUpdate = false
        this.selectedRow = []
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRows
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if(this.showData[this.index].billPrice < 0 && value > 0) {
          callback(new Error())
        }
        // if(value < 0 && value > this.data[this.index].billPrice) {
        //   return callback()
        // }
        // if(value > this.data[this.index].billPrice) {
        //   callback(new Error())
        // }
        callback()
      },
      validate() {
        return new Promise((reslove, reject) => {
          if(this.showData.length == 0) return reslove(true)
          this.showData.forEach((item, idx) => {
            this.index = idx
            this.$refs['refFormShouldIncomePrice' + idx].validate(valid => {
              if (!valid) reslove(false)
            })
            if(idx + 1 == this.showData.length) reslove(true)
          })
        })
      }
    }
  }
</script>

<style>
</style>
