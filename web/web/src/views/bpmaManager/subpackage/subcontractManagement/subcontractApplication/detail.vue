<template>
  <div class="subcontractApplication-container">
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

    <el-form ref="refSubcontractApplicationForm" class="form-container" :model="subcontractApplicationForm"
             label-width="120px" :rules="rules" :show-message="false">
      <el-row :gutter="5">
        <el-col :span="8">
          <basic-validate-status :model="subcontractApplicationForm"></basic-validate-status>
        </el-col>
        <el-col :span="8">
          <el-form-item label="单据编码">
            <el-input size="small" clearable v-model="subcontractApplicationForm.code" :disabled="true" placeholder="系统自动生成单据编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包项名称" prop="name" hide-required-asterisk>
            <el-input size="small" clearable v-model="subcontractApplicationForm.name" :disabled="disabledFlag"
                      placeholder=""/>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="项目名称" prop="proName" hide-required-asterisk>
            <el-input size="small" v-model="subcontractApplicationForm.proName"
                      readOnly
                      placeholder="请选择项目名称" :disabled="disabledFlag">
              <el-button size="small"
                         slot="append"
                         icon="el-icon-plus"
                         class="form-btn"
                         :disabled="disabledFlag" @click="toipClick('project')"></el-button>
            </el-input>

          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="分包类型" prop="type" hide-required-asterisk>
            <el-select size="small" class="mode-select"
                       v-model="subcontractApplicationForm.type"
                       placeholder="请选择分包类型"
                       :disabled="disabledFlag">
              <el-option
                v-for="(item, index ) in subcontractTypeList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">

          <el-form-item label="是否招标" prop="ifInviteBid" class="add-border" hide-required-asterisk>

            <el-radio-group v-model="subcontractApplicationForm.ifInviteBid">
              <el-radio :label="parseInt(row.code)"
                        v-for="(row, key, index) in dataEnum.isOrNot"
                        :key="row.code" :disabled="disabledFlag">
                {{ row.name }}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="计划开工日期">
            <el-date-picker size="small"
                            :editable = "false"
                            :clearable = "false"
                            v-model="subcontractApplicationForm.beginDate"
                            type="date"
                            :disabled="disabledFlag"
                            :picker-options="pickerOptionsBeginDate"
                            @change="formatBeginDate"
                            placeholder="选择计划开工日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划完工日期">
            <el-date-picker size="small"
                            :editable = "false"
                            :clearable = "false"
                            v-model="subcontractApplicationForm.expiryDate"
                            type="date"
                            :disabled="disabledFlag"
                            :picker-options="pickerOptionsExpiryDate"
                            @change="formatExpiryDate"
                            placeholder="选择计划完工日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="计划日历天">
            <el-input size="small" clearable v-model="days" :disabled="true" placeholder="系统自动生成计划日历天" :min="0"/>

          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="8">
          <el-form-item label="原承包总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       clearable
                       v-model="subcontractApplicationForm.contractPrice"
                       placeholder="请输入原承包总价"
                       :disabled="disabledFlag"
                       :min="0"
            ></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="拟分包总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       clearable
                       v-model="subcontractApplicationForm.subPrice"
                       placeholder="请输入拟分包总价"
                       :disabled="disabledFlag"
                       :min="0"
            ></basic-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="税前利润总价">
            <basic-input :formatValue="formatToMoney" :format="formatToThousands"
                       clearable
                       v-model="beforeTaxPrice"
                       placeholder="系统自动生成税前利润总价"
                       :disabled="true"
                       :min="0"
            ></basic-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="分包内容及部位">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="subcontractApplicationForm.content" type="textarea" placeholder="请输入分包内容及部位，不超过5000字"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="所需资源及要求">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="subcontractApplicationForm.resRequire" type="textarea" placeholder="请输入所需资源及要求，不超过5000字"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="其他说明">
            <el-input size="small" clearable
                      :disabled="disabledFlag"
                      :autosize="{ minRows:6, maxRows: 8}"
                      :max="5000"
                      v-model="subcontractApplicationForm.remark" type="textarea" placeholder="请输入其他说明，不超过5000字"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="24">
          <el-form-item label="附件" class="add-border file">
           <basic-upload ref="refBasicUpload" :disabled="disabledFlag" :formId="subcontractApplicationFormId">
            </basic-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="5">
        <el-col :span="16">
          <el-form-item label="登记人员">
            <el-input size="small" clearable  v-model="subcontractApplicationForm.inputPerson" :disabled="true" placeholder="系统自动生成登记人员"/>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="登记时间">
            <el-input size="small" clearable  v-model="subcontractApplicationForm.inputTime" :disabled="true"
                      placeholder="系统自动生成登记时间"/>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>

    <basic-dialog v-el-drag-dialog title="项目名称-选择" :visible.sync="visibleSyncProject" >
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import {todayFormat} from "@/utils";
  import formatBasic from '@/utils/mixins/formatBasic'
  export default {
    name: 'SubcontractApplicationDetail',
    components: {
      dialogProject
    },
    mixins: [computed, methods, formatEnum,formatBasic],
    data() {
      const _this = this
      return {
        addBtnShowFlag: true, //待系统菜单配置
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,

        subcontractApplicationFormId: undefined,
        subcontractApplicationForm: {
          contractPrice: '0.00',
          subPrice: '0.00',
          beforeTaxPrice: '0.00',
        },

        pickerOptionsBeginDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.subcontractApplicationForm.expiryDate)){
              return time.getTime() > new Date(_this.subcontractApplicationForm.expiryDate).getTime();
            }
          },
        },
        pickerOptionsExpiryDate:{
          disabledDate(time) {
            if(!_this.$utils.isEmpty(_this.subcontractApplicationForm.beginDate)){
              return time.getTime() < new Date(_this.subcontractApplicationForm.beginDate).getTime();
            }
          },
        },


        subcontractTypeList: [],
        saveBtnDisabledFlag: true,

        rules: {
          proName: [
            {required: true, message: '请选择项目名称', trigger: 'change'}

          ],
          name: [
            {required: true, message: '请输入分包项名称', trigger: 'change'}
          ],
          type: [
            {required: true, message: '请选择分包类型', trigger: 'change'}
          ],
          ifInviteBid: [
            {required: true, message: '请选择是否招标', trigger: 'change'}
          ],

        },
        type: null,
        visibleSyncProject:false,
        selectedRow: {}
      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.subcontractApplicationFormId = this.$route.params.id ? this.$route.params.id : undefined;
        }
        if(this.$route.query) {
          this.subcontractApplicationForm.proId = this.$route.query.proId ? this.$route.query.proId : undefined;
          this.subcontractApplicationForm.proName = this.$route.query.name ? this.$route.query.name: undefined;
          this.subcontractApplicationForm.proCode = this.$route.query.proCode ? this.$route.query.proCode: undefined;
        }
        this.handleAddBtn();

      },(id) => {
        this.subcontractApplicationFormId = id;
        this.getSubcontractApplication();
        this.getSubcontractType();

      });
    },
    created() {

      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetIsOrNotData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    computed: {
      deleteBtnDisabledFlag() {
        return this.subcontractApplicationForm.validateStatus === 1;
      },
      auditBtnDisabledFlag() {
        return this.subcontractApplicationForm.validateStatus === 1;
      },

      disabledFlag() {
        return this.subcontractApplicationForm.validateStatus === 1;
      },

      /**
       * beforeTaxPrice  税前利润总价
       * */
      beforeTaxPrice: {
        get() {
          let contractPrice = Number(this.subcontractApplicationForm.contractPrice)
          let subPrice = Number(this.subcontractApplicationForm.subPrice)
          let beforeTaxPriceRes = isNaN(Number(contractPrice - subPrice)) ? '0.00' : Number(contractPrice - subPrice).toFixed(2)
          console.log('beforeTaxPriceRes', contractPrice, subPrice, beforeTaxPriceRes)

          return beforeTaxPriceRes

        },
        set() {
        }
      },
      /**
       * subcontractApplicationForm.days  计划日历天
       * */
      days: function () {
        let beginDate = this.subcontractApplicationForm.beginDate
        let expiryDate = this.subcontractApplicationForm.expiryDate
        let daysRes = 0
        if (beginDate && expiryDate) {
          daysRes =  Math.floor(Math.abs(expiryDate - beginDate )/(1000*60*60*24)) + 1
        }
        console.log("daysRes", beginDate, expiryDate, daysRes)
        return daysRes;
      }
    },
    watch: {
      subcontractApplicationForm: {
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep: true
      }
    },
    methods: {
      handleAddBtn() {
        this.subcontractApplicationFormId = undefined;
        // this.subcontractApplicationForm.proId = undefined;
        // this.subcontractApplicationForm.proName = undefined;
        this.addSubcontractApplication();
        this.$refs.refSubcontractApplicationForm.resetFields();
        /*this.$nextTick(() => {
          this.saveBtnDisabledFlag = true;
        })*/
      },
      handleSaveBtn() {

        if (this.$utils.isEmpty(this.subcontractApplicationFormId)) {
          this.$refs.refSubcontractApplicationForm.validate((valid) => {
            if (valid) {
              this.saveSubcontractApplicationForm().then(() => {
                this.getSubcontractApplication()
              })
            } else {
              return false;
            }
          })
        } else {
          //id 修改

          this.updateSubcontractApplicationForm();
        }

      },
      handleDeleteBtn() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.subcontractApplicationFormId)) {
            this.$set(this.subcontractApplicationForm,'proId','')
            this.$set(this.subcontractApplicationForm,'proName','')
            this.$set(this.subcontractApplicationForm,'proCode','')
            this.addSubcontractApplication()
          } else {
            this.deleteSubcontractApplicationForm().then(() => {
              this.$set(this.subcontractApplicationForm,'proId','')
              this.$set(this.subcontractApplicationForm,'proName','')
              this.$set(this.subcontractApplicationForm,'proCode','')
              this.addSubcontractApplication()
            }).catch(error => {
              console.log(error)
            })
          }
        }).catch(error => {
          console.log(error)
        })

      },
      handleAuditBtn() {
        if (this.$utils.isEmpty(this.subcontractApplicationFormId)) {
          this.$refs.refSubcontractApplicationForm.validate((valid) => {
            if (valid) {
              this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {

                this.saveSubcontractApplicationForm(true).then(() => {
                  this.auditSubcontractApplicationForm().then(() => {

                    console.log('id', this.subcontractApplicationForm.id)
                    this.getSubcontractApplication()
                  })
                })

              }).catch((error) => {
                console.log(error)
              })
            } else {
              return false;
            }
          })
        } else {
          this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {

            this.updateSubcontractApplicationForm(true).then( () => {
              this.auditSubcontractApplicationForm().then(() => {
                this.getSubcontractApplication()
              })
            })


          }).catch((error) => {
            console.log(error)
          })
        }
      },
      handleShowItemNameBtn() {
        this.dialogTableVisible = true
      },
      /**
       * 新增表单内容
       * */
      addSubcontractApplication() {
        this.subcontractApplicationForm = {
          id: '',
          validateStatus: 2,
          ifInviteBid: 2,
          name: '分包申请单',
          type: '劳务分包',
          proId: this.subcontractApplicationForm.proId,
          proName: this.subcontractApplicationForm.proName,
          proCode: this.subcontractApplicationForm.proCode,
          contractPrice: '0.00',
          subPrice: '0.00',
          beforeTaxPrice: '0.00',
          beginDate: new Date(todayFormat()).getTime(),
          expiryDate: new Date(todayFormat()).getTime(),
        };

        console.log('this.subcontractApplicationForm', this.subcontractApplicationForm)

        /*this.$nextTick( () =>{
          this.saveBtnDisabledFlag =true
        })*/
      },
      /**
       * 获取表单内容
       * */
      getSubcontractApplication() {
        if (this.subcontractApplicationFormId) {
          return this.$store.dispatch('GetSubcontractApplication', this.subcontractApplicationFormId)
            .then((res) => {
              if (res.rel) {
                console.log('表单内容', res)
                this.subcontractApplicationForm = res.data
                if(!this.$utils.isEmpty(res.data.beginDate)){
                  this.$set(this.subcontractApplicationForm, 'beginDate',new Date(res.data.beginDate).getTime())
                }
                if(!this.$utils.isEmpty(res.data.expiryDate)){
                  this.$set(this.subcontractApplicationForm, 'expiryDate',new Date(res.data.expiryDate).getTime())
                }

                /*this.$nextTick( () =>{
                  this.saveBtnDisabledFlag =true
                })*/
              } else {
                this.$message({message: res.message, type: 'warning'})
              }
            }).catch(error => {
              console.log(error)
            })
        } else {
          this.addSubcontractApplication()
        }
      },
      /**
       * 获取分包类型
       * */
      getSubcontractType() {
        this.$store.dispatch('GetDictionaryDataByTypeFilterSubcontractApplication', 'BPMA_SUB_TYPE')
          .then((res) => {
            if (res.rel) {
              this.subcontractTypeList = res.data;
            } else {
              this.$message({message: res.message, type: 'warning'})
            }

          }).catch(error => {
          console.log(error)
        })
      },

      /**
       * save subcontractApplicationForm
       * */
      saveSubcontractApplicationForm(boolean) {
        this.subcontractApplicationForm.days = this.days
        this.subcontractApplicationForm.beginDate = this.subcontractApplicationForm.beginDate ? this.subcontractApplicationForm.beginDate: null
        this.subcontractApplicationForm.expiryDate =this.subcontractApplicationForm.expiryDate ? this.subcontractApplicationForm.expiryDate: null
        this.subcontractApplicationForm.bebeforeTaxPrice = this.beforeTaxPrice
        const saveFormData = this.$utils.copy(this.subcontractApplicationForm);

        return this.$store.dispatch('SaveSubcontractApplication', saveFormData)
          .then((res) => {
            if (res.status && res.status === 200) {
              console.log('保存成功', res);
              this.subcontractApplicationForm.id = res.data.id;
              this.subcontractApplicationFormId = res.data.id;
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
       * 修改 subcontractApplicationForm
       * */
      updateSubcontractApplicationForm(boolean) {

        this.subcontractApplicationForm.days = this.days
        this.subcontractApplicationForm.beginDate = this.subcontractApplicationForm.beginDate ? this.subcontractApplicationForm.beginDate: null
        this.subcontractApplicationForm.expiryDate =this.subcontractApplicationForm.expiryDate ? this.subcontractApplicationForm.expiryDate: null
        this.subcontractApplicationForm.bebeforeTaxPrice = this.beforeTaxPrice

        const updateFormData = this.$utils.copy(this.subcontractApplicationForm);
        return this.$store.dispatch('UpdateSubcontractApplication', updateFormData)
          .then((res) => {
            if (res.status && res.status === 200) {
              console.log('修改成功', res);
              // this.subcontractApplicationForm.id = res.data.id;
              // this.subcontractApplicationFormId = res.data.id;
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
       * delete subcontractApplicationForm
       * */
      deleteSubcontractApplicationForm() {
        return this.$store.dispatch('DeleteSubcontractApplication', this.subcontractApplicationFormId)
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
       * audit subcontractApplicationForm
       * */
      auditSubcontractApplicationForm() {

        console.log('this.subcontractApplicationForm', this.subcontractApplicationForm)
        return this.$store.dispatch('AuditSubcontractApplication', this.subcontractApplicationForm)
          .then((res) => {

            console.log('audit res', res)
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
            this.subcontractApplicationForm = Object.assign({}, this.subcontractApplicationForm, {
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
       formatBeginDate() {
         return this.subcontractApplicationForm.beginDate = new Date(this.subcontractApplicationForm.beginDate).getTime()
       },
       formatExpiryDate() {
         return this.subcontractApplicationForm.expiryDate = new Date(this.subcontractApplicationForm.expiryDate).getTime()
       },


    }
  }
</script>

<style scoped>
 /* .date-picker {
    width: 100%;

  }

  .date-picker >>> .el-input__inner {
    padding-left: 35px;
  }

  .form-btn {
    margin-bottom: -10px;
  }
  .form-btn:hover{background-color:transparent;border-right:none}


  .mode-select {
    width: 100%;
  }
*/

</style>
