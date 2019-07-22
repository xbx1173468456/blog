<template>
  <div class="workDetail-container-list">
    <div class="grid-content bg-purple">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>
        保存
      </el-button>
      <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
    </div>
    <div class="logForm mt10">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-form :model="ruleForm.bpmaMaterialOfferMaster" :rules="rules" ref="ruleForm" label-width="120px"
            class="demo-ruleForm form-container">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="审核状态" prop="validateStatus">
                  <el-input clearable size="small"
                    v-model="ruleForm.bpmaMaterialOfferMaster.validateStatus ==1?'已审核':'未审核'" disabled maxlength="100">
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据编码" prop="code">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOfferMaster.code" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据名称" prop="name">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialOfferMaster.name" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="项目名称" prop="proName">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称"
                    v-model="ruleForm.bpmaMaterialOfferMaster.proName" size="small">
                    <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="询价单号" prop="inquiryCode">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称" v-model="ruleForm.bpmaMaterialOfferMaster.inquiryCode" size="small">
                    <el-button @click="toipClick('inquiry')" class="form-btn" icon="el-icon-plus" size="mini" :disabled="isAudit"
                               slot="append"></el-button>
                  </el-input>
                </basic-form-item>
                <!-- <basic-form-item label="询价单号" prop="inquiryCode">
                  <el-input placeholder="请选择询价单号" v-model="ruleForm.bpmaMaterialOfferMaster.inquiryCode"
                     :disabled="isAudit" readonly
                    size="small">
                    <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('inquiryCode')" :disabled="isAudit"
                      size="mini">
                    </el-button>
                  </el-input> -->
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="询价单位" prop="inquiryEnterprise">
                  <el-input placeholder="询价单位" v-model="ruleForm.bpmaMaterialOfferMaster.inquiryEnterprise" disabled
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="报价单位" prop="enterprise">
                  <el-input placeholder="报价单位" v-model="ruleForm.bpmaMaterialOfferMaster.enterprise" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="报价日期" prop="handleDate" class="showTime">
                  <el-date-picker size="small" :editable="false" :disabled="isAudit" v-model="ruleForm.bpmaMaterialOfferMaster.handleDate"
                    type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期">
                  </el-date-picker>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="报价总额">
                  <basic-input clearable size="small"  :format="formatToThousands"
                    v-model="ruleForm.bpmaMaterialOfferMaster.price" placeholder="0.00" disabled :min="0.0000" price>
                  </basic-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="发票类型" prop="invoiceType">
                  <el-select v-model="ruleForm.bpmaMaterialOfferMaster.invoiceTypeId" placeholder="无"
                    :disabled="isAudit" size="small"
                    @change="val => ruleForm.bpmaMaterialOfferMaster.invoiceType = invoiceTypeList.filter(item => item.id == val)[0].name">
                    <el-option v-for="item in this.invoiceTypeList" :key="item.id" :label="item.name"
                      :value="item.id" />
                  </el-select>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="发票税率">
                  <basic-input clearable size="small"  :format="formatToThousands"
                    v-model="ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate" :disabled="isAudit" @change="changeRate" price>
                  </basic-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="进项税额">
                  <basic-input clearable size="small"  :format="formatToThousands"
                    :formatValue="formatMoeryCard" v-model="ruleForm.bpmaMaterialOfferMaster.tax" disabled price>
                  </basic-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="联系人员" prop="person">
                  <el-input placeholder="联系人员" v-model="ruleForm.bpmaMaterialOfferMaster.person" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="联系电话" prop="telephone">
                  <el-input placeholder="联系电话" v-model="ruleForm.bpmaMaterialOfferMaster.telephone" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="联系邮箱" prop="email">
                  <el-input placeholder="联系邮箱" v-model="ruleForm.bpmaMaterialOfferMaster.email" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="联系地址" prop="address">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入联系地址"
                    v-model="ruleForm.bpmaMaterialOfferMaster.address"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="文档附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialOfferMaster.id"
                    :disabled="isAudit">
                  </basic-upload>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="报价说明" prop="offerExplain">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入报价说明"
                    v-model="ruleForm.bpmaMaterialOfferMaster.offerExplain"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-row class="content-container">
        <basic-handler>
          <el-button type="primary" size="small" icon="el-icon-plus" :disabled="isAudit"
            @click="toipClick('materialDictionary')" plain>引入物资</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
            :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除</el-button>
          <!-- <template slot="search">
            <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
              @clickSearchFilter="clickSearchFilter"></basic-search>
          </template> -->
        </basic-handler>
        <basic-table ref="purchasePriceTable" :dataTable="showItemsData" :columns="columnsData2.itemColumns2"
          @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter" :height="320">
          <template slot-scope="obj" slot="sum">
            <basic-input clearable size="small"  :format="formatToMoneyFour"
              :formatValue="formatToMoneyFour" v-model="obj.scope.row.sum" :disabled="isAudit" :min="0.0000"
              @change="sumChange(obj.scope.row,obj)" price></basic-input>
          </template>
          <template slot-scope="obj" slot="unitPrice">
            <basic-input clearable size="small"  :format="formatToMoneyFour"
              :formatValue="formatToMoneyFour" v-model="obj.scope.row.unitPrice" :disabled="isAudit" :min="0.0000"
              @change="sumChange(obj.scope.row,obj)" price></basic-input>
          </template>
          <template slot-scope="obj" slot="totalPrice">
            <basic-input clearable size="small"  :format="formatToThousands"
              :formatValue="formatToMoney" v-model="obj.scope.row.totalPrice" placeholder="0.00" disabled
              :min="0.0000" price></basic-input>
          </template>
          <template slot-scope="obj" slot="transportMode">
            <el-select v-model="obj.scope.row.transportMode" placeholder="" :disabled="isAudit">
              <el-option v-for="item in dataEnum.amTransportModeEnum" :key="item.code" :label="item.name" :value="Number(item.code)" />
            </el-select>
          </template>
          <template slot-scope="obj" slot="summary">
            <basic-input clearable size="small"  v-model="obj.scope.row.summary" placeholder="摘要"
              :disabled="isAudit"></basic-input>
          </template>
        </basic-table>
      </el-row>
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary @selectionChange="selectionChangeCheck" filterValid isShowChecked :materialDictionaryData="ruleForm.bpmaMaterialOfferDetails"
        v-if="visibleSyncMaterialDictionary"></dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncInquiry" title="采购询价-选择" >
      <dialog-inquiry @selectionChange="selectionChange" filterValid v-if="visibleSyncInquiry" :proId="ruleForm.bpmaMaterialOfferMaster.proId"></dialog-inquiry>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncInquiry = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getItem" v-show="dialogTableVisible"
      @currentPage="currentPage"></addItem>
  </div>
