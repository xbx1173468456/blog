<template>
  <div class="receiveDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick" plain>新增</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-if-save"
        @click="saveClick('ruleForm')"
        plain
        :disabled="isAudit"
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
          :model="ruleForm.bpmaMaterialInAllocateMaster"
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
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.validateStatus ==1?'已审核':'未审核'"
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
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.code"
                  disabled
                  placeholder="系统自动生成单据编码"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.name"
                  :disabled="isAudit"
                  ref="refName"
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
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.proName"
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
              <el-form-item label="调拨总价" prop="totalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.totalPrice"
                  placeholder="系统自动生成调拨总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="收货日期" prop="handleDate" class="showTime">
                <el-date-picker
                  size="small"  :editable="false" :clearable="false"
                  :disabled="isAudit"
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.handleDate"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="请选择日期"
                ></el-date-picker>
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
                  v-model="ruleForm.bpmaMaterialInAllocateMaster.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialInAllocateMaster.id" :disabled="isAudit">
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
        >引入调拨出库单</el-button>
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
        <template slot-scope="obj" slot="receivedSum">
          {{formatToThousandsFour(obj.scope.row.receivedSum)}}
        </template>
        <template slot-scope="obj" slot="unreceivedSum">
          {{formatToThousandsFour(obj.scope.row.unreceivedSum)}}
        </template>
        <template slot-scope="obj" slot="receiveSum">
          <basic-input
            clearable
            size="small"
            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.receiveSum"
            placeholder="请输入实收数量"
            :disabled="isAudit"
            :min="0.0000"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="unitPrice">
          {{formatToThousandsFour(obj.scope.row.unitPrice)}}
        </template>
        <template slot-scope="obj" slot="totalPrice">
          <basic-input
            clearable
            size="small"
            :format="formatToThousands"
            :formatValue="formatToMoney"
            v-model="obj.scope.row.totalPrice"
            placeholder="0.00"
            @change="sumChange(obj.scope.row)"
            :min="0.0000"
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
    <basic-dialog v-el-drag-dialog title="引入调拨出库单-选择" :visible.sync="allotOut.visibleSync" @open="openAllotOut">
      <dialog-allot-out ref="refAllotOut" :data="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialInAllocateMaster"
                                :isShowChecked="true" @selectionChange="selectionChangeAllotOut" type="allotIn"></dialog-allot-out>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickAddAllotOutCancel">取 消</el-button>
        <el-button type="primary" @click="clickAddAllotOutOk()">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
