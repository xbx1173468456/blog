<template>
  <div class="workDetail-container-list mt10">
    <div class="grid-content bg-purple">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>保存
      </el-button>
      <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
      <el-button :disabled="isAudit2" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
    </div>
    <div class="logForm mt10">
      <el-form :model="ruleForm.bpmaMaterialInquiryMaster" :rules="rules" ref="ruleForm" label-width="120px"
        class="demo-ruleForm form-container">
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-form-item label="审核状态" prop="validateStatus">
              <el-input clearable size="small"
                v-model="ruleForm.bpmaMaterialInquiryMaster.validateStatus ==1?'已审核':'未审核'" disabled maxlength="100">
              </el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="单据编码" prop="code">
              <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInquiryMaster.code" disabled
                maxlength="100"></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="变更名称" prop="name">
              <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInquiryMaster.name" :disabled="isAudit"
                maxlength="100"></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-form-item label="项目名称">
              <el-input disabled placeholder="请选择项目名称" v-model="ruleForm.bpmaMaterialInquiryMaster.proName" size="small">
                <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                  :disabled="isAudit" slot="append"></el-button>
              </el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="合同名称" prop="contractName">
              <el-input :disabled="isAudit" readonly placeholder="请选择合同名称" v-model="ruleForm.bpmaMaterialInquiryMaster.contractName" size="small">
                <el-button @click="toipClick('contract')" class="el-button-append" icon="el-icon-plus" size="mini"
                  :disabled="isAudit" slot="append"></el-button>
              </el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="原变更单号" prop="orignalCode">
              <el-input placeholder="原变更单号" v-model="ruleForm.bpmaMaterialInquiryMaster.orignalCode" :disabled="isAudit"
                maxlength="100" clearable size="small"></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-form-item label="变更日期" prop="date" class="showTime">
              <el-date-picker size="small" :editable="false" :disabled="isAudit" v-model="ruleForm.bpmaMaterialInquiryMaster.date"
                type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期">
              </el-date-picker>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="经办人员" prop="handlePerson">
              <el-input placeholder="经办人员" v-model="ruleForm.bpmaMaterialInquiryMaster.handlePerson" :disabled="isAudit"
                maxlength="100" clearable size="small"></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="变更金额">
              <basic-input :disabled="isAudit" :format="formatToThousands" :formatValue="formatToMoney" placeholder="请输入变更金额"
                         v-model="ruleForm.bpmaMaterialInquiryMaster.price" price></basic-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="变更原因" prop="reason">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入变更原因"
                v-model="ruleForm.bpmaMaterialInquiryMaster.reason">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="变更内容" prop="content">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入变更内容"
                v-model="ruleForm.bpmaMaterialInquiryMaster.content">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="变更影响" prop="effect">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入变更影响"
                v-model="ruleForm.bpmaMaterialInquiryMaster.effect">
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
            <basic-form-item label="补充说明" prop="remark">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入补充说明"
                v-model="ruleForm.bpmaMaterialInquiryMaster.remark">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <basic-form-item label="登记人员" prop="inputPerson">
              <el-input clearable size="small" v-model="ruleForm.bpmaMaterialInquiryMaster.inputPerson" disabled>
              </el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="登记时间" prop="inputTime" class="showTime">
              <el-date-picker size="small" v-model="ruleForm.bpmaMaterialInquiryMaster.inputTime" type="datetime"
                disabled placeholder="选择日期">
              </el-date-picker>
            </basic-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <basic-dialog v-el-drag-dialog title="项目名称-选择" :visible.sync="visibleSyncProject">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject" :proId="ruleForm.bpmaMaterialInquiryMaster.proId"></dialog-project>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncContract" title="合同-选择">
      <dialog-material-contract :proId="ruleForm.bpmaMaterialInquiryMaster.proId"
        @selectionChange="selectionChange" filterValid v-if="visibleSyncContract"></dialog-material-contract>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncContract = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- <addItem ref="refMaterialContract" @getCheckTree="getCheckTree" @getItem="getItem" v-show='dialogTableVisible'></addItem> -->
  </div>
</template>

