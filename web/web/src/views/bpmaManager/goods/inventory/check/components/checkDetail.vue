<template>
  <div class="receiveDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick" plain>新增</el-button>
      <el-button
        :disabled="isAudit"
        type="primary"
        size="small"
        icon="el-icon-if-save"
        @click="saveClick('ruleForm')"
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
          :model="ruleForm.bpmaMaterialCheckMaster"
          :rules="rules"
          ref="ruleForm"
          label-width="120px"
          class="form-container" :show-message="false"
        >
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialCheckMaster.validateStatus ==1?'已审核':'未审核'"
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
                  v-model="ruleForm.bpmaMaterialCheckMaster.code"
                  disabled
                  placeholder="审核自动生成"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input
                  ref="refName"
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialCheckMaster.name"
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
                  v-model="ruleForm.bpmaMaterialCheckMaster.proName"
                  ref="refProName"
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
              <el-form-item label="盘点人员" prop="handlePerson">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialCheckMaster.handlePerson"
                  placeholder="请输入盘点人员"
                  :disabled="isAudit"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="盘点日期" prop="handleDate" class="showTime">
                <el-date-picker
                  size="small" :editable="false" :clearable="false"
                  :disabled="isAudit"
                  v-model="ruleForm.bpmaMaterialCheckMaster.handleDate"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="库存金额" prop="stockPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousandsFour"
                  :formatValue="formatToMoneyFour"
                  v-model="ruleForm.bpmaMaterialCheckMaster.stockPrice"
                  placeholder="请输入库存金额"
                  :min="0.0000"
                  disabled
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="盘点金额" prop="checkPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousandsFour"
                  :formatValue="formatToMoneyFour"
                  v-model="ruleForm.bpmaMaterialCheckMaster.checkPrice"
                  placeholder="请输入盘点金额"
                  :min="0.0000"
                  disabled
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="盈亏金额" prop="profitLossPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousandsFour"
                  :formatValue="formatToMoneyFour"
                  v-model="ruleForm.bpmaMaterialCheckMaster.profitLossPrice"
                  placeholder="请输入盈亏金额"
                  :min="0.0000"
                  disabled
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
                  v-model="ruleForm.bpmaMaterialCheckMaster.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialCheckMaster.id" :disabled="isAudit">
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
        <template slot-scope="obj" slot="checkSum">
          <basic-input
            clearable
            size="small"

            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.checkSum"
            placeholder="请输入盘点数量"
            :min="0.0000"
            :disabled="isAudit"
            :allowNegative="true"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="checkTotalPrice">
          <basic-input
            clearable
            size="small"

            :format="formatToThousands"
            :formatValue="formatToMoney"
            v-model="obj.scope.row.checkTotalPrice"
            placeholder="0.00"
            @change="sumChange(obj.scope.row)"
            :min="0.00"
            disabled
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="profitLossSum">
          <basic-input
            clearable
            size="small"

            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.profitLossSum"
            placeholder="0.0000"
            @change="sumChange(obj.scope.row)"
            :min="0.0000"
            disabled
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="profitLossTotalPrice">
          <basic-input
            clearable
            size="small"

            :format="formatToThousands"
            :formatValue="formatToMoney"
            v-model="obj.scope.row.profitLossTotalPrice"
            placeholder="0.00"
            @change="sumChange(obj.scope.row)"
            :min="0.00"
            disabled
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input
            clearable
            size="small"

            v-model="obj.scope.row.remark"
            placeholder="备注"
            :disabled="isAudit"
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
      <dialog-stock-goods ref="refStockGoods" :stockGoodsData="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialCheckMaster"
                          :isShowChecked="true" @selectionChange="selectionChangeStockGoods"></dialog-stock-goods>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickAddStockGoodsCancel">取 消</el-button>
        <el-button type="primary" @click="clickAddStockGoodsOk()">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
