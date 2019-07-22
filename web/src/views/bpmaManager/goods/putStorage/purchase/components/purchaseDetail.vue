<template>
  <div class="purchase-container-list">
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
        <el-form :model="ruleForm.bpmaMaterialInBuyMaster" :rules="rules" ref="refRuleForm" label-width="120px"
                 class="form-container" :show-message="false">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus">
                <el-input clearable size="small"
                          v-model="ruleForm.bpmaMaterialInBuyMaster.validateStatus ==1?'已审核':'未审核'" disabled
                          maxlength="100">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码" prop="code">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.code" disabled
                          placeholder="系统自动生成单据编码" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input ref="refName" clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.name" :disabled="isAudit"
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName">
                <el-input ref="refProName" placeholder="请选择项目名称" size="small"
                          v-model="ruleForm.bpmaMaterialInBuyMaster.proName"
                          readonly>
                  <el-button slot="append" size="mini" icon="el-icon-plus" @click="clickByDialogAddData('proName')"
                             :disabled="isAudit">
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供方单位" prop="offerEnterpriseName">
                <el-input ref="refOfferEnterpriseName" placeholder="请选择供方单位" size="small"
                          v-model="ruleForm.bpmaMaterialInBuyMaster.offerEnterpriseName" readonly>
                  <el-button slot="append" size="mini" icon="el-icon-plus" @click="clickByDialogAddData('offerEnterpriseName')"
                             :disabled="isAudit"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同名称" prop="contractName">
                <el-input placeholder="请选择合同名称" size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.contractName"
                          :disabled="isAudit" readonly>
                  <el-button slot="append" size="mini" icon="el-icon-plus" @click="clickByDialogAddData('contractName')"
                             :disabled="ifContract"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="是否垫付" prop="ifSubstitutePay" class="add-border">
                <el-radio-group v-model="ruleForm.bpmaMaterialInBuyMaster.ifSubstitutePay" @change="changePriseType">
                  <el-radio :label="parseInt(row.code)" v-for="(row,index) in dataEnum.isOrNot" :key="index"
                            :disabled="isAudit"> {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="垫付人员" prop="payPerson">
                <el-input :disabled="isAudit || ruleForm.bpmaMaterialInBuyMaster.ifSubstitutePay == 2" readOnly
                          placeholder="请选择垫付人员" v-model="ruleForm.bpmaMaterialInBuyMaster.payPerson" size="small">
                  <el-button @click="toipClick('userManager')" class="el-button-append" icon="el-icon-plus" size="mini"
                             :disabled="isAudit || ruleForm.bpmaMaterialInBuyMaster.ifSubstitutePay == 2"
                             slot="append"></el-button>
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="垫付人员" prop="payPerson">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.payPerson"
                  :disabled="ifSubstitutePay" :placeholder="!ifSubstitutePay?'请输入垫付人员':''" maxlength="100"></el-input>
              </el-form-item> -->
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购总价" prop="buyTotalPrice">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.buyTotalPrice" disabled
                          maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="送货人员" prop="deliverPerson">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.deliverPerson"
                          placeholder="请输入送货人员" :disabled="isAudit" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货人员" prop="receivePerson">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInBuyMaster.receivePerson"
                          placeholder="请输入收货人员" :disabled="isAudit" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货日期" prop="handleDate" class="showTime">
                <el-date-picker :clearable="false" size="small" :editable="false" :disabled="isAudit"
                                v-model="ruleForm.bpmaMaterialInBuyMaster.handleDate"
                                type="date" format="yyyy-MM-dd" placeholder="请选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="补充说明" prop="remark">
                <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                          :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入补充说明"
                          v-model="ruleForm.bpmaMaterialInBuyMaster.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialInBuyMaster.id" :disabled="isAudit">
                </basic-upload>
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
        <el-button type="primary" size="small" icon="el-icon-plus" :disabled="isAudit"
                   @click="toipClick('materialDictionary')" plain>引入物资
        </el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
                   :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除
        </el-button>
        <template slot="search">
          <basic-search v-if="false" ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                        @clickSearchFilter="clickSearchFilter"></basic-search>
        </template>
      </basic-handler>
      <basic-table ref="refMaterialRequireTable" :dataTable="dataStockGoodsData" :columns="columnsData.itemColumns"
                   @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter"
                   :height="320">
        <template slot-scope="obj" slot="buySum">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formBuySum' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="buySum">
              <basic-input clearable size="small"  :format="formatToThousandsFour"
                           :formatValue="formatToMoneyFour" v-model="obj.scope.row.buySum" placeholder="请输入采购数量"
                           :disabled="isAudit"
                           :min="0.0000" @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="buyUnitPrice">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formBuyUnitPrice' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="buyUnitPrice">
              <basic-input clearable size="small"  :format="formatToThousandsFour"
                           :formatValue="formatToMoneyFour" v-model="obj.scope.row.buyUnitPrice" placeholder="请输入采购单价"
                           :disabled="isAudit" :min="0.0000" @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="buyTotalPrice">
          {{formatToThousands(obj.scope.row.buyTotalPrice)}}
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input clearable size="small"  v-model="obj.scope.row.remark" placeholder="备注"
                       :disabled="isAudit"></basic-input>
        </template>
      </basic-table>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary :materialDictionaryData="dataStockGoodsData.data" @selectionChange="selectionChangeCheck" filterValid
                                  :isShowChecked="true"
                                  v-if="visibleSyncMaterialDictionary"></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleChange1" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- 物资 //合同-->
    <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getPublicMate" v-show="dialogTableVisible"
             @currentPage="currentPage"></addItem>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUserManager" title="垫付人员-选择">
      <dialog-user-manager @selectionChange="selectionChange" filterValid
                           v-if="visibleSyncUserManager"></dialog-user-manager>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUserManager = false">取 消</el-button>
        <el-button @click="handleChange1" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  //四个弹窗
  import dialogProject from "@/views/components/dialog/dialogProject";
  import dialogTransitUnit from "@/views/components/dialog/dialogTransitUnit";
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  import dialogUserManager from '@/views/components/dialog/dialogUserManager'
  import addItem from "./addItem";
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
    delDetail
  } from "@/api/bpmaManager/goods/putStorage/purchase/index.js";
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
    name: "purchaseDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        ruleForm: {
          bpmaMaterialInBuyMaster: {
            proId: "", //项目id
            proName: "", //项目名称
            proCode: "", //项目编码
            validateStatus: 2, //审核状态
            name: "采购入库单", //单据名称
            useEnterpriseType: 1, //单位类型
            ifSubstitutePay: 2, //是否垫付
            offerEnterpriseId: "", //供方单位id
            offerEnterpriseName: "", //供方单位名称
            buyTotalPrice: "0.00", //采购总价
            contractId: "", //合同id
            contractName: "", //合同名称
            handleDate: new Date().getTime() //业务日期
          },
          bpmaMaterialInBuyDetails: []
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
        visibleSyncOfferEnterprise: false,
        visibleSyncMaterialDictionary: false,
        visibleSyncUserManager: false,
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
                if (this.ruleForm.bpmaMaterialInBuyMaster.ifSubstitutePay == 1) {
                  validateLength(rule, value, callback, true, ['垫付人员', 1, 50]);
                }else{
                  validateLength(rule, value, callback, false, ['垫付人员', 1, 50]);
                }
              },
              trigger: 'change'
            }
          ]
        },
        rulesStockGoodsData:{
          buySum:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['采购数量', 0, 100000000]);
              },
              trigger: 'change'
            }
          ],
          buyUnitPrice:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['采购单价', 0, 100000000]);
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
        units: []
      };
    },
    components: {
      dialogProject,
      dialogTransitUnit,
      addItem,
      dialogMaterialDictionary,
      dialogUserManager
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
      toipClick(type) {
        if (this.isAudit) return
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      selectionChangeCheck(row) {
        this.selectedRow = row.selectedRows
      },
      handleChange1() {
        const row = this.selectedRow
        switch (this.type) {
          case 'project':
            if(!this.isSelectedRow(row)) return false;
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'proCode', row.code)
            break
          case 'userManager':
            if(!this.isSelectedRow(row)) return false;
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'payPerson', row.username)
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'payPersonId', row.id)
            break
          case 'materialDictionary':
            if (!this.isSelectedRows(row)) return false;
            this.selectedRow = undefined;
            let priceObj = {
              buySum: "0.0000",
              buyUnitPrice: "0.0000",
              buyTotalPrice: "0.00"
            }
            let newArray = [];
            row.forEach((item) => {
                let currentObj = Object.assign({}, item, priceObj);
                currentObj.materialId = currentObj.id
                currentObj.id = "";
                currentObj.masterId = "";
                currentObj.unit = item.units;
                newArray.push(currentObj);
            })
            this.dataStockGoodsData.data.unshift(...newArray);
            this.computeSummary();
            this.ruleForm.bpmaMaterialInBuyDetails = this.dataStockGoodsData.data;
            break;
        }
        this.isUpdate = false;
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      //获取详情
      getDetails() {
        getDetail(this.itemId)
          .then(res => {
            if (res.status) {
              this.proObj = {
                code: res.data.bpmaMaterialInBuyMaster.proCode,
                id: res.data.bpmaMaterialInBuyMaster.proId,
                name: res.data.bpmaMaterialInBuyMaster.proName
              };
              this.ruleForm = res.data;
              this.dataStockGoodsData = {
                data: res.data.bpmaMaterialInBuyDetails,
                total: res.data.bpmaMaterialInBuyDetails.length
              };
              this.$store.dispatch("setSelectP", res.data.bpmaMaterialInBuyDetails);
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
        this.$nextTick(() => {
          this.ruleForm = {
            bpmaMaterialInBuyMaster: {
              proCode: this.proObj ? this.proObj.code : "",
              proId: this.proObj ? this.proObj.id : "",
              proName: this.proObj ? this.proObj.name : "",
              validateStatus: 2, //审核状态
              name: "采购入库单", //单据名称
              payedPrice: "0.00", //结算金额
              deductPrice: "0.00", //抵扣金额
              useEnterpriseType: 1, //单位类型
              ifSubstitutePay: 2, //是否垫付
              useEnterpriseId: this.userLogin.orgId, //领用单位id
              useEnterpriseName: this.userLogin.orgName, //领用单位  //默认为当前登录人员机构
              receivePerson:this.userLogin.username,
              offerEnterpriseId: "", //供方单位id
              offerEnterpriseName: "", //供方单位名称
              buyTotalPrice: "0.00", //采购总价
              contractId: "", //合同id
              contractName: "", //合同名称
              ifPay: 2, //是否结算
              ifDeduct: 2, //是否抵扣
              handleDate: new Date().getTime() //业务日期
            },
            bpmaMaterialInBuyDetails: []
          };
        });
        return this.$utilsBasic.valideFocus(this, ['refProName', 'refOfferEnterpriseName']);
      },
      sumChange(data) {
        data.buyTotalPrice = this.$utilsBasic.toMoney(data.buySum * data.buyUnitPrice,2);
        this.computeSummary();
        },
      /**
       * 计算总价
       * */
      computeSummary(){
        let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['buyTotalPrice']);
          this.ruleForm.bpmaMaterialInBuyMaster.buyTotalPrice = this.$utilsBasic.toMoney(result.buyTotalPrice, 2);
      },
      clickByDialogAddData(type) {
        this.type = type;
        if (type == "goodsItem") {
          if (!this.ruleForm.bpmaMaterialInBuyMaster.proId) {
            this.$message.warning("亲，请先选择【项目名称】");

            return;
          }
          this.$refs.refMaterialContract.openDialog();
          this.getMaterialType(1, 5);
          this.$refs.refMaterialContract.title = "引入物资-选择";
          this.$refs.refMaterialContract.type = 1;
          this.$refs.refMaterialContract.treeColumns = columnsData.materialTypeColumns;
          this.$refs.refMaterialContract.columns = columnsData.materialColumns;
        } else if (type == "proName") {
          console.log("项目");
          this.visibleSyncProject = true;
        } else if (type == "offerEnterpriseName") {
          this.visibleSyncOfferEnterprise = true;
        } else if (type == "contractName") {
          if (!this.ruleForm.bpmaMaterialInBuyMaster.proId)
            return this.$message.warning("请先选择项目");
          this.$refs.refMaterialContract.openDialog();
          this.$refs.refMaterialContract.type = 2;
          this.getContract(
            2,
            1,
            10,
            this.ruleForm.bpmaMaterialInBuyMaster.proId,
            this.ruleForm.bpmaMaterialInBuyMaster.offerEnterpriseId
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
              this.$nextTick(function () {
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
        }).then(() => {
          this.deleteByIdData(this.dataStockGoodsData.data, this.selectArray,(allData,data)=>{
            this.ruleForm.bpmaMaterialInBuyDetails =allData;
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
          buySum: 0,
          buyUnitPrice: 0,
          buyTotalPrice: 0
        };

        if (arr[1] == 1) {
          var newArr = [];
          arr[0].forEach(item => {
            if (!item.masterId) {
              item.materialId = item.id
              item.id = "";
              item.masterId = "";
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
          this.ruleForm.bpmaMaterialInBuyMaster.contractId = arr[0].id;
          this.ruleForm.bpmaMaterialInBuyMaster.contractName = arr[0].name;
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
            this.ruleForm.bpmaMaterialInBuyMaster.proCode = row.code;
            this.ruleForm.bpmaMaterialInBuyMaster.proId = row.id;
            this.ruleForm.bpmaMaterialInBuyMaster.proName = row.name;
            this.proObj = {
              code: row.code,
              id: row.id,
              name: row.name
            };
            break;
          case "visibleSyncOfferEnterprise":
            this.ruleForm.bpmaMaterialInBuyMaster.offerEnterpriseId = row.id;
            this.ruleForm.bpmaMaterialInBuyMaster.offerEnterpriseName = row.name;
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'contractId', undefined)
            this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'contractName', undefined)
            break;
        }
        this[type] = false;
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
        let result = true
        //表单验证
        this.$refs.refRuleForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })
        //物资验证
        // this.dataStockGoodsData.data.some((item, idx) => {
        //   this.$refs['formBuySum' + idx].validate((valid) => {
        //     valid ? null : result = valid
        //   })
        //   this.$refs['formBuyUnitPrice' + idx].validate(valid => {
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
          return this.$utilsBasic.valideFocus(this, ['refName','refProName','refOfferEnterpriseName']);
        }
      },
      putAddAndUpdateAll(callback) {
        add(this.ruleForm)
          .then(res => {
            console.log(res);
            if (res.status == 200) {
              this.ruleForm = res.data;
              this.dataStockGoodsData.data=res.data.bpmaMaterialInBuyDetails;
              this.itemId = res.data.bpmaMaterialInBuyMaster.id;
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
      //审核
      auditClick() {
        return this.validateAfter(() => {
          if (!this.$utils.length(this.dataStockGoodsData.data)) {
            this.$message({
              message: '亲，请先引入物资',
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
                this.ruleForm.bpmaMaterialInBuyMaster.id = id;
                audit(this.ruleForm)
                  .then(res => {
                    if (res.status == 200) {
                      this.$message.success(res.message);
                      this.ruleForm = res.data;
                      this.dataStockGoodsData.data=res.data.bpmaMaterialInBuyDetails;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              })
            })
            .catch(err => {
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
          .catch(err => {
            console.log(err);
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
        this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'payPerson', undefined)
        this.$set(this.ruleForm.bpmaMaterialInBuyMaster, 'payPersonId', undefined)
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
          this.selectArray = obj;
        } else {
          this.selectArray = {};
        }
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.bpmaMaterialInBuyMaster.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      isDelete() {
        if (
          this.itemId != "" &&
          this.ruleForm.bpmaMaterialInBuyMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      isAudit2() {
        if (
          this.ruleForm.bpmaMaterialInBuyMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      ifSubstitutePay() {
        if (
          this.ruleForm.bpmaMaterialInBuyMaster.ifSubstitutePay != 2 &&
          this.ruleForm.bpmaMaterialInBuyMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      ifContract() {
        if (
          this.ruleForm.bpmaMaterialInBuyMaster.offerEnterpriseId != "" &&
          this.ruleForm.bpmaMaterialInBuyMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      isOrNots() {
        return this.dictionary.isOrNot;
      }
    }
  };
</script>
