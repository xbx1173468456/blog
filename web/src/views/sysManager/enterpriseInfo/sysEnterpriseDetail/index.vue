<template>
  <div class="sysEnterpriseDetail-container-detail">
    <div class="handler-container">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-plus"
        v-if="sysEnterpriseInfo_btn_add"
        @click="handleSysEnterpriseInfoAdd"
        plain>新增单位
      </el-button>
      <el-button type="primary"
                 size="small"
                 icon="el-icon-if-save"
                 v-if="sysEnterpriseInfo_btn_edit"
                 @click="handleSysEnterpriseInfoEdit"
                 :disabled="disableSysEnterpriseInfo_btn_edit"
                 plain
      >
        保存
      </el-button>
      <el-button
        type="danger"
        size="small"
        icon="el-icon-delete"
        v-if="sysEnterpriseInfo_btn_delete"
        :disabled="disabledSysEnterpriseInfoDelete"
        @click="handleSysEnterpriseInfoDelete"
        plain>删除
      </el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-if-auth"
        v-if="sysEnterpriseInfo_btn_audit"
        :disabled="disabledSysEnterpriseInfoAudit"
        @click="handleSysEnterpriseInfoAudit"
        plain>审核
      </el-button>
      <el-button
        size="small"
        type="danger"
        icon="el-icon-circle-close-outline"
        v-if="sysEnterpriseInfo_btn_disenable"
        :disabled="disabledSysEnterpriseInfoDisenable"
        @click="handleSysEnterpriseInfoDisenable"
        plain>禁用
      </el-button>
      <el-button
        size="small"
        type="success"
        icon="el-icon-circle-check-outline"
        v-if="sysEnterpriseInfo_btn_enable"
        :disabled="disabledSysEnterpriseInfoEnable"
        @click="handleSysEnterpriseInfoEnable"
        plain>启用
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" :disabled="disabledSysEnterpriseInfoRefresh"
                 @click="getSysEnterpriseData()" plain>刷新
      </el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form
          :rules="rules"
          ref="refSysEnterpriseInfoForm"
          :model="sysEnterpriseInfo"
          label-width="120px"
          :show-message="showSysEnterpriseInfoDetail"
          class="form-container"
        >

          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item prop="validateStatus" label="审核状态" class="add-border disabled">
                <el-radio-group v-model="sysEnterpriseInfo.validateStatus">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.validateStatus"
                            :key="row.code" disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="enable" label="启用状态" class="add-border disabled">
                <el-radio-group v-model="sysEnterpriseInfo.enable">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.enabled" :key="row.code"
                            disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位编码">
                <el-input clearable size="small"
                          v-model="sysEnterpriseInfo.code"
                          placeholder="自动生成单位编码"
                          disabled
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="单位名称" prop="name">
                <el-input clearable size="small" ref="refSysEnterpriseName" v-model="sysEnterpriseInfo.name"
                          placeholder="请输入单位名称,最大长度20字符" :disabled="disabledSysEnterpriseInfoName"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="信用代码">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.creditCode" placeholder="请输入信用代码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单位类型">
                <el-input readOnly placeholder="请选择单位类型" v-model="sysEnterpriseInfo.typeName"
                          size="small">
                  <el-button @click="clickUnitType" class="form-btn" icon="el-icon-plus" size="small"
                             slot="append"></el-button>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="法人代表">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.legalPerson" placeholder="请输入法人代表"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="成立日期">
                <el-date-picker
                  size="small"
                  :editable="false"
                  v-model="sysEnterpriseInfo.foundTime"
                  type="date"
                  placeholder="请选择成立日期"
                  format="yyyy-MM-dd"
                  @change="changeFoundTime"
                  :picker-options="pickerOptionsFormat">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="官方网站">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.website" placeholder="请输入官方网站"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="总机号码">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.telephone" placeholder="请输入总机号码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移动电话" prop="mobile">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.mobile" placeholder="请输入移动电话,以11位手机号格式标准"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="行政区划" class="add-border disabled">
                <el-radio-group v-model="sysEnterpriseInfo.district">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.isOrNot" :key="row.code">
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="办公地址">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.address" placeholder="请输入办公地址"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="8">
              <el-form-item label="开户户名">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.bankAccount" placeholder="请输入开户户名"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户银行">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.bankName" placeholder="请输入开户银行"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开户账户">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.bankAccountNumber"
                          placeholder="请输入开户账户"/>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="补充说明">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.remark" type="textarea"
                          placeholder="请输入补充说明"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item label="文档附件" class="add-border file">
                <basic-upload ref="refBasicUpload" :formId="sysEnterpriseInfo.id">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="16">
              <el-form-item label="登记人员">
                <el-input clearable size="small"
                          v-model="sysEnterpriseInfo.inputPerson"
                          placeholder="自动生成登记人员" disabled/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="登记时间">
                <el-input clearable size="small" v-model="sysEnterpriseInfo.inputTime" placeholder="自动生成登记时间"
                          disabled/>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <transition name="slide-fade">
      <div v-show="showSysEnterprisePersonAndSysEnterpriseCert">
        <el-row class="content-container">
          <div class="handler-container">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              plain
              v-if="addPersonBtnIsShowFlag"
              @click="handleSysEnterprisePersonAdd"
            >新增人员
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              plain
              v-if="deletePersonBtnIsShowFlag"
              :disabled="deletePersonBtnDisableFlag"
              @click="handleSysEnterprisePersonDelete"
            >删除
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-if-auth"
              v-if="auditPersonBtnIsShowFlag"
              :disabled="auditPersonBtnDisableFlag"
              @click="handleSysEnterprisePersonAudit"
              plain>审核
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-close"
              @click="handleSysEnterprisePersonLeave"
              v-if="personLeaveBtnIsShowFlag"
              :disabled="!auditPersonBtnDisableFlag||personLeaveBtnDisableFlag"
              plain>离退
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-if-auth"
              @click="handleSysEnterprisePersonService"
              v-if="personServiceBtnIsShowFlag"
              :disabled="!auditPersonBtnDisableFlag||personServiceBtnDisableFlag"
              plain>在职
            </el-button>
            <basic-search v-show="false" ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </div>
          <el-table
            :data="sysEnterprisePersons"
            ref="sysEnterprisePersons"
            stripe
            highlight-current-row
            border
            :height="286"
            @current-change="handleCurrentRow"
          >
            <el-table-column
              label="序号"
              type="index"
              width="60" align="center">
            </el-table-column>
            <el-table-column
              prop="validateStatus"
              label="审核状态"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{formatValidateStatus(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column

              prop="code"
              label="编码"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="name"
              label="姓名(*)"
              width="120"
              align="center">
              <template slot-scope="scope">
                <el-form :model="sysEnterprisePersons[scope.$index]" :ref="'formName' + scope.$index"
                         :rules="rulesPerson"
                         :show-message="false">
                  <el-form-item prop="name">
                    <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                              placeholder="请输入姓名" v-model="scope.row.name"></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              prop="gender"
              label="性别"
              width="70"
              align="left" header-align="center"
            >
              <template slot-scope="scope">
                <el-select v-if="scope.row.validateStatus==2" size="small" v-model="scope.row.gender"
                           placeholder="请选择性别！">
                  <el-option
                    v-for="item in dataEnum.gender"
                    :key="item.code"
                    :label="item.name"
                    :value="parseInt(item.code)">
                  </el-option>
                </el-select>
                <span class="span-text" v-else>{{formatSex(scope.row)}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="status"
              label="状态"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{formatJobStatus(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="department"
              label="部门"
              width="120"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.department" placeholder=""></el-input>
              </template>
            </el-table-column>

            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="duty"
              label="职务"
              width="140"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.duty" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="telephone"
              label="座机"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.telephone" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="mobile"
              label="手机"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.mobile" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="qq"
              label="QQ"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.qq" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="wechat"
              label="微信"
              width="150"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.wechat" placeholder=""></el-input>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              prop="remark"
              label="补充说明"
              align="left" header-align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.remark" placeholder=""></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="content-container">
          <div class="handler-container">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-plus"
              v-if="addCertificatationsBtnShowFlag"
              @click="handleSysEnterpriseCertificatationsAdd"
              plain
              plain>新增资证
            </el-button>
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              v-if="deleteCertificatationsBtnIsShowFlag"
              :disabled="deleteCertificatationsBtnDisableFlag"
              @click="handleSysEnterpriseCertificatationsDelete"
              plain>删除
            </el-button>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-if-auth"
              v-if="auditCertificatationsBtnIsShowFlag"
              :disabled="auditCertificatationsBtnDisableFlag"
              @click="handleSysEnterpriseCertificatationsAudit"
              plain>审核
            </el-button>
            <basic-search v-show="false" ref="refBasicSearchCert" :modelSearchFilter="modelSearchFilterCert"
                          @clickSearchFilter="clickSearchFilterCert"></basic-search>
          </div>
          <el-table
            :data="sysEnterpriseCertificatations"
            ref="sysEnterpriseCertificatations"
            stripe
            highlight-current-row
            border
            :height="286"
            @current-change="handleCurrentRowCert"
            border>
            <el-table-column
              label="序号"
              type="index"
              width="60"
              align="center">
            </el-table-column>
            <el-table-column
              prop="validateStatus"
              label="审核状态"
              width="80"
              align="center"
            >
              <template slot-scope="scope">
                <span>{{formatValidateStatus(scope.row)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="code"
              label="编码"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="name"
              label="名称(*)"
              width="250"
              align="left" header-align="center">
              <template slot-scope="scope">
                <el-form :model="sysEnterpriseCertificatations[scope.$index]" :ref="'formNameCert' + scope.$index"
                         :rules="rulesCert"
                         :show-message="false">
                  <el-form-item prop="name">
                    <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                              placeholder="请输入名称" v-model="scope.row.name"></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="level"
              label="等级"
              width="80"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-if="scope.row.validateStatus==2" v-model="scope.row.level"
                          placeholder=""></el-input>
                <span class="span-text" v-else>{{scope.row.level}}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="number"
              label="原始编号"
              width="140"
              align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-if="scope.row.validateStatus==2" v-model="scope.row.number"
                          placeholder=""></el-input>
                <span class="span-text" v-else>{{scope.row.number}}</span>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-tooltip
              prop="grantOrg"
              label="发证机构"
              width="200"
              align="left" header-align="center">
              <template slot-scope="scope">
                <el-input clearable size="small" v-if="scope.row.validateStatus==2" v-model="scope.row.grantOrg"
                          placeholder=""></el-input>
                <span class="span-text" v-else>{{scope.row.grantOrg}}</span>
              </template>
            </el-table-column>

            <el-table-column
              class-name="spacing-set"
              prop="grantTime"
              label="发证日期"
              width="140"
              align="left" header-align="center">
              <template slot-scope="scope">
                <el-date-picker :disabled="scope.row.validateStatus == 1?true:false" size="small" :editable="false" format="yyyy-MM-dd"
                                v-model="scope.row.grantTime"
                                type="date"
                                placeholder="请选择发证日期" :picker-options="pickerOptionsFormatGrantTime">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              prop="endTime"
              label="截止日期"
              width="135"
              align="left" header-align="center">
              <template slot-scope="scope">
                <el-date-picker :disabled="scope.row.validateStatus == 1?true:false" size="small" :editable="false" format="yyyy-MM-dd"
                                v-model="scope.row.endTime"
                                type="date"
                                placeholder="请选择截止日期" :picker-options="pickerOptionsFormatEndTime">
                </el-date-picker>
              </template>
            </el-table-column>
            <el-table-column
              class-name="spacing-set"
              show-overflow-toolti
              prop="remark"
              label="补充说明"
              align="left" header-align="center"
              show-overflow-tooltip>
              <template slot-scope="scope">
                <el-input clearable size="small" v-model="scope.row.remark" placeholder=""></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </transition>
    <basic-dialog v-el-drag-dialog title="单位类型-选择" :visible.sync="unitType.visibleSync">
      <dialog-unit-type ref="refDialogStation" :unitTypeData="unitType.data"
                        @selectionChange="selectionChangeUnitType"></dialog-unit-type>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickUnitTypeCancel">取 消</el-button>
        <el-button type="primary" @click="clickUnitTypeOk">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {validatePhone, validateLength} from "@/utils/validate";
  import {staticDataBasic} from "@/assets/data/basic";
  import {staticDataEnum} from "@/assets/data/enum";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import {
    arrayUniqueSameObj
  } from '@/utils'
  import dialogUnitType from "@/views/components/dialog/dialogUnitType/index";
  import {deepCloneByObject} from "@/utils/index";
  export default {
    components: {dialogUnitType},
    name: 'SysEnterpriseDetail',
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      const self = this
      return {
        activeNames: ['1'],
        sysEnterpriseInfo_btn_add: true, //未配权限，直接写死，待改
        sysEnterpriseInfo_btn_edit: true,
        sysEnterpriseInfo_btn_delete: true,
        sysEnterpriseInfo_btn_audit: true,
        sysEnterpriseInfo_btn_disenable: true,
        sysEnterpriseInfo_btn_enable: true,

        sysEnterpriseInfo: {},
        showSysEnterpriseInfoDetail: false,  //是否显示校验错误信息

        // showSysEnterprisePersonformDataErrorMsg: false,//是否显示 人员名称未填校验信息

        sysEnterprisePersons: [], // 人员
        sysEnterpriseCertificatations: [], // 资质
        sysEnterpriseInfoDetailData:{
          sysEnterpriseInfo: {},
          sysEnterprisePersons: [],
          sysEnterpriseCertificatations: []
        },
        sysEnterpriseInfoId: undefined,
        rules: {
          name: [{
            required: true, message: '请输入单位名称', trigger: 'blur'
          }],
          mobile:[
            {
              validator: (rule, value, callback) => {
                validatePhone(rule, value, callback, false, ['移动电话']);
              },
              trigger: 'change'
            }
          ],
        },

        disableSysEnterpriseInfo_btn_edit: false, //保存按钮是否可用

        addPersonBtnIsShowFlag: true, //人员 待系统菜单配置后修改
        deletePersonBtnIsShowFlag: true,
        auditPersonBtnIsShowFlag: true,
        personLeaveBtnIsShowFlag: true,
        personServiceBtnIsShowFlag: true,

        addCertificatationsBtnShowFlag: true, //资质 待系统菜单配置后修改
        deleteCertificatationsBtnIsShowFlag: true,
        auditCertificatationsBtnIsShowFlag: true,

        currentRow: null, // 当前行 人员
        currentRowCert: null, //当前行 资质
        selectRow: null, //光标自动获取行
        modelSearchFilter: {
          fuzzy: '',
          fuzzyKeys: ''
        },
        modelSearchFilterCert: {
          fuzzy: '',
          fuzzyKeys: ''
        },
        rulesPerson: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['姓名', 1, 20]);
              },
              trigger: 'change'
            }
          ]
        },
        rulesCert: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 20]);
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
        //单位类型选择
        unitType: {
          data: [],
          visibleSync: false,
          unitTypeSelectionChange: []
        },
        pickerOptionsFormatGrantTime: {
          disabledDate(time) {
            if(!self.$utils.isEmpty(self.currentRowCert) && !self.$utils.isEmpty(self.currentRowCert.endTime)){
              return time.getTime() > new Date(self.currentRowCert.endTime).getTime();
            }
          }
        },
        pickerOptionsFormatEndTime: {
          disabledDate(time) {
            if(!self.$utils.isEmpty(self.currentRowCert) && !self.$utils.isEmpty(self.currentRowCert.grantTime)){
              return time.getTime() < new Date(self.currentRowCert.grantTime).getTime();
            }
          }
        },
      }
    },
    computed: {
      disabledSysEnterpriseInfoDelete: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) !== '{}' && this.sysEnterpriseInfo.id) {
          return this.sysEnterpriseInfo.validateStatus === 1;
        }
        return true;
      },
      disabledSysEnterpriseInfoAudit: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) !== '{}') {
          return this.sysEnterpriseInfo.validateStatus === 1;
        }
        return true;
      },
      disabledSysEnterpriseInfoEnable: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) !== '{}' && this.sysEnterpriseInfo.validateStatus === 1) {
          return this.sysEnterpriseInfo.enable === 1;
        }
        return true;
      },
      disabledSysEnterpriseInfoDisenable: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) !== '{}' && this.sysEnterpriseInfo.validateStatus === 1) {
          return this.sysEnterpriseInfo.enable === 2;
        }
        return true;
      },
      disabledSysEnterpriseInfoRefresh: function () {
        if (!(JSON.stringify(this.sysEnterpriseInfo) !== '{}' && this.sysEnterpriseInfo.id)) {
          return true;
        } else {
          return false;
        }
      },
      showSysEnterprisePersonAndSysEnterpriseCert: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) !== '{}' && this.sysEnterpriseInfo.id) {
          return true;
        } else {
          return false;
        }
      },
      disabledSysEnterpriseInfoName: function () {
        if (JSON.stringify(this.sysEnterpriseInfo) == '{}'|| this.sysEnterpriseInfo.validateStatus === 2 || !this.sysEnterpriseInfo.id) {
          return false;
        }
        return true;
      },
      /**
       * 人员相关按钮是否可用
       * */
      deletePersonBtnDisableFlag: function () {
        if (this.currentRow) {
          return this.currentRow.validateStatus === 1;
        }
        return true;
      },
      auditPersonBtnDisableFlag: function () {
        if (this.currentRow && this.currentRow.id) {
          return this.currentRow.validateStatus === 1
        }
        return true;
      },
      personServiceBtnDisableFlag: function () {
        if (this.currentRow) {
          return this.currentRow.status === 1
        }
        return true;
      },
      personLeaveBtnDisableFlag: function () {
        if (this.currentRow && this.currentRow.id) {
          return this.currentRow.status === 2
        }
        return true;
      },
      /**
       * 资质相关按钮是否可用
       * */
      deleteCertificatationsBtnDisableFlag: function () {
        if (this.currentRowCert) {
          return this.currentRowCert.validateStatus === 1
        }
        return true;
      },
      auditCertificatationsBtnDisableFlag: function () {
        if (this.currentRowCert && this.currentRowCert.id) {
          return this.currentRowCert.validateStatus === 1
        }
        return true;
      }

    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.handleSysEnterpriseInfoAdd();
      },(id) => {
        this.sysEnterpriseInfoId = id;
        this.getSysEnterpriseData();
      });
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
        'GetIsOrNotData',
        'GetGenderData',
        'GetJobStatusData'
      ])
      this.$store.dispatch("cacheId",'0');//刷新
    },
    mounted() {
      //基本信息权限
      /* this.userManagerDetail_btn_add = !this.elements['userManagerDetail:btn_add'];
       this.userManagerDetail_btn_edit = !this.elements['userManagerDetail:btn_edit'];
       this.userManagerDetail_btn_delete = !this.elements['userManagerDetail:btn_del'];
       this.userManagerDetail_btn_audit = !this.elements['userManagerDetail:btn_audit'];
       this.userManagerDetail_btn_disenable = !this.elements['userManagerDetail:btn_disenable'];
       this.userManagerDetail_btn_enable = !this.elements['userManagerDetail:btn_enable'];*/
    },
    methods: {
      /**
       * 获取所有数据
       */
      getSysEnterpriseAllData() {
        setTimeout(() => {
          if (this.sysEnterpriseInfoId) {
            this.getSysEnterpriseData();
          } else {
            this.handleSysEnterpriseInfoAdd();
          }
        }, 100)
      },
      getSysEnterpriseData() {
        return this.$store.dispatch('GetSysEnterpriseAllDetail', this.sysEnterpriseInfoId)
          .then(response => {
            if (response && response.data && response.data.sysEnterpriseInfo) {
              this.sysEnterpriseInfo = response.data.sysEnterpriseInfo;
              this.sysEnterprisePersons = response.data.sysEnterprisePersons;
              this.sysEnterpriseCertificatations = response.data.sysEnterpriseCertificatations;
              this.sysEnterpriseInfoDetailData = response.data;
            }
          })
      },
      handleSysEnterpriseInfoAdd() {
        this.sysEnterpriseInfoId = undefined;
        this.sysEnterprisePersons = [];
        this.sysEnterpriseCertificatations = [];
        this.sysEnterpriseInfoDetailData = {
          sysEnterpriseInfo: undefined,
          sysEnterprisePersons: [],
          sysEnterpriseCertificatations: []
        },
        this.$nextTick(() => {
          this.sysEnterpriseInfo = {
            validateStatus: parseInt(staticDataEnum.validateStatus[1].code),
            enable: parseInt(staticDataEnum.enable[0].code),
            district: staticDataEnum.isOrNot[0].code
          };
          if(this.$refs.refSysEnterpriseName){
            this.$refs.refSysEnterpriseName.focus();
          }
        });
      },
      // 保存
      handleSysEnterpriseInfoEdit() {
        return this.validateAfter(() => {
          this.postSysEnterpriseInfoDetailDataAll();
        });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        //表单验证
        this.$refs.refSysEnterpriseInfoForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })
        //人员验证
        this.sysEnterprisePersons.some((item, idx) => {
          this.$refs['formName' + idx].validate(valid => {
            valid ? null : result = valid
          })
          return !result
        })
        //资证验证
        this.sysEnterpriseCertificatations.some((item, idx) => {
          this.$refs['formNameCert' + idx].validate(valid => {
            valid ? null : result = valid
          })
          return !result
        })
        if (result) {
          //验证
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({
            message: staticDataBasic.info.updateEmptyError,
            type: 'warning'
          });
          if (!this.$refs.refSysEnterpriseName.value) {
            this.$refs.refSysEnterpriseName.focus();
            return false
          }
          return false
        }
      },
      postSysEnterpriseInfoDetailDataAll(callback) {  //保存
        this.sysEnterpriseInfoDetailData.sysEnterpriseInfo=this.sysEnterpriseInfo;
        return this.$store.dispatch('PostSysEnterpriseAllAdd', this.sysEnterpriseInfoDetailData)
          .then(response => {
              if (response.status === 200) {
                this.sysEnterpriseInfo=response.data.sysEnterpriseInfo;
                this.sysEnterprisePersons=response.data.sysEnterprisePersons;
                this.sysEnterpriseCertificatations=response.data.sysEnterpriseCertificatations;
                this.sysEnterpriseInfoDetailData=response.data;
                this.sysEnterpriseInfoId = this.sysEnterpriseInfo.id;
                if (this.sysEnterpriseInfoId) {
                  //上传文件
                  if(!this.$refs.refBasicUpload.submitUpload(this.sysEnterpriseInfoId)) return false;
                  if (callback && typeof callback === "function") {
                    callback(this.sysEnterpriseInfoId);
                  } else {
                    this.$message({
                      message: response.message,
                      type: 'success'
                    })
                  }
                }
              }
            }
          )
      },
      handleSysEnterpriseInfoDelete() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            if (this.sysEnterpriseInfoId) {
              this.$store.dispatch('DeleteSysEnterpriseInfoData', this.sysEnterpriseInfoId)
                .then(response => {
                  if (response.status === 200) {
                    this.$message({
                      message: response.message,
                      type: 'success'
                    });
                    this.handleSysEnterpriseInfoAdd();
                  } else {
                    this.$message({
                      message: response.message,
                      type: 'warning'
                    })
                  }
                })
            } else {
              this.handleSysEnterpriseInfoAdd();
            }
          }).catch((error) => {
          console.log(error);
        })

      },
      handleSysEnterpriseInfoAudit() {
        return this.validateAfter(() => {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              this.postSysEnterpriseInfoDetailDataAll((id) => {
                this.sysEnterpriseInfo.id = id;
                this.sysEnterpriseInfoAudit().then(() => {

                })
              })
            }).catch((error) => {
            console.log(error)
          })
        });
      },
      sysEnterpriseInfoAudit() {
        return this.$store.dispatch('PostChangeStatus', this.sysEnterpriseInfoDetailData)
          .then((response) => {
            if (response && response.status === 200) {
              this.sysEnterpriseInfo=response.data.sysEnterpriseInfo;
              this.sysEnterprisePersons=response.data.sysEnterprisePersons;
              this.sysEnterpriseCertificatations=response.data.sysEnterpriseCertificatations;
              this.sysEnterpriseInfoDetailData=response.data;
              this.$message({
                message: response.message,
                type: 'success'
              });
            }
          })
      },
      handleSysEnterpriseInfoEnable() {
        let info = '亲，您是否确定启用当前数据，启用后数据即可使用！',
          enable = 1;
        this.handleSysEnterpriseInfoEnableOrDisenable(info, enable);

      },
      handleSysEnterpriseInfoDisenable() {
        let info = '亲，您是否确定禁用当前数据，禁用后数据不能使用！',
          enable = 2;
        this.handleSysEnterpriseInfoEnableOrDisenable(info, enable);
      },
      handleSysEnterpriseInfoEnableOrDisenable(info, enable) {
        if (this.sysEnterpriseInfoId) {
          this.$confirm(info, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let sysEnterpriseInfo = deepCloneByObject(this.sysEnterpriseInfo)
              sysEnterpriseInfo.enable = enable;
              this.$store.dispatch('PutSysEnterpriseEnable', sysEnterpriseInfo)
                .then((response) => {
                  if (response.status === 200) {
                    this.$message({
                      message: response.message,
                      type: 'success'
                    });
                    this.getSysEnterpriseData();
                  }
                }).catch((error) => {
                console.log(error);
              })
            })
            .catch((error) => {
              console.log(error)
            })
        }
      },

      handleSysEnterprisePersonAdd() { //添加人员行数
        var newValue = {
          validateStatus: 2,
          gender: 1,
          status: 1,
          infoId: this.sysEnterpriseInfoId
        };
        //添加新的行数
        this.sysEnterprisePersons.unshift(newValue);
        this.$refs.sysEnterprisePersons.setCurrentRow(this.sysEnterprisePersons[0]);
        this.sysEnterpriseInfoDetailData.sysEnterprisePersons=this.sysEnterprisePersons;
      },
      handleCurrentRow(row) {
        console.log('row', row)
        this.currentRow = row
      },
      handleCurrentRowCert(row) {
        console.log('row', row)
        this.currentRowCert = row
      },
      handleSysEnterprisePersonDelete() {
        if (this.isSelectedRow(this.currentRow)) {
          if (this.currentRow.validateStatus === 2) {
            this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteByIdData(this.sysEnterprisePersons, this.currentRow,(allData,data)=>{
                this.sysEnterpriseInfoDetailData.sysEnterprisePersons = allData;
                this.sysEnterprisePersons = data;
              });
            }).catch((error) => {
              console.log(error);
            })
          } else {
          }

        }
      },
      handleSysEnterprisePersonAudit() {
        if (this.isSelectedRow(this.currentRow)) {
          if (this.currentRow.validateStatus === 2) {
            this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.currentRow.id) {
                this.$store.dispatch('PostSysEnterprisePersonChangeJobState', this.currentRow)
                  .then((response) => {
                    if (response.status === 200) {
                      this.currentRow.validateStatus = response.data.validateStatus;
                      this.currentRow.code = response.data.code;
                      this.$message({
                        message: response.message,
                        type: 'success'
                      });
                      this.getSysEnterpriseData();
                    } else {
                      this.$message({
                        message: response.message,
                        type: 'warning'
                      })
                    }
                  })
              }
            })
          }
        }
      },
      handleSysEnterprisePersonLeave() { //离职
        if (this.isSelectedRow(this.currentRow)) {
          this.$confirm('亲，您是否确定将当前数据状态修改为离职！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.currentRow.status === 1) {
              this.currentRow.status === 2
              if (this.currentRow.id) {
                let Parameters = {
                  id: this.currentRow.id,
                  status: 2
                }
                this.handleSysEnterprisePersonLeaveOrService(Parameters);
              }

            }
          }).catch((error) => {
            console.log(error)
          })
        }
      },
      handleSysEnterprisePersonService() { //在职
        if (this.isSelectedRow(this.currentRow)) {
          this.$confirm('亲，您是否确定将当前数据状态修改为在职！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.currentRow.status === 2) {
              this.currentRow.status = 1;
              if (this.currentRow.id) {
                let Parameters = {
                  id: this.currentRow.id,
                  status: 1
                }
                this.handleSysEnterprisePersonLeaveOrService(Parameters);
              }


            } else {
              this.$message({
                message: '当前数据状态己是在职',
                type: 'warning'
              })
            }
          })
        }
      },
      handleSysEnterprisePersonLeaveOrService(Parameters) {// 离职 在职
        this.$store.dispatch('PostSysEnterprisePersonJobSta', Parameters)
          .then((response) => {
            console.log('PostSysEnterprisePersonJobSta', response)
            if (response.status === 200) {
              this.$message({
                message: response.message,
                type: 'success'
              });
              this.getSysEnterpriseData();
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              })
            }
          })
      },
      handleSysEnterpriseCertificatationsAdd() { //添加资质行数
        var newValue = {
          validateStatus: 2,
          infoId: this.sysEnterpriseInfoId
        };
        //添加新的行数
        this.sysEnterpriseCertificatations.unshift(newValue);
        this.$refs.sysEnterpriseCertificatations.setCurrentRow(this.sysEnterpriseCertificatations[0]);
        this.sysEnterpriseInfoDetailData.sysEnterpriseCertificatations=this.sysEnterpriseCertificatations;
      },

      handleSysEnterpriseCertificatationsDelete() {
        if (this.isSelectedRow(this.currentRowCert)) {
          if (this.currentRowCert.validateStatus === 2) {
            this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deleteByIdData(this.sysEnterpriseCertificatations, this.currentRowCert,(allData,data)=>{
                this.sysEnterpriseInfoDetailData.sysEnterpriseCertificatations = allData;
                this.sysEnterpriseCertificatations = data;
              });
            }).catch((error) => {
              console.log(error);
            })
          }

        }
      },
      handleSysEnterpriseCertificatationsAudit() {
        if (this.isSelectedRow(this.currentRowCert)) {
          if (this.currentRowCert.validateStatus === 2) {
            this.$confirm(' 亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.currentRowCert.id) {
                this.$store.dispatch('PostSysEnterpriseCertCheckStatus', this.currentRowCert)
                  .then((response) => {
                    if (response.status === 200) {
                      this.currentRowCert.validateStatus = response.data.validateStatus;
                      this.currentRowCert.code = response.data.code;
                      this.$message({
                        message: response.message,
                        type: 'success'
                      });
                      this.getSysEnterpriseData();
                    } else {
                      this.$message({
                        message: response.message,
                        type: 'warning'
                      })
                    }
                  })
              }
            }).catch((error) => {
              console.log(error);
            })
          }

        }
      },
      /**
       * 人员搜索
       * */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.sysEnterprisePersons, this.modelSearchFilter, () => {
          this.personSearchData();
        });
      },
      personSearchData() {
        this.modelSearchFilter.infoId = this.sysEnterpriseInfoId;
        this.modelSearchFilter.keyword = this.modelSearchFilter.fuzzy;
        this.$store.dispatch('PostSysEnterprisePersonQuery', this.modelSearchFilter).then((res) => {
          if (res.status === 200) {
            this.sysEnterprisePersons = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      /**
       * 资质搜索
       * */
      clickSearchFilterCert() {
        this.$refs.refBasicSearchCert.searchFilter(this.$refs.sysEnterpriseCertificatations, this.modelSearchFilterCert, () => {
          this.certSearchData();
        });
      },
      certSearchData() {
        this.modelSearchFilterCert.infoId = this.sysEnterpriseInfoId;
        this.modelSearchFilterCert.keyword = this.modelSearchFilterCert.fuzzy;
        this.$store.dispatch('PostSysEnterpriseCertQuery', this.modelSearchFilterCert).then((res) => {
          if (res.status === 200) {
            this.sysEnterpriseCertificatations = res.data;
          } else {
            this.$message.warning(res.message)
          }
        })
      },
      changeFoundTime(value) {
        //时间格式化
        if (value) {
          this.sysEnterpriseInfo.foundTime = new Date(value).getTime()
        }
      },
      clickUnitType() {
        this.unitType.visibleSync = true;
      },
      clickUnitTypeCancel() {
        this.unitType.visibleSync = false;
      },
      selectionChangeUnitType(data) {
        this.unitType.unitTypeSelectionChange = data.selectedRow;
      },
      clickUnitTypeOk() {
        if (this.isSelectedRow(this.unitType.unitTypeSelectionChange)) {
          this.unitType.visibleSync = false;
          //数据加入到对象中
          this.sysEnterpriseInfo.typeName = this.unitType.unitTypeSelectionChange["name"];
          this.unitType.data = [];
          this.unitType.data.push(this.unitType.unitTypeSelectionChange);
        }
      }
    }
  }
</script>
