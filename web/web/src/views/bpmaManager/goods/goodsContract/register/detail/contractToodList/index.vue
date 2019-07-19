<template>
  <div class="contranctToodList-container-list flex-layout">
    <basic-handler>
      <el-button :disabled="disabled" @click="visibleSyncMaterialDictionary = true, selectedRow = []" icon="el-icon-plus" plain size="small" type="primary">引入物资</el-button>
      <el-button :disabled="disabled || data.length == 0" @click="save" icon="el-icon-if-save" plain size="small" type="primary">保存</el-button>
      <el-button :disabled="disabled || Object.keys(row).length == 0" @click="deleteRow" icon="el-icon-delete" plain size="small"type="danger">删除</el-button>
      <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
    </basic-handler>
    <div class="table-container">
      <el-table :data="data" @row-click="rowClick" highlight-current-row border stripe ref="refContractToodList" :height="heightUserManager - 220">
        <el-table-column header-align="center" width="60" label="序号" type="index" class="span-text"></el-table-column>
        <el-table-column header-align="center" width="100" label="编码" prop="code" show-overflow-tooltip class="span-text"></el-table-column>
        <el-table-column header-align="center" width="180" label="名称" prop="name" show-overflow-tooltip class="span-text"></el-table-column>
        <el-table-column header-align="center" width="100" label="规格型号" prop="model" show-overflow-tooltip class="span-text"></el-table-column>
        <el-table-column header-align="center" width="100" label="计量单位" prop="unit" show-overflow-tooltip class="span-text"></el-table-column>
        <el-table-column header-align="center" className="spacing-set" label="数量" width="90">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <basic-input :disabled="disabled" clearable placeholder="请输入数量"
                          size="small" v-model="scope.row.sum" :formatValue="formatToMoneyFour" price></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column header-align="center" width="90" className="spacing-set" label="单价">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <basic-input :disabled="disabled" clearable placeholder="请输入单价"
                          size="small" v-model="scope.row.unitPrice" :format="formatToThousandsFour" :formatValue="formatToMoneyFour" price></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="right" width="110" className="spacing-set" label="金额">
          <template slot-scope="scope">
            <el-col :offset="2">
              <span class="span-text">{{sumTotalPrice(scope)}}</span>
            </el-col>
          </template>
        </el-table-column>
        <el-table-column header-align="center" className="spacing-set" label="摘要">
          <template slot-scope="scope">
            <el-form :model="data[scope.$index]">
              <el-form-item>
                <basic-input :disabled="disabled" clearable placeholder="请输入摘要"
                          size="small" v-model="scope.row.summary"></basic-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
      </el-table>
      <pagination :limit.sync="modelSearchFilter.limit" :page.sync="modelSearchFilter.page" :total="total"
        @pagination="getGoodslist" />
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择" >
      <dialog-material-dictionary @selectionChange="selectionChange" filterValid isShowChecked :materialDictionaryData="data"
                           v-if="visibleSyncMaterialDictionary"></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import pagination from '@/components/Pagination'
import methods from '@/utils/mixins/methods'
import computed from '@/utils/mixins/computed'
import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
import {
  getMaterialContractDetail,
  deleteMaterialContractDetail,
  saveMaterialContractDetail
} from '@/api/bpmaManager/goods/goodsContract/register'
import formatBasic from '@/utils/mixins/formatBasic.js'
export default {
  name: 'contractToodList',
  mixins: [computed, methods, formatBasic],
  components: {
    pagination,
    dialogMaterialDictionary
  },
  data() {
    return {
      data: [],
      tableShow: false,
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzyKeys: '',
        fuzzy: ''
      },
      selectedRow: [],
      total: 0,
      heightUserManager: 0,
      visibleSyncMaterialDictionary: false,
      row: {}
    }
  },
  props: {
    formData: {
      type: Object,
      default: () => {}
    }
  },
    mounted() {
      this.$nextTick(() => {
        this.heightInit(this.getInnerHeight());
      })
    },
  computed: {
    disabled() {
      if (this.siginStatus) {
        return this.formData.signStatus == this.siginStatus.code
      }
    },
    siginStatus() {
      if (!Array.isArray(this.dataEnum.siginStatus)) return {}
      return this.dataEnum.siginStatus.filter(item => item.name === '已签约')[0]
    }
  },
  async created() {
    this.getEnumData(['GetSiginStatusData'])
  },
  watch: {
    formData: {
      handler() {
        if(this.modelSearchFilter.masterId != this.formData.id) {
          this.modelSearchFilter.masterId = this.formData.id
          this.getMaterialContractDetail()
        }
        this.modelSearchFilter.masterId = this.formData.id
      },
    deep: true
    },
    screenHeight(innerHeight) {
        this.heightInit(innerHeight)
      }
  },
  methods: {
      heightInit(innerHeight) {
        const offsetTopUserManager = this.$refs.refContractToodList.$el.getBoundingClientRect().top;
        this.heightUserManager = innerHeight - offsetTopUserManager - 55;
      },
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(this.$refs.refContractToodList, this.modelSearchFilter, () => {
        this.getGoodslist();
      });
    },
    getGoodslist() {
      this.getMaterialContractDetail()
    },
    rowClick(value) {
      this.row = value
    },
    selectionChange(value) {
      this.selectedRow = value.selectedRows
    },
    getMaterialContractDetail() {
      if (!this.modelSearchFilter.masterId) return
      getMaterialContractDetail(this.modelSearchFilter).then(res => {
        this.data = res.data.rows
        this.total = res.data.total
      })
    },
    handleOk() {
      const data = this.selectedRow.map(item => {
        return {
          code: item.code,
          masterId: this.formData.id,
          materialId: item.id,
          model: item.model,
          name: item.name,
          unit: item.units,
          sum: '0.0000',
          unitPrice: '0.0000',
          totalPrice: '0.0000'
        }
      })
      this.data = data.concat(this.data)
      this.data = this.data.sort((a, b) => {
        console.log(a)
        a = a.code.split('-')
        b = b.code.split('-')
        if(a[0] == b[0]) {
          return a[1] - b[1]
        } else {
          return a[0] - b[0]
        }
      })
      this.visibleSyncMaterialDictionary = false
    },
    formatToMoney(value, idx = 2) {
      return Number(value).toFixed(idx)
    },
    folat4(value) {
      if (isNaN(value)) return '0.0000'
      return this.formatToMoney(value, 4)
    },
    formatToThousandsFloat4(value) {
      return this.$utilsBasic.toMoney(value, 4)
    },
    sumTotalPrice(scope) {
      const { unitPrice, sum } = scope.row
      scope.row.totalPrice = unitPrice * sum
      return this.$utilsBasic.toMoney(scope.row.totalPrice)
    },
    save() {
      saveMaterialContractDetail(this.data).then(res => {
        if(res.rel) {
          this.data = res.data.bpmaMaterialContractDetails
          this.$message.success(res.message)
        } else {
          this.$message.warning(res.mssage)
        }
      })
    },
    deleteRow() {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async res => {
        if (this.row.id) {
          const res = await deleteMaterialContractDetail(this.row).catch(err => console.warn(err))
          if (res.rel) this.$message.success(res.message)
          else this.$message.warning(res.message)
        } else {
          this.$message.success('删除成功')
        }
        this.data = this.data.filter(item => item != this.row)
        this.row = {}
      }).catch(err => console.warn(err))
    }
  }
}
</script>

<style scpoed>

</style>
