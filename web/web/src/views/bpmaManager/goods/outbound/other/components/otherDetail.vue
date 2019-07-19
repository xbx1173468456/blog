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
          :model="ruleForm.bpmaMaterialOutOtherMaster"
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
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.validateStatus ==1?'已审核':'未审核'"
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
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.code"
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
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.name"
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
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.proName"


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
                <el-form-item label="出库类型" prop="outType">
                  <el-select size="small" v-model="ruleForm.bpmaMaterialOutOtherMaster.outType" placeholder="请选择出库类型" :disabled="isAudit">
                    <el-option
                      v-for="item in dataEnum.outType"
                      :key="parseInt(item.code)"
                      :label="item.name"
                      :value="parseInt(item.code)"/>
                  </el-select>
                </el-form-item>
              </el-col>
            <el-col :span="8">
              <el-form-item label="出库总价" prop="totalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.totalPrice"
                  placeholder="自动生成出库总价"
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
                  v-model="ruleForm.bpmaMaterialOutOtherMaster.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialOutOtherMaster.id" :disabled="isAudit">
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
          :disabled="isAudit"
          @click="clickByDialogAddData('goodsItem')"
          plain
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
        <template slot-scope="obj" slot="outSum">
          <basic-input
            clearable
            size="small"

            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.outSum"
            placeholder="请输入出库数量"
            :disabled="isAudit"
            :min="0.0000"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="outUnitPrice">
          <basic-input
            clearable
            size="small"

            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.outUnitPrice"
            placeholder="请输入出库单价"
            :disabled="isAudit"
            :min="0.00"
            @change="sumChange(obj.scope.row)"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="outTotalPrice">
          {{formatToThousands(obj.scope.row.outTotalPrice)}}
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
      @getItem="getPublicMate"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem>
    <basic-dialog v-el-drag-dialog title="引入库存物资-选择" :visible.sync="stockGoods.visibleSync" @open="openStockGoods">
      <dialog-stock-goods ref="refStockGoods" :stockGoodsData="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialOutOtherMaster"
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
  getPurchaseList,
  delDetail
} from "@/api/bpmaManager/goods/outbound/other/index.js";
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
  name: "otherDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    var checkProName = (rule, value, callback) => {
      if (value === "") {
        callback();
        this.borderRed=true
      } else {


        callback();
      }
    };

    return {
      ruleForm: {
        bpmaMaterialOutOtherMaster: {
          proId: "", //项目id
          proName: "", //项目名称
          proCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "其他出库单", //单据名称
          totalPrice: "0.00", //出库总价
          outType: 2,
        },
        bpmaMaterialOutOtherDetails: []
      },
      dataStockGoodsData: {
        data: [],
        total: 0
      },
      itemId: "",
      inkTypes:[],//出库类型
      selectArray: {},
      borderRed: false,
      borderRed2: false,
      borderRed3: false,
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
        ],
        outType: [
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
      stockGoods: {
        visibleSync: false,
        stockGoodsSelectionChange: []
      },
    };
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
      'GetOutTypeData',
      'GetInTypeData',
    ]);
    this.$store.dispatch("cacheId",'0');//刷新
  },
  components: {
    dialogProject,
    dialogStockGoods,
    addItem
  },
  methods: {
    //获取详情
    getDetails() {
      getDetail(this.itemId)
        .then(res => {
          if (res.status) {
            this.proObj = {
              code: res.data.bpmaMaterialOutOtherMaster.proCode,
              id: res.data.bpmaMaterialOutOtherMaster.proId,
              name: res.data.bpmaMaterialOutOtherMaster.proName
            };
            this.ruleForm = res.data;
            this.dataStockGoodsData = {
              data: res.data.bpmaMaterialOutOtherDetails,
              total: res.data.bpmaMaterialOutOtherDetails.length
            };
            this.$store.dispatch("setSelectP", res.data.bpmaMaterialOutOtherDetails);
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
      this.selectArray={}
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      this.$nextTick(() => {
        this.ruleForm = {
          bpmaMaterialOutOtherMaster: {
            proCode: this.proObj ? this.proObj.code : "",
            proId: this.proObj ? this.proObj.id : "",
            proName: this.proObj ? this.proObj.name : "",
            validateStatus: 2, //审核状态
            outType: 2,
            name: "其他出库单", //单据名称
            totalPrice: "0.00", //出库总价
          },
          bpmaMaterialOutOtherDetails: []
        };
      })
    },
    sumChange(data) {
      data.outTotalPrice = this.$utilsBasic.toMoney(data.outSum * data.outUnitPrice,2);
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary(){
      let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['outTotalPrice']);
        this.ruleForm.bpmaMaterialOutOtherMaster.totalPrice = this.$utilsBasic.toMoney(result.outTotalPrice, 2);
    },
    clickByDialogAddData(type) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialOutOtherMaster.proId) {
          this.$message.warning("亲，请先选择【项目名称】");

          return;
        }
        this.stockGoods.visibleSync = true;
        // this.$refs.refMaterialContract.openDialog();
        // this.getPurchaseList(1, 10);
        // this.$refs.refMaterialContract.title = "引入库存物资-选择";
        // this.$refs.refMaterialContract.type = 3;
        // this.$refs.refMaterialContract.selection = 'selection';
        //
        // this.$refs.refMaterialContract.columns = columnsData.itemColumns;
      } else if (type == "proName") {
        console.log("项目");
        this.visibleSyncProject = true;
      }else if (type == "contractName") {
        if (!this.ruleForm.bpmaMaterialOutOtherMaster.proId)
          return this.$message.warning("请先选择项目");
        this.$refs.refMaterialContract.openDialog();
        this.$refs.refMaterialContract.type = 2;
        this.getContract(
          2,
          1,
          10,
          this.ruleForm.bpmaMaterialOutOtherMaster.proId,
          this.ruleForm.bpmaMaterialOutOtherMaster.offerEnterpriseId
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
          this.ruleForm.bpmaMaterialOutOtherDetails = allData;
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
      console.log(arr);
      let priceObj = {
        outSum: 0,
        outUnitPrice: 0,
        outTotalPrice: 0
      };
      if (arr[1] == 3) {
        var newArr = [];
        arr[0].forEach(item => {
          if(!item.masterId){

            item.id = "";
            item.masterId = "";
            item.stockSum=item.inSum
            item.stockUnitPrice=item.inUnitPrice
            item.stockTotalPrice=item.inTotalPrice
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
        this.ruleForm.bpmaMaterialOutOtherMaster.contractId = arr[0].id;
        this.ruleForm.bpmaMaterialOutOtherMaster.contractName = arr[0].name;
      }
    },
    //获取采购入库单
    getPurchaseList(page, limit) {
      var params = {
        page:page,
        limit:limit,
        proId:this.ruleForm.bpmaMaterialOutOtherMaster.proId
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
          if (!this.$utils.isEqual(this.ruleForm.bpmaMaterialOutOtherMaster.proCode, row.code)) {
            this.dataStockGoodsData.data = [];
          }
          this.ruleForm.bpmaMaterialOutOtherMaster.proCode = row.code;
          this.ruleForm.bpmaMaterialOutOtherMaster.proId = row.id;
          this.ruleForm.bpmaMaterialOutOtherMaster.proName = row.name;
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
            this.dataStockGoodsData.data=res.data.bpmaMaterialOutOtherDetails;
            this.itemId = res.data.bpmaMaterialOutOtherMaster.id;
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
            this.ruleForm.bpmaMaterialOutOtherMaster.id = id;
            audit(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.ruleForm = res.data;
                  this.dataStockGoodsData.data=res.data.bpmaMaterialOutOtherDetails;
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
        if (!item.masterId) {
          item.id = "";
          item.masterId = "";
          item.inCode = item.inMasterCode
          item.inId = item.inMasterId;
          item.outSum = "0.0000",
          item.outUnitPrice = "0.0000",
          item.outTotalPrice = "0.00",
          item.remark = "";
        }
        item = Object.assign({}, item);
        newArray.push(item);
      });
      this.dataStockGoodsData.data.unshift(...newArray);
      this.computeSummary();
      this.ruleForm.bpmaMaterialOutOtherDetails = this.dataStockGoodsData.data;
    }
  },
  computed: {
    isAudit() {
      if (this.ruleForm.bpmaMaterialOutOtherMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    isDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialOutOtherMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAudit2() {
      if (
        this.ruleForm.bpmaMaterialOutOtherMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialOutOtherMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialOutOtherMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialOutOtherMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialOutOtherMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
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
