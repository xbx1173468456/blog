<template>
  <div class="workDetail-container-list">
    <div class="grid-content bg-purple handler-container">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add()" plain>新增通知</el-button>
      <el-button
        :disabled="isAudit"
        type="primary"
        size="small"
        icon="el-icon-if-save"
        @click="save('ruleForm')"
        plain
      >保存</el-button>
      <el-button
        :disabled="isAudit2"
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        @click="audit"
        plain
      >审核</el-button>
      <el-button
        :disabled="isAudit2"
        type="danger"
        size="small"
        icon="el-icon-delete"
        @click="del()"
        plain
      >删除</el-button>
    </div>
    <div class="logForm">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm form-container"
      >
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-form-item label="审核状态" prop="validateStatus">
              <el-select v-model="ruleForm.validateStatus" placeholder disabled size="small">
                <el-option
                  v-for="item in this.dictionary.validateStatus"
                  :key="parseInt(item.code)"
                  :label="item.name"
                  :value="parseInt(item.code)"
                />
              </el-select>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="单据编码" prop="code">
              <el-input clearable size="small" v-model="ruleForm.code" disabled></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="发布机构" prop="sendOrg ">
              <el-input
                clearable
                size="small"
                v-model="ruleForm.sendOrg"
                :disabled="isAudit"
                maxlength="100"
              ></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <basic-form-item label="通知标题" prop="title">
              <el-input
                clearable
                size="small"
                v-model="ruleForm.title"
                :disabled="isAudit"
                maxlength="100"
              ></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="通知文号" prop="number">
              <el-input
                clearable
                size="small"
                v-model="ruleForm.number"
                :disabled="isAudit"
                maxlength="100"
              ></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="接收人员" prop="recvPerson">
              <div class="personWrap">
                <div class="tags">
                  <el-tag
                    v-for="(person, index) in ruleForm.recvPerson.split(',').filter(item => item)"
                    :key="index"
                    :closable="!isAudit"
                    @close="handleClose(index)"
                    type="success"
                  >{{person}}</el-tag>
                </div>
                <el-button
                  icon="el-icon-plus"
                  @click="addPerson"
                  class="addPerson"
                  type="primary"
                  :disabled="isAudit"
                  size="mini"
                ></el-button>
              </div>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="正文内容" prop="content">
              <el-input
                type="textarea"
                :disabled="isAudit"
                maxlength="200"
                :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容"
                v-model="ruleForm.content"
              ></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <basic-form-item label="补充说明" prop="remark ">
              <el-input
                type="textarea"
                :disabled="isAudit"
                maxlength="100"
                :autosize="{ minRows: 3, maxRows: 5}"
                placeholder="请输入内容"
                v-model="ruleForm.remark "
              ></el-input>
            </basic-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="16">
            <basic-form-item label="登记人员" prop="inputPerson">
              <el-input clearable size="small" v-model="ruleForm.inputPerson" disabled></el-input>
            </basic-form-item>
          </el-col>
          <el-col :span="8">
            <basic-form-item label="登记时间" prop="inputTime">
              <el-date-picker
                size="small"
                :editable="false"
                v-model="ruleForm.inputTime"
                type="date"
                format="yyyy-MM-dd"
                disabled
                placeholder="选择日期"
              ></el-date-picker>
            </basic-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- <addPerson :dialogTableVisible="dialogTableVisible" ref="addPerson" @getrecvPerson="getrecvPerson"></addPerson> -->
    <basic-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="人员-选择">
      <dialog-preson @change="changepreson" checkbox v-if="dialogTableVisible"></dialog-preson>
      <div class="dialog-footer" slot="footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button @click="getrecvPerson" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