<script>
  import bringElement from '@/views/bpmaManager/goods/components'
  import { tags, getEnumData, getNowFormatDate, strToTime } from '@/utils'
  import { add, getBudgetDetail, auditTrack, deleteTrack, selectGoodsContract, edit } from '@/api/bpmaManager/goods/goodsContract/change/index.js'
  import addItem from './addItem.vue'
  import { getDictionaryDataByTypeFilter } from '@/api/common/dataDictionary.js'
  import { columnsData } from './index.js'
  import { selectListOwn } from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
  import {
    getMaterial,
    getDiction,
  } from '@/api/sysManager/material/dictionary'
  import dialogProject from '@/views/components/dialog/dialogProject'
  import formatBasic from '@/utils/mixins/formatBasic.js'
  import dialogMaterialContract from '@/views/components/dialog/dialogMaterialContract'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  export default {
    name: 'goodsBudgetDetail',
    mixins: [formatBasic, methods, computed],
    data() {
      var checkProName = (rule, value, callback) => {
        if (value === '') {
          this.borderRed = true
        } else {
          this.borderRed = false
          callback();
        }
      };
      var checkContractName = (rule, value, callback) => {
        if (value === '') {
          this.borderRed2 = true
        } else {
          this.borderRed2 = false
          callback();
        }
      };
      return {
        ruleForm: {
          'bpmaMaterialInquiryMaster': {
            id: '',
            validateStatus: 2,//审核状态
            proName: '',//项目名称
            contractName: '',//合同名称
            date: new Date().getTime(),//日期
            inputTime: new Date().getTime(),//日期
            price: '0.00',
            inputPerson: this.$store.state.user.login.inputPersonFullPath,
            handlePerson: this.$store.state.user.login.username
          }
        },
        fuzzy: '',
        dialogTableVisible: false,
        visibleSyncProject: false,
        visibleSyncContract: false,
        proObj: {},
        dictionary: {},
        borderRed: false,
        borderRed2: false,
        itemId: '',
        rules: {
          proName: [
            { validator: checkProName, trigger: 'blur' },
            { required: true, message: ' ', trigger: 'change' }
          ],
          contractName: [
            { required: true, message: ' ', trigger: 'change' }
          ],
          name: [
            { required: true, message: ' ', trigger: 'blur' }
          ]
        },
        trackType: [],
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        selectedRow: {}
      }
    },
    methods: {
      formatToMoney(value, num) {
        return Number(value).toFixed(num)
      },
      toFixd(num) {
        this.ruleForm.bpmaMaterialInquiryMaster.price = this.formatToMoney(num, 2)
      },
      //  strToTime(str){
      //       str=str.substring(0,19)
      //       str = str.replace(/-/g,'/');
      //       return new Date(str).getTime();
      //   },
      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId).then(res => {
          this.ruleForm.bpmaMaterialInquiryMaster = res.data
          this.proObj.code = res.data.proCode
          this.proObj.id = res.data.proId
          this.proObj.label = res.data.proLabel
          this.proObj.name = res.data.proName
          this.ruleForm.bpmaMaterialInquiryMaster.date = strToTime(res.data.date)
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'proCode', row.code)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'contractId', '')
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'contractName', '')
            break
          case 'contract':
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'contractId', row.id)
            this.$set(this.ruleForm.bpmaMaterialInquiryMaster, 'contractName', row.name)
            break
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      toipClick(type) {
        if (this.disabled) return
        if (type == 'contract' && !this.ruleForm.bpmaMaterialInquiryMaster.proId) return this.$message.warning('请先选择项目')
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
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
        this.ruleForm.bpmaMaterialInquiryMaster = {
          id: '',
          validateStatus: 2,
          proCode: this.proObj.code,
          proId: this.proObj.id,
          proName: this.proObj.name,
          person: this.$store.state.user.login.username,
          date: new Date().getTime(),
          inputTime: new Date().getTime(),
          price: '0.00',
          inputPerson: this.$store.state.user.login.inputPersonFullPath,
          handlePerson: this.$store.state.user.login.username
        }
        this.itemId = ''
        this.$store.dispatch('setTrackId', '')
      },
      //保存
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm.bpmaMaterialInquiryMaster.proCode = this.proObj.code
            this.ruleForm.bpmaMaterialInquiryMaster.proId = this.proObj.id
            this.ruleForm.bpmaMaterialInquiryMaster.proName = this.proObj.name
            if (!this.ruleForm.bpmaMaterialInquiryMaster.proName) {
              this.borderRed = true
              return
            }
            // return
            if (this.ruleForm.bpmaMaterialInquiryMaster.id) {
              edit(this.ruleForm.bpmaMaterialInquiryMaster).then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message)
                  this.itemId = res.data.id
                  this.ruleForm.bpmaMaterialInquiryMaster.id = res.data.id
                  this.$store.dispatch('setTrackId', res.data.id)
                  if(!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialInquiryMaster.id)) return false;
                }
              }).catch(err => {
                this.$message.warning(err.message)
              })
            } else {
              add(this.ruleForm.bpmaMaterialInquiryMaster).then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message)
                  this.itemId = res.data.id
                  this.ruleForm.bpmaMaterialInquiryMaster.id = res.data.id
                  this.$store.dispatch('setTrackId', res.data.id)
                  if(!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialInquiryMaster.id)) return false;
                }
              }).catch(err => {
                this.$message.warning(err.message)
              })
            }

            // }
          } else {
            return false;
          }
        });
      },
      //审核
      audit() {
        this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let data = this.ruleForm.bpmaMaterialInquiryMaster
          auditTrack(data).then(res => {
            if (res.status == 200) {
              this.$message.success(res.message)
              this.getDetail()
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
          if (type == 'proName') {
            this.$refs.refMaterialContract.openDialog()
            this.getContract(2, 1)
            this.$refs.refMaterialContract.title = '项目列表'
            this.$refs.refMaterialContract.type = 2
            this.$refs.refMaterialContract.columns = columnsData.itemColumns
            //  }
          } else if (type == 'contractName') {
            this.$refs.refMaterialContract.openDialog()
            this.getContract(1, 1)
            this.$refs.refMaterialContract.title = '合同列表'
            this.$refs.refMaterialContract.type = 3
            this.$refs.refMaterialContract.columns = columnsData.formCodeColumns
            //  }
          }
        }, 300);
      },
      getContract(num, page, fuzzy) {
        console.log(num)
        if (!this.ruleForm.bpmaMaterialInquiryMaster.proId && num != 2 && num != 1) {
          this.$message.warning('请先选择项目')
          this.borderRed = true
          return false
        } else {
          if (num == 1) {
            this.getMaterialType()
          } else if (num == 2) {
            let data = {
              page: page,
              limit: 10,
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
      getMaterialType() {
        console.log('wuzhi')
        var params = {
          validateStatus: 2,
          type: 2
        }
        selectGoodsContract(params).then((res) => {
          console.log(res)
          if (res.status == 200) {
            this.$refs.refMaterialContract.tableData = res.data.rows
            this.$refs.refMaterialContract.page.total = res.data.total
            // this.$nextTick(function () {
            //   this.$refs.refMaterialContract.checkTreeOne(res.data[0])
            // });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      changeOpera(v) {
        console.log(v, 'vvvv')
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
      getCheckTree(v) {
        console.log(v, '...')
        if (v) {
          this.selectDiction(v.code)
        }
      },
      //查询字典列表
      selectDiction(typeCode) {
        let data = {
          typeCode: typeCode,
          limit: this.page.pageSize,
          page: this.page.page
        }
        this.page.currentPage = 1

        getDiction(data).then((res) => {
          this.$refs.refMaterialContract.tableData = res.data.rows
          this.$refs.refMaterialContract.page.total = res.data.total

          // this.tableData.data = res.data.rows
          // this.page.total = res.data.total;
          // this.$refs.singleTable.setCurrentRow(this.tableData.data[0]);
        }).catch((err) => {
          console.log(err)
        })
      },
      getItem(v) {
        if (v[1] == 2) {
          this.ruleForm.bpmaMaterialInquiryMaster.proName = v[0].name
          this.ruleForm.bpmaMaterialInquiryMaster.proCode = v[0].code
          this.ruleForm.bpmaMaterialInquiryMaster.proId = v[0].id
          this.proObj = v[0]
          this.borderRed = false
        } else if (v[1] == 3) {
          this.ruleForm.bpmaMaterialInquiryMaster.contractName = v[0].name
          this.ruleForm.bpmaMaterialInquiryMaster.contractCode = v[0].code
          this.ruleForm.bpmaMaterialInquiryMaster.contractId = v[0].id
          this.borderRed2 = false
        }


      },
      handleSelectionChange(o) {
        let budgetObj = {
          sum: '',
          unitPrice: '',
          totalPrice: '',
          position: '',
          summary: ''
        }
        o.forEach(v => {
          v = Object.assign(v, budgetObj)
        });
        console.log(o)
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
      }

    },
    components: {
      dialogProject,
      dialogMaterialContract
    },

    created() {
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
      this.$store.dispatch("cacheId", undefined)
    }
  }
</script>
<style scoped>
</style>