//四个弹窗
import dialogProject from "@/views/components/dialog/dialogProject";
import addItem from "./addItem";
import dialogAllotOut from "@/views/components/dialog/dialogAllotOut";
//获取合同
import { getPayContractInfoMaster } from "@/api/bpmaManager/goods/goodsContract/register";
//获取物资类型
import { getEnumData, strToTime } from "@/utils";
import {
  add,
  getDetail,
  audit,
  del,
  delDetail,
  getMaterial,
  getDiction,
  getPurchaseList
} from "@/api/bpmaManager/goods/transfers/putStorage/index.js";
import {
    getDictionaryDataByTypeFilter
} from "@/api/common/dataDictionary.js";
//表头信息
import { columnsData } from "../tableTitle.js";
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
import formatBasic from "@/utils/mixins/formatBasic";
import {staticDataBasic} from "@/assets/data/basic";
import {validateLength} from "@/utils/validate";
export default {
  name: "putStorageDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      ruleForm: {
        bpmaMaterialInAllocateMaster: {
          proId: "", //项目id
          proName: "", //项目名称
          outProCode: "", //项目编码
          inProId: "", //项目id
          inProName: "", //项目名称
          inProCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "调拨入库单", //单据名称
          totalPrice: "0.00", //库存总价
          handleDate:new Date().getTime(),//日期
          outTotalPrice:'0.00',//总价
        },
        bpmaMaterialInAllocateDetails: []
      },
      dataStockGoodsData: {
        data: [],
        total: 0
      },
      itemId: "",
      dictionary: [],
      inkTypes:[],
      selectArray: [],
      borderRed: false,
      visibleSyncProject: false,
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
      modelSearchFilter: {
        page: 1,
        limit: 10,
        fuzzy: "",
        fuzzyKeys: ""
      },
      columnsData,
      activeNames: ["1"],
      allotOut: {
        visibleSync: false,
        selectionChange: []
      },
    };
  },
  components: {
    dialogProject,
    dialogAllotOut,
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
  created(){
    //初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetIsOrNotData',
    ]);
    this.getDiction();
    this.$store.dispatch("cacheId",'0');//刷新
  },
  methods: {
    //获取详情
    getDetails() {
      getDetail(this.itemId)
        .then(res => {
          if (res.status == 200) {
            this.proObj = {
              code: res.data.bpmaMaterialInAllocateMaster.outProCode,
              id: res.data.bpmaMaterialInAllocateMaster.proId,
              name: res.data.bpmaMaterialInAllocateMaster.proName
            };
            this.ruleForm = res.data;
            this.dataStockGoodsData = {
              data: res.data.bpmaMaterialInAllocateDetails,
              total: res.data.bpmaMaterialInAllocateDetails.length
            };
            this.$store.dispatch("setSelectP", res.data.bpmaMaterialInAllocateDetails);
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
      this.$store.dispatch("setSelectP",[]);
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      this.$nextTick(() => {
      this.ruleForm = {
        bpmaMaterialInAllocateMaster: {
          outProCode: this.proObj ? this.proObj.code : "",
          proId: this.proObj ? this.proObj.id : "",
          proName: this.proObj ? this.proObj.name : "",
          inProId: "", //项目id
          inProName: "", //项目名称
          inProCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "调拨入库单", //单据名称
          totalPrice: "0.00", //总价
          handleDate:new Date().getTime(),//日期
        },
        bpmaMaterialInAllocateDetails: []
      };
      });
    },
    sumChange(data) {
      data.totalPrice = this.$utilsBasic.toMoney(data.receiveSum * data.unitPrice,2);
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary(){
      let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['totalPrice']);
        this.ruleForm.bpmaMaterialInAllocateMaster.totalPrice = this.$utilsBasic.toMoney(result.totalPrice, 2);
    },
    clickByDialogAddData(type,n) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialInAllocateMaster.proId) {
          this.$message.warning("请先选择调出项目后，再添加");

          return;
        }
        // this.$refs.refMaterialContract.openDialog();
        // this.getPurchaseList(1, 10);
        // this.$refs.refMaterialContract.title = "引入调拨出库单";
        // this.$refs.refMaterialContract.type = 3;
        // this.$refs.refMaterialContract.selection = 'selection';
        //
        // this.$refs.refMaterialContract.columns = columnsData.itemColumns;
        this.allotOut.visibleSync=true;
      } else if (type == "proName") {
        this.visibleSyncProject = true;
        console.log("项目");
      }
    },
    //获取数据字典
    getDiction(){
        //入库方式
            getDictionaryDataByTypeFilter("BPMA_PUT_TYPE")
                .then(res => {
                    if (res.status == 200) {
                        this.inkTypes = res.data;
                    }
                })
                .catch(err => {
                    this.$message.warning(err.message);
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
            this.ruleForm.bpmaMaterialInAllocateDetails = allData;
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
    //获取库存物资
    getPurchaseList(page, limit) {
      var params = {
        page:page,
        limit:limit,
        proId:this.ruleForm.bpmaMaterialInAllocateMaster.proId
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
    //选择后的物资
    getPublicMate(arr) {
      let priceObj = {
        // outSum: 0,
        // outUnitPrice: 0,
        // outTotalPrice: 0
      };
      if (arr[1] == 3) {
        var newArr = [];
        arr[0].forEach(item => {
          item.id = "";
          item.masterId = "";
          item.allocateOutCode = item.masterCode;
          item.allocateOutDetailId = item.detailId;
          item.allocateOutId = item.masterId;
          item.allocateSum = this.formatToMoneyFour(item.outSum)
          item.receivedSum = this.formatToMoneyFour(item.receivedSum)
          item.unreceivedSum = this.formatToMoneyFour(item.unreceivedSum)
          item.receiveSum = '0.0000'
          item.unitPrice = this.formatToMoneyFour(item.outUnitPrice)
          item.totalPrice = this.formatToMoney(item.outTotalPrice)
          item.remark = "";
          item = Object.assign(item, priceObj);
          item = Object.assign({}, item);
          newArr.push(item);
        });
        this.dataStockGoodsData = {
          data: newArr,
          total: newArr.length
        };
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
          if (!this.$utils.isEqual(this.ruleForm.bpmaMaterialInAllocateMaster.proCode, row.code)) {
            this.dataStockGoodsData.data = [];
          }
          this.ruleForm.bpmaMaterialInAllocateMaster.outProCode = row.code;
          this.ruleForm.bpmaMaterialInAllocateMaster.proId = row.id;
          this.ruleForm.bpmaMaterialInAllocateMaster.proName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
      case "visibleSyncProject2":
          this.ruleForm.bpmaMaterialInAllocateMaster.inProCode = row.code;
          this.ruleForm.bpmaMaterialInAllocateMaster.inProId = row.id;
          this.ruleForm.bpmaMaterialInAllocateMaster.inProName = row.name;
          break;
      }
      this[type] = false;
    },
    putAddAndUpdateAll(callback) {
      add(this.ruleForm)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            this.ruleForm = res.data;
            this.dataStockGoodsData.data=res.data.bpmaMaterialInAllocateDetails;
            this.itemId = res.data.bpmaMaterialInAllocateMaster.id;
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
          return this.$utilsBasic.valideFocus(this, ['refName','refProName']);
        }
      })
    },
    //审核
    auditClick() {
      return this.validateAfter(() => {
          if (!this.$utils.length(this.dataStockGoodsData.data)) {
            this.$message({
              message: '亲，请先【引入调拨出库单】',
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
            this.ruleForm.bpmaMaterialInAllocateMaster.id = id;
            audit(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.ruleForm = res.data;
                  this.dataStockGoodsData.data=res.data.bpmaMaterialInAllocateDetails;
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
      this.ruleForm.bpmaMaterialInAllocateMaster.useEnterpriseId = "";
      this.ruleForm.bpmaMaterialInAllocateMaster.useEnterpriseName = "";
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
      if (obj) {
        this.selectArray = obj;
      } else {
        this.selectArray = [];
      }
    },
    openAllotOut(){
      this.$refs.refAllotOut ? this.$refs.refAllotOut.getAllotOutData() : null;
    },
    selectionChangeAllotOut(data) {
      this.allotOut.selectionChange = data.selectedRows;
    },
    clickAddAllotOutCancel() {
      this.allotOut.visibleSync = false;
    },
    clickAddAllotOutOk() {
      let resultObj = this.allotOut.selectionChange;
      if(!this.isSelectedRows(resultObj)) return false;
      this.allotOut.visibleSync = false;
      let newArray = [];
      resultObj.forEach(item => {
        item.id = "";
        item.allocateOutId = item.masterId
        item.allocateOutCode = item.masterCode
        item.allocateOutDetailId = item.detailId
        item.allocateSum = item.outSum
        item.receivedSum = item.receivedSum
        item.unreceivedSum = item.unreceivedSum
        item.receiveSum = ''
        item.unitPrice = item.outUnitPrice
        item.totalPrice = item.outTotalPrice
        item.remark = "";
        item = Object.assign({}, item);
        newArray.push(item);
      });
      this.dataStockGoodsData.data.unshift(...newArray);
      this.computeSummary();
      this.ruleForm.bpmaMaterialInAllocateDetails = this.dataStockGoodsData.data;
    },
  },
  computed: {
    isAudit() {
      if (this.ruleForm.bpmaMaterialInAllocateMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    isDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialInAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAudit2() {
      if (
        this.ruleForm.bpmaMaterialInAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialInAllocateMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialInAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialInAllocateMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialInAllocateMaster.validateStatus != 1
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
