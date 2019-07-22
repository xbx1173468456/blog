<template>
  <div class="workDetail-container-list mt10">
    <basic-handler>
      <el-button v-if="isUpdateAuthWorkFlow" type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>
        保存
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
      <el-button v-if="isUpdateAuthWorkFlow" :disabled="isAudit" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
      <basic-see-process v-if="isUpdateAuthWorkFlow" :id="ruleForm.bpmaMaterialApplyMaster.processInstanceId"></basic-see-process>
    </basic-handler>
    <div class="logForm mt10">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-form :model="ruleForm.bpmaMaterialApplyMaster" :rules="rules" ref="ruleForm" label-width="120px"
            class="demo-ruleForm form-container">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-validate-status :model="ruleForm.bpmaMaterialApplyMaster"></basic-validate-status>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据编码" prop="code">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialApplyMaster.code" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据名称" prop="name">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialApplyMaster.name" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="项目名称" prop="proName">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称"
                    v-model="ruleForm.bpmaMaterialApplyMaster.proName" size="small">
                    <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="申请人员" prop="handlePerson">
                  <el-input placeholder="申请人员" v-model="ruleForm.bpmaMaterialApplyMaster.handlePerson"
                    :disabled="isAudit" maxlength="100" size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="申请总额" prop="price">
                  <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
                    v-model="ruleForm.bpmaMaterialApplyMaster.price" :min="0" disabled price></basic-input>
                  <!-- <el-input placeholder="申请总额" type='number' v-model="ruleForm.bpmaMaterialApplyMaster.price" @blur="fprice('price',$event,2)" :disabled="isAudit" :min="0" clearable maxlength="100"></el-input> -->
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="文档附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialApplyMaster.id" :disabled="isAudit">
                  </basic-upload>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="申请说明" prop="applyExplain">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入申请说明"
                    v-model="ruleForm.bpmaMaterialApplyMaster.applyExplain" size="small">
                  </el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="16">
                <basic-form-item label="登记人员">
                  <basic-input disabled placeholder="自动生成登记人员" v-model="ruleForm.bpmaMaterialApplyMaster.inputPerson">
                  </basic-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="登记时间">
                  <basic-input disabled placeholder="自动生成登记时间" v-model="ruleForm.bpmaMaterialApplyMaster.inputTime">
                  </basic-input>
                </basic-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-row class="mt10">
        <basic-handler>
          <el-button type="primary" size="small" icon="el-icon-plus" @click="toipClick('materialDictionary')"
            :disabled="isAudit" plain>引入物资</el-button>
          <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
            :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除</el-button>
          <!-- <template slot="search">
            <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
              @clickSearchFilter="clickSearchFilter"></basic-search>
          </template> -->
        </basic-handler>
        <basic-table ref="refMaterialRequireTable" :dataTable="showItemsData" :columns="columns"
          @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter" :height="320">
          <template slot-scope="obj" slot="budgetSum">
            <basic-input clearable size="small" :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
              v-model="obj.scope.row.budgetSum" placeholder="请输入数量" :min="0.0000" disabled price></basic-input>
          </template>
          <template slot-scope="obj" slot="applyedSum">
            <basic-input clearable size="small" :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
              v-model="obj.scope.row.applyedSum" placeholder="请输入数量" :min="0.0000" disabled price></basic-input>
          </template>
          <template slot-scope="obj" slot="remainSum">
            <basic-input clearable size="small" :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
              v-model="obj.scope.row.remainSum" placeholder="请输入数量" :min="0.0000" disabled price></basic-input>
          </template>
          <template slot-scope="obj" slot="sum">
            <basic-input clearable size="small" :format="formatToThousandsFour" :formatValue="formatToMoneyFour"
              v-model="obj.scope.row.sum" placeholder="请输入数量" :min="0.0000" :disabled="isAudit"
              @change="sumChange(obj.scope.row)" price></basic-input>
          </template>
          <template slot-scope="obj" slot="unitPrice">
            <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
              v-model="obj.scope.row.unitPrice" :disabled="isAudit" @change="sumChange(obj.scope.row)" price></basic-input>
          </template>
          <template slot-scope="obj" slot="totalPrice">
            <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
              v-model="obj.scope.row.totalPrice" disabled price></basic-input>
          </template>
          <template slot-scope="obj" slot="invoiceTaxRate">
            <el-form :model="obj.scope.row" :rules="rules" :ref="'refFormTaxRate' + obj.scope.$index">
              <basic-form-item prop="invoiceTaxRate" labelWidth="0px">
                <basic-input clearable size="small" :format="formatToThousands" :formatValue="formatToMoney"
                  v-model="obj.scope.row.invoiceTaxRate" :disabled="isAudit" price></basic-input>
              </basic-form-item>
            </el-form>
          </template>
          <template slot-scope="obj" slot="positon">
            <basic-input clearable size="small" v-model="obj.scope.row.positon" placeholder="请输入用料部位"
              :disabled="isAudit"></basic-input>
          </template>
          <template slot-scope="obj" slot="remark">
            <basic-input clearable size="small" v-model="obj.scope.row.remark" placeholder="请输入摘要" :disabled="isAudit">
            </basic-input>
          </template>
          <template slot-scope="obj" slot="invoiceType">
            <el-select v-model="obj.scope.row.invoiceType" placeholder="请选择" :disabled="isAudit" size="small">
              <el-option v-for="item in trackType" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
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
      <dialog-material-dictionary @selectionChange="selectionChangeCheck" filterValid isShowChecked
        :materialDictionaryData="ruleForm.bpmaMaterialApplyDetails" v-if="visibleSyncMaterialDictionary">
      </dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getItem" v-show='dialogTableVisible'
      @currentPage="currentPage"></addItem> -->
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import bringElement from "./itemTable";
  import {
    tags,
    getEnumData,
    getNowFormatDate
  } from '@/utils'
  import {
    add,
    getBudgetDetail,
    auditTrack,
    deleteTrack,
    getMaterialUseInfo,
    delDetail
  } from '@/api/bpmaManager/goods/purchase/purchaseApplication/index.js'
  import addItem from './addItem.vue'
  import {
    getDictionaryDataByTypeFilter
  } from '@/api/common/dataDictionary.js'
  import columns from './columns.json'
  import {
    columnsData
  } from './index.js'
  import {
    selectListOwn
  } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import {
    getMaterial,
    getDiction,
  } from '@/api/sysManager/material/dictionary'
  import {
    connect
  } from 'net';
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  export default {
    name: 'goodsBudgetDetail',
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      var checkProName = (rule, value, callback) => {
        if (value === '') {
          this.borderRed = true
        } else {
          this.borderRed = false
          callback();
        }
      };
      const that = this
      return {
        ruleForm: {
          'bpmaMaterialApplyMaster': {
            id: '',
            validateStatus: 2, //审核状态
            name: '采购申请单', //单据名称
            price: 0,
            handlePerson: this.$store.state.user.login.username,
            proName: '', //项目名称
            proId: '', //项目id
          },
          'bpmaMaterialApplyDetails': []
        },
        columns,
        fuzzy: '',
        dialogTableVisible: false,
        visibleSyncProject: false,
        visibleSyncMaterialDictionary: false,
        proObj: {},
        dictionary: {},
        selectArray: {},
        activeNames: ['1'],
        borderRed: false,
        itemId: '',
        rules: {
          proName: [
            {
              required: true,
              message: ' ',
              trigger: 'change'
            }
          ],
          name: [{
            required: true,
            message: ' ',
            trigger: 'blur'
          }],
          invoiceTaxRate: [{ validator: that.validatePass, trigger: 'change' }],
        },
        trackType: [],
        itemsData: {
          data: [],
          total: 0
        },
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: "",
          fuzzyKeys: ""
        }
      }
    },
    watch: {
      itemsData: {
        handler(val) {
          this.ruleForm.bpmaMaterialApplyDetails = val.data
        },
        deep: true
      }
    },
    props: {
      isUpdateAuthWorkFlow: {
        type: Boolean,
        default: () => true
      },
      reserve: null
    },
    methods: {
      sumChange(data) {
        if (data.invoiceTaxRate > 1) {
          data.invoiceTaxRate = 0
        }
        data.totalPrice = this.$utilsBasic.toMoney(data.sum * data.unitPrice, 2);
        let arr = this.showItemsData.data;
        let bTotalPrice = 0;
        arr.forEach(item => {
          bTotalPrice += Number(item.totalPrice);
        });
        this.ruleForm.bpmaMaterialApplyMaster.price = this.$utilsBasic.toMoney(bTotalPrice, 2);
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
          } else {
            let newGoods = allGoods.filter(item => {
              return item !== obj
            })
            this.ruleForm.bpmaMaterialApplyDetails = newGoods
            this.itemsData.data = newGoods
            if (this.ruleForm.bpmaMaterialApplyDetails[0]) {
              this.sumChange(this.ruleForm.bpmaMaterialApplyDetails[0])
            } else {
              this.ruleForm.bpmaMaterialApplyMaster.price = this.$utilsBasic.toMoney(0, 2);
            }
          }
        }).catch(error => {
          console.log(error)
        })
      },
      toipClick(type) {
        if (this.isAudit) return
        if (type == 'materialDictionary' && !this.ruleForm.bpmaMaterialApplyMaster.proId) return this.$message.warning('请先选择项目！')
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      query() {

      },
      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId).then(res => {
          if (!res.data.bpmaMaterialApplyMaster) return
          this.ruleForm = res.data
          this.itemsData = {
            data: res.data.bpmaMaterialApplyDetails,
            length: res.data.bpmaMaterialApplyDetails.length
          }
          this.proObj = {
            code: res.data.bpmaMaterialApplyMaster.proCode,
            id: res.data.bpmaMaterialApplyMaster.proId,
            label: res.data.bpmaMaterialApplyMaster.proLabel,
            name: res.data.bpmaMaterialApplyMaster.proName
          }
          this.$store.dispatch("setSelectP", res.data.bpmaMaterialApplyDetails);
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(
          this.$refs.refMaterialRequireTable,
          this.modelSearchFilter,
          () => {
            // this.getDetail();
          }
        );
      },
      //獲取字典
      getDiction() {
        //階段
        getDictionaryDataByTypeFilter('SYS_INVOICE_TYPE').then(res => {
          if (res.status == 200) {
            this.trackType = res.data
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      //新增
      addClick() {
        this.ruleForm.bpmaMaterialApplyMaster = {
          id: '',
          validateStatus: 2,
          name: '采购申请单',
          price: 0,
          proCode: this.proObj.code,
          proId: this.proObj.id,
          handlePerson: this.$store.state.user.login.username,
          proName: this.proObj.name,
        }
        this.itemsData = {
          data: [],
          total: 0
        };
        this.ruleForm.bpmaMaterialApplyDetails = []
        this.itemId = ''
        this.$store.dispatch('setTrackId', '')
        this.$store.dispatch("setSelectP", []);
      },
      handleChange() {
        const row = this.selectedRow
        // if(!this.isSelectedRows(row)) return false;
        if (Object.keys(row).length === 0) return this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm.bpmaMaterialApplyMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialApplyMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialApplyMaster, 'proCode', row.code)
            break
          case 'materialDictionary':
            // this.itemsData.data = this.itemsData.data.concat(row)
            let budgetObj = {
              sum: 0,
              unitPrice: 0,
              totalPrice: 0,
              invoiceTaxRate: 0,
              invoiceType: '',
              positon: '',
              remark: '',
              proId: this.ruleForm.bpmaMaterialApplyMaster.proId
            };
            row.forEach(item => {
              item.materialId = item.id
              item.masterId = ''
              item.masterName = item.name
              item.id = ''
              item = Object.assign(item, budgetObj);
            })
            getMaterialUseInfo(row).then(res => {
              var arr = res.data
              var result = []
              var obj = {}
              for (var i = 0; i < arr.length; i++) {
                arr[i].sum = 0
                arr[i].unitPrice = 0
                arr[i].totalPrice = 0
                arr[i].invoiceTaxRate = 0
                if (!obj[arr[i].materialId]) {
                  result.push(arr[i]);
                  obj[arr[i].materialId] = true;
                }
              }
              this.selectedRow = []
              this.itemsData.data = this.itemsData.data.concat(result)
            }).catch(err => {
              console.log(err)
            })
            break
        }
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      //保存
      save(formName, locked) {
        return new Promise((reslove, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let lock = true
              this.ruleForm.bpmaMaterialApplyDetails.forEach((item, idx) => {
                this.$refs['refFormTaxRate' + idx].validate(result => {
                  if(!result) {
                    lock = result
                  }
                })
              })
              if (!lock) {
                this.$message.warning('亲，请先完善和修正错误数据！')
                return this.$nextTick(() => document.querySelector('.is-error input,.is-error textarea').focus())
              }
              // this.ruleForm.bpmaMaterialApplyMaster.proCode = this.proObj.code
              // this.ruleForm.bpmaMaterialApplyMaster.proId = this.proObj.id
              // this.ruleForm.bpmaMaterialApplyMaster.proName = this.proObj.name
              // if (!this.ruleForm.bpmaMaterialApplyMaster.proName) {
              //   this.borderRed = true
              //   return
              // }
              // this.ruleForm.bpmaMaterialApplyDetails=this.itemsData.data
              add(this.ruleForm).then(res => {
                if (res.status == 200) {
                  if (!locked) {
                    this.$message.success(res.message)
                  }
                  this.itemId = res.data.bpmaMaterialApplyMaster.id
                  this.ruleForm.bpmaMaterialApplyMaster = res.data.bpmaMaterialApplyMaster
                  this.ruleForm.bpmaMaterialApplyDetails = res.data.bpmaMaterialApplyDetails
                  this.$store.dispatch('setTrackId', res.data.bpmaMaterialApplyMaster.id)
                  this.$store.dispatch("setSelectP", []);
                  if (!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialApplyMaster.id)) return false;
                  reslove()
                }
              }).catch(err => {
                this.$message.warning(err.message)
              })
              // }
            } else {
              return false;
            }
          });
        })
      },
      //审核
      audit() {
        this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.save('ruleForm', true)
          auditTrack(this.ruleForm).then(res => {
            this.itemId = res.data.bpmaMaterialApplyMaster.id
            this.ruleForm.bpmaMaterialApplyMaster = res.data.bpmaMaterialApplyMaster
            this.ruleForm.bpmaMaterialApplyDetails = res.data.bpmaMaterialApplyDetails
            if(res.data.bpmaMaterialApplyMaster.processInstanceId) {
              return this.$store.dispatch('OpenSelectUserAndHandleAudit', {
                processId: res.data.bpmaMaterialApplyMaster.processInstanceId,
                formData: res.data.bpmaMaterialApplyMaster
              }).then(() => {
                this.$message.success(res.message);
              })
            } else {
              this.$message.success(res.message)
            }
          }).catch(err => {
            this.$message.warning(err.message)
          })
        }).catch((err) => {
          this.$message.warning(err.message)
        });
      },
      //删除
      del() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.itemId
          deleteTrack(id).then(res => {
            if (res.status == 200) {
              this.$message.success(res.message)
              this.addClick()
            }
          }).catch(err => {
            this.$message.warning(err.message)
          })
        }).catch(() => {

        });
      },
      clickByDialogAddData(type) {
        this.type = type
        this.dialogTableVisible = true
        setTimeout(() => {
          if (type == "goodsItem") {
            if (Object.keys(this.proObj).length == 0) {
              this.$message.warning('请先选择项目')

              return
            }
            this.$refs.refMaterialContract.openDialog()
            this.getContract(1, 1, 10)
            this.$refs.refMaterialContract.title = '引入物资-选择'
            this.$refs.refMaterialContract.type = 1
            this.$refs.refMaterialContract.treeColumns = columnsData.materialTypeColumns
            this.$refs.refMaterialContract.columns = columnsData.materialColumns

          } else if (type == 'proName') {
            this.$refs.refMaterialContract.openDialog()
            this.getContract(2, 1, 10)
            this.$refs.refMaterialContract.title = '项目列表'
            this.$refs.refMaterialContract.type = 2
            this.$refs.refMaterialContract.columns = columnsData.itemColumns
            //  }
          }
        }, 300);
      },
      validatePass(rule, value, callback) {
        value = Number(value)
        if (value < 0 || value > 1) {
          callback(new Error())
        }
        callback()
      },
      getContract(num, page, limit, fuzzy) {
        if (!this.ruleForm.bpmaMaterialApplyMaster.proId && num != 2 && num != 1) {
          this.$message.warning('请先选择项目')
          this.borderRed = true
          return false
        } else {
          if (num == 1) {
            this.getMaterialType(num, page, limit)
          } else if (num == 2) {
            let data = {
              page: page,
              limit: limit,
              fuzzy: fuzzy
            }
            selectListOwn(data).then(res => {
              if (res.status == 200) {
                if (res.data.rows) {
                  this.$refs.refMaterialContract.tableData = res.data.rows
                  this.$refs.refMaterialContract.page.total = res.data.total
                } else {
                  this.$refs.refMaterialContract.tableData = res.data
                  this.$refs.refMaterialContract.page.total = res.data.length
                }
              }
            }).catch(err => {
              this.$message.warning(err.$message)
            })
          }

          return true
        }
      },
      //获取字典类别
      getMaterialType(num, page, limit) {
        var params = {
          validateStatus: 1,
          enable: 1
        }
        getMaterial(params).then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            this.$refs.refMaterialContract.treeTableData = res.data
            this.$refs.refMaterialContract.pagination.page = page;
            this.$refs.refMaterialContract.pagination.limit = limit;
            this.$nextTick(function () {
              this.$refs.refMaterialContract.checkTreeOne(res.data[0])
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeOpera(v) {
        if (v == 2) {
          this.ruleForm.bpmaMaterialApplyMaster.changeType = ''
          this.ruleForm.bpmaMaterialApplyMaster.formId = ''
          this.ruleForm.bpmaMaterialApplyMaster.formCode = ''
        }
      },
      changeType(v) {
        this.ruleForm.bpmaMaterialApplyMaster.formId = ''
        this.ruleForm.bpmaMaterialApplyMaster.formCode = ''
      },
      getCheckTree(v, pagination) {
        if (v) {
          this.selectDiction(v.code, pagination.page, pagination.limit)
        }
      },
      //查询字典列表
      selectDiction(typeCode, page, limit) {
        let data = {
          typeCode: typeCode,
          limit: limit,
          page: page,
          validateStatus: 1
        }
        getDiction(data).then((res) => {
          this.$refs.refMaterialContract.tableData = res.data.rows
          this.$refs.refMaterialContract.page.total = res.data.total
        }).catch((err) => {
          console.log(err)
        })
      },
      getItem(v) {
        if (v[1] == 1) {
          let budgetObj = {
            sum: 0,
            unitPrice: 0,
            totalPrice: 0,
            invoiceTaxRate: 0,
            invoiceType: '',
            positon: '',
            remark: '',
            proId: this.proObj.id
          };
          v[0].forEach(o => {
            o.materialId = o.id
            o.masterId = ''
            o.masterName = o.name
            o.id = ''
            o = Object.assign(o, budgetObj);
          });
          this.itemsData.data = v[0]
          getMaterialUseInfo(v[0]).then(res => {
            if (res.status == 200) {
              // var arr = this.itemsData.data.concat(res.data)
              var arr = res.data
              var result = []
              var obj = {}
              for (var i = 0; i < arr.length; i++) {
                arr[i].sum = 0
                arr[i].unitPrice = 0
                arr[i].totalPrice = 0
                arr[i].invoiceTaxRate = 0
                if (!obj[arr[i].materialId]) {
                  result.push(arr[i]);
                  obj[arr[i].materialId] = true;
                }
              }
              // this.ruleForm.bpmaMaterialApplyDetails = result
              this.itemsData.data = result;
            }
          }).catch(err => {
            console.log(err)
          })

        } else if (v[1] == 2) {
          this.ruleForm.bpmaMaterialApplyMaster.proName = v[0].name
          this.ruleForm.bpmaMaterialApplyMaster.proCode = v[0].code
          this.ruleForm.bpmaMaterialApplyMaster.proId = v[0].id
          this.proObj = v[0]
          this.borderRed = false
        }

      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      selectionChangeCheck(row) {
        this.selectedRow = row.selectedRows
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
    computed: {
      isAudit() {
        let disabled = this.ruleForm.bpmaMaterialApplyMaster.validateStatus
        if(disabled == 5 && this.reserve == 1) return false
        if (disabled == 1 || disabled == 3 || disabled == 4 || disabled == 5) {
          return true
        } else {
          return false
        }
      },
      isAudit2() {
        if (this.itemId != '' && this.ruleForm.bpmaMaterialApplyMaster.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      showItemsData() {
        let data = this.itemsData.data.filter(item => item.persistStatus != 'fdel')
        return {
          data: data,
          total: data.length
        }
      }
    },
    components: {
      dialogProject,
      dialogMaterialDictionary,
      bringElement
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      this.getDiction()
      // this.getGoodsList()
      getEnumData(this, ['GetAuditStatusEnum', 'GetIsOrNotData'])
    },
    activated() {
      this.dictionary = this.$store.state.common.dataEnum
      if (this.$route.params.id) {
        this.$store.dispatch('setTrackId', this.$route.params.id)
        this.itemId = this.$route.params.id
      } else {
        this.itemId = this.$store.getters.getTrackId
      }
      if (this.$route.params.proObj) {
        this.proObj = this.$route.params.proObj
        this.ruleForm.bpmaMaterialApplyMaster.proName = this.$route.params.proObj.name
        this.ruleForm.bpmaMaterialApplyMaster.proId = this.$route.params.proObj.id
      }
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.addClick()
      }, async id => {
        if (this.itemId) {
          this.getDetail()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
  }
</script>

<style scoped>
</style>
