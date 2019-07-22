<template>
  <basic-container class="leaseSettlement-container-detail">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="clickAdd" plain>新增</el-button>
      <el-button
        :disabled="disabledAudit"
        type="primary"
        size="small"
        icon="el-icon-if-save"
        @click="clickSave()"
        plain
      >保存</el-button>
      <el-button
        :disabled="disabledDelete"
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="clickDelete"
        plain
      >删除</el-button>
      <el-button
        :disabled="disabledAuditTwo"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        @click="clickAudit"
        plain
      >审核</el-button>
    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form
          :model="ruleForm.bpmaMaterialInInoutMaster"
          :rules="rules"
          ref="refRuleForm"
          label-width="120px"
          class="form-container"
          :show-message="false"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="审核状态" prop="validateStatus">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.validateStatus ==1?'已审核':'未审核'"
                  disabled
                  maxlength="100"
                ></el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据编码" prop="code">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.code"
                  disabled
                  placeholder="系统自动生成单据编码"
                  maxlength="100"
                ></el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单据名称" prop="name">
                <el-input
                  ref="refName"
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.name"
                  :disabled="disabledAudit"
                  maxlength="100"
                ></el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="项目名称" prop="proName">
                <el-input
                  ref="refProName"
                  placeholder="请选择项目名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.proName"
                  :disabled="disabledAudit"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('proName')"
                    :disabled="disabledAudit"
                    size="mini"
                  ></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="单位名称" prop="offerEnterpriseName">
                <el-input
                  ref="refOfferEnterpriseName"
                  placeholder="请选择单位名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseName"
                  :disabled="disabledAudit"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('offerEnterpriseName')"
                    :disabled="disabledAudit"
                    size="mini"
                  ></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="合同名称" prop="contractName">
                <el-input
                  placeholder="请选择合同名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.contractName"
                  :disabled="disabledAudit"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('contractName')"
                    :disabled="ifContract"
                    size="mini"
                  ></el-button>
                </el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <basic-form-item label="本次结算总额" prop="useTotalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.useTotalPrice"
                  placeholder="自动生成领用总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="结算人员" prop="deliverPerson">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.deliverPerson"
                  placeholder="请输入结算人员"
                  :disabled="disabledAudit"
                  maxlength="100"
                ></el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="结算日期" prop="handleDate" class="showTime">
                <el-date-picker
                  :clearable="false"
                  size="small"
                  :editable="false"
                  :disabled="disabledAudit"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.handleDate"
                  type="date"
                  placeholder="请选择成立日期"
                  format="yyyy-MM-dd"
                ></el-date-picker>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <basic-form-item label="补充说明" prop="remark">
                <el-input
                  type="textarea"
                  :disabled="disabledAudit"
                  maxlength="200"
                  clearable
                  :autosize="{ minRows: 2, maxRows: 5}"
                  placeholder="请输入补充说明"
                  v-model="ruleForm.bpmaMaterialInInoutMaster.remark"
                ></el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload
                  ref="refBasicUpload"
                  :formId="ruleForm.bpmaMaterialInInoutMaster.id"
                  :disabled="disabledAudit"
                ></basic-upload>
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
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncEnterprise" title="外部单位-选择">
          <dialog-transitUnit @selectionChange="getItem" filterValid v-if="visibleSyncEnterprise"></dialog-transitUnit>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncEnterprise = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncEnterprise')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncOfferEnterprise" title="供方单位-选择">
          <dialog-transitUnit
            @selectionChange="getItem"
            filterValid
            v-if="visibleSyncOfferEnterprise"
          ></dialog-transitUnit>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncOfferEnterprise = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncOfferEnterprise')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
        <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMyUnit" title="内部机构-选择">
          <dialog-my-unit
            @selectionChange="getItem"
            filterValid
            filterUnit
            v-if="visibleSyncMyUnit"
          ></dialog-my-unit>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncMyUnit = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncMyUnit')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
      </el-collapse-item>
    </el-collapse>
    <el-row class="content-container">
      <basic-handler>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="clickWindow('materialDictionary')"
          :disabled="disabledAudit"
          plain
        >引入物资</el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="clickGoods"
          plain
          :disabled="!disabledAudit && Object.keys(selectArray).length?false:true"
        >删除</el-button>
        <template slot="search">
          <basic-search
            v-if="false"
            ref="refBasicSearch"
            :modelSearchFilter="modelSearchFilter"
            @clickSearchFilter="clickSearchFilter"
          ></basic-search>
        </template>
      </basic-handler>
      <basic-table
        ref="refOutTheFrontTable"
        :dataTable="dataStockGoodsData"
        :columns="columnsData.itemColumns"
        @current-change="handleSelectionChange"
        :isPagination="false"
        :pagination="modelSearchFilter"
        :height="310"
      >
        <template slot-scope="obj" slot="buySum">
          <el-form
            :model="dataStockGoodsData.data[obj.scope.$index]"
            :ref="'formBuySum' + obj.scope.$index"
            :show-message="false"
          >
            <el-form-item prop="buySum">
              <basic-input
                clearable
                size="small"
                :format="formatToThousandsFour"
                :formatValue="formatToMoneyFour"
                v-model="obj.scope.row.buySum"
                placeholder="请输入采购数量"
                :min="0.0000"
                @change="sumChange(obj.scope.row)"
                :disabled="disabledAudit"
              ></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="buyUnitPrice">
          <el-form
            :model="dataStockGoodsData.data[obj.scope.$index]"
            :ref="'formBuyUnitPrice' + obj.scope.$index"
            :show-message="false"
          >
            <el-form-item prop="buyUnitPrice">
              <basic-input
                clearable
                size="small"
                :format="formatToThousandsFour"
                :formatValue="formatToMoneyFour"
                v-model="obj.scope.row.buyUnitPrice"
                placeholder="请输入采购单价"
                :min="0.0000"
                @change="sumChange(obj.scope.row)"
                :disabled="disabledAudit"
              ></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template
          slot-scope="obj"
          slot="buyTotalPrice"
        >{{formatToThousands(obj.scope.row.buyTotalPrice)}}</template>
        <!-- <template slot-scope="obj" slot="ifChangePrice">
          <el-radio-group
            v-model="obj.scope.row.ifChangePrice"
            :disabled="disabledAudit"
            @change="sumChange(obj.scope.row,2)"
          >
            <el-radio
              :label="parseInt(row.code)"
              v-for="(row, key, index) in dataEnum.isOrNot"
              :key="row.code"
            >{{ row.name }}</el-radio>
          </el-radio-group>
        </template>-->
        <template slot-scope="obj" slot="useSum">{{formatToThousandsFour(obj.scope.row.useSum)}}</template>
        <template slot-scope="obj" slot="useUnitPrice">
          <el-form
            :model="dataStockGoodsData.data[obj.scope.$index]"
            :ref="'formUseUnitPrice' + obj.scope.$index"
            :show-message="false"
          >
            <el-form-item prop="useUnitPrice">
              <basic-input
                clearable
                size="small"
                :format="formatToThousandsFour"
                :formatValue="formatToMoneyFour"
                v-model="obj.scope.row.useUnitPrice"
                placeholder="请输入领用单价"
                :disabled="obj.scope.row.ifChangePrice==2?true:false||disabledAudit"
                :min="0.0000"
                @change="sumChange(obj.scope.row)"
              ></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template
          slot-scope="obj"
          slot="useTotalPrice"
        >{{formatToThousandsFour(obj.scope.row.useTotalPrice)}}</template>
        <template slot-scope="obj" slot="postion">
          <basic-input
            clearable
            size="small"
            v-model="obj.scope.row.postion"
            placeholder="请输入用料部位"
            @change="sumChange(obj.scope.row)"
            :disabled="disabledAudit"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input
            clearable
            size="small"
            v-model="obj.scope.row.remark"
            placeholder="备注"
            :disabled="disabledAudit"
          ></basic-input>
        </template>
      </basic-table>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary
        :materialDictionaryData="dataStockGoodsData.data"
        @selectionChange="selectionChangeCheck"
        filterValid
        :isShowChecked="true"
        v-if="visibleSyncMaterialDictionary"
      ></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="clickHandleOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUserManager" title="垫付人员-选择">
      <dialog-user-manager
        @selectionChange="selectionChange"
        filterValid
        v-if="visibleSyncUserManager"
      ></dialog-user-manager>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUserManager = false">取 消</el-button>
        <el-button @click="clickHandleOk" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- 物资合同-->
    <addItem
      ref="refMaterialContract"
      @getCheckTree="getCheckTree"
      @getItem="getPublicMate"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem>
  </basic-container>
