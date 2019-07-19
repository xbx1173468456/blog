<!-- 分包合同(单选) -->
<!--参考页面：src\views\bpmaManager\finance\collectMoney\registration\detail-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-form :inline="true" class="left">
        <el-form-item label="合同名称">
          <el-input size="small" placeholder="请输入合同名称" v-model="modelSearchFilter.name"></el-input>
        </el-form-item>
        <el-form-item label="原合同">
          <el-input size="small" placeholder="请输入原合同" v-model="modelSearchFilter.orignalCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="search" @click="getGoodslist">搜索</el-button>
        </el-form-item>
      </el-form>
      <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
    </basic-handler>
    <basic-table ref="refPersonTypeSubContract"
    :dataTable="subContract.tableData" :columns="subContract.tableColumns"
    @current-change="currentChangeSubContract" :pagination="modelSearchFilter" @pagination="getGoodslist">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="55"
          :selectable="selectablePersonType" />
      </template>



    </basic-table>
  </div>
</template>

<script>
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary'
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getAllSubContractRegistration,
  } from '@/api/common/dialog/dialogSubContract'
  import pagination from '@/components/Pagination'
  export default {
    name: "dialogSubContract",
    mixins: [computed, methods],
    components: { pagination },
    props: {
      personTypeData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean,
      filterUnit: Boolean,
      proId: [Number, String],
      oppositeEnterpriseId: [Number, String]
    },
    data() {
      return {
        defaultExpandAll: false,
        filterText: '',
        contractName:'',
        conteactOrignalCode:'',
        modelSearchFilter: {
          page: 1,
          limit: 10,
          enable: 1,
          validateStatus: 1,
          fuzzyKeys: '',
          fuzzy: '',
          type: 1,
          name:'',
          orignalCode:''
        },
        subContract: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              expand: true,
              text:'合同编码',
              value:'code',
              align: "center",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'项目名称',
              value:'proName',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'合同名称',
              value:'name',
              align: "left",
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'价税合计金额',
              value:'beforeTaxPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'税后合计金额',
              value:'afterTaxPrice',
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 110
            },
            {
              text:'发票类型',
              value:'invoiceType',
              align: "left",
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'发票税率',
              value:'invoiceTaxRate',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'应交税额',
              value:'tax',
              minWidth: 110,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'我方机构',
              value:'ourEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'对方单位',
              value:'oppositeEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'三方单位',
              value:'thirdEnterpriseName',
              align: "left",
              minWidth: 140,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签约状态',
              value:'signStatus',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'签约日期',
              value:'signDate',
              align: "center",
              minWidth: 100,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'原始合同号',
              value:'orignalCode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 140
            },
            {
              text:'计价方式',
              value:'computeMode',
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'进度款支付比例',
              value:'progressPricePayScale',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 120
            },
            {
              text:'质保金比例',
              value:'qualityAssurancePriceScale',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true,
              minWidth: 100
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray: []
        },
      }
    },
    async created() {
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetIsOrNotData', 'GetSiginStatusData'])
      this.modelSearchFilter.proId = this.proId
      this.modelSearchFilter.oppositeEnterpriseId = this.oppositeEnterpriseId
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getAllSubContractRegistration();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getAllSubContractRegistration();
      }
    },
    watch: {
      proId() {
        this.getAllSubContractRegistration()
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refPersonTypeSubContract, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getAllSubContractRegistration()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getAllSubContractRegistration();
      },
      clickRefresh() {
        this.getAllSubContractRegistration();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getAllSubContractRegistration() {
        getAllSubContractRegistration(this.modelSearchFilter).then((response) => {
          this.subContract.tableData.total = response.data.total
          response.data.rows = response.data.rows.map(item => {
            console.log('SubContract response',item)
            let money = Number(item.beforeTaxPrice)
            let invrate = Number(item.invoiceTaxRate)
            const siginStatus = this.dataEnum.siginStatus.filter(result => result.code == item.signStatus)[0]
            item.signStatus = siginStatus ? siginStatus.name : ''
            item.signDate = item.signDate ? this.$utils.date.format(item.signDate):""
            item.invoiceTaxRate = Number(item.invoiceTaxRate).toFixed(2)
            item.progressPricePayScale = Number(item.progressPricePayScale).toFixed(2)
            item.qualityAssurancePriceScale = Number(item.qualityAssurancePriceScale).toFixed(2)
            item.beforeTaxPrice = this.$utilsBasic.toThousands(Number(item.beforeTaxPrice).toFixed(2))
            item.afterTaxPrice = this.$utilsBasic.toThousands(Number(item.afterTaxPrice).toFixed(2))
            item.tax = this.$utilsBasic.toThousands(Number(item.tax).toFixed(2))
            return item
          })
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          if (this.filterUnit) {
            response.data.rows = this.filterData(response.data.rows, 'type', 1)
          }
          this.subContract.tableData.data = response.data.rows;
          if (!this.isShowChecked) {
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refPersonTypeSubContract.setCurrentRow(this.personTypeData[0], true);
            });
          } else {
            if (this.personTypeData && this.personTypeData.length > 0) {
              let personTypeData = this.personTypeData;
              this.subContract.personTypeSelectedIdArray = personTypeData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        this.subContract.selectedRows = selection;
        this.$emit('selectionChange', this.subContract);
      },
      currentChangeSubContract(selection) {
        this.subContract.selectedRow = selection;
        this.$emit('selectionChange', this.subContract);
      },
      selectablePersonType(row, index) {
        let lock = this.dataEnum.isOrNot.some(item => {
          if (item.code == row.ifLastLevel && item.name == '是') {
            return true
          }
        })
        if (lock)
          return 1;//不可勾选
        else
          return 0;//可勾选
      },
      formatter(val) {
        console.log(val)
      }
    }
  }
</script>
