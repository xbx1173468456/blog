<template>
  <div class="purchaseSettlementDetail-container">
    <basic-handler>
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small" @click="handleAddBtn"
        plain>新增结算
      </el-button>
      <el-button v-if="saveBtnShowFlag" type="primary" icon="el-icon-if-save" size="small" plain @click="handleSaveBtn"
        :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag">保存
      </el-button>
      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
        @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
        @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="refMaterialBuyPayForm" class="form-container" :model="materialBuyPayForm" label-width="120px"
          :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="materialBuyPayForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据编码">
                <el-input size="small" clearable v-model="materialBuyPayForm.code" :disabled="true"
                  placeholder="系统自动生成单据编码" />
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据名称" prop="name" hide-required-asterisk>
                <el-input size="small" clearable v-model="materialBuyPayForm.name" :disabled="disabledFlag"
                  ref="refMaterialBuyPayName" placeholder="请输入单据名称" />
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="materialBuyPayForm.proName" readOnly placeholder="请选择项目名称"
                  :disabled="disabledFlag">
                  <el-button size="small" slot="append" icon="el-icon-plus" class="form-btn" :disabled="disabledFlag"
                    @click="toipClick('project')"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单位名称" prop="enterpriseName" hide-required-asterisk>
                <el-input size="small" v-model="materialBuyPayForm.enterpriseName" readOnly placeholder="请选择单位名称"
                  :disabled="disabledFlag">
                  <el-button size="small" slot="append" icon="el-icon-plus" class="form-btn" :disabled="disabledFlag"
                    @click="toipClick('counterpart')"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="合同名称" prop="contractName" hide-required-asterisk>
                <el-input size="small" v-model="materialBuyPayForm.contractName" readOnly placeholder="请选择合同名称"
                  :disabled="disabledFlag">
                  <el-button size="small" slot="append" icon="el-icon-plus" class="form-btn" :disabled="disabledFlag"
                    @click="toipClick('contract')"></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-form-item label="本次结算总额">
                <basic-input :formatValue="formatToMoney" :format="formatToThousands" clearable v-model="price"
                  placeholder="请输入本次结算总额" :disabled="true" price></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="结算人员">
                <el-input size="small" clearable v-model="materialBuyPayForm.handlePerson" :disabled="disabledFlag"
                  placeholder="请输入结算人员" />
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="结算日期">
                <el-date-picker size="small" :editable="false" :clearable="false"
                  v-model="materialBuyPayForm.handleDate" type="date" :disabled="disabledFlag"
                  @change="changeFormatDate" placeholder="选择结算日期" class="date-picker">
                </el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <!-- <el-col :span="8">
              <basic-form-item label="是否结算" prop="ifPay" class="add-border">

                <el-radio-group v-model="materialBuyPayForm.ifPay">
                  <el-radio :label="parseInt(row.code)" v-for="(row, key, index) in dataEnum.isOrNot" :key="row.code"
                    :disabled="true">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </basic-form-item>
            </el-col> -->
            <!-- <el-col :span="8">
               <basic-form-item label="结算金额">
                 <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                              clearable
                              v-model="materialBuyPayForm.payedPrice"
                              placeholder="系统自动生成结算金额"
                              :disabled="true"
                              :min="0"
                 ></basic-input>
               </basic-form-item>
             </el-col>
             <el-col :span="8">
               <basic-form-item label="结算单号">
                 <el-input size="small" clearable v-model="materialBuyPayForm.payedCode" :disabled="true" placeholder="系统自动生成结算单号"/>
               </basic-form-item>
             </el-col>-->
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <basic-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="materialBuyPayForm.id" :disabled="disabledFlag">
                </basic-upload>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <basic-form-item label="补充说明">
                <el-input size="small" clearable :disabled="disabledFlag" :autosize="{ minRows:6, maxRows: 8}"
                  :max="5000" v-model="materialBuyPayForm.remark" type="textarea" placeholder="请输入补充说明，不超过5000字" />
              </basic-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <basic-handler class="margin-top10">
      <el-button v-if="materialInInoutBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
        :disabled="disabledFlag" @click="handleImportMaterialInInout">引入直入直出单
      </el-button>
      <el-button v-if="materialInBuyBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
        :disabled="disabledFlag" @click="handleImportMaterialInBuy">引入采购入库单
      </el-button>
      <el-button v-if="materialOutBuyReturnBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"
        :disabled="disabledFlag" @click="handleImportMaterialOutBuyReturn">引入采购退货单
      </el-button>
      <el-button v-if="deleteBtnSubListShowFlag" type="danger" icon="el-icon-delete" size="small" plain
        @click="handleDeleteSubListBtn" :disabled="deleteSubListBtnDisabledFlag">删除
      </el-button>
    </basic-handler>
    <basic-table ref="refMaterialBuyPayTableData" :isPagination="false" :dataTable="showMaterialBuyPayTableData"
      :columns="columns" :pagination="modelSearchFilter" @current-change="handleCurrentChange"
      @pagination="getMaterialBuyPayDetailData">
      <template slot-scope="obj" slot="billType">
        {{formatPurchaseBillType(obj.scope.row)}}
      </template>
      <template slot-scope="obj" slot="inSum">
        {{formatToThousandsFour(obj.scope.row.inSum)}}
      </template>
      <template slot-scope="obj" slot="inUnitPrice">
        {{formatToThousandsFour(obj.scope.row.inUnitPrice)}}
      </template>
      <template slot-scope="obj" slot="inTotalPrice">
        {{formatToThousands(obj.scope.row.inTotalPrice)}}
      </template>
      <template slot-scope="obj" slot="paySum">
        <basic-input :formatValue="formatToMoneyFour" :format="formatToThousandsFour" clearable
          v-model="obj.scope.row.paySum" placeholder="请输入结算数量" :disabled="disabledFlag" @change="changePaySum" price>
        </basic-input>
      </template>
      <template slot-scope="obj" slot="payUnitPrice">
        <basic-input :formatValue="formatToMoneyFour" :format="formatToThousandsFour" clearable
          v-model="obj.scope.row.payUnitPrice" placeholder="请输入结算单价" :disabled="disabledFlag"
          @change="changePayUnitPrice" price></basic-input>
      </template>
      <template slot-scope="obj" slot="payTotalPrice">
        {{formatToThousands(obj.scope.row.payTotalPrice)}}
      </template>
      <template slot-scope="obj" slot="summary">
        <el-input clearable size="small"  placeholder="请输入结算说明" v-model="obj.scope.row.summary"
          :disabled="disabledFlag"></el-input>
      </template>
    </basic-table>
    <el-dialog :visible.sync="visibleSyncProject" lock-scroll title="项目名称-选择" width="60%">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="visibleSyncCounterpart" lock-scroll title="选择单位名称" width="60%">
      <dialog-transit-unit @selectionChange="selectionChange" filterValid v-if="visibleSyncCounterpart">
      </dialog-transit-unit>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="合同-选择" :visible.sync="visibleSyncContract" width="60%" lock-scroll>
      <dialog-material-contract @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"
        :proId="materialBuyPayForm.proId" :oppositeEnterpriseId=materialBuyPayForm.enterpriseId>
      </dialog-material-contract>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </el-dialog>
    <!--引入直入直出单-->
    <el-dialog :visible.sync="materialInInout.visibleSync" lock-scroll title="选择直入直出单">
      <dialog-material-in-inout ref="refDialogMaterialInInout" :proId="materialBuyPayForm.proId"
        :offerEnterpriseId=materialBuyPayForm.enterpriseId :contractId=materialBuyPayForm.contractId
        :materialInInoutData="materialBuyPayTableData.data" :isShowChecked="true"
        v-if="materialInInout.visibleSync"
        @selectionChange="selectionChangeMaterialInInout">
      </dialog-material-in-inout>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleMaterialInInoutCancel">取 消</el-button>
        <el-button @click="handleMaterialInInoutOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--采购入库单-->
    <el-dialog :visible.sync="materialInBuy.visibleSync" lock-scroll title="选择采购入库单">
      <dialog-material-in-buy ref="refDialogMaterialInBuy" :proId="materialBuyPayForm.proId"
        :offerEnterpriseId=materialBuyPayForm.enterpriseId :contractId=materialBuyPayForm.contractId
        :materialInBuyData="materialBuyPayTableData.data" :isShowChecked="true"
        v-if="materialInBuy.visibleSync"
        @selectionChange="selectionChangeMaterialInBuy">
      </dialog-material-in-buy>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleMaterialInBuyCancel">取 消</el-button>
        <el-button @click="handleMaterialInBuyOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!--采购退货单-->
    <el-dialog :visible.sync="materialOutBuyReturn.visibleSync" lock-scroll title="选择采购退货单">
      <dialog-material-out-buy-return ref="refDialogMaterialOutBuyReturn" :proId="materialBuyPayForm.proId"
        :offerEnterpriseId=materialBuyPayForm.enterpriseId :contractId=materialBuyPayForm.contractId
        :materialOutBuyReturnData="materialBuyPayTableData.data" :isShowChecked="true"
        v-if="materialOutBuyReturn.visibleSync"
        @selectionChange="selectionChangeMaterialOutBuyReturn">
      </dialog-material-out-buy-return>
      <div class="dialog-footer" slot="footer">
        <el-button @click="handleMaterialOutBuyReturnCancel">取 消</el-button>
        <el-button @click="handleMaterialOutBuyReturnOk" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit'
  import dialogMaterialContract from '@/views/components/dialog/dialogMaterialContract'
  import dialogMaterialInInout from '@/views/components/dialog/dialogMaterialInInout'
  import dialogMaterialInBuy from '@/views/components/dialog/dialogMaterialInBuy'
  import dialogMaterialOutBuyReturn from '@/views/components/dialog/dialogMaterialOutBuyReturn'
  import { staticDataBasic } from "@/assets/data/basic";
  import { todayFormat } from "@/utils";
  import { validateLength } from "@/utils/validate";

  /**
   * api
   * */

  import {
    getMaterialBuyPay,
    saveMaterialBuyPay,
    deleteMaterialBuyPay,
    auditMaterialBuyPay,
    getMaterialBuyPayDetail,
    deleteMaterialBuyPayDetail
  } from "@/api/bpmaManager/goods/purchase/purchaseSettlement/index"

  export default {
    name: 'PurchaseSettlementDetail',
    components: {
      dialogProject,
      dialogTransitUnit,
      dialogMaterialContract,

      dialogMaterialInInout,
      dialogMaterialInBuy,
      dialogMaterialOutBuyReturn
    },
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        materialInInoutBtnShowFlag: true,  //待系统菜单配置
        materialInBuyBtnShowFlag: true,
        materialOutBuyReturnBtnShowFlag: true,
        deleteBtnSubListShowFlag: true,

        activeNames: ['1'],
        saveBtnDisabledFlag: true,
        materialBuyPayForm: {},
        materialBuyPayFormId: undefined,

        rules: {
          name: [
            { required: true, message: '请输入单据名称', trigger: 'change' }
          ],
          proName: [
            { required: true, message: '请选择单位名称', trigger: 'change' }
          ],
          enterpriseName: [
            { required: true, message: '请选择分包单位', trigger: 'change' }
          ]
        },

        /**
         * 弹窗
         * */
        type: null,
        visibleSyncProject: false,
        visibleSyncCounterpart: false,
        visibleSyncContract: false,
        selectedRow: {},

        materialInInout: {
          visibleSync: false,
          materialInInoutSelectionChange: []
        },

        materialInBuy: {
          visibleSync: false,
          materialInBuySelectionChange: []
        },

        materialOutBuyReturn: {
          visibleSync: false,
          materialOutBuyReturnSelectionChange: []
        },


        /**
         * 子表
         * */
        materialBuyPayTableData: {
          data: [],
          total: 0
        },
        modelSearchFilter: {
          page: 1,
          limit: 10000,
          masterId: undefined
        },
        currentRow: null, //表格当前行
        columns: [ //表格列
          {
            text: '单据类型',
            value: 'billType',
            width: '140',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '单据编码',
            value: 'billCode',
            width: '130',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '单据名称',
            value: 'billName',
            minWidth: '150',
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          }, {
            text: '物资编码',
            value: 'code',
            width: '160',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '物资名称',
            value: 'name',
            width: '160',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '规格型号',
            value: 'model',
            width: '160',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '计量单位',
            value: 'unit',
            width: '160',
            align: "center",
            showOverflowTooltip: true
          }, {
            text: '入库数量',
            value: 'inSum',
            width: '160',
            align: "right",
            showOverflowTooltip: true
          }, {
            text: '入库单价',
            value: 'inUnitPrice',
            width: '160',
            align: "right",
            showOverflowTooltip: true
          }, {
            text: '入库总价',
            value: 'inTotalPrice',
            width: '160',
            align: "right",
            showOverflowTooltip: true
          }, {
            text: '结算数量',
            value: 'paySum',
            width: '160',
            align: "center",
            showOverflowTooltip: true,
            className: 'spacing-set'
          }, {
            text: '结算单价',
            value: 'payUnitPrice',
            width: '160',
            align: "center",
            showOverflowTooltip: true,
            className: 'spacing-set'
          }, {
            text: '结算总价',
            value: 'payTotalPrice',
            width: '160',
            align: "right",
            showOverflowTooltip: true
          }, {
            text: '备注',
            value: 'summary',
            width: '200',
            align: "left",
            headerAlign: "center",
            className: "spacing-set",
            showOverflowTooltip: true
          }
        ]

      }
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData',
        'GetPurchaseBillTypeEnum'
      ]);
    },
    activated() {
      if (this.$route.params && this.$route.params.id) {
        this.materialBuyPayFormId = this.$route.params.id;
      }
      if (this.$route.params) {
        this.materialBuyPayFormId = this.$route.params.id ? this.$route.params.id : undefined;
        this.materialBuyPayForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
        this.materialBuyPayForm.proName = this.$route.query.name ? this.$route.query.name : undefined;
        this.materialBuyPayForm.proCode = this.$route.query.proCode ? this.$route.query.proCode : undefined;
      }
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.handleAddBtn()
      }, async id => {
        setTimeout(() => {
          this.getMaterialBuyPay();
          this.getMaterialBuyPayDetailData()
        }, 100)
      })
      this.$store.dispatch("cacheId", '0');
    },
    computed: {
      deleteBtnDisabledFlag() {
        if (!this.$utils.isEmpty(this.materialBuyPayForm)) {
          return this.materialBuyPayForm.validateStatus === 1;
        } else {
          return true;
        }
      },
      auditBtnDisabledFlag() {
        if (!this.$utils.isEmpty(this.materialBuyPayForm)) {
          return this.materialBuyPayForm && this.materialBuyPayForm.validateStatus === 1;
        } else {
          return true;
        }
      },
      disabledFlag() {
        return this.materialBuyPayForm && this.materialBuyPayForm.validateStatus === 1;
      },
      priceDisabledFlag() {
        return (this.materialBuyPayTableData.data && this.materialBuyPayTableData.data.length > 0) || this.disabledFlag
      },
      deleteSubListBtnDisabledFlag() {
        return !this.currentRow || this.auditBtnDisabledFlag
      },
      showMaterialBuyPayTableData() {
        let data = this.materialBuyPayTableData.data.filter(item => item.persistStatus != 'fdel')
        return {
          data,
          total: data.length
        }
      },
      /**d
       * 计算本次结算总额
       * */
      price: {
        get() {
          // const reducer = (accumulator, currentValue) => accumulator + Number(currentValue);
          // console.log('未付总额', this.materialBuyPayTableData.data.map(item => item.payTotalPrice).reduce(reducer, 0))
          // return this.materialBuyPayTableData.data.map(item => item.payTotalPrice).reduce(reducer, 0)
          let sum = 0
          this.showMaterialBuyPayTableData.data.forEach(item => {
            if(item.billType == 3) {
              sum -= Number(item.payTotalPrice)
            } else {
              sum += Number(item.payTotalPrice)
            }
          })
          return sum
        },
        set() { }
      },
    },
    watch: {
      materialBuyPayForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },
    },
    methods: {
      handleAddBtn() {
        // this.materialBuyPayFormId = undefined;
        // this.materialBuyPayForm.proId = undefined;
        // this.materialBuyPayForm.proName = undefined;
        this.addMaterialBuyPay()
        this.$refs.refMaterialBuyPayForm.resetFields()
      },
      handleSaveBtn() {
        this.validateAfter(() => {
          this.saveMaterialBuyPayData().then(res => {
            this.materialBuyPayForm = res.data.bpmaMaterialBuyPayMaster
            this.materialBuyPayTableData.data = res.data.bpmaMaterialBuyPayDetails
            // this.getMaterialBuyPay()
          }).catch(err => {
            console.log(err)
          })
        })
      },
      handleDeleteBtn() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.materialBuyPayFormId)) {
            this.addMaterialBuyPay()
          } else {
            this.deleteMaterialBuyPayData().then(() => {
              this.addMaterialBuyPay()
            }).catch(err => {
              console.log(err)
            })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      handleAuditBtn() {
        this.$confirm(staticDataBasic.info.audit, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.validateAfter(() => {
            this.saveMaterialBuyPayData(true).then(() => {
              this.auditMaterialBuyPayData().then(res => {
                this.getMaterialBuyPay()
                this.getMaterialBuyPayDetailData()
              })
            }).catch(error => {
              console.log(error)
            })
          })
        }).catch(error => {
          console.log(error)
        })
      },
      handleDeleteSubListBtn() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.currentRow.id)) {
            this.materialBuyPayTableData.data.splice(this.materialBuyPayTableData.data.indexOf(this.currentRow), 1)
          } else {
            this.materialBuyPayTableData.data = this.materialBuyPayTableData.data.map(item => {
              if(item == this.currentRow) {
                this.$set(item, 'persistStatus', 'fdel')
              }
              return item
            })
            // this.deleteMaterialBuyPayDetailData().then(() => {
            //   this.getMaterialBuyPayDetailData()
            // }).catch(err => {
            //   console.log(err)
            // })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 新增表单内容
       * */
      addMaterialBuyPay() {
        this.materialBuyPayForm = {
          id: '',
          validateStatus: 2,
          name: '采购结算单',
          proId: this.materialBuyPayForm.proId,
          proName: this.materialBuyPayForm.proName,
          proCode: this.materialBuyPayForm.proCode,
          price: '0.00',
          handleDate: new Date(todayFormat()).getTime(),
          ifPay: 2,
        }
        this.$refs.refMaterialBuyPayForm.resetFields()
        this.materialBuyPayTableData.data = []
      },
      /**
       * 保存
       * */
      saveMaterialBuyPayData(boolean) {
        this.materialBuyPayForm.price = this.price
        let data = {
          bpmaMaterialBuyPayMaster: this.materialBuyPayForm,
          bpmaMaterialBuyPayDetails: this.materialBuyPayTableData.data
        }
        return saveMaterialBuyPay(data).then(res => {
          if (res.status && res.status === 200) {
            this.materialBuyPayFormId = res.data.bpmaMaterialBuyPayMaster.id
            this.materialBuyPayForm.id = res.data.bpmaMaterialBuyPayMaster.id
            this.materialBuyPayForm = res.data.bpmaMaterialBuyPayMaster
            this.materialBuyPayTableData.data = res.data.bpmaMaterialBuyPayDetails
            if (!this.$refs.refBasicUpload.submitUpload(this.materialBuyPayForm.id)) return false;
            if (!boolean) {
              this.$message.success(res.message)
            }
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        //表单验证
        this.$refs.refMaterialBuyPayForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })

        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          if (this.$utils.isEmpty(this.materialBuyPayForm.name)) {
            this.$refs.refMaterialBuyPayName.focus()
          }
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          return false
        }
      },
      /**
       * 删除表单
       * */
      deleteMaterialBuyPayData() {
        return deleteMaterialBuyPay(this.materialBuyPayFormId).then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message)
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 审核
       * */
      auditMaterialBuyPayData() {
        this.materialBuyPayForm.price = this.price
        let data = {
          bpmaMaterialBuyPayMaster: this.materialBuyPayForm,
          bpmaMaterialBuyPayDetails: this.materialBuyPayTableData.data
        }
        return auditMaterialBuyPay(data).then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message)
            this.materialBuyPayFormId = res.data.bpmaMaterialBuyPayMaster.id
            this.materialBuyPayForm.id = res.data.bpmaMaterialBuyPayMaster.id
            this.materialBuyPayForm = res.data.bpmaMaterialBuyPayMaster
            this.materialBuyPayTableData.data = res.data.bpmaMaterialBuyPayDetails
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 获取表单内容
       * */
      getMaterialBuyPay() {
        if (this.$utils.isEmpty(this.materialBuyPayFormId)) {
          this.addMaterialBuyPay()
        } else {
          return getMaterialBuyPay(this.materialBuyPayFormId).then(res => {
            if (res.status && res.status === 200) {
              this.materialBuyPayForm = res.data.bpmaMaterialBuyPayMaster
              this.materialBuyPayTableData.data = res.data.bpmaMaterialBuyPayDetails
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },
      changeFormatDate(date) {
        this.materialBuyPayForm.handleDate = new Date(date).getTime()
      },
      /**
       * 点击显示哪种弹窗 项目  单位  合同
       * */
      toipClick(type) {
        if (this.disabled) return
        if (type == 'counterpart' && !this.materialBuyPayForm.proId)
          return this.$message({ message: '请先选择项目', type: 'warning' })
        if (type == 'contract' && !(this.materialBuyPayForm.proId && this.materialBuyPayForm.enterpriseId))
          return this.$message({ message: '请先选择单位', type: 'warning' })
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      /**
       * 弹窗传回的名称 项目 单位 合同
       * */
      handleChange() {
        const row = this.selectedRow
        // if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            this.materialBuyPayForm = Object.assign({}, this.materialBuyPayForm, {
              proName: row.name,
              proId: row.id,
              proCode: row.code,
            })
            this.$set(this.materialBuyPayTableData, 'data', [])
            this.$set(this.materialBuyPayTableData, 'total', 0)
            break
          case 'counterpart':
            this.materialBuyPayForm = Object.assign({}, this.materialBuyPayForm, {
              enterpriseName: row.name,
              enterpriseId: row.id,
            })
            this.$set(this.materialBuyPayTableData, 'data', [])
            this.$set(this.materialBuyPayTableData, 'total', 0)
            break
          case 'contract':
            this.materialBuyPayForm = Object.assign({}, this.materialBuyPayForm, {
              contractName: row.name,
              contractId: row.id,
            })
            this.$set(this.materialBuyPayTableData, 'data', [])
            this.$set(this.materialBuyPayTableData, 'total', 0)
            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      /**
       * 获取子表内容
       * */
      getMaterialBuyPayDetailData() {
        if (this.$utils.isEmpty(this.materialBuyPayFormId)) {
          this.materialBuyPayTableData.data = []
        } else {
          this.modelSearchFilter.masterId = this.materialBuyPayFormId
          return getMaterialBuyPayDetail(this.modelSearchFilter).then((res) => {
            if (res.status && res.status === 200) {
              this.materialBuyPayTableData.data = res.data.rows
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      },
      /**
       * 删除子表
       * */
      deleteMaterialBuyPayDetailData() {
        return deleteMaterialBuyPayDetail(this.currentRow.id).then((res) => {
          if (res.status && res.status === 200) {
            this.$message.success(res.message)
          } else {
            this.$message({ message: res.message, type: 'warning' })
          }
        }).catch(error => {
          console.log(error)
        })
      },
      /**
       * 当前行
       * */
      handleCurrentChange(row) {
        this.currentRow = row
      },

      changePaySum(paySum) {
        this.currentRow.payTotalPrice = paySum * this.currentRow.payUnitPrice
      },
      changePayUnitPrice(payUnitPrice) {
        this.currentRow.payTotalPrice = payUnitPrice * this.currentRow.paySum
      },
      /**
       * 回传数据加入子表表格
       * */
      selectedDataPushTable(SelectionChangeData, type) {
        if (SelectionChangeData && SelectionChangeData.length > 0) {
          let addNewArr = [] //需新加的数组
          let codesArr = []  //表格原有数组物资集合
          if (this.materialBuyPayTableData.data && this.materialBuyPayTableData.data.length > 0) {
            codesArr = this.materialBuyPayTableData.data.filter(item => item.billType == type).map(item => item.detailId)
            for (const item of SelectionChangeData) {
              if (codesArr.indexOf(item.detailId) < 0) { //判断返回数据与原有数据是否有重复
                let rowObj = Object.assign({}, {
                  masterId: this.materialBuyPayFormId,
                  billType: type,
                  billId: item.detailId,
                  billCode: item.masterCode,
                  billName: item.masterName,
                  code: item.code,
                  inId: item.detailId,
                  materialId: item.materialId,
                  name: item.name,
                  model: item.model,
                  unit: item.unit,
                  inSum: item.buySum,
                  inUnitPrice: item.buyUnitPrice,
                  inTotalPrice: item.buyTotalPrice,
                  paySum: item.buySum,
                  payUnitPrice: item.buyUnitPrice,
                  payTotalPrice: item.buyTotalPrice,
                })
                addNewArr.push(rowObj)
              }
            }

          } else {
            for (const item of SelectionChangeData) {
              let rowObj = Object.assign({}, {
                masterId: this.materialBuyPayFormId,
                billType: type,
                billId: item.detailId,
                billCode: item.masterCode,
                billName: item.masterName,
                code: item.code,
                inId: item.detailId,
                materialId: item.materialId,
                name: item.name,
                model: item.model,
                unit: item.unit,
                inSum: item.buySum,
                inUnitPrice: item.buyUnitPrice,
                inTotalPrice: item.buyTotalPrice,
                paySum: item.buySum,
                payUnitPrice: item.buyUnitPrice,
                payTotalPrice: item.buyTotalPrice,
              })
              addNewArr.push(rowObj)
            }
          }
          this.materialBuyPayTableData.data = this.materialBuyPayTableData.data.concat(addNewArr)
        }
      },
      /**
       * 直入直出单弹框显示和隐藏
       * */
      handleImportMaterialInInout() {
        // if (this.$utils.isEmpty(this.materialBuyPayForm.contractId)) {
        //   this.$message({ message: '请先选择合同', type: 'warning' })
        // } else {
          if(!this.materialBuyPayForm.proId) return this.$message.warning('请先选择项目')
          if(!this.materialBuyPayForm.enterpriseId) return this.$message.warning('请先选择单位')
          this.materialInInout.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        // }
      },
      handleMaterialInInoutCancel() {
        this.materialInInout.visibleSync = false
      },
      selectionChangeMaterialInInout(data) {
        this.materialInInout.materialInInoutSelectionChange = data.selectedRows;
      },
      handleMaterialInInoutOk() {
        this.materialInInout.visibleSync = false
        //数据加入到列表中
        const materialInInoutSelectionChange = this.materialInInout.materialInInoutSelectionChange
        this.selectedDataPushTable(materialInInoutSelectionChange, 1)
        this.materialInInout.materialInInoutSelectionChange = []
      },

      /**
       * 采购入库单弹框显示和隐藏
       * */
      handleImportMaterialInBuy() {
        // if (this.$utils.isEmpty(this.materialBuyPayForm.contractId)) {
          // this.$message({ message: '请先选择合同', type: 'warning' })
        // } else {
          if(!this.materialBuyPayForm.proId) return this.$message.warning('请先选择项目')
          if(!this.materialBuyPayForm.enterpriseId) return this.$message.warning('请先选择单位')
          this.materialInBuy.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        // }
      },
      handleMaterialInBuyCancel() {
        this.materialInBuy.visibleSync = false
      },
      selectionChangeMaterialInBuy(data) {
        this.materialInBuy.materialInBuySelectionChange = data.selectedRows;
      },
      handleMaterialInBuyOk() {
        this.materialInBuy.visibleSync = false
        //数据加入到列表中
        const materialInBuySelectionChange = this.materialInBuy.materialInBuySelectionChange
        this.selectedDataPushTable(materialInBuySelectionChange, 2)
        this.materialInBuy.materialInBuySelectionChange = []
      },

      /**
       * 采购退货单弹框显示和隐藏
       * */
      handleImportMaterialOutBuyReturn() {
        // if (this.$utils.isEmpty(this.materialBuyPayForm.contractId)) {
        //   this.$message({ message: '请先选择合同', type: 'warning' })
        // } else {
          if(!this.materialBuyPayForm.proId) return this.$message.warning('请先选择项目')
          if(!this.materialBuyPayForm.enterpriseId) return this.$message.warning('请先选择单位')
          this.materialOutBuyReturn.visibleSync = true
          this.$nextTick(() => {
            this.saveBtnDisabledFlag = false;
          })
        // }
      },
      handleMaterialOutBuyReturnCancel() {
        this.materialOutBuyReturn.visibleSync = false
      },
      selectionChangeMaterialOutBuyReturn(data) {
        this.materialOutBuyReturn.materialOutBuyReturnSelectionChange = data.selectedRows;
      },
      handleMaterialOutBuyReturnOk() {
        this.materialOutBuyReturn.visibleSync = false
        //数据加入到列表中
        const materialOutBuyReturnSelectionChange = this.materialOutBuyReturn.materialOutBuyReturnSelectionChange
        this.selectedDataPushTable(materialOutBuyReturnSelectionChange, 3)
        this.materialOutBuyReturn.materialOutBuyReturnSelectionChange = []
      },
    }
  }
</script>

<style scoped>

</style>