//四个弹窗
import dialogProject from "@/views/components/dialog/dialogProject";
import addItem from "./addItem";
import dialogStockGoods from "@/views/components/dialog/dialogStockGoods";
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
} from "@/api/bpmaManager/goods/inventory/check/index.js";
//表头信息
import { columnsData } from "../tableTitle.js";
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";
import { getMeasureUnitData } from '@/api/common/dataBasic';
import {staticDataBasic} from "@/assets/data/basic";
import {validateLength} from "@/utils/validate";
export default {
  name: "checkDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    var checkProName = (rule, value, callback) => {
      if (value === "") {
        callback();
      } else {

        callback();
      }
    };

    return {
      ruleForm: {
        bpmaMaterialCheckMaster: {
          proId: "", //项目id
          proName: "", //项目名称
          proCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "库存盘点单", //单据名称
          stockPrice: "0.00", //库存金额
          checkPrice: "0.00", //盘点金额
          profitLossPrice: "0.00", //盈亏金额
          handlePerson: this.$store.state.user.login.username,
          handleDate: new Date().getTime()
        },
        bpmaMaterialCheckDetails: []
      },
      dataStockGoodsData: {
        data: [],
        total: 0
      },
      itemId: "",
      dictionary: [],
      selectArray: {},
      borderRed: false,
      visibleSyncProject: false,
      selectedRow: {},
      dialogTableVisible: true,
      rules: {
        proName: [
          {
            validator: checkProName,
            trigger: "change"
          },
          {
            required: true,
            message: " ",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: " ",
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
      units: [],
      stockGoods: {
        visibleSync: false,
        stockGoodsSelectionChange: []
      },
    };
  },
  components: {
    dialogProject,
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
            res.data.bpmaMaterialCheckMaster.handleDate = strToTime(
              res.data.bpmaMaterialCheckMaster.handleDate
            );
            this.proObj = {
              code: res.data.bpmaMaterialCheckMaster.proCode,
              id: res.data.bpmaMaterialCheckMaster.proId,
              name: res.data.bpmaMaterialCheckMaster.proName
            };
            this.ruleForm = res.data;
            this.dataStockGoodsData = {
              data: res.data.bpmaMaterialCheckDetails,
              total: res.data.bpmaMaterialCheckDetails.length
            };
            this.$store.dispatch(
              "setSelectP",
              res.data.bpmaMaterialCheckDetails
            );
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
      this.selectArray = {};
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      // return
      this.ruleForm = {
        bpmaMaterialCheckMaster: {
          proCode: this.proObj ? this.proObj.code : "",
          proId: this.proObj ? this.proObj.id : "",
          proName: this.proObj ? this.proObj.name : "",
          validateStatus: 2, //审核状态
          name: "库存盘点单", //单据名称
          stockPrice: "0.00", //库存金额
          checkPrice: "0.00", //盘点金额
          profitLossPrice: "0.00", //盈亏金额
          handlePerson: this.$store.state.user.login.username,
          handleDate: new Date().getTime() //业务日期
        },
        bpmaMaterialCheckDetails: []
      };
    },
    sumChange(data) {
      data.checkTotalPrice = this.$utilsBasic.toMoney(data.checkSum * data.stockUnitPrice, 2);
      data.profitLossSum = this.$utilsBasic.toMoney(data.checkSum - data.stockSum, 4);
      data.profitLossTotalPrice = this.$utilsBasic.toMoney(data.profitLossSum * data.stockUnitPrice, 2);
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary(){
      let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['profitLossTotalPrice','checkTotalPrice','stockTotalPrice']);
        this.ruleForm.bpmaMaterialCheckMaster.profitLossPrice = this.$utilsBasic.toMoney(result.profitLossTotalPrice, 2);
        this.ruleForm.bpmaMaterialCheckMaster.checkPrice = this.$utilsBasic.toMoney(result.checkTotalPrice, 2);
        this.ruleForm.bpmaMaterialCheckMaster.stockPrice = this.$utilsBasic.toMoney(result.stockTotalPrice, 2);
    },
    clickByDialogAddData(type) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialCheckMaster.proId) {
          this.$message.warning("亲，请先选择【项目名称】");

          return;
        }
        this.stockGoods.visibleSync = true;
        // this.$refs.refMaterialContract.openDialog();
        // this.getPurchaseList(1, 10);
        // this.$refs.refMaterialContract.title = "引入库存物资-选择";
        // this.$refs.refMaterialContract.type = 3;
        // this.$refs.refMaterialContract.selection = "selection";
        //
        // this.$refs.refMaterialContract.columns = columnsData.itemColumns;
      } else if (type == "proName") {
        console.log("项目");
        this.visibleSyncProject = true;
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
      this.$confirm(
        "亲，您是否确定删除当前数据，删除后数据不能恢复！",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.deleteByIdData(this.dataStockGoodsData.data, this.selectArray,(allData,data)=>{
            this.ruleForm.bpmaMaterialCheckDetails = allData;
            this.dataStockGoodsData.data = data;
            this.computeSummary();
          });
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
      console.log(arr, 'liuke');
      let priceObj = {
        checkSum: 0,
        checkTotalPrice: 0,
        profitLossSum: 0,
        profitLossTotalPrice: 0
      };
      if (arr[1] == 3) {
        var newArr = [];
        arr[0].forEach(item => {
          if (!item.masterId) {
            item.id = "";
            item.masterId = "";
            item.stockSum = item.inSum;
            item.stockUnitPrice = item.inUnitPrice;
            item.stockTotalPrice = item.inTotalPrice;
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
        this.ruleForm.bpmaMaterialCheckMaster.contractId = arr[0].id;
        this.ruleForm.bpmaMaterialCheckMaster.contractName = arr[0].name;
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
    //获取采购入库单
    getPurchaseList(page, limit) {
      var params = {
        page: page,
        limit: limit,
        proId: this.ruleForm.bpmaMaterialCheckMaster.proId
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
          this.ruleForm.bpmaMaterialCheckMaster.proCode = row.code;
          this.ruleForm.bpmaMaterialCheckMaster.proId = row.id;
          this.ruleForm.bpmaMaterialCheckMaster.proName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
      }
      this[type] = false;
    },
    putAddAndUpdateAll(callback) {
      add(this.ruleForm)
        .then(res => {
          if (res.status == 200) {
            this.ruleForm = res.data;
            this.dataStockGoodsData.data=res.data.bpmaMaterialCheckDetails;
            this.itemId = res.data.bpmaMaterialCheckMaster.id;
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
          return this.$utilsBasic.valideFocus(this, ['refName','refProName']);
        }
      })
    },
    //审核
    auditClick() {
      return this.validateAfter(() => {
        if (!this.$utils.length(this.dataStockGoodsData.data)) {
          this.$message({message: '亲，请先【引入库存物资】', type: 'warning'})
          return false
        }
      this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.putAddAndUpdateAll((id) => {
            this.ruleForm.bpmaMaterialCheckMaster.id = id;
            audit(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.ruleForm = res.data;
                  this.dataStockGoodsData.data=res.data.bpmaMaterialCheckDetails;
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
      if (obj && typeof obj == "object") {
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
      this.stockGoods.stockGoodsSelectionChange = data.selectedRows;
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
          item.masterId = "";
          item.inCode = item.inMasterCode
          item.inId = item.inMasterId
          item.checkSum = "0.0000";
          item.checkTotalPrice = "0.00";
          item.profitLossSum = "0.0000";
          item.profitLossTotalPrice = "0.00";
          item.remark="";
        }
        item = Object.assign({}, item);
        newArray.push(item);
      });
      this.dataStockGoodsData.data.unshift(...newArray);
      this.computeSummary();
      this.ruleForm.bpmaMaterialCheckDetails = this.dataStockGoodsData.data;

    }
  },
  computed: {
    isAudit() {
      if (this.ruleForm.bpmaMaterialCheckMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    isDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialCheckMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAudit2() {
      if (
        this.ruleForm.bpmaMaterialCheckMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialCheckMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialCheckMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialCheckMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialCheckMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isOrNots() {
      return this.dictionary.isOrNot;
    }
  },
};
</script>

<style>
.borderRed {
  border: 1px solid red;
}

.form-container >>> .el-input-group__append {
  border: 1px solid #909399;
}
</style>
