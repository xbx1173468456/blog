<template>
  <div class="receiveDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="saveClick()"
                 plain>保存
      </el-button>
      <el-button :disabled="isDelete" type="danger" size="small" icon="el-icon-delete" @click="delClick" plain>删除
      </el-button>
      <el-button :disabled="isAudit2" type="primary" size="small" icon="el-icon-if-auth" @click="auditClick" plain>审核
      </el-button>

    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form :model="ruleForm.bpmaMaterialOutBuyReturnMaster" :rules="rules" ref="refRuleForm" label-width="120px"
                 class="form-container" :show-message="false">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus">
                <el-input clearable size="small"
                          v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus ==1?'已审核':'未审核'" disabled
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码" prop="code">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.code" disabled
                          placeholder="审核自动生成" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input ref="refName" clearable size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.name"
                          :disabled="isAudit" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName">
                <el-input ref="refProName" placeholder="请选择项目名称" size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.proName"
                          readonly>
                  <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('proName')" :disabled="isAudit">
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供方单位" prop="offerEnterpriseName">
                <el-input ref="refOfferEnterpriseName" placeholder="请选择供方单位" size="small"
                          v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseName" readonly>
                  <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('offerEnterpriseName')"
                             :disabled="isAudit"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName">
                <el-input placeholder="请选择合同名称" size="small"
                          v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.contractName" :disabled="isAudit" readonly>
                  <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('contractName')"
                             :disabled="ifContract"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="退货人员" prop="returnPerson">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.returnPerson"
                          placeholder="请输入退货人员" :disabled="isAudit" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货日期" prop="handleDate" class="showTime">
                <el-date-picker :clearable="false" size="small" :editable="false" :disabled="isAudit"
                                v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.handleDate" type="date"
                                format="yyyy-MM-dd"
                                placeholder="请选择日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="退货总价" prop="buyTotalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.buyTotalPrice"
                  placeholder="自动生成退货总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="退货说明" prop="remark">
                <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                          :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入退货说明"
                          v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialOutBuyReturnMaster.id" :disabled="isAudit">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="是否结算" prop="ifPay" class="add-border disabled">
                <el-radio-group v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.ifPay" :disabled="!isAudit"
                                @change="changePriseType">
                  <el-radio :label="parseInt(row.code)" disabled
                            v-for="(row, key, index) in dataEnum.isOrNot" :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算金额" prop="payedPrice">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.payedPrice" disabled
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结算单号" prop="payedCode">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOutBuyReturnMaster.payedCode" disabled
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
          <dialog-project @selectionChange="getItem" filterValid v-if="visibleSyncProject"></dialog-project>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncProject = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncProject')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncOfferEnterprise" title="供方单位-选择">
          <dialog-transitUnit @selectionChange="getItem" filterValid v-if="visibleSyncOfferEnterprise">
          </dialog-transitUnit>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncOfferEnterprise = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncOfferEnterprise')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
      </el-collapse-item>
    </el-collapse>
    <el-row class="content-container">
      <basic-handler>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="clickByDialogAddData('goodsItem',2)"
                   :disabled="isAudit" plain>引入直进直出单
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" :disabled="isAudit"
                   @click="clickByDialogAddData('goodsItem',1)" plain>引入采购入库单
        </el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
                   :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除
        </el-button>
        <template slot="search">
          <basic-search v-if="false" ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                        @clickSearchFilter="clickSearchFilter"></basic-search>
        </template>
      </basic-handler>
      <basic-table ref="refMaterialRequireTable" :dataTable="dataStockGoodsData" :columns="columnsData.itemColumns2"
                   @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter"
                   :height="320">
        <template slot-scope="obj" slot="returnSum">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formReturnSum' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="returnSum">
              <basic-input clearable size="small"  :format="formatToMoneyFour"
                           :formatValue="formatToMoneyFour" v-model="obj.scope.row.returnSum" placeholder="请输入退货数量"
                           :min="0.0000"
                           :disabled="isAudit" @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="returnUnitPrice">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formReturnUnitPrice' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="returnUnitPrice">
              <basic-input clearable size="small"  :format="formatToMoneyFour"
                           :formatValue="formatToMoneyFour" v-model="obj.scope.row.returnUnitPrice" placeholder="请输入退货单价"
                           :disabled="isAudit" :min="0.0000" @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="returnTotalPrice">
          <basic-input clearable size="small"  :format="formatToThousands" :formatValue="formatToMoney"
                       v-model="obj.scope.row.returnTotalPrice" placeholder="0.00" @change="sumChange(obj.scope.row)"
                       :min="0.0000"
                       disabled></basic-input>
        </template>
        <template slot-scope="obj" slot="buySum">
          {{formatToThousandsFour(obj.scope.row.buySum)}}
        </template>
        <template slot-scope="obj" slot="buyUnitPrice">
          {{formatToThousandsFour(obj.scope.row.buyUnitPrice)}}
        </template>
        <template slot-scope="obj" slot="buyTotalPrice">
          {{formatToThousands(obj.scope.row.buyTotalPrice)}}
        </template>
        <template slot-scope="obj" slot="stockSum">
          {{formatToThousandsFour(obj.scope.row.stockSum)}}
        </template>
        <template slot-scope="obj" slot="returnedSum">
          {{formatToThousandsFour(obj.scope.row.returnedSum)}}
        </template>
        <template slot-scope="obj" slot="canReturnSum">
          {{formatToThousandsFour(obj.scope.row.canReturnSum)}}
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input clearable size="small"  v-model="obj.scope.row.remark" placeholder="摘要"
                       :disabled="isAudit"></basic-input>
        </template>
      </basic-table>
    </el-row>
    <!-- 物资 //合同-->
    <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getPublicMate" v-show="dialogTableVisible"
             @currentPage="currentPage"></addItem>
    <basic-dialog v-el-drag-dialog title="引入直进直出单-选择" :visible.sync="directInAndOut.visibleSync" @open="openDirectInAndOut">
      <dialog-direct-in-and-out ref="refDirectInAndOut" :data="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialOutBuyReturnMaster"
                          :isShowChecked="true" @selectionChange="selectionChangeDirectInAndOut" type="purchaseReturn"></dialog-direct-in-and-out>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickAddDirectInAndOutCancel">取 消</el-button>
        <el-button type="primary" @click="clickAddDirectInAndOutOk()">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog title="引入采购入库单-选择" :visible.sync="purchaseWarehousing.visibleSync" @open="openPurchaseWarehousing">
      <dialog-purchase-warehousing ref="refPurchaseWarehousing" :data="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialOutBuyReturnMaster"
                                :isShowChecked="true" @selectionChange="selectionChangePurchaseWarehousing" type="purchaseReturn"></dialog-purchase-warehousing>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickAddPurchaseWarehousingCancel">取 消</el-button>
        <el-button type="primary" @click="clickAddPurchaseWarehousingOk()">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  //四个弹窗
  import dialogProject from "@/views/components/dialog/dialogProject";
  import dialogTransitUnit from "@/views/components/dialog/dialogTransitUnit";
  import addItem from "./addItem";
  import dialogDirectInAndOut from "@/views/components/dialog/dialogDirectInAndOut";
  import dialogPurchaseWarehousing from "@/views/components/dialog/dialogPurchaseWarehousing";
  //获取合同
  import {getPayContractInfoMaster} from "@/api/bpmaManager/goods/goodsContract/register";
  //获取物资类型
  import {getEnumData, strToTime} from "@/utils";
  import {
    add,
    getDetail,
    audit,
    del,
    getMaterial,
    getDiction,
    getPurchaseList,
    delDetail,
    getzhiList
  } from "@/api/bpmaManager/goods/putStorage/returnGoods/index.js";
  //表头信息
  import {columnsData} from "../tableTitle.js";
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import {getMeasureUnitData} from '@/api/common/dataBasic'
  import {staticDataBasic} from "@/assets/data/basic";
  import {validateLength,validateValue} from "@/utils/validate";

  export default {
    name: "returnGoodsDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        ruleForm: {
          bpmaMaterialOutBuyReturnMaster: {
            proId: "", //项目id
            proName: "", //项目名称
            proCode: "", //项目编码
            validateStatus: 2, //审核状态
            name: "采购退货单", //单据名称
            offerEnterpriseId: "", //供方单位id
            offerEnterpriseName: "", //供方单位名称
            buyTotalPrice: "0.00", //采购总价
            contractId: "", //合同id
            contractName: "", //合同名称
            ifPay: 2,
            payedPrice: 0,
            handleDate: new Date().getTime() //业务日期
          },
          bpmaMaterialOutBuyReturnDetails: []
        },
        dataStockGoodsData: {
          data: [],
          total: 0
        },
        itemId: "",
        selectArray: {},
        visibleSyncProject: false,
        visibleSyncOfferEnterprise: false,
        selectedRow: {},
        dialogTableVisible: true,

        rules: {
          proName: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['项目名称', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          offerEnterpriseName: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['供方单位', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['单据名称', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          payPerson: [
            {
              required: false,
              validator: (rule, value, callback) => {
                if (this.ruleForm.bpmaMaterialOutBuyReturnMaster.ifSubstitutePay == 1) {
                  validateLength(rule, value, callback, true, ['垫付人员', 1, 50]);
                } else {
                  validateLength(rule, value, callback, false, ['垫付人员', 1, 50]);
                }
              },
              trigger: 'change'
            }
          ]
        },
        rulesStockGoodsData:{
          returnSum:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['退货数量', 0, 100000000]);
              },
              trigger: 'change'
            }
          ],
          returnUnitPrice:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['退货单价', 0, 100000000]);
              },
              trigger: 'change'
            }
          ],
        },
        conTractParams: {
          page: 1,
          limit: 10,
          fuzzyKeys: "",
          fuzzy: ""
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: "",
          fuzzyKeys: ""
        },
        columnsData,
        activeNames: ["1"],
        units: [],
        directInAndOut: {
          visibleSync: false,
          selectionChange: []
        },
        purchaseWarehousing: {
          visibleSync: false,
          selectionChange: []
        },
      };
    },
    components: {
      dialogProject,
      dialogTransitUnit,
      dialogDirectInAndOut,
      dialogPurchaseWarehousing,
      addItem
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if (this.$route.query.proObj) {
          this.proObj = this.$route.query.proObj;
        }
        this.addClick();
      }, (id) => {
        this.itemId = id;
        this.getDetails();
      });
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData',
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    methods: {
      //获取详情
      getDetails() {
        getDetail(this.itemId)
          .then(res => {
            if (res.status==200) {
              this.proObj = {
                code: res.data.bpmaMaterialOutBuyReturnMaster.proCode,
                id: res.data.bpmaMaterialOutBuyReturnMaster.proId,
                name: res.data.bpmaMaterialOutBuyReturnMaster.proName
              };
              this.ruleForm = res.data;
              this.dataStockGoodsData = {
                data: res.data.bpmaMaterialOutBuyReturnDetails,
                total: res.data.bpmaMaterialOutBuyReturnDetails.length
              };
              this.$store.dispatch("setSelectP", res.data.bpmaMaterialOutBuyReturnDetails);
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      //新增
      addClick() {
        this.itemId = "";
        this.$store.dispatch("setTrackId", "");
        this.$store.dispatch("setSelectP", []);
        this.selectArray = {}
        this.dataStockGoodsData = {
          data: [],
          total: 0
        };
        this.ruleForm = {
          bpmaMaterialOutBuyReturnMaster: {
            proCode: this.proObj ? this.proObj.code : "",
            proId: this.proObj ? this.proObj.id : "",
            proName: this.proObj ? this.proObj.name : "",
            validateStatus: 2, //审核状态
            name: "采购退货单", //单据名称
            payedPrice: "0.00", //结算金额
            deductPrice: "0.00", //抵扣金额
            offerEnterpriseId: "", //供方单位id
            offerEnterpriseName: "", //供方单位名称
            buyTotalPrice: "0.00", //退货总价
            contractId: "", //合同id
            contractName: "", //合同名称
            returnPerson:this.userLogin.username,
            ifPay: 2, //是否结算
            handleDate: new Date().getTime() //业务日期
          },
          bpmaMaterialOutBuyReturnDetails: []
        };
        return this.$utilsBasic.valideFocus(this, ['refProName', 'refOfferEnterpriseName']);
      },
      sumChange(data) {
        data.returnTotalPrice = this.$utilsBasic.toMoney(data.returnSum * data.returnUnitPrice);
        this.computeSummary();
      },
      /**
       * 计算总价
       * */
      computeSummary(){
        let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['returnTotalPrice']);
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.buyTotalPrice = this.$utilsBasic.toMoney(result.returnTotalPrice, 2);
      },
      clickByDialogAddData(type, n) {
        this.type = type;
        if (type == "goodsItem") {
          if (!this.ruleForm.bpmaMaterialOutBuyReturnMaster.proId) {
            this.$message.warning("亲，请先选择【项目名称】");
            return;
          }
          if (!this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseId) {
            this.$message.warning("亲，请先选择【供方单位】");
            return;
          }
          if (n == 1) {
            // this.getPurchaseList(1, 10, 1);
            // this.$refs.refMaterialContract.title = "引入采购入库单-选择";
            // this.$refs.refMaterialContract.type = 3;
            this.purchaseWarehousing.visibleSync = true;
          } else {
            // this.getPurchaseList(1, 10, 2);
            // this.$refs.refMaterialContract.title = "引入直进直出单-选择";
            // this.$refs.refMaterialContract.type = 4;
            this.directInAndOut.visibleSync = true;
          }
          //this.$refs.refMaterialContract.openDialog();

          //this.$refs.refMaterialContract.selection = 'selection';

          //this.$refs.refMaterialContract.columns = columnsData.itemColumns;
        } else if (type == "proName") {
          console.log("项目");
          this.visibleSyncProject = true;
        } else if (type == "offerEnterpriseName") {

          this.visibleSyncOfferEnterprise = true;
        } else if (type == "contractName") {
          if (!this.ruleForm.bpmaMaterialOutBuyReturnMaster.proId)
            return this.$message.warning("请先选择项目");
          this.$refs.refMaterialContract.openDialog();
          this.$refs.refMaterialContract.type = 2;
          this.$refs.refMaterialContract.selection = 'index';
          this.getContract(
            2,
            1,
            10,
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.proId,
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseId
          );
          this.$refs.refMaterialContract.title = "物资合同-选择";
          this.$refs.refMaterialContract.columns = columnsData.contractColums;
        }
      },
      //获取采购入库单
      getPurchaseList(page, limit, n) {
        var params = {
          page: page,
          limit: limit,
          proId: this.ruleForm.bpmaMaterialOutBuyReturnMaster.proId,
          validateStatus: 1,
          contractId:this.ruleForm.bpmaMaterialOutBuyReturnMaster.contractId,
          offerEnterpriseId:this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseId
        };
        if (n == 1) {
          getPurchaseList(params)
            .then(res => {
              console.log(res);
              if (!this.$utils.isEmpty(res.data)) {
                this.$refs.refMaterialContract.tableData = res.data.rows;
                this.$refs.refMaterialContract.page.total = res.data.total;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          getzhiList(params).then(res => {
            console.log(res);
            if (!this.$utils.isEmpty(res.data)) {
              this.$refs.refMaterialContract.tableData = res.data.rows;
              this.$refs.refMaterialContract.page.total = res.data.total;
            }
          })
            .catch(err => {
              console.log(err);
            });
        }


      },
      delGoods() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteByIdData(this.dataStockGoodsData.data, this.selectArray,(allData,data)=>{
            this.ruleForm.bpmaMaterialOutBuyReturnDetails = allData;
            this.dataStockGoodsData.data = data;
            this.computeSummary();
          });
        }).catch(error => {
          console.log(error)
        })
      },
      getItem(row) {
        this.selectedRow = row.selectedRow;
      },
      //选择后的物资
      getPublicMate(arr) {
        let priceObj = {
          returnSum: 0,
          returnUnitPrice: 0,
          returnTotalPrice: 0,
          ifSubstitutePay:2
        };
        if (arr[1] == 3) {
          var newArr = [];
          arr[0].forEach(item => {
            console.log(item, 'item')
            if (!item.id) {
              item.id = "";
              item.inId = item.masterId
              item.inDetailId = item.detailId
              item.inCode = item.masterCode
              item = Object.assign(item, priceObj);
            }
            item = Object.assign({}, item);
            newArr.push(item);
          });
          this.dataStockGoodsData = {
            data: newArr,
            total: newArr.length
          };
        }else if (arr[1] == 4) {
          var newArr = [];
          arr[0].forEach(item => {
            if (!item.id) {
              item.id = "";
              item.inId = item.masterId
              item.inDetailId = item.detailId
              item.inCode = item.masterCode
              item = Object.assign(item, priceObj);
            }
            item = Object.assign({}, item);
            newArr.push(item);
          });
          this.dataStockGoodsData = {
            data: newArr,
            total: newArr.length
          };
        } else {
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.contractId = arr[0].id;
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.contractName = arr[0].name;
          //清空物资列别数据
          this.$set(this.dataStockGoodsData, 'data', []);
        }
      },
      getCheckTree(v, pagination) {
        if (v) {
          //查询字典列表
          let data = {
            typeCode: v.code,
            limit: pagination.limit,
            page: pagination.page,
            validateStatus: 1
          };
          getDiction(data)
            .then(res => {
              this.$refs.refMaterialContract.tableData = res.data.rows;
              this.$refs.refMaterialContract.page.total = res.data.total;
            })
            .catch(err => {
              console.log(err);
            });
        }
      },
      //弹窗传回的值
      handleChange(type) {
        const row = this.selectedRow;
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return;
        switch (type) {
          case "visibleSyncProject":
            //选择项目清除明细列表
            if (!this.$utils.isEqual(this.ruleForm.bpmaMaterialOutBuyReturnMaster.proCode, row.code)) {
              this.dataStockGoodsData.data = [];
            }
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.proCode = row.code;
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.proId = row.id;
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.proName = row.name;
            this.proObj = {
              code: row.code,
              id: row.id,
              name: row.name
            };
            break;
          case "visibleSyncOfferEnterprise":
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseId = row.id;
            this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseName = row.name;
            this.$set(this.ruleForm.bpmaMaterialOutBuyReturnMaster, 'contractId', undefined);
            this.$set(this.ruleForm.bpmaMaterialOutBuyReturnMaster, 'contractName', undefined);
            //清空物资列别数据
            this.$set(this.dataStockGoodsData, 'data', []);
            break;
        }
        this[type] = false;
      },
      //保存
      saveClick(formName) {
        return this.validateAfter(() => {
          this.putAddAndUpdateAll();
        });
      },
      putAddAndUpdateAll(callback) {
        add(this.ruleForm)
          .then(res => {
            if (res.status == 200) {
              this.ruleForm = res.data;
              this.dataStockGoodsData.data=res.data.bpmaMaterialOutBuyReturnDetails;
              this.itemId = res.data.bpmaMaterialOutBuyReturnMaster.id;
              if (!this.$refs.refBasicUpload.submitUpload(this.itemId)) return false;
              //审核
              if (callback && typeof callback === "function") {
                callback(this.itemId);
              } else {
                //保存成功
                this.$message({
                  message: res.message,
                  type: 'success'
                })
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        //表单验证
        this.$refs.refRuleForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })
        //物资验证
        // this.dataStockGoodsData.data.some((item, idx) => {
        //   this.$refs['formReturnSum' + idx].validate((valid) => {
        //     valid ? null : result = valid
        //   })
        //   this.$refs['formReturnUnitPrice' + idx].validate(valid => {
        //     valid ? null : result = valid
        //   })
        //   return !result
        // })
        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return this.$utilsBasic.valideFocus(this, ['refName','refProName', 'refOfferEnterpriseName', 'refUseEnterpriseName']);
        }
      },
      //审核
      auditClick() {
        return this.validateAfter(() => {
          if (!this.$utils.length(this.dataStockGoodsData.data)) {
            this.$message({message: staticDataBasic.info.inOut, type: 'warning'})
            return false
          }
          this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.putAddAndUpdateAll((id) => {
                this.ruleForm.bpmaMaterialOutBuyReturnMaster.id = id;
                audit(this.ruleForm)
                  .then(res => {
                    if (res.status == 200) {
                      this.$message.success(res.message);
                      this.ruleForm = res.data;
                      this.dataStockGoodsData.data=res.data.bpmaMaterialOutBuyReturnDetails;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
            }).catch(err => {
            console.log(err);
          });
        });
      },
      //删除
      delClick() {
        this.$confirm("亲，您是否确定删除当前数据，删除后数据不能恢复！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let id = this.itemId;
            del(id)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.addClick();
                }
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(() => {
          });
      },
      //获取合同
      getContract(type, page, limit, proId, id) {
        let params = {
          page: page,
          limit: limit,
          proId: proId,
          oppositeEnterpriseId: id,
          fuzzyKeys: "",
          fuzzy: "",
          validateStatus: 1,
          type: 2
        };
        getPayContractInfoMaster(params).then(res => {
          console.log(res, "res");
          this.$refs.refMaterialContract.tableData = res.data.rows;
          this.$refs.refMaterialContract.page.total = res.data.total;
          //
        });
      },
      //改变领用类型
      changePriseType() {
        this.$set(this.ruleForm.bpmaMaterialOutBuyReturnMaster, 'useEnterpriseId', undefined);
        this.$set(this.ruleForm.bpmaMaterialOutBuyReturnMaster, 'useEnterpriseName', undefined);
      },
      //关键字搜索
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(
          this.$refs.refMaterialRequireTable,
          this.modelSearchFilter,
          () => {
            // this.getDetails();
          }
        );
      },
      currentPage(pages, n) {
        console.log("分页");
        // this.getContract(n,pages.page,pages.limit)
      },
      //选中物资
      handleSelectionChange(obj) {
        if (obj && typeof (obj) == 'object') {
          console.log(obj, "hehe");
          this.selectArray = obj;
        } else {
          this.selectArray = {};
        }
      },
      openDirectInAndOut(){
        this.$refs.refDirectInAndOut ? this.$refs.refDirectInAndOut.getDirectInAndOutData() : null;
      },
      selectionChangeDirectInAndOut(data) {
        this.directInAndOut.selectionChange = data.selectedRows;
      },
      clickAddDirectInAndOutCancel() {
        this.directInAndOut.visibleSync = false;
      },
      clickAddDirectInAndOutOk() {
        let resultObj = this.directInAndOut.selectionChange;
        if(!this.isSelectedRows(resultObj)) return false;
        this.directInAndOut.visibleSync = false;
        let newArray = [];
        resultObj.forEach(item => {
          item.id = "";
          item.inId = item.masterId;
          item.inDetailId = item.detailId;
          item.inCode = item.masterCode;
          item.returnSum = "0.0000";
          item.returnUnitPrice = item.buyUnitPrice;
          item.returnTotalPrice = "0.00";
          item.ifSubstitutePay = 2;
          item = Object.assign({}, item);
          newArray.push(item);
        });
        this.dataStockGoodsData.data.unshift(...newArray);
        this.computeSummary();
        this.ruleForm.bpmaMaterialOutBuyReturnDetails = this.dataStockGoodsData.data;
      },
      openPurchaseWarehousing(){
        this.$refs.refPurchaseWarehousing ? this.$refs.refPurchaseWarehousing.getPurchaseWarehousingData() : null;
      },
      selectionChangePurchaseWarehousing(data) {
        this.purchaseWarehousing.selectionChange = data.selectedRows;
      },
      clickAddPurchaseWarehousingCancel() {
        this.purchaseWarehousing.visibleSync = false;
      },
      clickAddPurchaseWarehousingOk() {
        let resultObj = this.purchaseWarehousing.selectionChange;
        if(!this.isSelectedRows(resultObj)) return false;
        this.purchaseWarehousing.visibleSync = false;
        let newArray = [];
        resultObj.forEach(item => {
          item.id = "";
          item.inId = item.masterId;
          item.inDetailId = item.detailId;
          item.inCode = item.masterCode;
          item.returnSum = "0.0000";
          item.returnUnitPrice = "0.0000";
          item.returnTotalPrice = "0.00";
          item.ifSubstitutePay = 2;
          item = Object.assign({}, item);
          newArray.push(item);
        });
        this.dataStockGoodsData.data.unshift(...newArray);
        this.computeSummary();
        this.ruleForm.bpmaMaterialOutBuyReturnDetails = this.dataStockGoodsData.data;
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      }
      ,
      isDelete() {
        if (
          this.itemId != "" &&
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
      ,
      isAudit2() {
        if (
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
      ,
      ifSubstitutePay() {
        if (
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.ifSubstitutePay != 2 &&
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
      ,
      ifContract() {
        if (
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.offerEnterpriseId != "" &&
          this.ruleForm.bpmaMaterialOutBuyReturnMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
      ,
    },
  }
</script>
