<template>
  <div class="receiveDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="saveClick()"
        plain>保存</el-button>
      <el-button :disabled="isDelete" type="danger" size="small" icon="el-icon-delete" @click="delClick" plain>删除
      </el-button>
      <el-button :disabled="isAudit2" type="primary" size="small" icon="el-icon-if-auth" @click="auditClick" plain>审核
      </el-button>

    </basic-handler>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form :model="ruleForm.bpmaMaterialInOtherMaster" :rules="rules" ref="refRuleForm" label-width="120px"
          class="form-container" :show-message="false">
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="审核状态" prop="validateStatus">
                <el-input clearable size="small"
                  v-model="ruleForm.bpmaMaterialInOtherMaster.validateStatus ==1?'已审核':'未审核'" disabled maxlength="100">
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码" prop="code">
                <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInOtherMaster.code" disabled
                  placeholder="审核自动生成" maxlength="100"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据名称" prop="name">
                <el-input ref="refName" clearable size="small" v-model="ruleForm.bpmaMaterialInOtherMaster.name" :disabled="isAudit"
                  maxlength="100"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName">
                <el-input ref="refProName" placeholder="请选择项目名称" size="small" v-model="ruleForm.bpmaMaterialInOtherMaster.proName"
                   readonly>
                  <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('proName')" :disabled="isAudit">
                  </el-button>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库类型" prop="inType">
                <el-select size="small" v-model="ruleForm.bpmaMaterialInOtherMaster.inType" placeholder="请选择入库类型"
                  :disabled="isAudit">
                  <el-option
                    v-for="item in dataEnum.inType"
                    :key="item.code"
                    :label="item.name"
                    :value="parseInt(item.code)">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入库总价" prop="totalPrice">
                <basic-input
                  clearable
                  size="small"
                  :format="formatToThousands"
                  :formatValue="formatToMoney"
                  v-model="ruleForm.bpmaMaterialInOtherMaster.totalPrice"
                  placeholder="系统自动生成入库总价"
                  :min="0.0000"
                  :disabled="true"
                ></basic-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="补充说明" prop="remark">
                <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                  :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入补充说明"
                  v-model="ruleForm.bpmaMaterialInOtherMaster.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialInOtherMaster.id" :disabled="isAudit">
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
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toipClick('materialDictionary')" plain
          :disabled="isAudit">引入物资</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
          :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除</el-button>
        <template slot="search">
          <basic-search v-if="false" ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
            @clickSearchFilter="clickSearchFilter"></basic-search>
        </template>
      </basic-handler>
      <basic-table ref="refMaterialRequireTable" :dataTable="dataStockGoodsData" :columns="columnsData.itemColumns"
        @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter" :height="320">
        <template slot-scope="obj" slot="sum">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formSum' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="sum">
              <basic-input clearable size="small"  :format="formatToThousandsFour"
                           :formatValue="formatToMoneyFour" v-model="obj.scope.row.sum" placeholder="请输入数量" :min="0.0000"
                           :disabled="isAudit" @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="unitPrice">
          <el-form :model="dataStockGoodsData.data[obj.scope.$index]" :ref="'formUnitPrice' + obj.scope.$index"

                   :show-message="false">
            <el-form-item prop="unitPrice">
              <basic-input clearable size="small"  :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
                           v-model="obj.scope.row.unitPrice" placeholder="请输入单价" :disabled="isAudit" :min="0.0000"
                           @change="sumChange(obj.scope.row)"></basic-input>
            </el-form-item>
          </el-form>
        </template>
        <template slot-scope="obj" slot="totalPrice">
        {{formatToThousandsFour(obj.scope.row.totalPrice)}}
        </template>
        <template slot-scope="obj" slot="remark">
          <basic-input clearable size="small"  v-model="obj.scope.row.remark" placeholder="备注"
            :disabled="isAudit"></basic-input>
        </template>
      </basic-table>
    </el-row>
    <!-- 物资 //合同-->
    <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getPublicMate" v-show="dialogTableVisible"
      @currentPage="currentPage"></addItem>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary :materialDictionaryData="dataStockGoodsData.data" @selectionChange="selectionChangeCheck" filterValid  :isShowChecked="true"
        v-if="visibleSyncMaterialDictionary"></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleChange1" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  //四个弹窗
  import dialogProject from "@/views/components/dialog/dialogProject";
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
    delDetail
  } from "@/api/bpmaManager/goods/putStorage/other/index.js";
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
  import {validateLength,validateValue} from "@/utils/validate";
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  export default {
    name: "otherDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      return {
        ruleForm: {
          bpmaMaterialInOtherMaster: {
            proId: "", //项目id
            proName: "", //项目名称
            proCode: "", //项目编码
            validateStatus: 2, //审核状态
            name: "其他入库单", //单据名称
            totalPrice: "0.00" //采购总价
          },
          bpmaMaterialInOtherDetails: []
        },
        dataStockGoodsData: {
          data: [],
          total: 0
        },
        itemId: "",
        dictionary: [],
        inkTypes: [],
        selectArray: {},
        visibleSyncProject: false,
        visibleSyncOfferEnterprise: false,
        visibleSyncMaterialDictionary: false,
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
        rulesStockGoodsData:{
          sum:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['数量', 0, 100000000]);
              },
              trigger: 'change'
            }
          ],
          unitPrice:[
            {
              required: true,
              validator: (rule, value, callback) => {
                validateValue(rule, value, callback, true, ['单价', 0, 100000000]);
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
        activeNames: ["1"]
      };
    },

    components: {
      dialogProject,
      addItem,
      dialogMaterialDictionary
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
      selectionChangeCheck(row) {
        this.selectedRow = row.selectedRows
      },
      handleChange1() {
        const row = this.selectedRow
        switch (this.type) {
          case 'project':
            if(!this.isSelectedRow(row)) return false;
            this.$set(this.ruleForm.bpmaMaterialInOtherMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialInOtherMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialInOtherMaster, 'proCode', row.code)
            break
          case 'userManager':
            if(!this.isSelectedRow(row)) return false;
            this.$set(this.ruleForm.bpmaMaterialInOtherMaster, 'payPerson', row.username)
            this.$set(this.ruleForm.bpmaMaterialInOtherMaster, 'payPersonId', row.id)
            break
          case 'materialDictionary':
            if(!this.isSelectedRows(row)) return false;
            this.selectedRow = undefined;
            let priceObj = {
              sum: "0.0000",
              unitPrice: "0.0000",
              totalPrice: "0.00"
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
            this.ruleForm.bpmaMaterialInOtherDetails = this.dataStockGoodsData.data;
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
                code: res.data.bpmaMaterialInOtherMaster.proCode,
                id: res.data.bpmaMaterialInOtherMaster.proId,
                name: res.data.bpmaMaterialInOtherMaster.proName
              };
              this.ruleForm = res.data;
              this.dataStockGoodsData = {
                data: res.data.bpmaMaterialInOtherDetails,
                total: res.data.bpmaMaterialInOtherDetails.length
              };
              this.$store.dispatch("setSelectP", res.data.bpmaMaterialInOtherDetails);
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
        this.$store.dispatch("setSelectP", []);
        this.selectArray = {}
        this.dataStockGoodsData = {
          data: [],
          total: 0
        };
        this.ruleForm = {
          bpmaMaterialInOtherMaster: {
            inType: 4,
            proCode: this.proObj ? this.proObj.code : "",
            proId: this.proObj ? this.proObj.id : "",
            proName: this.proObj ? this.proObj.name : "",
            validateStatus: 2, //审核状态
            name: "其他入库单", //单据名称
            totalPrice: "0.00" //总价
          },
          bpmaMaterialInOtherDetails: []
        };
        return this.$utilsBasic.valideFocus(this, ['refProName','refOfferEnterpriseName']);
      },
      sumChange(data) {
        data.totalPrice = this.$utilsBasic.toMoney(data.sum * data.unitPrice,2);
        this.computeSummary();
      },
      /**
       * 计算总价
       * */
      computeSummary(){
        let result = this.$utilsBasic.computeSummaryData(this.dataStockGoodsData.data, ['totalPrice']);
          this.ruleForm.bpmaMaterialInOtherMaster.totalPrice = this.$utilsBasic.toMoney(result.totalPrice, 2);
      },
      clickByDialogAddData(type) {
        this.type = type;
        if (type == "goodsItem") {
          if (!this.ruleForm.bpmaMaterialInOtherMaster.proId) {
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
          this.visibleSyncProject = true;
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
            this.ruleForm.bpmaMaterialInOtherDetails = allData;
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
          sum: 0,
          unitPrice: 0,
          totalPrice: 0
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
            this.ruleForm.bpmaMaterialInOtherMaster.proCode = row.code;
            this.ruleForm.bpmaMaterialInOtherMaster.proId = row.id;
            this.ruleForm.bpmaMaterialInOtherMaster.proName = row.name;
            this.proObj = {
              code: row.code,
              id: row.id,
              name: row.name
            };
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
      putAddAndUpdateAll(callback) {
        add(this.ruleForm)
          .then(res => {
            if (res.status == 200) {
              this.ruleForm = res.data;
              this.dataStockGoodsData.data=res.data.bpmaMaterialInOtherDetails;
              this.itemId = res.data.bpmaMaterialInOtherMaster.id;
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
        //   this.$refs['formSum' + idx].validate((valid) => {
        //     valid ? null : result = valid
        //   })
        //   this.$refs['formUnitPrice' + idx].validate(valid => {
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
              this.ruleForm.bpmaMaterialInOtherMaster.id = id;
              audit(this.ruleForm)
                .then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message);
                    this.ruleForm = res.data;
                    this.dataStockGoodsData.data=res.data.bpmaMaterialInOtherDetails;
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
          .catch(() => { });
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
        this.$set(this.ruleForm.bpmaMaterialInOtherMaster,'payPersonId',undefined);
        this.$set(this.ruleForm.bpmaMaterialInOtherMaster,'payPerson',undefined);
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
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.bpmaMaterialInOtherMaster.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      isDelete() {
        if (
          this.itemId != "" &&
          this.ruleForm.bpmaMaterialInOtherMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      isAudit2() {
        if (
          this.ruleForm.bpmaMaterialInOtherMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      ifSubstitutePay() {
        if (
          this.ruleForm.bpmaMaterialInOtherMaster.ifSubstitutePay != 2 &&
          this.ruleForm.bpmaMaterialInOtherMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      ifContract() {
        if (
          this.ruleForm.bpmaMaterialInOtherMaster.offerEnterpriseId != "" &&
          this.ruleForm.bpmaMaterialInOtherMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
  };
</script>
