<template>
  <div class="workDetail-container-list">
    <div class="grid-content bg-purple handler-container">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add()" plain>新增日志</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>保存
      </el-button>
      <el-button :disabled="isAudit2" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
      <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
    </div>
    <div class="logForm">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm form-container">
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-form-item label="审核状态" prop="validateStatus">
              <el-select v-model="ruleForm.validateStatus" placeholder="" disabled size="small">
                <el-option v-for="item in jsonString.validateStatus" :key="item.id" :label="item.name"
                  :value="item.id" />
              </el-select>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="日志编码" prop="code">
              <el-input clearable size="small" v-model="ruleForm.code" disabled></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="是否补录" prop="reinput">
              <el-select v-model="ruleForm.reinput" placeholder="" :disabled="isAudit" size="small" @change="ruleForm.reinput == 2 ? ruleForm.workDay = new Date().getTime() : ruleForm.workDay">
                <el-option v-for="item in jsonString.reinput" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <basic-form-item label="接收人员" prop="recvPerson">
              <div class="personWrap">
                <div class="tags">
                  <el-tag v-for="(person, index) in ruleForm.recvPerson.split(',').filter(item => item)" :key="index"
                    :closable="!isAudit" @close="handleClose(index)" type="success">
                    {{person}}
                  </el-tag>
                </div>
                <el-button icon="el-icon-plus" @click="addPerson" class="addPerson" type="primary" :disabled="isAudit"
                  size="mini"></el-button>
              </div>
            </basic-form-item>
            <!-- <basic-form-item label="接收人员" prop="recvPerson1">
              <div class="personWrap" :class="borderRed? 'borderRed':''">
                <div class="tags">
                  <el-tag v-for="person in recvPerson1" :key="person.id" :closable="!isAudit"
                    @close="handleClose(person)" type="success" size="mini">
                    {{person.username}}
                  </el-tag>
                </div>
                <el-button icon="el-icon-plus" @click="addPerson" class="addPerson" type="primary" :disabled="isAudit"
                  size="mini"></el-button>
              </div>
            </basic-form-item> -->
          </el-col>
          <el-col :span="8">
            <basic-form-item label="所属日期" prop="workDay">
              <el-date-picker size="small" v-model="ruleForm.workDay" type="date" :disabled="isAudit || dateDisbel"
                value-format="timestamp" placeholder="选择日期" :picker-options="pickerOptions">
              </el-date-picker>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="今日总结" prop="sumarize">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容" v-model="ruleForm.sumarize">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="明日计划" prop="plan">
              <el-input type="textarea" :disabled="isAudit" maxlength="200" :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容" v-model="ruleForm.plan">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="工作建议" prop="advise">
              <el-input type="textarea" maxlength="100" :disabled="isAudit" :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容" v-model="ruleForm.advise">
              </el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <basic-form-item label="登记人员" prop="inputPerson">
              <el-input clearable size="small" v-model="ruleForm.inputPerson" disabled placeholder="自动生成登记人员"></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="登记时间" prop="inputTime">
              <basic-input v-model="ruleForm.inputTime" placeholder="自动生成登记时间" disabled></basic-input>
            </basic-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <basic-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="人员-选择" >
      <dialog-preson @change="changepreson" checkbox></dialog-preson>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button @click="getrecvPerson" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import { jsonString, tags, strToTime } from '@/utils'
  import addPerson from './addPerson.vue'
  import utils from '@/utils/util.js'
  import { addLog, modifyLog, auditLog, showDetail, deleteLog } from '@/api/eoaManager/work/index.js'
  import dialogPreson from '@/views/components/dialog/dialogPreson/index.vue'
  import methods from '@/utils/mixins/methods'
  import computed from '@/utils/mixins/computed'
  export default {
    name: 'logDetail',
    mixins: [computed, methods],
    components: {
      dialogPreson,
      addPerson
    },
    data() {
      var validateRecvPerson = (rule, value, callback) => {
        if (value === '') {
          this.$message.warning('请选择需要发送的人员')
          this.borderRed = true
        } else {
          callback();
        }
      }
      return {
        ruleForm: {
          id: '',
          validateStatus: 2,//审核状态
          reinput: 2,//是否补录
          workDay: new Date().getTime(),//所属日期
          title: '',
          recvPerson: '',
          recvPersonId: ''

        },
        recvPerson1: [],//发送人员
        jsonString: jsonString,
        borderRed: false,
        logId: '',
        pickerType: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        dialogTableVisible: false,
        rules: {
          recvPerson: [
            { required: true, trigger: 'blur' }
          ]
        },
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > new Date().getTime()
          }
        },
        selecedRow: []
      }
    },
    methods: {
      //查看详情
      getDetail() {
        showDetail(this.logId).then(res => {
          if (res.data) {
            let newdata = res.data
            let recvPerson1 = tags(res.data)
            this.recvPerson1 = recvPerson1
            this.ruleForm = res.data
            this.ruleForm.workDay = strToTime(res.data.workDay)
          } else {
            this.$message.warning('查询失败')
          }

        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      //新增
      add() {
        this.ruleForm = {
          id: '',
          validateStatus: 2,//审核状态
          reinput: 2,//是否补录
          workDay: new Date().getTime(),//所属日期
          title: '',
          recvPerson: '',
          recvPersonId: ''
        }

        this.recvPerson1 = []
        this.logId = ''

        this.$store.dispatch('setLogId', '')
      },
      //保存
      save(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              // let newPerson = this.recvPerson1.slice()
              // var id = ''
              // var username = ''
              // newPerson.forEach(item => {
              //   id += item.id + ','
              //   username += item.username + ','
              // });
              // this.ruleForm.recvPerson = username.substring(0, username.length - 1)
              // this.ruleForm.recvPersonId = id.substring(0, id.length - 1)
              if (this.logId) {
                modifyLog(this.ruleForm).then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message)
                    this.logId = res.data.id
                    this.ruleForm.title = res.data.title
                    this.ruleForm.id = res.data.id
                    this.ruleForm.inputPerson = res.data.inputPerson
                    this.ruleForm.inputTime = res.data.inputTime

                  }
                }).catch(err => {
                  this.$message.warning(err.message)
                })
              } else {
                addLog(this.ruleForm).then(res => {
                  if (res.status == 200) {
                    this.$message.success(res.message)
                    this.logId = res.data.id
                    this.ruleForm.id = res.data.id
                    this.ruleForm.title = res.data.title
                    this.$store.dispatch('setLogId', res.data.id)
                    this.ruleForm.inputPerson = res.data.inputPerson
                    this.ruleForm.inputTime = res.data.inputTime

                  }
                }).catch(err => {
                  this.$message.warning(err.message)
                })
              }
          } else {
            return false;
          }
        });
      },
      //审核
      audit() {
        // if (this.recvPerson1.length == 0) {
        //   this.borderRed = true
        //   this.$message.warning('请选择需要接收的人员')
        //   return
        // }
        auditLog(this.ruleForm).then(res => {
          if (res.status == 200) {
            this.$message.success(res.message)
            this.getDetail()
          }
        }).catch(err => {
          this.$message.warning(err.message)
        })
      },
      changepreson(row) {
        this.selecedRow = row
      },
      //
      del() {
        this.$confirm('是否删除该日志', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.logId
          deleteLog(id).then(res => {
            if (res.status == 200) {
              this.$message.success(res.message)
              this.add()
            }
          }).catch(err => {
            this.$message.warning(err.message)
          })
        })
      },
      handleClose(idx) {
        if (this.ruleForm.recvPerson) {
          const recvPerson = this.ruleForm.recvPerson.split(',')
          const recvPersonId = this.ruleForm.recvPersonId.split(',')
          recvPerson.splice(idx, 1)
          recvPersonId.splice(idx, 1)
          this.selecedRow.splice(idx, 1)
          this.$set(this.ruleForm, 'recvPerson', recvPerson.join(','))
          this.$set(this.ruleForm, 'recvPersonId', recvPersonId.join(','))
        }
        // this.recvPerson1.splice(this.recvPerson1.indexOf(tag), 1);
      },
      addPerson() {
        let time = new Date().getTime()
        // this.$refs.addPerson.openDialog()
        this.dialogTableVisible = true
      },
      closeDialog() {
        this.$refs.addPerson.closeDialog()
      },
      getrecvPerson() {
        let userName = this.selecedRow.map(item => item.username)
        let userId = this.selecedRow.map(item => item.id)
        userName = userName.concat(this.ruleForm.recvPerson.split(','))
        userId = userId.concat(this.ruleForm.recvPersonId.split(','))
        userName = userName.filter(item => item)
        userId = userId.filter(item => item)
        let data = userId.map((item, idx) => ({ name: userName[idx], id: userId[idx] }))
        data = utils.array.unique(data, 'id')
        userName = data.map(item => item.name).join(',')
        userId = data.map(item => item.id).join(',')
        this.$set(this.ruleForm, 'recvPerson', userName)
        this.$set(this.ruleForm, 'recvPersonId', userId)
        this.$refs.ruleForm.validateField('recvPerson')
        this.selectedRow = []
        this.dialogTableVisible = false
        // this.recvPerson1 = this.checkedDate
        // this.borderRed = false
        // this.dialogTableVisible = false
      },
      format(v) {
        return '' + v
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.validateStatus == 1) {
          return true
        } else {
          return false
        }
      },
      isAudit2() {
        if (this.logId != '' && this.ruleForm.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      dateDisbel() {
        return this.ruleForm.reinput == 2
      }
    },
    activated() {
      if (this.$route.params.id && this.$route.params.id != 0) {
        this.$store.dispatch('setLogId', this.$route.params.id)
        this.logId = this.$route.params.id
      } else {
        this.logId = this.$store.getters.getLogId
      }
      this.$store.dispatch('setSelectP', [])
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.add()
      }, id => {
        if (this.logId) {
          this.getDetail()
        }
      })
      this.$store.dispatch("cacheId", undefined);
    }
  }
</script>
<style scoped>
  .mt10 {
    margin-top: 15PX;
  }

  .basic-form-item {
    margin-bottom: 25px;
  }

  .logForm>>>.el-radio__input.is-disabled.is-checked .el-radio__inner {
    background: #409EFF
  }

  .personWrap {
    border: 1px solid #dcdfe6;
    position: relative;
    padding: 0 110px 0 5px;
    min-height: 32px
  }

  .addPerson {
    position: absolute;
    top: 2px;
    right: 2px;
    bottom: 2px;
    width: 90px;
    text-align: center;
    margin-bottom: 0;
  }

  .personWrap .tags {
    width: 100%;
  }

  .el-tag {
    margin-left: 5px;
  }

  .borderRed {
    border: 1px solid red
  }
</style>
