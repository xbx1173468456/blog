<template>
  <div class="employment-container">
    <div class="handler-container">
      <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-plus" size="small"

                 @click="handleAddBtn" plain>新增
      </el-button>
      <el-button v-if="saveBtnShowFlag" type="primary" icon="el-icon-if-save" size="small" plain

                 @click="handleSaveBtn" :disabled="saveBtnDisabledFlag || auditBtnDisabledFlag">保存
      </el-button>

      <el-button v-if="deleteBtnShowFlag" type="danger" icon="el-icon-delete" size="small" plain
                 @click="handleDeleteBtn" :disabled="deleteBtnDisabledFlag">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" type="primary" icon="el-icon-if-auth" size="small" plain
                 @click="handleAuditBtn" :disabled="auditBtnDisabledFlag">审核
      </el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基本信息" name="1">
        <el-form ref="refEmploymentForm" class="form-container" :model="employmentForm" label-width="120px"
                 :rules="rules" :show-message="false">
          <el-row :gutter="5">
            <el-col :span="8">
              <basic-validate-status :model="employmentForm"></basic-validate-status>
            </el-col>
            <el-col :span="8">
              <el-form-item label="单据编码">
                <el-input size="small" clearable v-model="employmentForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="用工名称" prop="name">
                <el-input size="small" clearable v-model="employmentForm.name" :disabled="disabledFlag"
                          placeholder="请输入用工名称"/>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row :gutter="5">
            <el-col :span="8">
              <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
                <el-input size="small" v-model="employmentForm.proName"
                          readOnly
                          placeholder="请选择项目名称" :disabled="disabledFlag">
                  <el-button
                    size="small"
                    slot="append"
                    icon="el-icon-plus"
                    class="form-btn"
                    :disabled="disabledFlag" @click="toipClick('project')"></el-button>
                </el-input>

              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人员">
                <el-input size="small" clearable v-model="employmentForm.person" :disabled="disabledFlag"
                          placeholder="请输入申请人员"/>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请日期">
                <el-date-picker size="small"
                                :editable = "false"
                                format="yyyy-MM-dd"
                                @change="fomatDate"
                                v-model="employmentForm.applyDate"
                                type="date"
                                :disabled="disabledFlag"
                                placeholder="选择日期" class="date-picker">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="需求概述">
                <el-input size="small" clearable
                          :disabled="disabledFlag"
                          :autosize="{ minRows:6, maxRows: 8}"
                          :max="5000"
                          v-model="employmentForm.summary" type="textarea" placeholder="请输入需求概述，不超过5000字"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="5">
            <el-col :span="24">
              <el-form-item label="附件" class="add-border file">
               <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="employmentFormId">
                </basic-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

    <transition name="slide-fade">
      <div class="content-container">
    <div class="handler-container margin-top10">
      <el-button v-if="addPersonBtnShowFlag" :disabled="disabledFlag"
                 type="primary" plain icon="el-icon-if-introduce" size="small"
                 @click="handleAddPersonBtn" plain>引入人员
      </el-button>
     <!-- <el-button v-if="savePersonBtnShowFlag"
                 type="primary" icon="el-icon-if-save" size="small" plain
                 @click="handleSaveBtn">保存
      </el-button>-->

      <el-button v-if="deletePersonBtnShowFlag"
                 type="danger" icon="el-icon-delete" size="small" plain
                 :disabled="deletePersonBtnDisabledFlag"
                 @click="handlePersonDeleteBtn">删除
      </el-button>
 <!--     <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                    @clickSearchFilter="clickSearchFilter"></basic-search>-->

    </div>
      <el-table
        ref="refPersonTableData"
        :data="employmentPersonData"
        border
        fit
        stripe
        highlight-current-row
        @current-change="handleCurrentChange"
        :height="tableHeight"
      >
        <el-table-column type="index" label="序号" align="center" width="60"></el-table-column>
        <el-table-column
          prop="typeCode"
          label="类型编码"
          width="130"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="类型名称"
          min-width="200"
          align="center"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          class-name="spacing-set"
          prop="sum"
          label="需求数量(*)"
          width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form :model="employmentPersonData[scope.$index]"
                     :ref="'formSum' + scope.$index"
                     :rules="employmentPersonRules"
                     :show-message="false"
            >
              <el-form-item prop="sum">
                <el-input clearable size="small"  v-model="scope.row.sum" :min=0
                          :disabled="disabledFlag"  placeholder="请输入需求数量"></el-input>
              </el-form-item>
            </el-form>

          </template>
        </el-table-column>
        <el-table-column

          class-name="spacing-set"
          prop="beginDate"
          label="用工开始日期(*)"
          width="160"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form :model="employmentPersonData[scope.$index]"
                     :ref="'formBeginDate' + scope.$index"
                     :rules="employmentPersonRules"
                     :show-message="false"
            >
              <el-form-item prop="beginDate">
              <el-date-picker size="small"
                              :editable = "false"
                              :clearable = "false"
                              v-model="scope.row.beginDate"
                              type="date"
                              :disabled="disabledFlag"
                              :picker-options="pickerOptionsBeginDate"
                              @change="beginDateChange"
                              placeholder="选择日期" class="date-picker">
              </el-date-picker>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          class-name="spacing-set"
          label="用工截止日期(*)"
          width="160"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form :model="employmentPersonData[scope.$index]"
                     :ref="'formExpiryDate' + scope.$index"
                     :rules="employmentPersonRules"
                     :show-message="false"
            >
              <el-form-item prop="expiryDate">
              <el-date-picker size="small"
                              :editable = "false"
                              :clearable = "false"
                              v-model="scope.row.expiryDate"
                              type="date"
                              :disabled="disabledFlag"
                              :picker-options="pickerOptionsExpiryDate"
                              @change="expiryDateChange"
                              placeholder="选择日期" class="date-picker">
              </el-date-picker>
            </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          class-name="spacing-set"
          prop="days"
          label="预计用工天数"
          width="100"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-form :model="employmentPersonData[scope.$index]"
                     :ref="'formDays' + scope.$index"
                     :rules="employmentPersonRules"
                     :show-message="false"
            >
              <el-form-item prop="days">
              <el-input clearable size="small"  v-model="scope.row.days" :min=0
                        :disabled="true"></el-input>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          class-name="spacing-set"
          prop="postion"
          label="用工部位"
          width="160"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <el-input clearable size="small" v-model="scope.row.postion" :disabled="disabledFlag" placeholder="请输入用工部位"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          class-name="spacing-set"
          prop="applyExplain"
          label="用工说明"
          min-width="100"
          align="left"
          header-align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
              <el-input clearable size="small" v-model="scope.row.applyExplain" :disabled="disabledFlag" placeholder="请输入用工说明"></el-input>
          </template>
        </el-table-column>


      </el-table>

    <!--<pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit"
                @pagination="getEmploymentPerson"/>-->
      </div>
    </transition>
    <!-- 项目弹窗-->
    <basic-dialog v-el-drag-dialog title="项目名称-选择" :visible.sync="visibleSyncProject" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
    <!--引入人员弹窗-->
    <basic-dialog v-el-drag-dialog title="引入人员-选择" :visible.sync="personType.visibleSync" >
      <dialog-person-type ref="refDialogPersonType" :personTypeData="employmentPersonData"
                          :isShowChecked="isShowChecked"
                          @selectionChange="selectionChangePersonType"></dialog-person-type>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clickPersonTypeCancel">取 消</el-button>
        <el-button type="primary" @click="clickPersonTypeOk">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataBasic} from "@/assets/data/basic";
  import {validateLength} from "@/utils/validate";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import pagination from '@/components/Pagination'
  import dialogPersonType from '@/views/components/dialog/dialogPersonType/index.vue'
  import {todayFormat} from "@/utils"
  export default {
    name: 'EmploymentDetail',
    components: {
      dialogProject,
      pagination,
      dialogPersonType
    },
    mixins: [computed, methods, formatEnum],
    data() {
      const _this = this
      return {
        activeNames: ['1'],
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        addPersonBtnShowFlag: true,// 引入人员待系统菜单配置
        savePersonBtnShowFlag: true,
        deletePersonBtnShowFlag: true,



        employmentFormId: undefined,
        employmentForm: {},
        tableHeight: 300,
        saveBtnDisabledFlag: false,

        rules: {
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}

          ],
          name: [
            {required: true, message: '请输入用工名称', trigger: 'change'}
          ],

        },


        type: null,
        visibleSyncProject:false,
        selectedRow: {},



        /**
         * 引入人员
         * */
        employmentPersonRules:{
          sum:[ { required: true, message: "必填字段", trigger: "change"}],
          beginDate:[ {required: true, message: "必填字段", trigger: "change"}],
          expiryDate: [{required: true, message: "必填字段", trigger: "change"}],
        },

        employmentPersonData: [],
        total: 0,
        employmentPersonDataSave:[],//传给后台的人员数据
        /**
         * 人员选择
         * */
        personType: {
          visibleSync: false,
          personTypeSelectionChange: []
        },

        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: '',
          masterId: undefined,
        },
        currentRow: null, //表格当前行
        isShowChecked: true,

        pickerOptionsBeginDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.currentRow) && !_this.$utils.isEmpty(_this.currentRow.expiryDate)){
              return time.getTime() > new Date(_this.currentRow.expiryDate).getTime();
            }
          },
        },
        pickerOptionsExpiryDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.currentRow) && !_this.$utils.isEmpty(_this.currentRow.beginDate)){
              return time.getTime() < new Date(_this.currentRow.beginDate).getTime();
            }
          },
        },

      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.employmentFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.employmentForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.employmentForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.employmentForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.employmentFormId = id;
        this.getEmployment();
        this.getEmploymentPerson()
      });
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    mounted() {

      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },
    computed: {
      deleteBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.employmentForm)){
          return this.employmentForm.validateStatus === 1;
        }else{
          return true;
        }

      },
      auditBtnDisabledFlag() {
        if(!this.$utils.isEmpty(this.employmentForm)){
        return this.employmentForm.validateStatus === 1;
        }else{
          return true;
        }
      },

      disabledFlag() {
        return this.employmentForm.validateStatus === 1;
      },
      deletePersonBtnDisabledFlag() {
        return this.currentRow === null || this.auditBtnDisabledFlag;
      }
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      },
      employmentForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      },
    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        if (!this.$refs.refPersonTableData) return
        const offsetTopTable = this.$refs.refPersonTableData.$el.getBoundingClientRect().top;
       // this.tableHeight = innerHeight - offsetTopTable - 55
        this.tableHeight = (innerHeight - offsetTopTable - 55) > 300 ? (innerHeight - offsetTopTable - 55): 300
      },

      handleAddBtn() {
        this.employmentFormId = undefined;
        // this.employmentForm.proId = undefined;
        // this.employmentForm.proName = undefined;
        this.addEmployment();
        this.$refs.refEmploymentForm.resetFields();
        this.$nextTick(() => {
        //  this.saveBtnDisabledFlag = true;
        })
      },
      handleSaveBtn() {
        return this.validateAfter(() => {
        this.saveEmploymentForm()
        })
      },
      handleDeleteBtn() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.employmentFormId)) {
            this.$set(this.employmentForm,'proId','')
            this.$set(this.employmentForm,'proName','')
            this.$set(this.employmentForm,'proCode','')
            this.addEmployment()
          } else {
            this.deleteEmploymentForm().then(() => {
              this.$set(this.employmentForm,'proId','')
              this.$set(this.employmentForm,'proName','')
              this.$set(this.employmentForm,'proCode','')
              this.addEmployment()
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn() {
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.validateAfter( () =>{
                  this.saveEmploymentForm(true).then(() => {
                    this.auditEmploymentForm()
                  })
                })

              }).catch((error) => {
                console.log(error)
              })

      },
      handleShowItemNameBtn() {
        this.dialogTableVisible = true
      },
      /**
       * 新增表单内容
       * */
      addEmployment() {

        this.employmentForm = {
          id: '',
          validateStatus: 2,
          proId: this.employmentForm.proId,
          proName: this.employmentForm.proName,
          proCode: this.employmentForm.proCode,
          name: '用工申请单',
          applyDate: new Date(todayFormat()).getTime(),
          person:this.$store.state.user.login.username
        };
        this.employmentPersonData = []
        this.employmentPersonDataSave = []
        this.$refs.refEmploymentForm.clearValidate()
        this.$nextTick( () =>{
         // this.saveBtnDisabledFlag =true
        })
        console.log('this.employmentForm', this.employmentForm)

      },
      /**
       * 获取表单内容
       * */
      getEmployment() {
        if (this.employmentFormId) {
          return this.$store.dispatch('GetEmployment', this.employmentFormId)
            .then((res) => {
              if (res.rel) {

                console.log('表单内容', res)
                this.employmentForm = res.data
                //  this.$message.success(res.message)
                this.$refs.refEmploymentForm.clearValidate()
                this.$nextTick( () =>{

                 // this.saveBtnDisabledFlag =true
                })
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          this.addEmployment()
        }
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        //表单验证
        this.$refs.refEmploymentForm.validate(valid => {
          valid ? null : result = valid
          return !result
        })
        //人员验证
        this.employmentPersonData.some((item, idx) => {
          this.$refs['formSum' + idx].validate(valid => {
            valid ? null : result = valid
          })
          this.$refs['formBeginDate' + idx].validate(valid => {
            valid ? null : result = valid
          })
          this.$refs['formExpiryDate' + idx].validate(valid => {
            valid ? null : result = valid
          })
          this.$refs['formDays' + idx].validate(valid => {
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
          return false
        }
      },
      /**
       * save employmentForm
       * */
      saveEmploymentForm (boolean) {
console.log('this.employmentPersonData',this.employmentPersonData)
console.log('this.employmentPersonDataSave',this.employmentPersonDataSave)
        this.employmentForm.detailList = this.$utils.copy(this.employmentPersonDataSave);
        this.employmentForm.detailList.forEach(item => {
          item.beginDate = new Date(item.beginDate).getTime()
          item.expiryDate = new Date(item.expiryDate).getTime()
        })
        const saveFormData = this.$utils.copy(this.employmentForm);

        console.log('saveFormData', saveFormData)
        return this.$store.dispatch('SaveEmployment', saveFormData)
          .then((res) => {
            if (res.status && res.status === 200) {
              console.log('保存成功', res);
              this.employmentForm = res.data;
              this.employmentPersonData = res.data.detailList
              this.employmentPersonDataSave = res.data.detailList
              this.employmentFormId = res.data.id;
              //上传文件
              if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
              if(!boolean){
                this.$message.success(res.message)
              }
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },

      /**
       * delete employmentForm
       * */
      deleteEmploymentForm() {
        return this.$store.dispatch('DeleteEmployment', this.employmentFormId)
          .then((res) => {
            if (res.status && res.status === 200) {
              this.total = 0
              this.$message.success(res.message)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * audit employmentForm
       * */
      auditEmploymentForm() {

        console.log('this.employmentForm', this.employmentForm)
        return this.$store.dispatch('AuditEmployment', this.employmentForm)
          .then((res) => {

            console.log('audit res', res)
            if (res.status && res.status === 200) {
              this.employmentForm = res.data;
              this.employmentPersonData = res.data.detailList
              this.employmentPersonDataSave = res.data.detailList
              this.$message.success(res.message)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       * 项目名称-选择
       * */
      toipClick(type) {
        if (this.disabled) return
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },

      /**
       * 弹窗传回的项目名称
       * */
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        // console.log('detailRow',row)
        switch (this.type) {
          case 'project':
            this.employmentForm = Object.assign({}, this.employmentForm, {
              proName: row.name,
              proId: row.id,
              proCode: row.code
            })
            break
        }
        this.saveBtnDisabledFlag = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },

      /**
       * 日期转化时间戳
       * */
      fomatDate() {
        this.employmentForm.applyDate = new Date(this.employmentForm.applyDate).getTime();
      },


      /*****************
       * 引入人员
       * */
      handleAddPersonBtn() {
        this.personType.visibleSync = true;
        this.$nextTick(() => {
          this.saveBtnDisabledFlag = false;
        })
      },
      handlePersonDeleteBtn() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteByIdData(this.employmentPersonData, this.currentRow,(allData,data)=>{
            this.employmentPersonDataSave = allData; //所有数据（删除时，只改变删除数据的状态，点保存后才删除）
            this.employmentPersonData = data; //除去需要删除的数据
          });
        }).catch(error => {
          console.log(error)
        })

      },

      /**
       * 人员弹框显示和隐藏
       */
      clickPersonTypeCancel() {
        this.personType.visibleSync = false;
      },
      selectionChangePersonType(data) {
        console.log('回传 data', data)

        this.personType.personTypeSelectionChange = data.selectedRows;

      },
      /**
       * 人员弹框显示之后，确定
       */
      clickPersonTypeOk() {
        this.personType.visibleSync = false;
        //数据加入到引入人员列表中
        const personTypeSelectionChange = this.personType.personTypeSelectionChange;
        //this.employmentPersonData.push(personTypeSelectionChange[0])
        if (personTypeSelectionChange && personTypeSelectionChange.length > 0) {

          let newArray = [];
          let personTypeJson = '';
          if (this.employmentPersonData && this.employmentPersonData.length > 0) {
            personTypeJson = this.employmentPersonData.map(value => value.typeCode).join(',');
            for (const personType of personTypeSelectionChange) {
              if (personTypeJson.indexOf(personType.code) < 0) {
                let personTypeObj = Object.assign({}, {
                  typeCode: personType.code,
                  typeName: personType.name,
                  beginDate: new Date(todayFormat() + ' 00:00:00'),
                  expiryDate: new Date(todayFormat() + ' 00:00:00'),
                  days: 1,
                  sum: 1
                });
                newArray.push(personTypeObj);
              }
              console.log('newArray personTypeJson', newArray, personTypeJson)
            }
          } else {
            for (const personType of personTypeSelectionChange) {
              console.log('personType', personType)
              let personTypeObj = Object.assign({}, {
                typeCode: personType.code,
                typeName: personType.name,
                beginDate: new Date(todayFormat() + ' 00:00:00'),
                expiryDate: new Date(todayFormat() + ' 00:00:00'),
                days: 1,
                sum: 1
              });
              newArray.push(personTypeObj);
            }
            console.log('newArray', newArray)
          }
          //人员添加至页面表格
          console.log('newArrayRES', newArray)
          this.employmentPersonData = newArray.concat(this.employmentPersonData) ;
          this.employmentPersonDataSave = this.employmentPersonData ;
        }
      },

      beginDateChange: function (beginDate) {
        var expiryDateTime = new Date(this.currentRow.expiryDate).getTime(); //转成时间戳比大小
          var beginDateTime = new Date(beginDate).getTime();
            if(beginDateTime > expiryDateTime){
              this.$message({message: '用工开始日期不能大于用工截止日期', type: 'warning'})
              this.currentRow.days = null
            }else{
              if (this.currentRow.expiryDate && beginDate) {
                console.log('beginDateChange2',this.currentRow.expiryDate,this.currentRow.beginDate)
                this.currentRow.days = this.$utils.date.howManyDays(this.currentRow.beginDate, this.currentRow.expiryDate) + 1
              } else {
                this.currentRow.days = null
              }
            }


      },
      expiryDateChange: function (expiryDate) {
        var expiryDateTime = new Date(expiryDate).getTime(); //转成时间戳比大小
        var beginDateTime = new Date(this.currentRow.beginDate).getTime();
        if(beginDateTime > expiryDateTime){
          this.$message({message: '用工开始日期不能大于用工截止日期', type: 'warning'})
          this.currentRow.days = null
        }else {
          if (this.currentRow.beginDate && expiryDate ) {
            console.log('expiryDateChange2', this.currentRow.expiryDate, this.currentRow.beginDate)
            this.currentRow.days = this.$utils.date.howManyDays(this.currentRow.beginDate, this.currentRow.expiryDate) + 1

          } else {
            this.currentRow.days = null
          }
        }
      },

      /**
       * 表格当前行
       * */
      handleCurrentChange(row) {
        console.log(row)
        this.currentRow = row
      },

      /**
       * 搜索按钮
       */
      /*clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refPersonTableData, this.modelSearchFilter, () => {
          this.getEmploymentPerson();
        });
      },*/


      /**
       * 查询人员列表
       * */
      getEmploymentPerson() {
       if(this.employmentFormId){
         console.log('查询人员列表 this.employmentFormId' ,this.employmentFormId)
         this.modelSearchFilter.masterId = this.employmentFormId;
         this.$set(this.modelSearchFilter,'orderBy','typeCode')
         this.$store.dispatch('GetEmploymentPerson', this.modelSearchFilter)
           .then((res) => {
             this.employmentPersonData = res.data.rows
             this.employmentPersonDataSave = res.data.rows
             this.total = res.data.total
             console.log('person res', res)
           }).catch((error) => {
           console.log(error)
         })
       }else{
         console.log('查询人员列表 this.employmentFormId' ,this.employmentFormId)
         this.employmentPersonData = []
         this.employmentPersonDataSave = []
       }

      },
      /**
       * delete 人员
       * */
      deleteEmploymentPerson() {
        return this.$store.dispatch('DeleteEmploymentPerson', this.currentRow.id)
          .then((res) => {
            if (res.status && res.status === 200) {
              this.$message.success(res.message)
            } else {
              this.$message({message: res.message, type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
      },
      /**
       *  日期 格式化
       * */
      format(row, column, cellValue, index) {
        switch (column.property) {
          /* case'days':
             return dateFormat(row.date)*/
          default:
            console.log('cellValue', cellValue)
            return cellValue
        }
      },
    }
  }
</script>

<style scoped>
/*  .date-picker {
    width: 100%;

  }

  .date-picker >>> .el-input__inner {
    padding-left: 35px;
  }

  !*.form-btn {*!
    !*margin-bottom: -10px;*!
  !*}*!
  .form-btn:hover{background-color:transparent;border-right:none}
  .mode-select {
    width: 100%;
  }

  .el-table {
    min-height: 400px;
  }

  .center >>>.el-input__inner{
    text-align: center!important;
    padding-right: 10px;
  }*/
</style>
