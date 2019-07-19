<template>
  <basic-container class="usageRequirementDetail-container">
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
          :model="ruleForm"
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
                  v-model="ruleForm.validateStatus ==1?'已审核':'未审核'"
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
                  v-model="ruleForm.detailList.code"
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
                  v-model="ruleForm.name"
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
                  v-model="ruleForm.proName"
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
              <basic-form-item label="提出人员" prop="handlePerson">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.handlePerson"
                  placeholder="请输入提出人员"
                  :disabled="disabledAudit"
                  maxlength="100"
                ></el-input>
              </basic-form-item>
            </el-col>
            <el-col :span="8">
              <basic-form-item label="提出日期" prop="handleDate" class="showTime">
                <el-date-picker
                  :clearable="false"
                  size="small"
                  :editable="false"
                  :disabled="disabledAudit"
                  v-model="ruleForm.handleDate"
                  type="date"
                  placeholder="请选择提出日期"
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
                  v-model="ruleForm.remark"
                ></el-input>
              </basic-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload
                  ref="refBasicUpload"
                  :formId="ruleForm.detailList.id"
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
        >引入周材</el-button>
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
        ref="refusageRequirementTable"
        :dataTable="dataStockGoodsData"
        :columns="columnsData.itemColumns"
        @current-change="handleSelectionChange"
        :isPagination="false"
        :pagination="modelSearchFilter"
        :height="310"
      >
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
        <template slot-scope="obj" slot="useDate">
          <el-date-picker
            :clearable="false"
            size="small"
            :editable="false"
            :disabled="disabledAudit"
            v-model="obj.scope.row.useDate"
            type="date"
            placeholder="请选择提出日期"
            format="yyyy-MM-dd"
          ></el-date-picker>
        </template>
        <template slot-scope="obj" slot="sum">
          <basic-input
            clearable
            size="small"
            :format="formatToThousandsFour"
            v-model="obj.scope.row.sum"
            placeholder="请输入使用数量"
            @change="sumChange(obj.scope.row)"
            :min="0.0000"
            :disabled="disabledAudit"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input
            clearable
            size="small"
            v-model="obj.scope.row.remark"
            placeholder="需求說明"
            :disabled="disabledAudit"
          ></basic-input>
        </template>
      </basic-table>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入周材-选择">
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
    <!-- <addItem
      ref="refMaterialContract"
      @getCheckTree="getCheckTree"
      @getItem="getPublicMate"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem>-->
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
// import addItem from "./components/addItem";
//获取合同
import { getPayContractInfoMaster } from "@/api/bpmaManager/goods/goodsContract/register";
// import { add } from "@/api/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/index.js";
import {
  postGroupMechanismAddOrUpdate,
  getDetail,
  postGroupMechanismValidateStatus,
  deleteGroupMechanism
} from "@/api/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/index.js";
//getGroupMechanismData,获取数据
//postGroupMechanismValidateStatus,审核
//deleteGroupMechanism, 删除
//putGroupMechanismEnable, 启用及禁用
//postGroupMechanismAddOrUpdate 保存
export default {
  name: "usageRequirementDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  components: {
    dialogProject,
    dialogTransitUnit,
    dialogMyUnit,
    dialogMaterialDictionary,
    // addItem,
    dialogUserManager
  },
  data() {
    return {
      ruleForm: {
        authCode: "", //所属用户授权码
        code: "", //单据编码
        detailList: [
          {
            validateStatus: 2, //审核状态
            name: "周材使用详情", //单据名称
            masterId: "", //使用需求主表
            model: "", //型号
            postion: "", //使用部位
            remark: "", //备注

            reuseMaterialCode: "", //周材编码
            reuseMaterialId: "", //周材ID
            reuseMaterialName: "", //周材名称
            sum: 0, //需求数量
            unit: "", //计量单位
            useDate: new Date().getTime() //使用日期
          }
        ],
        enable: "", //启用、禁止
        handlePerson: "", //提出人员
        handleDate: new Date().getTime(), //提出时间
        inputPerson: "", //登记人员
        inputPersonId: "", //登记人员ID
        inputTime: new Date().getTime(), //登记时间
        name: "周材使用需求", //单据名称
        proCode: "",
        proId: "",
        proName: "",
        proLabel: "", //项目标识
        remark: "", //使用说明
        reserve: "", //保留
        userId: "", //所属用户账号
        validateStatus: 2 //审核状态
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
              if (this.ruleForm.detailList.ifSubstitutePay == 1) {
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
      var that = this;
      switch (this.type) {
        case "project":
          if (!this.isSelectedRow(row)) return false;
          this.$set(this.ruleForm.detailList, "proName", row.name);
          this.$set(this.ruleForm.detailList, "proId", row.id);
          this.$set(this.ruleForm.detailList, "proCode", row.code);
          break;
        case "userManager":
          if (!this.isSelectedRow(row)) return false;
          this.$set(this.ruleForm.detailList, "payPerson", row.username);
          this.$set(this.ruleForm.detailList, "payPersonId", row.id);
          break;
        case "materialDictionary":
          if (!this.isSelectedRows(row)) return false;
          this.selectedRow = undefined;
          let priceObj = {
            reuseMaterialName: "",
            reuseMaterialCode: "",
            unit: "",
            model: "",
            useDate: new Date().getTime()
          };
          let newArray = [];
          row.forEach(item => {
            console.log(item);
            priceObj.model = item.model;
            priceObj.reuseMaterialId = item.id;
            priceObj.reuseMaterialName = item.name;
            priceObj.reuseMaterialCode = item.code;
            priceObj.unit = item.units;
            let currentObj = Object.assign({}, priceObj);
            newArray.push(currentObj);
          });
          this.dataStockGoodsData.data.unshift(...newArray);
          console.log(this.dataStockGoodsData.data);
          this.$refs.refusageRequirementTable.setCurrentRow(
            this.dataStockGoodsData.data[0]
          );
          this.computeSummary();
          this.ruleForm.detailList = this.dataStockGoodsData.data;
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
            console.log(res);
            if (res.status) {
              this.proObj = {
                code: res.data.proCode,
                id: res.data.proId,
                name: res.data.proName
              };
              this.ruleForm = res.data;
              this.dataStockGoodsData = {
                data: res.data.detailList,
                total: res.data.detailList.length
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
          authCode: "", //所属用户授权码
          code: "", //单据编码
          detailList: [
            {
              validateStatus: 2, //审核状态
              name: "周材使用详情", //单据名称
              masterId: "", //使用需求主表
              model: "", //型号
              postion: "", //使用部位
              remark: "", //备注
              reserve: "", //保留
              reuseMaterialCode: "", //周材编码
              reuseMaterialId: "", //周材ID
              reuseMaterialName: "", //周材名称
              sum: 10, //需求数量
              unit: "", //计量单位
              useDate: new Date().getTime() //使用日期
              // userId: "" //所属用户账号
            }
          ],
          enable: "", //启用、禁止
          handlePerson: "", //提出人员
          handleDate: new Date().getTime(), //提出时间
          inputPerson: "", //登记人员
          inputPersonId: "", //登记人员ID
          inputTime: new Date().getTime(), //登记时间
          name: "周材使用需求", //单据名称
          proCode: this.proObj ? this.proObj.code : "",
          proId: this.proObj ? this.proObj.id : "",
          proName: this.proObj ? this.proObj.name : "",
          proLabel: "", //项目标识
          remark: "", //使用说明
          reserve: "", //保留
          userId: "", //所属用户账号
          validateStatus: 2 //审核状态
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
    },
    /**
     * 计算总价
     * */
    computeSummary() {
      let result = this.$utilsBasic.computeSummaryData(
        this.dataStockGoodsData.data,
        ["buyTotalPrice", "useTotalPrice"]
      );
      this.ruleForm.detailList.buyTotalPrice = this.$utilsBasic.toMoney(
        result.buyTotalPrice,
        2
      );
      this.ruleForm.detailList.useTotalPrice = this.$utilsBasic.toMoney(
        result.useTotalPrice,
        2
      );
    },
    clickByDialogAddData(type) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.proId) {
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
        if (this.ruleForm.useEnterpriseType == 1) {
          this.visibleSyncMyUnit = true;
        } else {
          this.visibleSyncEnterprise = true;
        }
      } else if (type == "offerEnterpriseName") {
        this.visibleSyncOfferEnterprise = true;
      } else if (type == "contractName") {
        if (!this.ruleForm.proId) return this.$message.warning("请先选择项目");
        if (!this.ruleForm.offerEnterpriseId)
          return this.$message.warning("请先选择供方单位");
        this.$refs.refMaterialContract.openDialog();
        this.$refs.refMaterialContract.type = 2;
        this.getContract(
          2,
          1,
          10,
          this.ruleForm.proId,
          this.ruleForm.detailList.offerEnterpriseId
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
          // console.log(res);
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
              this.ruleForm.detailList = allData;
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
        this.ruleForm.contractId = arr[0].id;
        this.ruleForm.contractName = arr[0].name;
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
          this.ruleForm.proCode = row.code;
          this.ruleForm.proId = row.id;
          this.ruleForm.proName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
        case "visibleSyncEnterprise":
          this.ruleForm.detailList.useEnterpriseId = row.id;
          this.ruleForm.detailList.useEnterpriseName = row.name;
          break;
        case "visibleSyncMyUnit":
          this.ruleForm.detailList.useEnterpriseId = row.id;
          this.ruleForm.detailList.useEnterpriseName = row.name;
          break;
        case "visibleSyncOfferEnterprise":
          this.ruleForm.detailList.offerEnterpriseId = row.id;
          this.ruleForm.detailList.offerEnterpriseName = row.name;
          this.$set(this.ruleForm.detailList, "contractId", undefined);
          this.$set(this.ruleForm.detailList, "contractName", undefined);
          break;
      }
      this[type] = false;
    },
    putAddAndUpdateAll(callback) {
      postGroupMechanismAddOrUpdate(this.ruleForm)
        .then(res => {
          // console.log(res);
          if (res.status == 200) {
            this.ruleForm = res.data;
            this.dataStockGoodsData.data = res.data.detailList;
            this.itemId = res.data.id;
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
            this.putAddAndUpdateAll(itemId => {
              this.ruleForm.id = itemId;
              this.ruleForm.detailList.id = itemId;
              postGroupMechanismValidateStatus(this.ruleForm)
                .then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message);
                    this.ruleForm = res.data;
                    this.dataStockGoodsData.data = res.data.detailList;
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
          console.log(id);
          deleteGroupMechanism(id)
            .then(res => {
              console.log();
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
      this.$set(this.ruleForm.detailList, "payPersonId", undefined);
      this.$set(this.ruleForm.detailList, "payPerson", undefined);
      this.ruleForm.detailList.useEnterpriseId = "";
      this.ruleForm.detailList.useEnterpriseName = "";
    },
    //关键字搜索
    clickSearchFilter() {
      this.$refs.refBasicSearch.searchFilter(
        this.$refs.refusageRequirementTable,
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
        // console.log(obj, "hehe");
        this.selectArray = obj;
      } else {
        this.selectArray = {};
      }
    }
  },
  computed: {
    disabledAudit() {
      if (this.ruleForm.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    disabledDelete() {
      if (this.itemId != "" && this.ruleForm.detailList.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    disabledAuditTwo() {
      if (this.ruleForm.detailList.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.detailList.ifSubstitutePay != 2 &&
        this.ruleForm.detailList.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.detailList.offerEnterpriseId != "" &&
        this.ruleForm.detailList.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
