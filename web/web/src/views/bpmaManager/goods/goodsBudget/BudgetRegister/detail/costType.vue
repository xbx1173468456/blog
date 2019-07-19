<template>
  <div class="content-container">
    <div class="right-container">
      <basic-handler>
        <el-button :disabled="disabled" @click="visibleSync = true" icon="el-icon-plus" plain size="small"
          type="primary">引入物资
        </el-button>
        <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteClick" icon="el-icon-delete" plain
          size="small" type="danger">删除
        </el-button>
      </basic-handler>
      <el-table :height="286" :data="showData" @row-click="rowChange" border highlight-current-row stripe>
        <el-table-column header-align="center" align="center" label="序号" type="index" width="50"></el-table-column>
        <el-table-column header-align="center" align="center" label="物资编码" prop="code" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="left" label="物资名称" prop="name" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="left" label="规格型号" prop="model" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="left" label="计量单位" prop="unit" show-overflow-tooltip></el-table-column>
        <el-table-column header-align="center" align="right" class-name="spacing-set" label="预算数量" width="140">
          <template slot-scope="scope">
            <el-form :model="showData[scope.$index]" :ref="'refFormSum' + scope.$index" :rules="rules"
                     :show-message="false">
              <el-form-item prop="sum">
                <basic-input :disabled="disabled" :format="formatToThousandsFour" :formatValue="formatToMoneyFour" placeholder="请输入预算数量"
                           v-model="scope.row.sum" :allowNegative="parentDatas.ifChange == 1" price></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="right" class-name="spacing-set" label="预算单价" width="140">
          <template slot-scope="scope">
            <basic-input :disabled="disabled" :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
              placeholder="请输入预算单价" v-model="scope.row.unitPrice" price></basic-input>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="right" class-name="spacing-set" label="预算合价" width="140">
          <template slot-scope="scope">
            <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney"
              placeholder="请输入预算合价" v-model="scope.row.totalPrice" allowNegative price></basic-input>
          </template>
        </el-table-column>
        <el-table-column header-align="center"class-name="spacing-set" label="用料部位" width="140">
          <template slot-scope="scope">
            <el-input :disabled="disabled" clearable placeholder="请输入用料部位" size="small" v-model="scope.row.position">
            </el-input>
          </template>
        </el-table-column>
        <el-table-column header-align="center" class-name="spacing-set" label="摘要">
          <template slot-scope="scope">
            <el-input :disabled="disabled" clearable placeholder="请输入摘要" size="small" v-model="scope.row.summary">
            </el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSync" title="引入物资-选择">
      <dialog-material-dictionary @selectionChange="selectionChange" filterValid isShowChecked :materialDictionaryData="showData"
        v-if="visibleSync"></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSync = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  import { deleteMaterialBudgetDetail } from '@/api/bpmaManager/goods/goodsBudget/budgetRegister'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  export default {
    name: 'costType',
    mixins: [formatBasic],
    components: {
      dialogMaterialDictionary
    },
    data() {
      const that = this
      return {
        row: {},
        visibleSync: false,
        rowList: [],
        data: [],
        showData: [],
        rules: {
          sum: [{ validator: that.validatePass, trigger: 'change' }]
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
          this.showData = this.data.filter(item => {
            return item.persistStatus != 'fdel'
          })
          this.data.forEach(item => {
            this.$set(item, 'totalPrice', item.sum * item.unitPrice)
            return item
          })
          this.$emit('input', val)
          this.$emit('change', this.showData)
        },
        deep: true
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
            // deleteMaterialBudgetDetail(this.row.id).then(res => {
            //   if (res.rel) {
            //     this.data = this.data.filter(item => item.id != this.row.id)
            //     this.row = {}
            //     this.$message.success(res.message)
            //   } else {
            //     this.$message.warning(res.message)
            //   }
            // })
            this.$set(this.row, 'persistStatus', 'fdel')
            // this.$message.success('刪除成功')
            this.row = {}
          } else {
            this.data = this.data.filter(item => item != this.row)
            // this.$message.success('刪除成功')
            this.row = {}
          }
        }).catch(err => '')
      },
      clickOk() {
        this.rowList.forEach(item => {
          this.data.unshift({
            feeTypeCode: item.code,
            feeTypeId: item.id,
            feeTypeName: item.name,
            masterId: this.parentDatas.id,
            price: '0.00',
            persistStatus: 'new'
          })
        })
        this.rowList = []
        this.visibleSync = false
      },
      selectionChange(rowList) {
        this.rowList = rowList.selectedRows
      },
      validatePass(rule, value, callback) {
        if(this.parentDatas.ifChange == 1 && value == 0) {
          callback(new Error())
        }
        callback()
      },
      handleChange() {
        this.rowList.forEach(item => {
          const { code, name, model, unit, id } = item
          this.data.push({
            sum: '0.0000',
            unitPrice: '0.0000',
            totalPrice: '0.0000',
            masterId: this.parentDatas.id,
            materialId: id,
            code,
            name,
            model,
            unit,
            persistStatus: 'nrm'
          })
        })
        this.rowList = []
        this.visibleSync = false
      },
      validate() {
        return new Promise((reslove, reject) => {
          if(this.showData.length == 0) reslove(true)
          this.showData.forEach(async (item, idx) => {
            this.$refs['refFormSum' + idx].validate(valid => {
              if(!valid) {
                reslove(false)
              }
            })
            if(idx + 1 == this.showData.length) {
              reslove(true)
            }
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
