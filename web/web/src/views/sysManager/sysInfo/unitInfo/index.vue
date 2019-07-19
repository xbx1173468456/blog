<template>
  <div class="unitInfo-container-list">
    <div class="handler-container">
      <!--<el-button type="primary" size="small" icon="el-icon-plus" plain>新增</el-button>-->
      <el-button type="primary" size="small" icon="el-icon-if-save" plain @click="submitForm">保存</el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getCompanyMsg()" plain>刷新</el-button>
      <!--<el-button type="primary" size="small" icon="el-icon-document" plain>查看</el-button>
	      <el-button type="primary" size="small" icon="el-icon-refresh" plain>刷新</el-button>
	      <el-button type="danger"  icon="el-icon-delete" plain>删除</el-button>-->
    </div>
    <el-form ref="refUnitInfo" class="form-container" :model="form" label-width="120px" :rules="rules" :show-message="false">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="审核状态" prop="statuMode" class="add-border">
            <el-radio-group v-model="form.validateStatus">
              <el-radio :label="parseInt(row.code)"
                        v-for="(row, key, index) in dataEnum.validateStatus"
                        :key="row.code" disabled>
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="启用状态" prop="enable" class="add-border">
            <el-radio-group v-model="form.enabled">
              <el-radio :label="parseInt(row.code)"
                        v-for="(row, key, index) in dataEnum.enabled" :key="row.code"
                        disabled>
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单位授权码">
            <el-input clearable size="small" v-model="form.authCode" :disabled="true" placeholder="自动生成单位授权码"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="单位名称" prop="name" hide-required-asterisk>
            <el-input clearable size="small" ref="refName" v-model="form.name" placeholder="请输入单位名称"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登录手机号">
            <el-input clearable size="small" v-model="form.mobile" :disabled="true" placeholder="自动生成入登录手机号"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权方式" prop="enable" class="add-border">
            <el-radio-group v-model="form.authMode">
              <el-radio :label="parseInt(row.code)"
                        v-for="(row, key, index) in dataEnum.auth" :key="row.code"
                        disabled>
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="授权开始">
            <el-input clearable size="small" v-model="form.authBeginTime" :disabled="true" placeholder="自动生成授权开始时间"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权截至">
            <el-input clearable size="small" v-model="form.authEndTime" :disabled="true" placeholder="自动生成授权截至"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="授权用户数">
            <el-input clearable size="small" v-model="form.authUserNumber" :disabled="true" placeholder="自动生成授权用户数"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="信用代码">
            <el-input clearable size="small" v-model="form.creditCode" placeholder="请输入信用代码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="法人代表">
            <el-input clearable size="small" v-model="form.legalPerson" placeholder="请输入法人代表"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成立日期">
            <el-date-picker
              size="small"
              :editable="false"
              v-model="form.foundTime"
              type="date"
              placeholder="请选择成立日期"
              format="yyyy-MM-dd"
              @change="changeFoundTime"
              :picker-options="pickerOptionsFormat">
            </el-date-picker>
          </el-form-item>

        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="官方网站">
            <el-input clearable size="small" v-model="form.website" placeholder="请输入官方网站"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="总机号码">
            <el-input clearable size="small" v-model="form.telephone" placeholder="请输入总机号码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="行政区划" >
            <el-input clearable size="small" v-model="form.districtCode" placeholder="请输入行政区划"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="详细地址">
            <el-input clearable size="small" v-model="form.address" placeholder="请输入详细地址"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="主联系人">
            <el-input clearable size="small" v-model="form.contactPerson" placeholder="请输入主联系人"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系座机">
            <el-input clearable size="small" v-model="form.contactPersonTelephone" placeholder="请输入联系座机"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="联系手机" prop="contactPersonMobile">
            <el-input clearable size="small" v-model="form.contactPersonMobile" placeholder="请输入联系手机,以11位手机号格式标准"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="联系邮箱" prop="contactPersonEmail">
            <el-input clearable size="small" v-model="form.contactPersonEmail" placeholder="请输入联系邮箱,以邮箱格式标准"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="补充说明">
            <el-input clearable :autosize="{ minRows: 3, maxRows: 4}" v-model="form.authExplain" type="textarea" placeholder="请输入补充说明"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="24">
          <el-form-item label="文档附件" class="add-border file">
            <basic-upload ref="refBasicUpload" :formId="form.id">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="注册日期">
            <el-input clearable size="small" v-model="form.crtTime" :disabled="true" placeholder="自动生成注册日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册终端">
            <el-input clearable size="small" v-model="form.crtHost" :disabled="true" placeholder="自动生成注册终端"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="注册IP地址">
            <el-input clearable size="small" v-model="form.crtHost" :disabled="true" placeholder="自动生成注册IP地址"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {validatePhone, validateLength,validateEmail} from "@/utils/validate";
  import {staticDataBasic} from "@/assets/data/basic";
export default {
  name: "UnitInfo",
  mixins: [computed, methods],
  data() {
    return {
      companyMsg: {},
      form: {},
      rules: {
        name: [
          {
            required: true,
            trigger: 'blur'
          }
        ],
        contactPersonMobile:[
          {
            validator: (rule, value, callback) => {
              validatePhone(rule, value, callback, false, ['联系手机']);
            },
            trigger: 'change'
          }
        ],
        contactPersonEmail:[
          {
            validator: (rule, value, callback) => {
              validateEmail(rule, value, callback, false, ['联系邮箱']);
            },
            trigger: 'change'
          }
        ]
      },
      pickerOptionsFormat: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
    }
  },
  created() {
    //初始化数据字典
    this.getEnumData([
      'GetValidateStatusData',
      'GetEnabledData',
      'GetAuthData'
    ]);
    this.getCompanyMsg();
  },
  methods: {
    getCompanyMsg() {
      this.$store.dispatch('GetCompanyMsg',this.$store.state.user.login.sysUserId).then((response) => {
        if (!this.$utils.isEmpty(response.data)) {
          console.log(response.data.foundTime);
          this.form = response.data;
        }else{
          this.form = {};
        }
      }).catch(() => {
	        })
    },
    submitForm() {
      this.$refs.refUnitInfo.validate(valid => {
        if (valid) {
          this.$store.dispatch('ChangeCompanyMsg', this.form).then((response) => {
            if (response.status == 200) {
              this.$message({
                showClose: true,
                message: '保存成功！',
                type: 'success'
              })
              if(response.data&&response.data.id){
                //上传文件
                if(!this.$refs.refBasicUpload.submitUpload(response.data.id)) return false;
              }
            }
          })
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          if (this.$refs.refName && !this.$refs.refName.value) {
            this.$refs.refName.focus();
            return false
          }
        }
      })
    },
    changeFoundTime(value){
      //时间格式化
      if (value) {
        this.form.foundTime = new Date(value).getTime()
      }
    },
  }
}
</script>
