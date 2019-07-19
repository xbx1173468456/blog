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
      <el-collapse-item title="调拨出库" name="1">
        <el-form
          :model="ruleForm.bpmaMaterialOutAllocateMaster"
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
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.validateStatus ==1?'已审核':'未审核'"
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
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.code"
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
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.name"
                  :disabled="isAudit"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="调出项目" prop="outProName">
                <el-input
                  placeholder="请选择项目名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.outProName"
                  ref="refOutProName"

                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('proName',1)"
                    :disabled="isAudit"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调入项目" prop="inProName">
                <el-input
                  placeholder="请选择项目名称"
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.inProName"
                  ref="refInProName"

                  readonly
                >
                  <el-button
                    slot="append"
                    icon="el-icon-plus"
                    @click="clickByDialogAddData('proName',2)"
                    :disabled="isAudit"
                  ></el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="库存总价" prop="stockTotalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.stockTotalPrice"
                  placeholder="自动生成库存总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">

            <el-col :span="8">
              <el-form-item label="调拨日期" prop="handleDate" class="showTime">
                <el-date-picker
                  size="small"  :editable="false" :clearable="false"
                  :disabled="isAudit"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.handleDate"
                  type="date"
                  format="yyyy-MM-dd"
                  placeholder="请选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经办人员" prop="handlePerson">
                <el-input
                  clearable
                  size="small"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.handlePerson"
                  placeholder="请输入经办人员"
                  :disabled="isAudit"
                  maxlength="100"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="调拨总价" prop="totalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.totalPrice"
                  placeholder="自动生成调拨总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialOutAllocateMaster.id" :disabled="isAudit">
                </basic-upload>
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
                  v-model="ruleForm.bpmaMaterialOutAllocateMaster.remark"
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
      </el-collapse-item>
      <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject2" title="项目名称-选择">
          <dialog-project @selectionChange="getItem" filterValid v-if="visibleSyncProject2"></dialog-project>
          <div class="dialog-footer" slot="footer">
            <el-button @click="visibleSyncProject2 = false">取 消</el-button>
            <el-button @click="handleChange('visibleSyncProject2')" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
    </el-collapse>
    <el-row class="content-container">
      <basic-handler>
        <el-button
          type="primary"
          size="small"
          icon="el-icon-plus"
          @click="clickByDialogAddData('goodsItem')"
          :disabled="isAudit"
          plain
        >引入库存物资</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
                   :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除
        </el-button>
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
            placeholder="请输入调拨数量"
            :min="0.0000"
            @change="sumChange(obj.scope.row)"
            :disabled="isAudit"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="outUnitPrice">
          <basic-input
            clearable
            size="small"

            :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.outUnitPrice"
            placeholder="请输入调拨单价"
            :min="0.0000"
            @change="sumChange(obj.scope.row)"
            :disabled="isAudit"
          ></basic-input>
        </template>
        <template slot-scope="obj" slot="outTotalPrice">
          {{formatToThousands(obj.scope.row.outTotalPrice)}}
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
      @getItem="getPublicMate"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem>
    <basic-dialog v-el-drag-dialog title="引入库存物资-选择" :visible.sync="stockGoods.visibleSync" @open="openStockGoods">
      <dialog-stock-goods ref="refStockGoods" :stockGoodsData="dataStockGoodsData.data" :params="ruleForm.bpmaMaterialOutAllocateMaster"
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
  delDetail,
  getMaterial,
  getDiction,
  getPurchaseList
} from "@/api/bpmaManager/goods/transfers/outBound/index.js";
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
  name: "outboundDetail",
  mixins: [computed, methods, formatEnum, formatBasic],
  data() {
    return {
      ruleForm: {
        bpmaMaterialOutAllocateMaster: {
          outProId: "", //项目id
          outProName: "", //项目名称
          outProCode: "", //项目编码
          inProId: "", //项目id
          inProName: "", //项目名称
          inProCode: "", //项目编码
          validateStatus: 2, //审核状态
          name: "调拨出库单", //单据名称
          stockTotalPrice: "0.00", //库存总价
          handleDate:new Date().getTime(),//日期
          totalPrice:'0.00'//总价
        },
        bpmaMaterialOutAllocateDetails: []
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
      borderRed2: false,
      borderRed3: false,
      visibleSyncProject: false,
      visibleSyncProject2: false,
      visibleSyncOfferEnterprise: false,
      selectedRow: {},
      dialogTableVisible: true,

      rules: {
        outProName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['调出项目', 1, 50]);
            },
            trigger: 'change'
          }
        ],
        inProName: [
          {
            required: true,
            validator: (rule, value, callback) => {
              validateLength(rule, value, callback, true, ['调入项目', 1, 50]);
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
          if (res.status) {
            this.proObj = {
              code: res.data.bpmaMaterialOutAllocateMaster.outProCode,
              id: res.data.bpmaMaterialOutAllocateMaster.outProId,
              name: res.data.bpmaMaterialOutAllocateMaster.outProName
            };
            this.ruleForm = res.data;
            this.dataStockGoodsData = {
              data: res.data.bpmaMaterialOutAllocateDetails,
              total: res.data.bpmaMaterialOutAllocateDetails.length
            };
            this.$store.dispatch("setSelectP", res.data.bpmaMaterialOutAllocateDetails);
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
      this.dataStockGoodsData = {
        data: [],
        total: 0
      };
      this.$nextTick(() => {
        this.ruleForm = {
          bpmaMaterialOutAllocateMaster: {
            outProCode: this.proObj ? this.proObj.code : "",
            outProId: this.proObj ? this.proObj.id : "",
            outProName: this.proObj ? this.proObj.name : "",
            inProId: "", //项目id
            inProName: "", //项目名称
            inProCode: "", //项目编码
            validateStatus: 2, //审核状态
            name: "调拨出库单", //单据名称
            stockTotalPrice: "0.00", //总价
            handleDate:new Date().getTime(),//日期
            totalPrice:'0.00',//调拨总价
            handlePerson:this.userLogin.username
          },
          bpmaMaterialOutAllocateDetails: []
        };
      });
      return this.$utilsBasic.valideFocus(this, ['refName','refOutProName','refInProName']);
    },
    sumChange(data) {
      data.outTotalPrice = this.$utilsBasic.toMoney(data.outSum * data.outUnitPrice,2);
      this.computeSummary();
    },
    /**
     * 计算总价
     * */
    computeSummary(){
      let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['outTotalPrice','stockTotalPrice']);
        this.ruleForm.bpmaMaterialOutAllocateMaster.totalPrice = this.$utilsBasic.toMoney(result.outTotalPrice, 2);
        this.ruleForm.bpmaMaterialOutAllocateMaster.stockTotalPrice = this.$utilsBasic.toMoney(result.stockTotalPrice, 2);
    },
    clickByDialogAddData(type,n) {
      this.type = type;
      if (type == "goodsItem") {
        if (!this.ruleForm.bpmaMaterialOutAllocateMaster.outProId) {
          this.$message.warning("请先选择调出项目后，再添加");
          return;
        }
        if (!this.ruleForm.bpmaMaterialOutAllocateMaster.inProId) {
          this.$message.warning("请先选择调入项目后，再添加");
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
      } else if (type == "proName",n) {
        if(n==1){
          this.visibleSyncProject = true;
        }else{
          this.visibleSyncProject2 = true;
        }
        console.log("项目");
      }
    },
    //获取物资类别
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
            this.ruleForm.bpmaMaterialOutAllocateDetails = allData;
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
        proId:this.ruleForm.bpmaMaterialOutAllocateMaster.outProId
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
      console.log(arr,'arr');
      let priceObj = {
        outSum: 0,
        outUnitPrice: 0,
        outTotalPrice: 0
      };
      if (arr[1] == 3) {
        var newArr = [];
        arr[0].forEach(item => {
          if(!item.masterId){
            item.stockSum=item.stockSum
            item.stockUnitPrice=item.stockPrice

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
        console.log(this.dataStockGoodsData,'this.dataStockGoodsData');
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
          if (!this.$utils.isEqual(this.ruleForm.bpmaMaterialOutAllocateMaster.proCode, row.code)) {
            this.dataStockGoodsData.data = [];
          }
          this.ruleForm.bpmaMaterialOutAllocateMaster.outProCode = row.code;
          this.ruleForm.bpmaMaterialOutAllocateMaster.outProId = row.id;
          this.ruleForm.bpmaMaterialOutAllocateMaster.outProName = row.name;
          this.proObj = {
            code: row.code,
            id: row.id,
            name: row.name
          };
          break;
      case "visibleSyncProject2":
          if(row.code==this.ruleForm.bpmaMaterialOutAllocateMaster.outProCode){
            this.$message.warning('调入项目不能等于调出项目')
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProCode = '';
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProId = '';
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProName = '';
          }else{
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProCode = row.code;
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProId = row.id;
            this.ruleForm.bpmaMaterialOutAllocateMaster.inProName = row.name;
          }

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
            this.dataStockGoodsData.data=res.data.bpmaMaterialOutAllocateDetails;
            this.itemId = res.data.bpmaMaterialOutAllocateMaster.id;
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
          return this.$utilsBasic.valideFocus(this, ['refName','refOutProName','refInProName']);
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
            this.ruleForm.bpmaMaterialOutAllocateMaster.id = id;
            audit(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.ruleForm = res.data;
                  this.dataStockGoodsData.data=res.data.bpmaMaterialOutAllocateDetails;
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
    getContract(type, page, limit, outProId, id) {
      let params = {
        page: page,
        limit: limit,
        outProId: outProId,
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
      this.ruleForm.bpmaMaterialOutAllocateMaster.useEnterpriseId = "";
      this.ruleForm.bpmaMaterialOutAllocateMaster.useEnterpriseName = "";
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
          item.outSum = "0.0000";
          item.outUnitPrice = item.stockUnitPrice;
          item.outTotalPrice = "0.00";
          item.remark="";
        }
        item = Object.assign({}, item);
        newArray.push(item);
      });
      this.dataStockGoodsData.data.unshift(...newArray);
      this.computeSummary();
      this.ruleForm.bpmaMaterialOutAllocateDetails = this.dataStockGoodsData.data;
    }
  },
  computed: {
    isAudit() {
      if (this.ruleForm.bpmaMaterialOutAllocateMaster.validateStatus == 1) {
        return true;
      } else {
        return false;
      }
    },
    isDelete() {
      if (
        this.itemId != "" &&
        this.ruleForm.bpmaMaterialOutAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    isAudit2() {
      if (
        this.ruleForm.bpmaMaterialOutAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifSubstitutePay() {
      if (
        this.ruleForm.bpmaMaterialOutAllocateMaster.ifSubstitutePay != 2 &&
        this.ruleForm.bpmaMaterialOutAllocateMaster.validateStatus != 1
      ) {
        return false;
      } else {
        return true;
      }
    },
    ifContract() {
      if (
        this.ruleForm.bpmaMaterialOutAllocateMaster.offerEnterpriseId != "" &&
        this.ruleForm.bpmaMaterialOutAllocateMaster.validateStatus != 1
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
