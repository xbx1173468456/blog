<template>
  <div class="workDetail-container-list mt10">
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
          <el-form :model="ruleForm.bpmaMaterialInquiryMaster" :rules="rules" ref="ruleForm" label-width="120px"
            class="demo-ruleForm form-container">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="审核状态" prop="validateStatus">
                  <el-input clearable size="small"
                    v-model="ruleForm.bpmaMaterialInquiryMaster.validateStatus ==1?'已审核':'未审核'" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据编码" prop="code">
                  <el-input placeholder="默认生成单据编码" v-model="ruleForm.bpmaMaterialInquiryMaster.code" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据名称" prop="name">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInquiryMaster.name" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="项目名称" prop="proName">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称"
                    v-model="ruleForm.bpmaMaterialInquiryMaster.proName" size="small">
                    <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="询价单位" prop="enterprise">
                  <el-input placeholder="询价单位" v-model="ruleForm.bpmaMaterialInquiryMaster.enterprise"
                    :disabled="isAudit" maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="报价截止日期" prop="offerExpiryDate" class="showTime">
                  <el-date-picker size="small" :editable="false" :disabled="isAudit"
                    v-model="ruleForm.bpmaMaterialInquiryMaster.offerExpiryDate" type="datetime"
                    format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期">
                  </el-date-picker>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="询价人员" prop="person">
                  <el-input placeholder="询价人员" v-model="ruleForm.bpmaMaterialInquiryMaster.person" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="联系电话" prop="telephone">
                  <el-input placeholder="联系电话" v-model="ruleForm.bpmaMaterialInquiryMaster.telephone"
                    :disabled="isAudit" maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="联系邮箱" prop="email">
                  <el-input placeholder="联系邮箱" v-model="ruleForm.bpmaMaterialInquiryMaster.email" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="送货地址" prop="address">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入送货地址"
                    v-model="ruleForm.bpmaMaterialInquiryMaster.address">
                  </el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="文档附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialInquiryMaster.id"
                    :disabled="isAudit">
                  </basic-upload>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="询价说明" prop="inquiryExplain">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入询价说明"
                    v-model="ruleForm.bpmaMaterialInquiryMaster.inquiryExplain">
                  </el-input>
                </basic-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <el-row class="mt10">
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
        <basic-table ref="refMaterialRequireTable" :dataTable="showItemsData" :columns="columns"
          @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter" :height="320">
          <template slot-scope="obj" slot="applySum">
            <basic-input clearable size="small"  :format="formatToThousandsFour"
              :formatValue="formatToMoneyFour" v-model="obj.scope.row.applySum" placeholder="请输入拟采数量" :min="0.0000"
              :disabled="isAudit" price></basic-input>
          </template>
          <template slot-scope="obj" slot="maxPrice">
            <basic-input clearable size="small"  :format="formatToThousands"
              :formatValue="formatToMoneyFour" v-model="obj.scope.row.maxPrice" placeholder="请输入最高限价" :min="0.00"
              :disabled="isAudit" price></basic-input>
          </template>
          <template slot-scope="obj" slot="summary">
            <basic-input clearable size="small"  v-model="obj.scope.row.summary" placeholder="请输入摘要"
              :disabled="isAudit"></basic-input>
          </template>
        </basic-table>
      </el-row>

      <!-- <bringElement :columns="columns" :tableData="ruleForm.bpmaMaterialInquiryDetails" @handleSelectionChange="handleSelectionChange"></bringElement> -->
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary @selectionChange="selectionChangeCheck" filterValid isShowChecked :materialDictionaryData="ruleForm.bpmaMaterialInquiryDetails"
        v-if="visibleSyncMaterialDictionary"></dialog-material-dictionary>
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
  import formatBasic from "@/utils/mixins/formatBasic";
  import bringElement from './itemTable'
  import {
    tags,
    getEnumData,
    getNowFormatDate,
    strToTime
  } from '@/utils'
  import {
    add,
    getBudgetDetail,
    auditTrack,
    deleteTrack,
    delDetail
  } from '@/api/bpmaManager/goods/purchase/purchaseInquiry/index.js'
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
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  import utils from '@/utils/util.js'
  export default {
    name: 'goodsBudgetDetail',
    mixins: [formatBasic],
    data() {
      var checkProName = (rule, value, callback) => {
        if (value === '') {
          this.borderRed = true
        } else {
          this.borderRed = false
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
      const that = this
      return {
        ruleForm: {
          'bpmaMaterialInquiryMaster': {
            id: '',
            validateStatus: 2, //审核状态
            name: '采购询价单', //单据名称
            proName: '', //项目名称
            proId: '', //项目id
            person: this.$store.state.user.login.username,
            offerExpiryDate: new Date().getTime(), //日期
            enterprise: this.$store.state.user.login.orgName
          },
          'bpmaMaterialInquiryDetails': []
        },
        columns,
        fuzzy: '',
        dialogTableVisible: false,
        visibleSyncProject: false,
        visibleSyncMaterialDictionary: false,
        proObj: {},
        dictionary: {},
        selectArray: [],
        activeNames: ['1'],
        borderRed: false,
        itemId: '',
        rules: {
          proName: [{
            validator: checkProName,
            trigger: 'blur'
          },
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
          telephone: [{ message: ' ', trigger: 'blur', validator: checkPhone, }],
          email: [{ message: ' ', trigger: 'blur', validator: checkEmail, }]
        },
        itemsData: {
          data: [],
          total: 0
        },
        trackType: [],
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
          this.ruleForm.bpmaMaterialInquiryDetails = val.data
        },
        deep: true
      }
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
      handleChange() {
        const row = this.selectedRow
        // if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proCode', row.code)
            break
          case 'materialDictionary':
            let budgetObj = {
              applySum: 0,
              maxPrice: 0,
              summary: ''
            }
            row.forEach(o => {
              (o.materialId = o.id),
                (o.masterId = ""),
                (o.id = ""),
                o = Object.assign(o, budgetObj);
            });
            this.itemsData.data = this.itemsData.data.concat(row)
            // this.itemsData.data = utils.array.unique(this.itemsData.data, 'materialId')
            this.itemsData.total = this.itemsData.data.length
            this.selectedRow = []
            break
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
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
            this.itemsData.data = newGoods
          }
        }).catch(error => {
          console.log(error)
        })
      },
      query() {

      },

      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId).then(res => {
          if(!res.data.bpmaMaterialInquiryMaster) return
          this.ruleForm = res.data
          let date = this.ruleForm.bpmaMaterialInquiryMaster.offerExpiryDate
          this.ruleForm.bpmaMaterialInquiryMaster.offerExpiryDate = date ? strToTime(date) : date
          this.itemsData = {
            data: res.data.bpmaMaterialInquiryDetails,
            total: res.data.bpmaMaterialInquiryDetails.length
          };
        }).catch(err => {
          this.$message.warning(err.message)
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
        getDictionaryDataByTypeFilter('BPMA_PRO_WAY').then(res => {
          if (res.status == 200) {
            this.trackType = res.data
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      //新增
      addClick() {
        this.itemId = ''
        this.$store.dispatch('setTrackId', '')
        this.$store.dispatch("setSelectP", []);
        this.selectArray = {}
        this.itemsData = {
          data: [],
          total: 0
        };
        this.ruleForm = {
          bpmaMaterialInquiryMaster: {
            id: '',
            validateStatus: 2,
            name: '用料预算单',
            code: '',
            proCode: this.proObj.code,
            proId: this.proObj.id,
            proName: this.proObj.name,
            person: this.$store.state.user.login.username,
            date: new Date().getTime(),
            requireExplain: '',
            offerExpiryDate: new Date().getTime(), //日期
            enterprise: this.$store.state.user.login.orgName
          },
          bpmaMaterialInquiryDetails: []
        }

      },
      //保存
      save(formName, lock) {
        return new Promise((reslove, reject) => {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // this.ruleForm.bpmaMaterialInquiryMaster.proCode = this.proObj.code
              // this.ruleForm.bpmaMaterialInquiryMaster.proId = this.proObj.id
              // this.ruleForm.bpmaMaterialInquiryMaster.proName = this.proObj.name
              if (!this.ruleForm.bpmaMaterialInquiryMaster.proName) {
                this.borderRed = true
                return
              }
              this.ruleForm.bpmaMaterialInquiryDetails.sum = Number(this.ruleForm.bpmaMaterialInquiryDetails.sum)

              add(this.ruleForm).then(res => {
                if (res.status == 200) {
                  if(!lock) this.$message.success(res.message)
                  this.itemId = res.data.bpmaMaterialInquiryMaster.id
                  this.ruleForm.bpmaMaterialInquiryMaster.id = res.data.bpmaMaterialInquiryMaster.id
                  this.ruleForm.bpmaMaterialInquiryDetails = res.data.bpmaMaterialInquiryDetails
                  this.itemsData.data = res.data.bpmaMaterialInquiryDetails
                  this.$store.dispatch('setTrackId', res.data.bpmaMaterialInquiryMaster.id)
                  if (!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialInquiryMaster.id)) return false;
                }
                reslove()
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
            if (res.status == 200) {
              this.$message.success(res.message)
              this.itemId = res.data.bpmaMaterialInquiryMaster.id
              this.ruleForm.bpmaMaterialInquiryMaster = res.data.bpmaMaterialInquiryMaster
              this.ruleForm.bpmaMaterialInquiryDetails = res.data.bpmaMaterialInquiryDetails
              this.itemsData.data = res.data.bpmaMaterialInquiryDetails
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
      getContract(num, page, limit, fuzzy) {
        if (!this.ruleForm.bpmaMaterialInquiryMaster.proId && num != 2 && num != 1) {
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
          this.ruleForm.bpmaMaterialInquiryMaster.changeType = ''
          this.ruleForm.bpmaMaterialInquiryMaster.formId = ''
          this.ruleForm.bpmaMaterialInquiryMaster.formCode = ''
        }
      },
      changeType(v) {
        this.ruleForm.bpmaMaterialInquiryMaster.formId = ''
        this.ruleForm.bpmaMaterialInquiryMaster.formCode = ''
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
            applySum: 0,
            maxPrice: 0,
            summary: ''
          }
          v[0].forEach(o => {
            (o.materialId = o.id),
              (o.masterId = ""),
              (o.id = ""),
              o = Object.assign(o, budgetObj);
          });
          var arr = this.ruleForm.bpmaMaterialInquiryDetails.concat(v[0]);
          var result = [];
          var obj = {};
          for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i].materialId]) {
              result.push(arr[i]);
              obj[arr[i].materialId] = true;
            }
          }
          // return
          this.ruleForm.bpmaMaterialInquiryDetails = result;
          this.itemsData = {
            data: result,
            total: result.length
          };
        } else if (v[1] == 2) {
          this.ruleForm.bpmaMaterialInquiryMaster.proName = v[0].name
          this.ruleForm.bpmaMaterialInquiryMaster.proCode = v[0].code
          this.ruleForm.bpmaMaterialInquiryMaster.proId = v[0].id
          this.proObj = v[0]
        } else if (v[1] == 3 || v[1] == 4) {
          this.ruleForm.bpmaMaterialInquiryMaster.formCode = v[0].code
          this.ruleForm.bpmaMaterialInquiryMaster.formId = v[0].id
        }

        this.borderRed = false
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
        if (this.ruleForm.bpmaMaterialInquiryMaster.validateStatus == 1) {
          return true
        } else {
          return false
        }
      },
      isAudit2() {
        if (this.itemId != '' && this.ruleForm.bpmaMaterialInquiryMaster.validateStatus != 1) {
          return false
        } else {
          return true
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
      dialogProject,
      dialogMaterialDictionary,
      bringElement
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      this.getDiction()
      // this.getGoodsList()
      getEnumData(this, ['GetValidateStatusData', 'GetIsOrNotData'])
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
        this.ruleForm.bpmaMaterialInquiryMaster.proName = this.$route.params.proObj.name
        this.ruleForm.bpmaMaterialInquiryMaster.proId = this.$route.params.proObj.id
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
