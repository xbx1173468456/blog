<template>
  <div class="receiveDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick" plain>新增</el-button>
      <el-button
        :disabled="isAudit"
        type="primary"
        size="small"
        icon="el-icon-if-save"
        @click="saveClick()"
        plain
      >保存</el-button>
      <el-button
        :disabled="isDelete"
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="delClick"
        plain
      >删除</el-button>
      <el-button
        :disabled="isAudit2"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        @click="auditClick"
        plain
      >审核</el-button>

    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form
          :model="ruleForm.bpmaMaterialOutUseMaster"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="form-container"
          :show-message="false"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.validateStatus ==1?'已审核':'未审核'"
                  disabled
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码" prop="code">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.code"
                  disabled
                  placeholder="审核自动生成"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.name"
                  :disabled="isAudit"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName">
                <el-input
                  placeholder="请选择项目名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.proName"


                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('proName')"
                    :disabled="isAudit"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="领用单位类型" prop="useEnterpriseType" class="add-border">
                <el-radio-group
                  v-model="ruleForm.bpmaMaterialOutUseMaster.useEnterpriseType"
                  @change="changePriseType"
                >
                  <el-radio
                    :label="parseInt(row.code)"
                    v-for="(row,index) in dataEnum.static.useEnterpriseType"
                    :key="index"
                    :disabled="isAudit"
                  > {{ row.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="领用单位" prop="useEnterpriseName">
                <el-input
                  placeholder="请选择领用单位"
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.useEnterpriseName"
                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('useEnterpriseName')"
                    :disabled="isAudit"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="领用人员" prop="usePerson">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.usePerson"
                  placeholder="请输入领用人员"
                  :disabled="isAudit"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="领用日期" prop="handleDate" class="showTime">
                <el-date-picker
                  size="small"
                  :editable="false"
                  :disabled="isAudit"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.handleDate"
                  type="date"
                  format="yyyy-MM-dd"
                  :clearable="false"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="领用总价" prop="useTotalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.useTotalPrice"
                  placeholder="自动生成领用总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="补充说明" prop="remark">
                <el-input
                  type="textarea"
                  :disabled="isAudit"
                  maxlength="200"
                  clearable
                  :autosize="{ minRows: 2, maxRows: 5}"
                  placeholder="请输入补充说明"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialOutUseMaster.id" :disabled="isAudit">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="是否抵扣" prop="ifDeduct" class="add-border disabled">
                <el-radio-group
                  v-model="ruleForm.bpmaMaterialOutUseMaster.ifDeduct"
                  @change="changePriseType"
                  disabled
                >
                  <el-radio
                    :label="parseInt(row.code)"
                    v-for="(row,index) in dataEnum.isOrNot"
                    :key="index"
                    :disabled="isAudit"
                  > {{ row.name }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抵扣金额" prop="deductPrice">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.deductPrice"
                  disabled
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="抵扣单号" prop="deductCode">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutUseMaster.deductCode"
                  disabled
                  maxlength="100"
                ></el-input>
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
          @click="clickByDialogAddData('goodsItem')"
          plain
          :disabled="isAudit"
        >引入库存物资</el-button>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="delGoods"
          plain
         :disabled="!isAudit && Object.keys(selectArray).length?false:true"
        >删除</el-button>
        <template slot="search">
          <basic-search
            v-if="false" ref="refBasicSearch"
            :modelSearchFilter="modelSearchFilter"
            @clickSearchFilter="clickSearchFilter"
          ></basic-search>
        </template>
      </basic-handler>
      <basic-table
        ref="refMaterialRequireTable"
        :dataTable="dataStockGoodsData"
        :columns="columnsData.itemColumns2"
        @current-change="handleSelectionChange"
        :isPagination="false"
        :pagination="modelSearchFilter"
        :height="320"
      >
        <template slot-scope="obj" slot="stockSum">
          {{formatToThousandsFour(obj.scope.row.stockSum)}}
        </template>
        <template slot-scope="obj" slot="stockUnitPrice">
          {{formatToThousandsFour(obj.scope.row.stockUnitPrice)}}
        </template>
        <template slot-scope="obj" slot="stockTotalPrice">
          {{formatToThousands(obj.scope.row.stockTotalPrice)}}
        </template>
        <template slot-scope="obj" slot="useSum">
          <basic-input
            clearable
            size="small"
            :disabled="isAudit"
            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.useSum"
            placeholder="请输入领用数量"
            :min="0.0000"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="useUnitPrice">
          <basic-input
            clearable
            size="small"
            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.useUnitPrice"
            placeholder="请输入领用单价"
            :min="0.0000"
            :disabled="isAudit"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="useTotalPrice">
          {{formatToThousands(obj.scope.row.useTotalPrice)}}
        </template>
        <template slot-scope="obj" slot="postion">
          <basic-input
            clearable
            size="small"
            :disabled="isAudit"
            v-model="obj.scope.row.postion"
            placeholder="请输入用料部位"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input
            clearable
            size="small"
            :disabled="isAudit"
            v-model="obj.scope.row.remark"
            placeholder="备注"
          ></basic-input>
        </template>
      </basic-table>
    </el-row>
    <!-- 物资 //合同-->
    <addItem
      ref="refMaterialContract"
      @getCheckTree="getCheckTree"
      @getItem="getPublicMate"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem>
    <basic-dialog v-el-drag-dialog title="引入库存物资-选择" :visible.sync="stockGoods.visibleSync" @open="openStockGoods">
      <dialog-stock-goods ref="refStockGoods" :stockGoodsData="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialOutUseMaster"
                      :isShowChecked="true" @selectionChange="selectionChangeStockGoods"></dialog-stock-goods>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickAddStockGoodsCancel">取 消</el-button>
        <el-button type="primary" @click="clickAddStockGoodsOk()">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import dialogProject from "@/views/components/dialog/dialogProject";
import dialogTransitUnit from "@/views/components/dialog/dialogTransitUnit";
import dialogMyUnit from "@/views/components/dialog/dialogMyUnit";
import dialogStockGoods from "@/views/components/dialog/dialogStockGoods";
import addItem from "./addItem";
//获取合同
import { getPayContractInfoMaster } from "@/api/bpmaManager/goods/goodsContract/register";
//获取物资类型
import { getEnumData, strToTime } from "@/utils";
import {
  add,
  getDetail,
  audit,
  del,
  getMaterial,
  getDiction,
  getPurchaseList,
  delDetail
} from "@/api/bpmaManager/goods/outbound/receiveOutbound/index.js";
//表头信息
import { columnsData } from "../tableTitle.js";
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";
import {staticDataBasic} from "@/assets/data/basic";
import {validateLength} from "@/utils/validate";
export default {
  name: "receiveOutboundDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      ruleForm: {
        bpmaMaterialOutUseMaster: {
          proId: "", //项目id
          proName: "", //项目名称
          proCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "领用出库单", //单据名称
          deductPrice: "0.00", //抵扣金额
          useEnterpriseType: 1, //单位类型
          useEnterpriseId: '', //领用单位id
          useEnterpriseName: '', //领用单位  //默认为当前登录人员机构
          useTotalPrice: "0.00", //领用总价
          ifPay: 2, //是否结算
          ifDeduct: 2, //是否抵扣

        },
        bpmaMaterialOutUseDetails: []
      },
      dataStockGoodsData: {
        data: [],
        total: 0
      },
      itemId: "",
      dictionary: [],
      selectArray: {},
      borderRed: false,
      borderRed2: false,
      borderRed3: false,
      visibleSyncProject: false,
      visibleSyncEnterprise: false,
      visibleSyncOfferEnterprise: false,
      visibleSyncMyUnit: false,
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
        useEnterpriseName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['领用单位', 1, 50]);
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
        ]
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
      stockGoods: {
        visibleSync: false,
        stockGoodsSelectionChange: []
      },
    };
  },
  components: {
    dialogProject,
    dialogTransitUnit,
    dialogMyUnit,
    dialogStockGoods,
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
          if (res.status) {
            this.proObj = {
              code: res.data.bpmaMaterialOutUseMaster.proCode,
              id: res.data.bpmaMaterialOutUseMaster.proId,
              name: res.data.bpmaMaterialOutUseMaster.proName
            };
            this.ruleForm = res.data;
            this.dataStockGoodsData = {
              data: res.data.bpmaMaterialOutUseDetails
            };
          }
        })
        .catch(err => {
          this.$message.warning(err.message);
        });
    },
    //新增
    addClick() {
      this.itemId = "";
      this.$store.dispatch("setTrackId", "");
      this.$store.dispatch("setSelectP",[]);
      this.selectArray={}
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      this.$nextTick(() => {
      this.ruleForm = {
        bpmaMaterialOutUseMaster: {
          proCode: this.proObj ? this.proObj.code : "",
          proId: this.proObj ? this.proObj.id : "",
          proName: this.proObj ? this.proObj.name : "",
          validateStatus: 2, //审核状态
          name: "领用出库单", //单据名称
          deductPrice: "0.00", //抵扣金额
          useEnterpriseType: 1, //单位类型
          useEnterpriseId: this.userLogin.orgId, //领用单位id
          useEnterpriseName: this.userLogin.orgName, //领用单位  //默认为当前登录人员机构
          useTotalPrice: "0.00", //领用总价
          ifPay: 2, //是否结算
          ifDeduct: 2, //是否抵扣
          handleDate: new Date().getTime() //业务日期
        },
        bpmaMaterialOutUseDetails: []
      };
      })
    },
    sumChange(data) {
      data.useTotalPrice = this.$utilsBasic.toMoney(data.useSum * data.useUnitPrice,2);
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary(){
      let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['useTotalPrice']);
        this.ruleForm.bpmaMaterialOutUseMaster.useTotalPrice = this.$utilsBasic.toMoney(result.useTotalPrice, 2);
    },
    clickByDialogAddData(type) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialOutUseMaster.proId) {
          this.$message.warning("亲，请先选择【项目名称】");
          return;
        }
       this.stockGoods.visibleSync = true;
       //  this.$refs.refMaterialContract.openDialog();
       //  this.getPurchaseList(1, 10);
       //  this.$refs.refMaterialContract.title = "引入库存物资-选择";
       //  this.$refs.refMaterialContract.type = 3;
       //  this.$refs.refMaterialContract.selection = 'selection';
       //  this.$refs.refMaterialContract.columns = columnsData.itemColumns;
      } else if (type == "proName") {
        console.log("项目");
        this.visibleSyncProject = true;
      } else if (type == "useEnterpriseName") {
        if (this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseType == 1) {
          console.log("机构");
          this.visibleSyncMyUnit = true;
        } else {
          console.log("单位");
          this.visibleSyncEnterprise = true;
        }
      } else if (type == "offerEnterpriseName") {
        this.visibleSyncOfferEnterprise = true;
      } else if (type == "contractName") {
        if (!this.ruleForm.bpmaMaterialOutUseMaster.proId)
          return this.$message.warning("请先选择项目");
        this.$refs.refMaterialContract.openDialog();
        this.$refs.refMaterialContract.type = 2;
        this.getContract(
          2,
          1,
          10,
          this.ruleForm.bpmaMaterialOutUseMaster.proId,
          this.ruleForm.bpmaMaterialOutUseMaster.offerEnterpriseId
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
        .catch(err => {
          console.log(err);
        });
    },
    delGoods() {
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( () => {
          this.deleteByIdData(this.dataStockGoodsData.data, this.selectArray,(allData,data)=>{
            this.ruleForm.bpmaMaterialOutUseDetails = allData;
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
    //选择后的物资
    getPublicMate(arr) {
      console.log(arr);
      let priceObj = {
        useSum: 0,
        useUnitPrice: 0,
        useTotalPrice: 0
      };
      if (arr[1] == 3) {
        var newArr = [];
        arr[0].forEach(item => {
          if(!item.masterId){
            item.id = "";
            item.masterId = "";
            item.inCode = item.inMasterCode
            item.inId = item.inMasterId
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
        this.ruleForm.bpmaMaterialOutUseMaster.contractId = arr[0].id;
        this.ruleForm.bpmaMaterialOutUseMaster.contractName = arr[0].name;
      }
    },
    //获取采购入库单
    getPurchaseList(page, limit) {
      var params = {
        page:page,
        limit:limit,
        proId:this.ruleForm.bpmaMaterialOutUseMaster.proId
      };
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
    },
    //弹窗传回的值
    handleChange(type) {
      const row = this.selectedRow;
      if(!this.isSelectedRow(row)) return false;
      if (Object.keys(row).length === 0) return;
      switch (type) {
        case "visibleSyncProject":
          //选择项目清除明细列表
          if (!this.$utils.isEqual(this.ruleForm.bpmaMaterialOutUseMaster.proCode, row.code)) {
            this.dataStockGoodsData.data = [];
          }
          this.ruleForm.bpmaMaterialOutUseMaster.proCode = row.code;
          this.ruleForm.bpmaMaterialOutUseMaster.proId = row.id;
          this.ruleForm.bpmaMaterialOutUseMaster.proName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
        case "visibleSyncEnterprise":
          this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseName = row.name;
          break;
        case "visibleSyncMyUnit":
          this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseName = row.name;
          break;
        case "visibleSyncOfferEnterprise":
          this.ruleForm.bpmaMaterialOutUseMaster.offerEnterpriseId = row.id;
          this.ruleForm.bpmaMaterialOutUseMaster.offerEnterpriseName =
            row.name;
          break;
      }
      this[type] = false;
    },
    putAddAndUpdateAll(callback) {
      add(this.ruleForm)
        .then(res => {
          if (res.status == 200) {
            this.ruleForm = res.data;
            this.dataStockGoodsData.data=res.data.bpmaMaterialOutUseDetails;
            this.itemId = res.data.bpmaMaterialOutUseMaster.id;
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
          this.$message.warning(err.message);
        });
    },
    //保存
    saveClick() {
      return this.validateAfter(() => {
        this.putAddAndUpdateAll();
      });
    },
    /**
     * 保存或者审核之前验证
     */
    validateAfter(callback) {
      this.$refs['ruleForm'].validate(valid => {
        if (valid) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return this.$utilsBasic.valideFocus(this, ['refProName','refUseEnterpriseType']);
        }
      })
    },
    //审核
    auditClick() {
      return this.validateAfter(() => {
        if (!this.$utils.length(this.dataStockGoodsData.data)) {
          this.$message({
            message: '亲，请先【引入库存物资】',
            type: 'warning'
          })
          return false
        }
      this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.putAddAndUpdateAll((id) => {
            this.ruleForm.bpmaMaterialOutUseMaster.id = id;
            audit(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.ruleForm = res.data;
                  this.dataStockGoodsData.data=res.data.bpmaMaterialOutUseDetails;
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          })
        })
        .catch(err => {
          this.$message.warning(err.message);
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
              this.$message.warning(err.message);
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
        validateStatus: 1
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
      this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseId = "";
      this.ruleForm.bpmaMaterialOutUseMaster.useEnterpriseName = "";
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
      if (obj && typeof(obj)=='object') {
        console.log(obj, "hehe");
        this.selectArray = obj;
      } else {
        this.selectArray = {};
      }
    },
    openStockGoods(){
      this.$refs.refStockGoods ? this.$refs.refStockGoods.getStockGoodsData() : null;
    },
    selectionChangeStockGoods(data) {
      this.stockGoods.stockGoodsSelectionChange = data.selectedRows
    },
    clickAddStockGoodsCancel() {
      this.stockGoods.visibleSync = false;
    },
    clickAddStockGoodsOk() {
      let resultObj = this.stockGoods.stockGoodsSelectionChange;
      if(!this.isSelectedRows(resultObj)) return false;
      this.stockGoods.visibleSync = false;
      let newArray = [];
      resultObj.forEach(item => {
        if(!item.masterId){
          item.id = "";
          item.masterId = this.ruleForm.bpmaMaterialOutUseMaster.id;
          item.inCode = item.inMasterCode
          item.inId = item.inMasterId
          item.useSum = this.$utilsBasic.toMoney(item.stockSum, 4);
          item.useUnitPrice = this.$utilsBasic.toMoney(item.stockUnitPrice, 4);
          item.useTotalPrice = this.$utilsBasic.toMoney(item.useSum*item.useUnitPrice, 2);
          item.remark="";
        }
        item = Object.assign({}, item);
        newArray.push(item);
      });
      this.dataStockGoodsData.data.unshift(...newArray);
      this.computeSummary();
      this.ruleForm.bpmaMaterialOutUseDetails = this.dataStockGoodsData.data;
    }
  },
  computed: {
    isAudit() {
      if (this.ruleForm.bpmaMaterialOutUseMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    isDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialOutUseMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAudit2() {
      if (
        this.ruleForm.bpmaMaterialOutUseMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialOutUseMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialOutUseMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialOutUseMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialOutUseMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    }
  },
};
</script>