import { tags, getEnumData } from "@/utils";
import utils from "@/utils/util.js";
// import addPerson from './addPerson.vue'
import {
  addNews,
  showDetail,
  auditNews,
  deleteNews,
  modifyNews
} from "@/api/eoaManager/notice/index.js";
import dialogPreson from "@/views/components/dialog/dialogPreson/index.vue";
import methods from '@/utils/mixins/methods'
import computed from '@/utils/mixins/computed'
export default {
  name: "logDetail",
  mixins: [computed, methods],
  data() {
    var validateRecvPerson = (rule, value, callback) => {
      if (value === "") {
        this.$message.warning("请选择需要发送的人员");
        this.borderRed = true;
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        id: "",
        validateStatus: 2, //审核状态
        inputPerson: this.$store.state.user.login.inputPersonFullPath,
        inputTime: new Date().getTime(), //登记时间
        recvPerson: "",
        recvPersonId: ""
      },
      selecedRow: [],
      recvPerson1: [], //发送人员
      dictionary: "",
      borderRed: false,
      dialogTableVisible: false,
      logId: "",
      pickerType: {
        disabledDate(time) {
          if (time) {
            return time.getTime() > Date.now();
          }
        }
      },
      dialogTableVisible: false,
      rules: {
        recvPerson: [{ required: true, trigger: "blur" }]
      }
    };
  },
  methods: {
    //查看详情
    getDetail() {
      showDetail(this.logId)
        .then(res => {
          let newdata = res.data;
          let recvPerson1 = tags(res.data);
          this.recvPerson1 = recvPerson1;
          this.ruleForm = res.data;
        })
        .catch(err => {
          this.$message.warning(err.message);
        });
    },
    //新增
    add() {
      this.ruleForm = {
        validateStatus: 2, //审核状态
        reinput: 2, //是否补录
        recvPerson: "",
        inputPerson: this.$store.state.user.login.inputPersonFullPath,
        workDay: new Date().getTime(), //所属日期
        inputTime: new Date().getTime() //登记时间
      };
      this.recvPerson1 = [];
      this.logId = "";
      this.$store.dispatch("setLogId", "");
    },
    //保存
    save(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // let newPerson = this.recvPerson1.slice()
          // var id = ''
          // var name = ''
          // newPerson.forEach(item => {
          //   id += item.id + ','
          //   name += item.name + ','
          // });
          // this.ruleForm.recvPerson = name.substring(0, name.length - 1)
          // this.ruleForm.recvPersonId = id.substring(0, id.length - 1)
          // return
          if (this.logId) {
            modifyNews(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.logId = res.data.id;
                  this.ruleForm.id = res.data.id;
                  this.ruleForm.inputPerson = res.data.inputPerson;
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          } else {
            addNews(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.logId = res.data.id;
                  this.ruleForm.id = res.data.id;
                  this.$store.dispatch("setLogId", res.data.id);
                  this.ruleForm.inputPerson = res.data.inputPerson;
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          }
        } else {
          return false;
        }
      });
    },
    //审核
    audit() {
      this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          auditNews(this.ruleForm)
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
    //
    del() {
      this.$confirm("亲，您是否确定删除当前数据，删除后数据不能恢复！", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = this.logId;
          deleteNews(id)
            .then(res => {
              if (res.status == 200) {
                this.$message.success(res.message);
                this.add();
              }
            })
            .catch(err => {
              this.$message.warning(err.message);
            });
        })
        .catch(() => {});
    },
    changepreson(row) {
      this.selecedRow = row;
    },
    handleClose(tag) {
      if (this.ruleForm.recvPerson) {
        const recvPerson = this.ruleForm.recvPerson.split(",");
        const recvPersonId = this.ruleForm.recvPersonId.split(",");
        recvPerson.splice(idx, 1);
        recvPersonId.splice(idx, 1);
        this.selecedRow.splice(idx, 1);
        this.$set(this.ruleForm, "recvPerson", recvPerson.join(","));
        this.$set(this.ruleForm, "recvPersonId", recvPersonId.join(","));
      }
      //  this.recvPerson1.splice(this.recvPerson1.indexOf(tag), 1);
      //  console.log(tag)
    },
    addPerson() {
      this.dialogTableVisible = true;
      //  let time=new Date().getTime()
      //  this.$refs.addPerson.openDialog()
    },
    closeDialog() {
      this.$refs.addPerson.closeDialog();
    },
    getrecvPerson(v) {
      let userName = this.selecedRow.map(item => item.username);
      let userId = this.selecedRow.map(item => item.id);
      userName = userName.concat(this.ruleForm.recvPerson.split(","));
      userId = userId.concat(this.ruleForm.recvPersonId.split(","));
      userName = userName.filter(item => item);
      userId = userId.filter(item => item);
      let data = userId.map((item, idx) => ({
        name: userName[idx],
        id: userId[idx]
      }));
      data = utils.array.unique(data, "id");
      userName = data.map(item => item.name).join(",");
      userId = data.map(item => item.id).join(",");
      this.$set(this.ruleForm, "recvPerson", userName);
      this.$set(this.ruleForm, "recvPersonId", userId);
      this.$refs.ruleForm.validateField("recvPerson");
      this.selectedRow = [];
      this.dialogTableVisible = false;
      //  this.recvPerson1=v
      //  this.borderRed=false
    },
    format(v) {
      return "" + v;
    }
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
      if (this.logId != "" && this.ruleForm.validateStatus != 1) {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    dialogPreson
  },
  mounted() {
    getEnumData(this, ["GetValidateStatusData"]);
    this.dictionary = this.$store.state.common.dataEnum;
  },
  activated() {
    if (this.$route.params.id && this.$route.params.id != 0) {
      this.$store.dispatch("setLogId", this.$route.params.id);
      this.logId = this.$route.params.id;
    } else {
      this.logId = this.$store.getters.getLogId;
    }
    this.$store.dispatch("setSelectP", []);
    this.$utilsBasic.loadAddAndDetailData(this, () => {
      this.add()
    }, id => {
      if (this.logId) {
        this.getDetail()
      }
    })
    this.$store.dispatch("cacheId", undefined);
  }
};
</script>
<style scoped>
/* .mt10 {
    margin-top: 15PX;
  }

  .basic-form-item {
    margin-bottom: 25px;
  } */

/* .logForm>>>.el-radio__input.is-disabled.is-checked .el-radio__inner {
    background: #409EFF
  } */

.personWrap {
  border: 1px solid #dcdfe6;
  position: relative;
  padding: 0 110px 0 5px;
  min-height: 46px;
}

.addPerson {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 110px;
  text-align: center;
}
.is-error .personWrap {
  border-color: #f56c6c;
}

.personWrap .tags {
  width: 100%;
}

/* .el-tag {
    margin-left: 5px;
  } */

/* .borderRed {
    border: 1px solid red
  } */
</style>
