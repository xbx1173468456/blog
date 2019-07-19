<!--物资采购入库-->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refUserManagerTableData" @selection-change="selectionChangePersonType"
  :dataTable="userManager.tableData" :columns="userManager.tableColumns"
  @current-change="currentChangeUserManager" :pagination="modelSearchFilter" @pagination="getGoodslist">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" width="55" align="center" :selectable="selectablePersonType" />
    </template>
    <template slot-scope="obj" slot="ifSubstitutePay">
      {{formatIsOrNot(obj.scope.row.ifSubstitutePay)}}
    </template>
    <template slot-scope="obj" slot="buyTotalPrice">
      {{formatToThousands(obj.scope.row.buyTotalPrice)}}
    </template>
    <template slot-scope="obj" slot="handleDate">
      {{obj.scope.row.handleDate ? obj.scope.row.handleDate.split(' ')[0] : ''}}
    </template>
  </basic-table>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import {
    getMaterialInBuyMaster,
  } from '@/api/common/dialog/dialogPurchase'
  import pagination from '@/components/Pagination'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import formatEnum from '@/utils/mixins/formatEnum.js'
  export default {
    name: "dialogPurchase",
    components: {pagination},
    mixins: [computed, methods, formatBasic, formatEnum],
    props:{
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
      payPersonId: [String, Number],
      proId: [String, Number]
    },
    data(){
      return {
        defaultExpandAll: false,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          enable: 1,
          validateStatus: 1,
          fuzzyKeys: '',
          fuzzy: '',
          payPersonId: '',
          ifPay: 2
        },
        tableShow: false,
        userManager: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              text:'系统编码',
              value:'code',
              minWidth: 140,
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'单据名称',
              value:'name',
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'项目名称',
              value:'proName',
              minWidth: 200,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'供方单位名称',
              value:'offerEnterpriseName',
              minWidth: 110,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'是否垫付',
              value:'ifSubstitutePay',
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'垫付人员',
              value:'payPerson',
              minWidth: 110,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'采购总价',
              value:'buyTotalPrice',
              minWidth: 110,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'送货人员',
              minWidth: 120,
              value:'deliverPerson',
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'收货人员',
              value:'receivePerson',
              minWidth: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'收货日期',
              value:'handleDate',
              minWidth: 120,
              align: "center",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'备注',
              value:'remark',
              minWidth: 150,
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          personTypeSelectedIdArray:[]
        },
      }
    },
    created(){
      this.getEnumData(['GetValidateStatusData', 'GetEnabledData', 'GetGenderData', 'GetUseEnterpriseTypeEnum'])
      this.getGoodslist()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getOrgInfo();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getOrgInfo();
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refUserManagerTableData, this.modelSearchFilter, () => {
          this.getGoodslist();
        });
      },
      getGoodslist() {
        this.getMaterialInBuyMaster()
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getMaterialInBuyMaster();
      },
      clickRefresh() {
        this.getMaterialInBuyMaster();
      },
      filterData(data, key, value) {
        return data.filter(item => {
          if (item.children && item.children.length > 0) {
            item.children = this.filterData(item.children, key, value)
          }
          if (item[key] == value) return true
        })
      },
      getMaterialInBuyMaster() {
        this.tableShow = true
        this.modelSearchFilter.payPersonId = this.payPersonId
        this.modelSearchFilter.proId = this.proId
        getMaterialInBuyMaster(this.modelSearchFilter).then((response) => {
          this.tableShow = false
          this.userManager.tableData.total = response.data.total
          if (this.filterValid) {
            response.data.rows = this.filterData(response.data.rows, 'validateStatus', this.validateStatus.code)
            response.data.rows = this.filterData(response.data.rows, 'enable', this.enabled.code)
          }
          this.userManager.tableData.data = response.data.rows;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refUserManagerTableData.setCurrentRow(this.personTypeData[0], true);
            });
          }else {
            if(this.personTypeData&&this.personTypeData.length>0){
              let personTypeData = this.personTypeData;
              this.userManager.personTypeSelectedIdArray = personTypeData.map(row => {
                return row.id;
              });
            }
          }
        })
      },
      selectionChangePersonType(selection) {
        console.log(123)
        this.userManager.selectedRows = selection;
        this.$emit('selectionChange',this.userManager);
      },
      currentChangeUserManager(selection){
        console.log(1233)
        this.userManager.selectedRow = selection;
        this.$emit('selectionChange',this.userManager);
      },
      selectablePersonType(row, index) {
        let lock
        this.personTypeData.forEach(item => {
          if(item.masterId == row.id) lock = true
        })
        if(lock) {
          return 0
        } else {
          return 1
        }
      }
    }
  }
</script>