</template>

<script>
  import bringElement from "./itemTable";
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import { selectBudget } from '@/api/bpmaManager/goods/purchase/purchasePrice/index.js'
  import {
    tags,
    getEnumData,
    getNowFormatDate,
    strToTime
  } from "@/utils";
  import {
    add,
    getBudgetDetail,
    auditTrack,
    deleteTrack,
    delDetail
  } from "@/api/bpmaManager/goods/purchase/purchasePrice/index.js";
  import addItem from "./addItem.vue";
  import {
    getDictionaryDataByTypeFilter
  } from "@/api/common/dataDictionary.js";
  import columns from "./columns.json";
  import {
    columnsData
  } from "./index.js";
  import { columnsData2 } from "./tableTitle.js";
  import {
    selectListOwn
  } from "@/api/bpmaManager/early/itemInfo/itemRegister/index.js";
  import {
    getMaterial,
    getDiction
  } from "@/api/sysManager/material/dictionary";
  import { connect } from 'net';
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  import dialogInquiry from '@/views/components/dialog/dialogInquiry'
  export default {
    name: "purchasePriceDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      var checkProName = (rule, value, callback) => {
        this.tableKey++
        if (value === "") {

        } else {

          callback();
        }
      };
      var checkInquiryCode = (rule, value, callback) => {
        this.tableKey++
        if (value === "") {

        } else {

          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (!value) {
          callback();
        } else if (!reg.test(value)) {
          callback(new Error())
          this.$message.warning('请输入正确的11位手机号码')
        } else {
          callback();
        }
      };
      var checkEmail = (rule, value, callback) => {
        const reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!value) {
          callback();
        } else if (!reg.test(value)) {
          callback(new Error())
          this.$message.warning('请输入正确的邮箱地址')
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          bpmaMaterialOfferMaster: {
            id: "",
            validateStatus: 2, //审核状态
            price: 0,
            tax: 0,
            invoiceTaxRate: 0,
            name: "供方报价单", //单据名称,
            proName: "", //项目名称
            proId: "", //项目id
            person: this.$store.state.user.login.username,
            inquiryCode: '',
            handleDate: new Date().getTime(), //日期
          },
          bpmaMaterialOfferDetails: []
        },
        columns,
        columnsData2,
        fuzzy: "",
        dialogTableVisible: false,
        visibleSyncProject: false,
        visibleSyncMaterialDictionary: false,
        visibleSyncInquiry: false,
        proObj: {},
        dictionary: {},
        selectArray: {},
        activeNames: ['1'],
        borderRed: false,
        borderRed2: false,
        itemId: "",
        invoiceTypeList: [],
        itemsData: {
          data: [],
          total: 0
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: "",
          fuzzyKeys: ""
        },
        rules: {
          proName: [{
            validator: checkProName,
            trigger: "change"
          },
          {
            required: true,
            message: " ",
            trigger: "change"
          }
          ],
          inquiryCode: [
            {
              required: true,
              message: " ",
              trigger: "change"
            }
          ],
          name: [{
            required: true,
            message: " ",
            trigger: "change"
          }],
          enterprise: [{ required: true, message: " ", trigger: "change" }],
          invoiceType: [{ required: true, message: " ", trigger: "change" }],
          telephone: [{ message: ' ', trigger: 'blur', validator: checkPhone, }],
          email: [{ message: ' ', trigger: 'blur', validator: checkEmail, }]
        },
        trackType: [],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        }
      };
    },
    methods: {
      //关键字搜索
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(
          this.$refs.purchasePriceTable,
          this.modelSearchFilter,
          () => {
            // this.getDetails();
          }
        );
      },
      delGoods() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = this.selectArray
          let allGoods = this.itemsData.data
          if (obj.id) {
            this.itemsData.data = this.itemsData.data.map(item => {
              if(item == this.selectArray) {
                this.$set(item, 'persistStatus', 'fdel')
              }
              return item
            })
            if(this.ruleForm.bpmaMaterialOfferDetails.length > 0) {
              this.sumChange(this.ruleForm.bpmaMaterialOfferDetails[0])
            } else {
              this.ruleForm.bpmaMaterialOfferDetails.price = this.$utilsBasic.toMoney(0,2);
            }
          } else {
            let newGoods = allGoods.filter(item => {
              return item !== obj
            })
            this.itemsData.data = newGoods
            if(this.ruleForm.bpmaMaterialOfferDetails.length > 0) {
              this.sumChange(this.ruleForm.bpmaMaterialOfferDetails[0])
            } else {
              this.ruleForm.bpmaMaterialOfferDetails.price = this.$utilsBasic.toMoney(0,2);
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      toipClick(type) {
        if (this.isAudit) return
        if (type == 'inquiry' && !this.ruleForm.bpmaMaterialOfferMaster.proId) return this.$message.warning('请先选择项目')
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      query() { },
      formatToMoney(value, num) {
        return Number(value).toFixed(num);
      },
      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId)
          .then(res => {
            if(!res.data.bpmaMaterialOfferMaster) return
            let arr = res.data
            arr.bpmaMaterialOfferDetails.forEach(item => {
              item.units = item.unit
            });
            this.ruleForm = arr;
            this.proObj = {
              code: arr.bpmaMaterialOfferMaster.proCode,
              id: arr.bpmaMaterialOfferMaster.proId,
              label: arr.bpmaMaterialOfferMaster.proLabel,
              name: arr.bpmaMaterialOfferMaster.proName
            }
            this.itemsData = {
              data: res.data.bpmaMaterialOfferDetails,
              total: res.data.bpmaMaterialOfferDetails.length
            }
            this.$store.dispatch("setSelectP", res.data.bpmaMaterialOfferDetails);
            this.ruleForm.bpmaMaterialOfferMaster.handleDate = strToTime(arr.bpmaMaterialOfferMaster.handleDate)
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      returnFloat(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            value = value.toString() + "0";
          }
          return value;
        }
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      selectionChangeCheck(row) {
        this.selectedRow = row.selectedRows
      },
      //獲取字典
      getDiction() {
        //階段1
        getDictionaryDataByTypeFilter("SYS_SEND_GOODS")
          .then(res => {
            if (res.status == 200) {
              this.trackType = res.data;
            }
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      sumChange(data) {
        data.totalPrice = this.$utilsBasic.toMoney(data.sum * data.unitPrice,2);

        let arr = this.showItemsData.data;
        let bTotalPrice = 0;
        arr.forEach(item => {
          bTotalPrice += Number(item.totalPrice);
        });
        this.ruleForm.bpmaMaterialOfferMaster.price = this.$utilsBasic.toMoney(bTotalPrice,2);
        if (this.ruleForm.bpmaMaterialOfferMaster.invoiceType == '增值税专用发票') {
          let tax = this.ruleForm.bpmaMaterialOfferMaster.price / (1 + Number(this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate)) * this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate
          this.ruleForm.bpmaMaterialOfferMaster.tax = tax
        } else {
          this.ruleForm.bpmaMaterialOfferMaster.tax = 0
        }
        //     String(bTotalPrice).indexOf(".") < 0
        //     ? bTotalPrice + ".00"
        //     : parseInt(bTotalPrice * 100) / 100;
      },
      //新增
      addClick() {
        this.ruleForm.bpmaMaterialOfferMaster = {
          id: "",
          validateStatus: 2,
          name: "供方报价单",
          price: '0.00',
          invoiceTaxRate: '0.01',
          proCode: this.proObj.code,
          proId: this.proObj.id,
          proName: this.proObj.name,
          person: this.$store.state.user.login.username,
          inquiryCode: '',
          handleDate: new Date().getTime(),
        };
        this.ruleForm.bpmaMaterialOfferDetails = [];
        this.selectArray = {}
        this.$store.dispatch("setSelectP", []);
        this.itemId = "";
        this.itemsData = {
          data: [],
          total: 0
        }
        this.$store.dispatch("setTrackId", "");
      },
      //保存
      save(formName, lock) {
        return new Promise((reslove, reject) => {
          this.$refs[formName].validate(valid => {
          if (valid) {
            // this.ruleForm.bpmaMaterialOfferMaster.proCode = this.proObj.code;
            // this.ruleForm.bpmaMaterialOfferMaster.proId = this.proObj.id;
            // this.ruleForm.bpmaMaterialOfferMaster.proName = this.proObj.name;
            this.ruleForm.bpmaMaterialOfferMaster.price = Number(this.ruleForm.bpmaMaterialOfferMaster.price);
            this.ruleForm.bpmaMaterialOfferMaster.tax = Number(this.ruleForm.bpmaMaterialOfferMaster.tax);
            this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate = Number(this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate);
            this.ruleForm.bpmaMaterialOfferMaster.invoiceType = this.ruleForm.bpmaMaterialOfferMaster.invoiceType;
            this.ruleForm.bpmaMaterialOfferDetails = this.itemsData.data
            // return;

            add(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  if(!lock) this.$message.success(res.message);
                  this.itemId = res.data.bpmaMaterialOfferMaster.id;
                  this.ruleForm.bpmaMaterialOfferMaster.id = res.data.bpmaMaterialOfferMaster.id;
                  this.ruleForm.bpmaMaterialOfferDetails = res.data.bpmaMaterialOfferDetails
                  this.itemsData.data = res.data.bpmaMaterialOfferDetails
                  this.$store.dispatch(
                    "setTrackId",
                    res.data.bpmaMaterialOfferMaster.id
                  );
                  reslove()
                  if(!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialOfferMaster.id)) return false;
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
            // }
          } else {
            return false;
          }
        });
        })
      },
      //审核
      audit() {
        this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.save('ruleForm', true)
            auditTrack(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.itemId = res.data.bpmaMaterialOfferMaster.id;
                  this.ruleForm.bpmaMaterialOfferMaster = res.data.bpmaMaterialOfferMaster;
                  this.ruleForm.bpmaMaterialOfferDetails = res.data.bpmaMaterialOfferDetails
                  this.itemsData.data = res.data.bpmaMaterialOfferDetails
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      //删除
      del() {
        this.$confirm("亲，您是否确定删除当前数据，删除后数据不能恢复！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let id = this.itemId;
            deleteTrack(id)
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
      handleChange() {
        let row = this.selectedRow
        // if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm.bpmaMaterialOfferMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialOfferMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialOfferMaster, 'proCode', row.code)
            this.proObj.id = row.id
            this.proObj.name = row.name
            this.proObj.code = row.code
            break
          case 'inquiry':
            this.$set(this.ruleForm.bpmaMaterialOfferMaster, 'inquiryEnterprise', row.enterprise)
            this.$set(this.ruleForm.bpmaMaterialOfferMaster, 'inquiryCode', row.code)
            break
          case 'materialDictionary':
            let priceObj = {
              unitPrice: 0,
              sum: 0,
              totalPrice: 0,
              transportMode: '',
              summary: ''
            };
            row = row.map(item => {
              if (!item.masterId) {
                item.materialId = item.id
                item.id = "";
                item.masterId = "";
                delete item.inputTime
                item = Object.assign(item, priceObj);
              }
              item = Object.assign({}, item);
              return item
            })
            this.itemsData.data = this.itemsData.data.concat(row)
            this.selectedRow = []
            break
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      clickByDialogAddData(type) {
        if (!this.ruleForm.bpmaMaterialOfferMaster.proId) {
          if (type == 'goodsItem' || type == 'inquiryCode') {
            this.$message.warning('请先选择项目')

            return
          }
        }

        this.type = type;
        this.dialogTableVisible = true;
        setTimeout(() => {
          if (type == "goodsItem") {
            this.$store.dispatch("setSelectP", []);
            this.$refs.refMaterialContract.openDialog();
            this.getContract(1, 1, 10);
            this.$refs.refMaterialContract.title = "引入物资-选择";
            this.$refs.refMaterialContract.type = 1;
            this.$refs.refMaterialContract.treeColumns = columnsData.materialTypeColumns;
            this.$refs.refMaterialContract.columns = columnsData.materialColumns;
          } else if (type == "proName") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(2, 1, 10);
            this.$refs.refMaterialContract.title = "项目列表";
            this.$refs.refMaterialContract.type = 2;
            this.$refs.refMaterialContract.columns = columnsData.itemColumns;
          } else if (type == "inquiryCode") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(3, 1, 10);
            this.$refs.refMaterialContract.title = "询价列表";
            this.$refs.refMaterialContract.type = 3;
            this.$refs.refMaterialContract.columns = columnsData.inquiryColumns;
          }
        }, 300);
      },
      getContract(num, page, limit, fuzzy) {
        if (!this.ruleForm.bpmaMaterialOfferMaster.proId && num != 2 && num != 1) {
          this.$message.warning('请先选择项目')
          this.borderRed = true
          return false
        } else if (num == 1) {
          this.getMaterialType(num, page, limit);
        } else if (num == 2) {
          let data = {
            page: page,
            limit: limit,
            fuzzy: fuzzy
          };
          selectListOwn(data)
            .then(res => {
              if (res.status == 200) {
                if (res.data.rows) {
                  this.$refs.refMaterialContract.tableData = res.data.rows;
                  this.$refs.refMaterialContract.page.total = res.data.total;
                } else {
                  this.$refs.refMaterialContract.tableData = res.data;
                  this.$refs.refMaterialContract.page.total = res.data.length;
                }
              }
            })
            .catch(err => {
              this.$message.warning(err.$message);
            });
        } else if (num == 3) {
          let data = {
            proId: this.proObj ? this.proObj.id : '',
            page: page,
            limit: limit,
            validateStatus: 1,
            fuzzy: fuzzy,
          }
          selectBudget(data).then(res => {
            if (res.status == 200) {
              if (res.data.rows) {
                this.$refs.refMaterialContract.tableData = res.data.rows;
                this.$refs.refMaterialContract.page.total = res.data.total;
              } else {
                this.$refs.refMaterialContract.tableData = res.data;
                this.$refs.refMaterialContract.page.total = res.data.length;
              }

            }
          }).catch(err => {
            this.$message.warning(err.$message)
          })
        }

        return true;
      },
      //获取字典类别
      getMaterialType(num, page, limit) {
        var params = {
          validateStatus: 1,
          enable: 1
        };
        getMaterial(params)
          .then(res => {
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
      changeRate(o) {
        if (o >= 1) {
          this.$message.warning('不能大于1')
          this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate = 0
        } else {
          if (this.ruleForm.bpmaMaterialOfferMaster.invoiceType == '增值税专用发票') {
            let tax = this.ruleForm.bpmaMaterialOfferMaster.price / (1 + Number(this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate)) * this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate
            this.ruleForm.bpmaMaterialOfferMaster.tax = tax
          } else {
            this.ruleForm.bpmaMaterialOfferMaster.tax = 0
          }
        }
      },
      changeOpera(v) {
        if (v == 2) {
          this.ruleForm.bpmaMaterialOfferMaster.changeType = "";
          this.ruleForm.bpmaMaterialOfferMaster.formId = "";
          this.ruleForm.bpmaMaterialOfferMaster.formCode = "";
        }
      },
      changeType(v) {
        this.ruleForm.bpmaMaterialOfferMaster.formId = "";
        this.ruleForm.bpmaMaterialOfferMaster.formCode = "";
      },
      getCheckTree(v, pagination) {
        if (v) {
          this.selectDiction(v.code, pagination.page, pagination.limit);
        }
      },
      /**
       * 获取发票类型
       * */
      getinvoiceTypeList() {
        getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE')
          .then((res) => {
            if (res.rel) {
              this.invoiceTypeList = res.data;
            } else {
              this.$message({ message: res.message, type: 'warning' })
            }
          }).catch(error => {
            console.log(error)
          })
      },
      //查询字典列表
      selectDiction(typeCode, page, limit) {
        let data = {
          typeCode: typeCode,
          limit: limit,
          page: page,
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
      },
      getItem(v) {
        if (v[1] == 1) {
          let priceObj = {
            unitPrice: 0,
            sum: 0,
            totalPrice: 0,
            transportMode: '',
            summary: ''
          };
          var newArr = [];
          v[0].forEach(item => {
            if (!item.masterId) {
              item.id = "";
              item.masterId = "";
              item = Object.assign(item, priceObj);
            }
            item = Object.assign({}, item);
            newArr.push(item);
          });
          this.itemsData = {
            data: newArr,
            total: newArr.length
          };
        } else if (v[1] == 2) {
          this.ruleForm.bpmaMaterialOfferMaster.proName = v[0].name;
          this.ruleForm.bpmaMaterialOfferMaster.proCode = v[0].code;
          this.ruleForm.bpmaMaterialOfferMaster.proId = v[0].id;
          this.proObj = v[0];

        } else if (v[1] == 3) {
          this.ruleForm.bpmaMaterialOfferMaster.inquiryCode = v[0].code;
          this.ruleForm.bpmaMaterialOfferMaster.inquiryEnterprise = v[0].enterprise;


        }


      },
      handleSelectionChange(obj) {
        if (obj && typeof (obj) == 'object') {
          this.selectArray = obj;
        } else {
          this.selectArray = {};
        }
      },
      currentPage(pages, n) {
        this.getContract(n, pages.page, pages.limit)
      }
    },
    watch: {
      'ruleForm.bpmaMaterialOfferMaster': {
        handler(newName, oldName) {
          if (this.ruleForm.bpmaMaterialOfferMaster.invoiceType == '增值税专用发票') {
            let tax = this.ruleForm.bpmaMaterialOfferMaster.price / (1 + Number(this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate)) * this.ruleForm.bpmaMaterialOfferMaster.invoiceTaxRate
            this.ruleForm.bpmaMaterialOfferMaster.tax = tax
          } else {
            this.ruleForm.bpmaMaterialOfferMaster.tax = 0
          }
        },
        deep: true
      },
      itemsData: {
        handler(val) {
          this.ruleForm.bpmaMaterialOfferDetails = val.data
        },
        deep: true
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.bpmaMaterialOfferMaster.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      isAudit2() {
        if (
          this.itemId != "" &&
          this.ruleForm.bpmaMaterialOfferMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      showItemsData() {
        let data = this.itemsData.data.filter(item => item.persistStatus != 'fdel')
        return {
          data,
          total: data.length
        }
      }
    },
    components: {
      addItem,
      dialogProject,
      dialogMaterialDictionary,
      bringElement,
      dialogInquiry
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      this.getDiction();
      this.getEnumData(['GetAmTransportModeEnum', "GetValidateStatusData", "GetIsOrNotData"])
    },
    activated() {
      this.dictionary = this.$store.state.common.dataEnum;
      if (this.$route.params.id) {
        this.$store.dispatch("setTrackId", this.$route.params.id);
        this.itemId = this.$route.params.id;
      } else {
        this.itemId = this.$store.getters.getTrackId;
      }
      if (this.$route.params.proObj) {
        this.proObj = this.$route.params.proObj;
        this.ruleForm.bpmaMaterialOfferMaster.proName = this.$route.params.proObj.name;
        this.ruleForm.bpmaMaterialOfferMaster.proId = this.$route.params.proObj.id;
      }
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.addClick()
      }, async id => {
        if (this.itemId) {
          this.getDetail();
        }
        this.getinvoiceTypeList()
      })
      this.$store.dispatch("cacheId", undefined);
    },
  };
</script>

<style scoped>
</style>
