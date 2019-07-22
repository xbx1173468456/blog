<template>
  <div class="app-container detailsManager-container">
    <div class="handler-container">
      <el-button type="primary" plain @click="resetData" icon="el-icon-plus" size="small" v-show="isUpdate">新增
      </el-button>
      <el-button type="primary" :disabled="auditStatus" plain @click="changeDatalist" icon="el-icon-if-save"
        size="small">保存</el-button>
      <el-button type="primary" :disabled="auditStatus || isRetreat || !formData.id" plain @click="deleteHint" icon="el-icon-delete"
        size="small" v-show="isUpdate">删除</el-button>
      <el-button type="primary" :disabled="auditStatus || isRetreat" plain @click="auditHint" icon="el-icon-if-auth"
        size="small" v-show="isUpdate">审核</el-button>
      <el-button type="primary" v-if="formData.processInstanceId && isUpdate" plain @click="lookData" icon="el-icon-if-auth" size="small">审批进度
      </el-button>
    </div>
    <el-form label-width="120px" class="form-container" :model="formData" :rules="rules" ref="formData"
      :show-message="false">
      <el-row :gutter="10">
        <el-col :span="8">
          <basic-form-item label="审核状态">
            <basic-input v-model="formData.validateStatus" :format="formatVisi" disabled></basic-input>
          </basic-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码">
            <el-input clearable size="small" v-model="formData.code" disabled />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据名称">
            <el-input clearable size="small" v-model="formData.name" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="请假时间" prop="timeData">
            <el-date-picker size="small" v-model="formData.timeData" type="datetimerange" range-separator="至"
              start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd HH:mm" @change="formatTime"
              :disabled="auditStatus">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="请假时长" prop="duration">
            <el-input clearable size="small" v-model="formData.duration" :disabled="auditStatus" @blur="handleTimeBlur">
              <template slot="append">小时</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="请假类型">
            <el-select v-model="formData.type" placeholder="请选择" style="width: 100%" :disabled="auditStatus" size="small">
              <el-option v-for="item in dataEnum.holidayType" :key="Number(item.code)" :label="item.name"
                :value="Number(item.code)">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="请假事由" prop="reason">
            <el-input v-model="formData.reason" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none"
              maxlength="100" :disabled="auditStatus" placeholder="请输入内容">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input v-model="formData.remark" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none"
              maxlength="100" size="small" :disabled="auditStatus" placeholder="请输入内容">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input disabled v-model="formData.inputPerson" size="small" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input disabled v-model="formData.inputTime" size="small" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <basic-dialog v-el-drag-dialog title="审批详情" :visible.sync="detailStatus" width="1000px" top="100px">
      <div class="imgbox">
        <img :src="flow" alt="">
      </div>
      <el-table ref="detailTable" highlight-current-row :data="detailData" border fit stripe height="400">
        <el-table-column type="index" align="center" width="60" label="序号" />
        <el-table-column property="taskId" align="center" width="100" label="任务编码" show-overflow-tooltip />
        <el-table-column property="taskName" align="center" width="100" label="任务名称" show-overflow-tooltip />
        <el-table-column property="opName" align="center" width="120" label="审批人" show-overflow-tooltip />
        <el-table-column property="opinion" align="center" label="审批信息" width="120" show-overflow-tooltip />
        <el-table-column property="inTime" align="center" label="创建时间" width="160" show-overflow-tooltip />
        <el-table-column property="createTime" align="center" width="160" label="审批时间" show-overflow-tooltip />
        <el-table-column property="usedTime" align="center" width="140" label="处理用时(小时)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{Math.ceil(scope.row.usedTime/3600000)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="flag" align="center" width="100" label="审批状态" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatAuditStatusEnum(scope.row.flag)}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="detailStatus=false">关闭</el-button>
      </span>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  export default {
    name: 'detail',
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        dataList: [],
        currentPage: 10,

        auditStatus: false,//删除状态
        saveStatus: false,//保存状态
        detailStatus: false,//弹窗状态
        showStatus: false,
        formData: {
          name: "请假记录单",
          type: 2,
          validateStatus: 2,
          timeData: [],
          duration: 0,
          processInstanceId: null
        },
        isFlow: 2,
        flow: '',
        detailData: [],
        rules: {
          timeData: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          duration: [
            { required: true, trigger: 'change' },
          ]
        },
        isRetreat: null
      }
    },
    props: {
      isUpdate: {
        type: Boolean,
        default: () => true
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetAuditStatusEnum',
        'GetEnabledData',
        'GetHolidayTypeData',
        'GetIsOrNotData'
      ]);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.resetData()
      }, id => {
        if (this.$route.query.id) {
          this.getDatalist(this.$route.query.id);
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
    methods: {
      getDatalist(id) {
        this.$store.dispatch('GetHolidayDetails', id).then((response) => {
          this.copyValue(response.data);
        }).catch(() => {
        })
      },
      changeDatalist(lock) {
        return new Promise((reslove, reject) => {
          this.$refs.formData.validate((valid) => {
            if (valid) {
              if (this.formData.id) {
                this.$store.dispatch('AmendHoliday', this.formData).then((response) => {
                  if (!lock) {
                    this.$message.success(response.message);
                  }
                  this.getDatalist(response.data.id);
                  reslove(response)
                }).catch(() => {
                })
              } else {
                this.$store.dispatch('AddHolidayList', this.formData).then((response) => {
                  if (!lock) {
                    this.$message.success(response.message);
                  }
                  this.getDatalist(response.data.id);
                  reslove(response)
                }).catch(() => {
                })
              }
            }
          })
        })
      },
      handleTimeBlur() {
        let num = Math.round(this.formData.duration)
        this.formData.duration = isNaN(num) ? 0 : num
      },
      deleteHint() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteDatalist();
          this.$message.success('删除成功!');
        }).catch(() => {
        })
      },
      deleteDatalist() {
        this.$store.dispatch('DeleteHoliday', this.$route.query.id).then((response) => {
          this.resetData();
        }).catch(() => {
        })
      },
      /*审核提示*/
      auditHint() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
            this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(async () => {
              let that = this;
              let res = await that.changeDatalist(true);
              this.copyValue(res.data);
              this.auditDatalist();
            }).catch((err) => {
            })
          }
        })
      },
      /*提交审核*/
      auditDatalist() {
        this.$store.dispatch('AuditHoliday', this.formData).then((response) => {
          this.formData = response.data
          this.copyValue(this.formData);
          if(response.data.processInstanceId) {
            return this.$store.dispatch('OpenSelectUserAndHandleAudit', {
              processId: response.data.processInstanceId,
              formData: response.data
            }).then(() => {
              this.$message.success(response.message);
            })
          }
          this.$message.success(response.message);
          this.getDatalist(this.formData.id);
        }).catch(() => {
        })
      },
      //查看详情
      lookData() {
        this.detailStatus = true;
        this.$store.dispatch('ReadResource', this.formData.processInstanceId).then((response) => {
          this.flow = "data:image/png;base64," + response.images;
        }).catch((err) => {
        })
        this.$store.dispatch('LookShowTask', this.formData.processInstanceId).then((response) => {
          this.detailData = response.data;
        }).catch((err) => {
        })
      },
      formatVisi(val) {
        return this.formatAuditStatusEnum({ validateStatus: val })
      },
      resetData() {
        this.formData = {
          name: "请假记录单",
          type: 2,
          validateStatus: 2,
          timeData: [],
          duration: 0,
          processInstanceId: null
        };
        this.auditStatus = false
      },
      /*处理赋值的方法*/
      copyValue(val) {
        this.formData.authCode = val.authCode;
        this.formData.beginTime = val.beginTime;
        this.formData.duration = val.duration;
        this.formData.endTime = val.endTime;
        this.formData.inputTime = val.inputTime;
        this.formData.reason = val.reason;
        this.formData.name = val.name;
        this.formData.id = val.id;
        this.formData.inputPerson = val.inputPerson;
        this.formData.inputPersonId = val.inputPersonId;
        this.formData.validateStatus = val.validateStatus;
        this.formData.processInstanceId = val.processInstanceId;
        this.formData.type = val.type;
        this.formData.timeData = [new Date(this.formData.beginTime), new Date(this.formData.endTime)];
        if (this.formData.validateStatus == 1) {
          this.auditStatus = true;
        } else if (this.formData.validateStatus == 2) {
          this.saveStatus = false;
          this.auditStatus = false;
        } else if (this.formData.validateStatus == 0) {
          this.auditStatus = false
          this.isRetreat = true
        } else if (this.formData.validateStatus == 3) {
          this.auditStatus = true
        } else if (this.formData.validateStatus == 4) {
          this.auditStatus = true
        }
      },
      formatTime(time) {
        this.formData.beginTime = new Date(time[0]).getTime();
        this.formData.endTime = new Date(time[1]).getTime();
        this.formData.timeData = time;
      }
    }
  }
</script>
<style scoped>
  .imgbox {
    width: 100%;
    height: 240px;
    overflow-y: auto;
  }
</style>
