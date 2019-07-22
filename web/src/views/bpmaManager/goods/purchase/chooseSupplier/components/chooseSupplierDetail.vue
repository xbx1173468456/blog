<template>
  <div class="workDetail-container-list mt10">
    <div class="grid-content bg-purple">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>
        保存</el-button>
      <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
    </div>
    <div class="logForm mt10">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
            class="demo-ruleForm form-container">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="审核状态" prop="validateStatus">
                  <el-input clearable size="small" v-model="ruleForm.validateStatus ==1?'已审核':'未审核'" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据编码" prop="code">
                  <el-input clearable size="small" v-model="ruleForm.code" disabled maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据名称" prop="name">
                  <el-input clearable size="small" v-model="ruleForm.name" disabled maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="项目名称" prop="proName">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称" v-model="ruleForm.proName" size="small">
                    <el-button @click="toipClick('project')" class="form-btn" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="询价单号" prop="inquiryCode">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择询价单号" v-model="ruleForm.inquiryCode"
                    size="small">
                    <el-button @click="toipClick('inquiry')" class="form-btn" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
                <!-- <basic-form-item label="询价单号" prop="inquiryCode">
                  <el-input placeholder="请选择询价单号" v-model="ruleForm.inquiryCode" disabled
                    size="small">
                    <el-button slot="append" icon="el-icon-plus" @click="clickByDialogAddData('inquiryCode')" :disabled="isAudit"
                      size="mini"></el-button>
                  </el-input>
                </basic-form-item> -->
              </el-col>
              <el-col :span="8">
                <basic-form-item label="询价单位" prop="inquiryEnterprise">
                  <el-input placeholder="询价单位" v-model="ruleForm.inquiryEnterprise" disabled maxlength="100" clearable
                    size="small"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="比选人员" prop="person">
                  <el-input placeholder="比选人员" v-model="ruleForm.person" :disabled="isAudit" maxlength="100" clearable
                    size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="比选日期" prop="compareDate" class="showTime">
                  <el-date-picker size="small" :editable="false" :disabled="isAudit" v-model="ruleForm.compareDate"
                    type="datetime" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择比选日期"></el-date-picker>
                </basic-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="第一备选单位" prop="firstEnterprise">
                  <el-input placeholder="请选择第一备选单位" v-model="ruleForm.firstEnterprise" disabled size="small">
                    <el-button slot="append" icon="el-icon-plus"
                      @click="clickByDialogAddData('enterprise','firstEnterprise')" :disabled="isAudit" size="mini">
                    </el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第一报价单号" prop="firstOfferCode">
                  <el-input placeholder="第一报价单号" v-model="ruleForm.firstOfferCode" disabled maxlength="100" clearable
                    size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第一报价总额">
                  <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney" placeholder="第一报价总额"
                    v-model="ruleForm.firstOfferPrice" price></basic-input>
                  <!-- <el-input placeholder="第一报价总额" :value="ruleForm.firstOfferPrice" disabled :min="0" clearable
                    size="small"></el-input> -->
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="第二备选单位" prop="secondEnterprise">
                  <el-input placeholder="请选择第二备选单位" v-model="ruleForm.secondEnterprise" disabled size="small">
                    <el-button slot="append" icon="el-icon-plus"
                      @click="clickByDialogAddData('enterprise','secondEnterprise')" :disabled="isAudit" size="mini">
                    </el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第二报价单号" prop="secondOfferCode">
                  <el-input placeholder="第二报价单号" v-model="ruleForm.secondOfferCode" disabled maxlength="100" clearable
                    size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第二报价总额">
                  <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney" placeholder="第二报价总额"
                    v-model="ruleForm.secondOfferPrice" price></basic-input>
                  <!-- <el-input placeholder="第二报价总额" :value="ruleForm.secondOfferPrice" disabled :min="0" clearable
                    size="small"></el-input> -->
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="第三备选单位" prop="thirdEnterprise">
                  <el-input placeholder="请选择第三备选单位" v-model="ruleForm.thirdEnterprise" disabled size="small">
                    <el-button slot="append" icon="el-icon-plus"
                      @click="clickByDialogAddData('enterprise','thirdEnterprise')" :disabled="isAudit" size="mini">
                    </el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第三报价单号" prop="thirdOfferCode">
                  <el-input placeholder="第三报价单号" v-model="ruleForm.thirdOfferCode" disabled maxlength="100" clearable
                    size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="第三报价总额">
                  <basic-input disabled :format="formatToThousands" :formatValue="formatToMoney" placeholder="第三报价总额"
                    v-model="ruleForm.thirdOfferPrice" price></basic-input>
                  <!-- <el-input placeholder="第三报价总额" :value="ruleForm.thirdOfferPrice" disabled :min="0" clearable
                    size="small"></el-input> -->
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="联系地址" prop="address">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入联系地址" v-model="ruleForm.address"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="文档附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="ruleForm.id" :disabled="isAudit">
                  </basic-upload>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="比选说明" prop="compareExplain">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入报价说明" v-model="ruleForm.compareExplain">
                  </el-input>
                </basic-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <basic-handler>
        <!-- <template slot="search">
          <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
            @clickSearchFilter="clickSearchFilter"></basic-search>
        </template> -->
      </basic-handler>
      <basic-table ref="refchooseSupplierDetailTable" :dataTable="chooseList"
        :columns="columnsData.purchasePriceColumns" @current-change="handleSelectionChange" :isPagination="false"
        :pagination="modelSearchFilter" :height="320" :mergeColumn="{indexs:[1,2],name:'masterCode'}">
        <template slot-scope="obj" slot="unitPrice">
          <basic-input clearable size="small" :format="formatToMoneyFour" :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.unitPrice" placeholder="单价" disabled :min="0.0000"
            @change="sumChange(obj.scope.row)" price></basic-input>
        </template>
        <template slot-scope="obj" slot="sum">
          <basic-input clearable size="small" :format="formatToMoneyFour" :formatValue="formatToMoneyFour"
            v-model="obj.scope.row.sum" disabled :min="0.0000" @change="sumChange(obj.scope.row)" price></basic-input>
        </template>
        <template slot-scope="obj" slot="totalPrice">
          <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
            v-model="obj.scope.row.totalPrice" disabled :min="0.0000" @change="sumChange(obj.scope.row)" price></basic-input>
        </template>
        <template slot-scope="obj" slot="tax">
          <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
            v-model="obj.scope.row.tax" disabled :min="0.0000" @change="sumChange(obj.scope.row)" price></basic-input>
        </template>
        <template slot-scope="obj" slot="invoiceType">
          <el-select v-model="obj.scope.row.invoiceType" placeholder="" disabled>
            <el-option v-for="item in invoices" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </template>
        <template slot-scope="obj" slot="transportMode">
          <el-select v-model="obj.scope.row.transportMode" placeholder="" disabled>
            <el-option v-for="item in dataEnum.amTransportModeEnum" :key="item.code" :label="item.name"
              :value="Number(item.code)">
            </el-option>
          </el-select>
        </template>
      </basic-table>
    </div>
    <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getItem" v-show="dialogTableVisible"
      @currentPage="currentPage"></addItem>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncInquiry" title="采购询价-选择">
      <dialog-inquiry @selectionChange="selectionChange" filterValid v-if="visibleSyncInquiry" :proId="ruleForm.proId">
      </dialog-inquiry>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncInquiry = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import bringElement from "@/views/bpmaManager/goods/components";
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogInquiry from '@/views/components/dialog/dialogInquiry'
  import {
    selectBudget
  } from '@/api/bpmaManager/goods/purchase/purchasePrice/index.js'

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
    getUnitInfoList,
    getOfferPriceDetailList,
    getOfferPriceDetail
  } from "@/api/bpmaManager/goods/purchase/chooseSupplier/index.js";
  import addItem from "./addItem.vue";
  import {
    getDictionaryDataByTypeFilter
  } from "@/api/common/dataDictionary.js";
  import {
    columnsData
  } from "./index.js";
  import {
    selectListOwn
  } from "@/api/bpmaManager/early/itemInfo/itemRegister/index.js";
  import {
    getMaterial,
    getDiction
  } from "@/api/sysManager/material/dictionary";
  import { debug } from 'util';
  export default {
    name: "goodsBudgetDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      var checkProName = (rule, value, callback) => {
        if (value === "") {

        } else {

          callback();
        }
      };
      return {
        ruleForm: {
          id: "",
          validateStatus: 2, //审核状态
          price: '0.00',
          name: "供方比选单", //单据名称
          person: this.$store.state.user.login.username,
          proName: "", //项目名称
          proId: "", //项目id
          inquiryCode: '',
          firstEnterprise: '',
          firstOfferCode: '',
          firstOfferPrice: '0.00',
          secondEnterprise: '',
          secondOfferCode: '',
          secondOfferPrice: '0.00',
          thirdEnterprise: '',
          thirdOfferCode: '',
          thirdOfferPrice: '0.00',
          compareDate: new Date().getTime(), //日期
        },
        chooseList: {
          data: [],
          total: 0
        },
        rowList: [],
        rowArray: [],
        selectedRow: [],
        position: 0,
        activeNames: ['1'],
        columnsData,
        isSpanMethod: true,
        fuzzy: "",
        dialogTableVisible: false,
        visibleSyncProject: false,
        visibleSyncInquiry: false,
        proObj: { id: '' },
        dictionary: {},
        selectArray: [],
        borderRed: false,
        itemId: "",
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: ''
        },
        rules: {
          proName: [{
            validator: checkProName,
            trigger: "blur"
          },
          {
            required: true,
            message: " ",
            trigger: "change"
          }
          ],
          name: [{
            required: true,
            message: " ",
            trigger: "blur"
          }]
        },
        trackType: [],
        invoices: [],
        sendType: [],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        firstData: [],
        secondData: [],
        thirdData: []
      };
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refchooseSupplierDetailTable, this.modelSearchFilter, () => {
          // this.getDetail();
        })
      },
      query() { },
      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId)
          .then(res => {
            if (!res.data) return
            if (res.status == 200) {
              this.ruleForm = res.data
              let data = {
                proId: this.ruleForm.proId,
                inquiryCode: this.ruleForm.inquiryCode
              }
              getOfferPriceDetail(data).then(res => {
                if (res.status == 200) {
                  this.chooseList = {
                    data: res.data.rows,
                    total: res.data.total
                  }
                }
              }).catch(err => {
                console.log(err, 'err')
              })
            }
            this.ruleForm.compareDate = strToTime(res.data.compareDate)
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      //查看比选列表详情
      getOfferPriceDetailList(page, fuzzy, code) {
        let data = {
          proId: this.ruleForm.proId ? this.ruleForm.proId : 0,
          page: page,
          limit: 100000,
          fuzzy: fuzzy,
          validateStatus: 1,
          inquiryCode: code
        }
        getOfferPriceDetailList(data).then(res => {
          this.chooseList.data = res.data.rows
          this.chooseList.total = res.data.total
        }).catch(err => {
          console.log(err.message)
        })
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
      //獲取字典
      getDiction() {
        //階段
        getDictionaryDataByTypeFilter("BPMA_PRO_WAY")
          .then(res => {
            if (res.status == 200) {
              this.trackType = res.data;
            }
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
        getDictionaryDataByTypeFilter("SYS_INVOICE_TYPE")
          .then(res => {
            if (res.status == 200) {
              this.invoices = res.data;
            }
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
        getDictionaryDataByTypeFilter("SYS_SEND_GOODS")
          .then(res => {
            if (res.status == 200) {
              this.sendType = res.data;
            }
          })
          .catch(err => {
            this.$message.warning(err.message);
          });

      },
      //新增
      addClick() {
        this.ruleForm = {
          id: "",
          validateStatus: 2,
          name: "供方比选单",
          proCode: this.ruleForm.proCode,
          proId: this.ruleForm.proId,
          proName: this.ruleForm.proName,
          person: this.$store.state.user.login.username,
          inquiryCode: '',
          firstEnterprise: '',
          firstOfferCode: '',
          firstOfferPrice: '0.00',
          secondEnterprise: '',
          secondOfferCode: '',
          secondOfferPrice: '0.00',
          thirdEnterprise: '',
          thirdOfferCode: '',
          thirdOfferPrice: '0.00',
          date: new Date().getTime(),
        };
        this.itemId = "";
        this.$store.dispatch("setTrackId", "");
      },
      //保存
      save(formName, lock) {
        new Promise((reslove, reject) => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              this.ruleForm.proCode = this.proObj.code ? this.proObj.code : this.ruleForm.proCode;
              this.ruleForm.proId = this.proObj.id ? this.proObj.id : this.ruleForm.proId;
              this.ruleForm.proName = this.proObj.name ? this.proObj.name : this.ruleForm.proName;
              this.ruleForm.firstOfferPrice = Number(this.ruleForm.firstOfferPrice);
              this.ruleForm.secondOfferPrice = Number(this.ruleForm.secondOfferPrice);
              this.ruleForm.thirdOfferPrice = Number(this.ruleForm.thirdOfferPrice);
              if (!this.ruleForm.proName) {

                return;
              }
              add(this.ruleForm)
                .then(res => {
                  if (res.status == 200) {
                    if(!lock) this.$message.success(res.message);
                    this.itemId = res.data.id;
                    this.ruleForm.id =
                      res.data.id;
                    this.$store.dispatch(
                      "setTrackId",
                      res.data.id
                    );
                    if (!this.$refs.refBasicUpload.submitUpload(this.ruleForm.id)) return false;
                    reslove()
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
            let data = this.ruleForm;
            auditTrack(data)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.getDetail();
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
      toipClick(type) {
        if (this.isAudit) return
        this.type = type
        if (type == 'inquiry' && !this.ruleForm.proId) return this.$message.warning('请先选择项目')
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      handleChange() {
        const row = this.selectedRow
        // if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm, 'proName', row.name)
            this.$set(this.ruleForm, 'proId', row.id)
            this.$set(this.ruleForm, 'proCode', row.code)
            this.$set(this.ruleForm, 'inquiryEnterprise', '')
            this.$set(this.ruleForm, 'inquiryCode', '')
            this.chooseList.data = []
            this.chooseList.total = 0
            break
          case 'inquiry':
            this.$set(this.ruleForm, 'inquiryEnterprise', row.enterprise)
            this.$set(this.ruleForm, 'inquiryCode', row.code)
            this.getOfferPriceDetailList(1, '', row.code)
            break
        }
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      clickByDialogAddData(type, status) {
        this.type = type;
        this.dialogTableVisible = true;
        setTimeout(() => {
          if (type == "goodsItem") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(1, 1);
            this.$refs.refMaterialContract.title = "引入物资-选择";
            this.$refs.refMaterialContract.type = 1;
            this.$refs.refMaterialContract.treeColumns = columnsData.materialTypeColumns;
            this.$refs.refMaterialContract.columns = columnsData.materialColumns;
          } else if (type == "proName") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(2, 1);
            this.$refs.refMaterialContract.title = "项目列表";
            this.$refs.refMaterialContract.type = 2;
            this.$refs.refMaterialContract.columns = columnsData.itemColumns;
            //  }
          } else if (type == "inquiryCode") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(3, 1);
            this.$refs.refMaterialContract.title = "询价列表";
            this.$refs.refMaterialContract.type = 3;
            this.$refs.refMaterialContract.columns = columnsData.inquiryColumns;
            //  }
          } else if (type == "enterprise") {
            if (!this.ruleForm.inquiryCode) return this.$message.warning('请先选择询价单号')
            this.$refs.refMaterialContract.openDialog();
            this.getContract(4, 1);
            this.$refs.refMaterialContract.title = "备选单位列表";
            if (status == 'firstEnterprise') {
              this.$refs.refMaterialContract.type = 4;
            } else if (status == 'secondEnterprise') {
              this.$refs.refMaterialContract.type = 5;
            } else {
              this.$refs.refMaterialContract.type = 6;
            }
            this.$refs.refMaterialContract.columns = columnsData.enterpriseColumns;
            //  }
          }
        }, 300);
      },
      getContract(num, page, fuzzy) {
        if (num == 1) {
          this.getMaterialType();
        } else if (num == 2) {
          let data = {
            page: page,
            limit: 10,
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
            proId: this.ruleForm ? this.ruleForm.proId : '',
            page: page,
            limit: 10,
            fuzzy: fuzzy,
            validateStatus: 1
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
        } else if (num == 4) {
          let data = {
            page: page,
            limit: 10,
            fuzzy: fuzzy,
            validateStatus: 1,
            inquiryCode: this.ruleForm.inquiryCode
          }
          getUnitInfoList(data).then((res) => {
            if (res.status == 200) {
              if (res.data.rows) {
                this.$refs.refMaterialContract.tableData = res.data.rows;
                this.$refs.refMaterialContract.page.total = res.data.total;
              } else {
                this.$refs.refMaterialContract.tableData = res.data;
                this.$refs.refMaterialContract.page.total = res.data.length;
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        }

        return true;
      },
      currentPage(pages, n) {
        this.getContract(n, pages.page, pages.limit)
      },
      //获取字典类别
      getMaterialType() {
        var params = {
          validateStatus: 1,
          enable: 1
        };
        getMaterial(params)
          .then(res => {
            if (!this.$utils.isEmpty(res.data)) {
              this.$refs.refMaterialContract.treeTableData = res.data;
              this.$nextTick(function () {
                this.$refs.refMaterialContract.checkTreeOne(res.data[0]);
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      changeOpera(v) {
        if (v == 2) {
          this.ruleForm.changeType = "";
          this.ruleForm.formId = "";
          this.ruleForm.formCode = "";
        }
      },
      changeType(v) {
        this.ruleForm.formId = "";
        this.ruleForm.formCode = "";
      },
      getCheckTree(v) {
        if (v) {
          this.selectDiction(v.code);
        }
      },
      //查询字典列表
      selectDiction(typeCode) {
        let data = {
          typeCode: typeCode,
          limit: this.page.pageSize,
          page: this.page.page
        };
        this.page.currentPage = 1;

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
        if (v[1] == 2) {
          this.ruleForm.proName = v[0].name;
          this.ruleForm.proCode = v[0].code;
          this.ruleForm.proId = v[0].id;
          this.proObj = v[0];

        } else if (v[1] == 3) {
          this.ruleForm.inquiryCode = v[0].code;
          this.ruleForm.inquiryEnterprise = v[0].enterprise;
          this.ruleForm.firstEnterprise = ''
          this.ruleForm.firstOfferCode = ''
          this.ruleForm.firstOfferPrice = ''
          this.ruleForm.firstEnterpriseId = ''
          this.ruleForm.secondEnterprise = ''
          this.ruleForm.secondOfferCode = ''
          this.ruleForm.secondOfferPrice = ''
          this.ruleForm.secondEnterpriseId = ''
          this.ruleForm.thirdEnterprise = ''
          this.ruleForm.thirdOfferCode = ''
          this.ruleForm.thirdOfferPrice = ''
          this.ruleForm.thirdEnterpriseId = ''
          if (v[0].id) {
            let data = {
              proId: this.ruleForm.proId,
              inquiryCode: v[0].code
            }
            getOfferPriceDetail(data).then(res => {
              if (res.status == 200) {
                this.chooseList = {
                  data: res.data.rows,
                  total: res.data.total
                }
              }
            }).catch(err => {
              console.log(err, 'err')
            })
          }
        } else if (v[1] == 4) {
          if (this.ruleForm.secondEnterpriseId == v[0].id || this.ruleForm.thirdEnterpriseId == v[0].id) return this.$message.warning('该单位已在备选单位')
          this.ruleForm.firstEnterprise = v[0].enterprise;
          this.ruleForm.firstOfferCode = v[0].code;
          this.ruleForm.firstOfferPrice = v[0].price;
          this.ruleForm.firstEnterpriseId = v[0].id;
        } else if (v[1] == 5) {
          if (this.ruleForm.firstEnterpriseId == v[0].id || this.ruleForm.thirdEnterpriseId == v[0].id) return this.$message.warning('该单位已在备选单位')
          this.ruleForm.secondEnterprise = v[0].enterprise;
          this.ruleForm.secondOfferCode = v[0].code;
          this.ruleForm.secondOfferPrice = v[0].price;
          this.ruleForm.secondEnterpriseId = v[0].id;
        } else if (v[1] == 6) {
          if (this.ruleForm.secondEnterpriseId == v[0].id || this.ruleForm.firstEnterpriseId == v[0].id) return this.$message.warning('该单位已在备选单位')
          this.ruleForm.thirdEnterprise = v[0].enterprise;
          this.ruleForm.thirdOfferCode = v[0].code;
          this.ruleForm.thirdOfferPrice = v[0].price;
          this.ruleForm.thirdEnterpriseId = v[0].id;
        }
      },
      handleSelectionChange(obj) {
        if (obj.length > 0) {
          this.selectArray = obj
        } else {
          this.selectArray = []
        }
      },
    },
    computed: {
      isAudit() {
        if (this.ruleForm.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      isAudit2() {
        if (
          this.itemId != "" &&
          this.ruleForm.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      }
    },
    components: {
      addItem,
      bringElement,
      dialogProject,
      dialogInquiry
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      this.getDiction();
      this.getEnumData(['GetAmTransportModeEnum', "GetValidateStatusData", "GetIsOrNotData"])
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.addClick()
      }, async id => {
        this.dictionary = this.$store.state.common.dataEnum;
        if (this.$route.params.id) {
          this.$store.dispatch("setTrackId", this.$route.params.id);
          this.itemId = this.$route.params.id;
        } else {
          this.itemId = this.$store.getters.getTrackId;
        }
        if (this.$route.params.proObj) {
          this.proObj = this.$route.params.proObj;
          this.ruleForm.proName = this.$route.params.proObj.name;
          this.ruleForm.proId = this.$route.params.proObj.id;
        }
        if (this.itemId) {
          this.getDetail();
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
  };
</script>

<style scoped>
</style>