</template>

<script>
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";
import { getMeasureUnitData } from "@/api/common/dataBasic";
import { staticDataBasic } from "@/assets/data/basic";
import { validateLength, validateValue } from "@/utils/validate";
//表头信息
import { columnsData } from "./tableTitle.js";
//弹窗
import dialogProject from "@/views/components/dialog/dialogProject";
import dialogTransitUnit from "@/views/components/dialog/dialogTransitUnit";
import dialogMyUnit from "@/views/components/dialog/dialogMyUnit";
import dialogMaterialDictionary from "@/views/components/dialog/dialogMaterialDictionary";
import dialogUserManager from "@/views/components/dialog/dialogUserManager";
import addItem from "./components/addItem";
//获取合同
import { getPayContractInfoMaster } from "@/api/bpmaManager/goods/goodsContract/register";
import {
  add,
  getDetail,
  audit,
  del,
  getMaterial,
  getDiction,
  delDetail
} from "@/api/bpmaManager/goods/putStorage/outTheFront";
//getGroupMechanismData,获取数据
//postGroupMechanismValidateStatus,审核
//deleteGroupMechanism, 删除
//putGroupMechanismEnable, 启用及禁用
//postGroupMechanismAddOrUpdate 保存
export default {
  name: "leaseSettlementDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  components: {
    dialogProject,
    dialogTransitUnit,
    dialogMyUnit,
    dialogMaterialDictionary,
    addItem,
    dialogUserManager
  },
  data() {
    return {
      ruleForm: {
        bpmaMaterialInInoutMaster: {
          proId: "", //项目id
          proName: "", //项目名称
          proCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "直进直出单", //单据名称
          payedPrice: "0.00", //报销金额
          deductPrice: "0.00", //抵扣金额
          ifSubstitutePay: 2, //是否垫付
          useEnterpriseType: 1, //单位类型
          useEnterpriseId: "", //领用单位id
          useEnterpriseName: "", //领用单位
          offerEnterpriseId: "", //供方单位id
          offerEnterpriseName: "", //供方单位名称
          buyTotalPrice: "0.00", //采购总价
          useTotalPrice: "0.00", //领用总价
          contractId: "", //合同id
          contractName: "", //合同名称
          ifPay: 2, //是否结算
          ifDeduct: 2, //是否抵扣
          payPerson: "",
          payPersonId: "",
          handleDate: new Date().getTime() //业务日期
        },
        bpmaMaterialInInoutDetails: []
      },
      dataStockGoodsData: {
        data: [],
        total: 0
      },
      itemId: "",
      selectArray: {},
      visibleSyncProject: false,
      visibleSyncEnterprise: false,
      visibleSyncOfferEnterprise: false,
      visibleSyncMaterialDictionary: false,
      visibleSyncUserManager: false,
      visibleSyncMyUnit: false,
      selectedRow: {},
      dialogTableVisible: true,
      rules: {
        proName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ["项目名称", 1, 50]);
            },
            trigger: "change"
          }
        ],
        useEnterpriseName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ["领用单位", 1, 50]);
            },
            trigger: "change"
          }
        ],
        offerEnterpriseName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ["供方单位", 1, 50]);
            },
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ["单据名称", 1, 50]);
            },
            trigger: "change"
          }
        ],
        payPerson: [
          {
            required: false,
            validator: (rule, value, callback) => {
              if (
                this.ruleForm.bpmaMaterialInInoutMaster.ifSubstitutePay == 1
              ) {
                validateLength(rule, value, callback, true, [
                  "垫付人员",
                  1,
                  50
                ]);
              } else {
                validateLength(rule, value, callback, false, [
                  "垫付人员",
                  1,
                  50
                ]);
              }
            },
            trigger: "change"
          }
        ]
      },
      rulesStockGoodsData: {
        buySum: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateValue(rule, value, callback, true, [
                "采购数量",
                0,
                100000000
              ]);
            },
            trigger: "change"
          }
        ],
        buyUnitPrice: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateValue(rule, value, callback, true, [
                "采购单价",
                0,
                100000000
              ]);
            },
            trigger: "change"
          }
        ],
        useUnitPrice: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateValue(rule, value, callback, true, [
                "领用单价",
                0,
                100000000
              ]);
            },
            trigger: "change"
          }
        ]
      },
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: "",
        fuzzyKeys: ""
      },
      columnsData,
      activeNames: ["1"],
      type: ""
    };
  },
  deactivated() {
    this.$store.dispatch("cacheId", undefined);
  },
  activated() {
    this.$utilsBasic.loadAddAndDetailData(
      this,
      () => {
        if (this.$route.query.proObj) {
          this.proObj = this.$route.query.proObj;
        }
        this.clickAdd();
      },
      id => {
        this.itemId = id;
        this.getDataAll();
      }
    );
  },
  created() {
    //初始化数据字典
    this.getEnumData(["GetValidateStatusData", "GetIsOrNotData"]);
    this.$store.dispatch("cacheId", "0"); //刷新
  },
  methods: {
    clickWindow(type) {
      if (this.disabledAudit) return;
      this.type = type;
      this[
        "visibleSync" +
          type.replace(/(^[\w\W])/, res => res.toLocaleUpperCase())
      ] = true;
    },
    selectionChange(row) {
      this.selectedRow = row.selectedRow;
    },
    selectionChangeCheck(row) {
      this.selectedRow = row.selectedRows;
    },
    clickHandleOk() {
      const row = this.selectedRow;
      switch (this.type) {
        case "project":
          if (!this.isSelectedRow(row)) return false;
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "proName",
            row.name
          );
          this.$set(this.ruleForm.bpmaMaterialInInoutMaster, "proId", row.id);
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "proCode",
            row.code
          );
          break;
        case "userManager":
          if (!this.isSelectedRow(row)) return false;
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "payPerson",
            row.username
          );
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "payPersonId",
            row.id
          );
          break;
        case "materialDictionary":
          if (!this.isSelectedRows(row)) return false;
          this.selectedRow = undefined;
          let priceObj = {
            buySum: "0.0000",
            buyUnitPrice: "0.0000",
            buyTotalPrice: "0.00",
            ifChangePrice: 2,
            useSum: "0.0000",
            useUnitPrice: "0.0000",
            useTotalPrice: "0.00"
          };
          let newArray = [];
          row.forEach(item => {
            let currentObj = Object.assign({}, item, priceObj);
            currentObj.materialId = currentObj.id;
            currentObj.id = "";
            currentObj.masterId = "";
            currentObj.unit = item.units;
            newArray.push(currentObj);
          });
          this.dataStockGoodsData.data.unshift(...newArray);
          this.$refs.refOutTheFrontTable.setCurrentRow(
            this.dataStockGoodsData.data[0]
          );
          this.computeSummary();
          this.ruleForm.bpmaMaterialInInoutDetails = this.dataStockGoodsData.data;
          break;
      }
      this.selectedRow = [];
      this.isUpdate = false;
      this[
        "visibleSync" +
          this.type.replace(/(^[\w\W])/, res => res.toLocaleUpperCase())
      ] = false;
    },
    //获取详情
    getDataAll() {
      if (this.itemId) {
        getDetail(this.itemId)
          .then(res => {
            if (res.status) {
              this.proObj = {
                code: res.data.bpmaMaterialInInoutMaster.proCode,
                id: res.data.bpmaMaterialInInoutMaster.proId,
                name: res.data.bpmaMaterialInInoutMaster.proName
              };
              this.ruleForm = res.data;
              this.dataStockGoodsData = {
                data: res.data.bpmaMaterialInInoutDetails,
                total: res.data.bpmaMaterialInInoutDetails.length
              };
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.clickAdd();
      }
    },
    //新增
    clickAdd() {
      this.itemId = "";
      this.selectArray = {};
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      this.$nextTick(() => {
        this.ruleForm = {
          bpmaMaterialInInoutMaster: {
            proCode: this.proObj ? this.proObj.code : "",
            proId: this.proObj ? this.proObj.id : "",
            proName: this.proObj ? this.proObj.name : "",
            validateStatus: 2, //审核状态
            name: "直进直出单", //单据名称
            payedPrice: "0.00", //结算金额
            deductPrice: "0.00", //抵扣金额
            useEnterpriseType: 1, //单位类型
            ifSubstitutePay: 2, //是否垫付
            useEnterpriseId: this.userLogin.orgId, //领用单位id
            useEnterpriseName: this.userLogin.orgName, //领用单位  //默认为当前登录人员机构
            offerEnterpriseId: "", //供方单位id
            offerEnterpriseName: "", //供方单位名称
            buyTotalPrice: "0.00", //采购总价
            useTotalPrice: "0.00", //领用总价
            contractId: "", //合同id
            contractName: "", //合同名称
            ifPay: 2, //是否结算
            ifDeduct: 2, //是否抵扣
            handleDate: new Date().getTime() //业务日期
          },
          bpmaMaterialInInoutDetails: []
        };
      });
      return this.$utilsBasic.valideFocus(this, [
        "refProName",
        "refOfferEnterpriseName",
        "refUseEnterpriseName"
      ]);
    },
    sumChange(data) {
      if (data.ifChangePrice == 2) {
        data.useUnitPrice = data.buyUnitPrice;
      }
      data.useSum = data.buySum;
      data.buyTotalPrice = this.$utilsBasic.toMoney(
        data.buySum * data.buyUnitPrice,
        2
      );
      data.useTotalPrice = this.$utilsBasic.toMoney(
        data.useSum * data.useUnitPrice,
        2
      );
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary() {
      let result = this.$utilsBasic.computeSummaryData(
        this.dataStockGoodsData.data,
        ["buyTotalPrice", "useTotalPrice"]
      );
      this.ruleForm.bpmaMaterialInInoutMaster.buyTotalPrice = this.$utilsBasic.toMoney(
        result.buyTotalPrice,
        2
      );
      this.ruleForm.bpmaMaterialInInoutMaster.useTotalPrice = this.$utilsBasic.toMoney(
        result.useTotalPrice,
        2
      );
    },
    clickByDialogAddData(type) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialInInoutMaster.proId) {
          this.$message.warning("亲，请先选择【项目名称】");
          return;
        }
        this.$refs.refMaterialContract.openDialog();
        this.getMaterialType(1, 5);
        this.$refs.refMaterialContract.title = "引入物资-选择";
        this.$refs.refMaterialContract.type = 1;
        this.$refs.refMaterialContract.treeColumns =
          columnsData.materialTypeColumns;
        this.$refs.refMaterialContract.columns = columnsData.materialColumns;
      } else if (type == "proName") {
        this.visibleSyncProject = true;
      } else if (type == "useEnterpriseName") {
        if (this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseType == 1) {
          this.visibleSyncMyUnit = true;
        } else {
          this.visibleSyncEnterprise = true;
        }
      } else if (type == "offerEnterpriseName") {
        this.visibleSyncOfferEnterprise = true;
      } else if (type == "contractName") {
        if (!this.ruleForm.bpmaMaterialInInoutMaster.proId)
          return this.$message.warning("请先选择项目");
        if (!this.ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseId)
          return this.$message.warning("请先选择供方单位");
        this.$refs.refMaterialContract.openDialog();
        this.$refs.refMaterialContract.type = 2;
        this.getContract(
          2,
          1,
          10,
          this.ruleForm.bpmaMaterialInInoutMaster.proId,
          this.ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseId
        );
        this.$refs.refMaterialContract.title = "物资合同-选择";
        this.$refs.refMaterialContract.columns = columnsData.contractColums;
      }
    },

    //获取字典类别
    getMaterialType(page, limit) {
      var params = {
        validateStatus: 1,
        enable: 1
      };
      getMaterial(params)
        .then(res => {
          console.log(res);
          if (!this.$utils.isEmpty(res.data)) {
            this.$refs.refMaterialContract.treeTableData = res.data;
            this.$refs.refMaterialContract.pagination.page = page;
            this.$refs.refMaterialContract.pagination.limit = limit;
            this.$nextTick(function() {
              this.$refs.refMaterialContract.checkTreeOne(res.data[0]);
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    clickGoods() {
      this.$confirm(staticDataBasic.info.delete, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteByIdData(
            this.dataStockGoodsData.data,
            this.selectArray,
            (allData, data) => {
              this.ruleForm.bpmaMaterialInInoutDetails = allData;
              this.dataStockGoodsData.data = data;
              this.computeSummary();
            }
          );
        })
        .catch(error => {
          console.log(error);
        });
    },
    getItem(row) {
      this.selectedRow = row.selectedRow;
    },
    //选择后的物资
    getPublicMate(arr) {
      let priceObj = {
        buySum: 0,
        buyUnitPrice: 0,
        buyTotalPrice: 0,
        ifChangePrice: 2,
        useSum: 0,
        useUnitPrice: 0,
        useTotalPrice: 0
      };
      if (arr[1] == 1) {
        var newArr = [];
        arr[0].forEach(item => {
          if (!item.masterId) {
            item.id = "";
            item.masterId = "";
            item = Object.assign(item, priceObj);
          }
          item = Object.assign({}, item);
          newArr.push(item);
        });
        this.dataStockGoodsData.data.push(newArr);
      } else {
        this.ruleForm.bpmaMaterialInInoutMaster.contractId = arr[0].id;
        this.ruleForm.bpmaMaterialInInoutMaster.contractName = arr[0].name;
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
      if (!this.isSelectedRow(row)) return false;
      if (Object.keys(row).length === 0) return;
      switch (type) {
        case "visibleSyncProject":
          this.ruleForm.bpmaMaterialInInoutMaster.proCode = row.code;
          this.ruleForm.bpmaMaterialInInoutMaster.proId = row.id;
          this.ruleForm.bpmaMaterialInInoutMaster.proName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
        case "visibleSyncEnterprise":
          this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseName = row.name;
          break;
        case "visibleSyncMyUnit":
          this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseName = row.name;
          break;
        case "visibleSyncOfferEnterprise":
          this.ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseName =
            row.name;
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "contractId",
            undefined
          );
          this.$set(
            this.ruleForm.bpmaMaterialInInoutMaster,
            "contractName",
            undefined
          );
          break;
      }
      this[type] = false;
    },
    putAddAndUpdateAll(callback) {
      add(this.ruleForm)
        .then(res => {
          if (res.status == 200) {
            this.ruleForm = res.data;
            this.dataStockGoodsData.data = res.data.bpmaMaterialInInoutDetails;
            this.itemId = res.data.bpmaMaterialInInoutMaster.id;
            if (!this.$refs.refBasicUpload.submitUpload(this.itemId))
              return false;
            //审核
            if (callback && typeof callback === "function") {
              callback(this.itemId);
            } else {
              //保存成功
              this.$message({
                message: res.message,
                type: "success"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存
    clickSave() {
      return this.validateAfter(() => {
        this.putAddAndUpdateAll();
      });
    },
    /**
     * 保存或者审核之前验证
     */
    validateAfter(callback) {
      let result = true;
      //表单验证
      this.$refs.refRuleForm.validate(valid => {
        valid ? null : (result = valid);
        return !result;
      });
      //物资验证
      // this.dataStockGoodsData.data.some((item, idx) => {
      //   this.$refs['formBuySum' + idx].validate((valid) => {
      //     valid ? null : result = valid
      //   })
      //   this.$refs['formBuyUnitPrice' + idx].validate(valid => {
      //     valid ? null : result = valid
      //   })
      //   this.$refs['formUseUnitPrice' + idx].validate(valid => {
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
        this.$message({
          message: staticDataBasic.info.updateEmptyError,
          type: "warning"
        });
        return this.$utilsBasic.valideFocus(this, [
          "refName",
          "refProName",
          "refOfferEnterpriseName",
          "refUseEnterpriseName"
        ]);
      }
    },
    //审核
    clickAudit() {
      return this.validateAfter(() => {
        if (!this.$utils.length(this.dataStockGoodsData.data)) {
          this.$message({ message: "亲，请先【引入物资】", type: "warning" });
          return false;
        }
        this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.putAddAndUpdateAll(id => {
              console.log(id);
              this.ruleForm.bpmaMaterialInInoutMaster.id = id;
              audit(this.ruleForm)
                .then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message);
                    this.ruleForm = res.data;
                    this.dataStockGoodsData.data =
                      res.data.bpmaMaterialInInoutDetails;
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            });
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    //删除
    clickDelete() {
      this.$confirm(staticDataBasic.info.delete, {
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
                this.clickAdd();
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
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
        this.$refs.refMaterialContract.tableData = res.data.rows;
        this.$refs.refMaterialContract.page.total = res.data.total;
      });
    },
    //改变领用类型
    changePriseType() {
      this.$set(
        this.ruleForm.bpmaMaterialInInoutMaster,
        "payPersonId",
        undefined
      );
      this.$set(
        this.ruleForm.bpmaMaterialInInoutMaster,
        "payPerson",
        undefined
      );
      this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseId = "";
      this.ruleForm.bpmaMaterialInInoutMaster.useEnterpriseName = "";
    },
    //关键字搜索
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(
        this.$refs.refOutTheFrontTable,
        this.modelSearchFilter,
        () => {
          // this.getDataAll();
        }
      );
    },
    currentPage(pages, n) {
      console.log("分页");
      // this.getContract(n,pages.page,pages.limit)
    },
    //选中物资
    handleSelectionChange(obj) {
      if (obj && typeof obj == "object") {
        console.log(obj, "hehe");
        this.selectArray = obj;
      } else {
        this.selectArray = {};
      }
    }
  },
  computed: {
    disabledAudit() {
      if (this.ruleForm.bpmaMaterialInInoutMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    disabledDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialInInoutMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    disabledAuditTwo() {
      if (this.ruleForm.bpmaMaterialInInoutMaster.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialInInoutMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialInInoutMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialInInoutMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialInInoutMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
