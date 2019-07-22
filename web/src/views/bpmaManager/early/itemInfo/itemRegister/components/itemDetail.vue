<template>
    <div class="itemDetail-container-list">
        <div class="grid-content bg-purple handler-container">
            <el-button type="primary" size="small" icon="el-icon-plus" @click="add()" plain>新增</el-button>
            <el-button type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>保存</el-button>
            <el-button :disabled="isAudit2" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核</el-button>
            <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del" plain>删除</el-button>
        </div>
        <div class="logForm">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="form-container" :show-message="false">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-validate-status :model="ruleForm"></basic-validate-status>
              </el-col>
              <el-col :span="8">
                <el-form-item label="系统编码" prop="code">
                  <el-input clearable size="small" v-model="ruleForm.code" disabled maxlength="100"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="年度批次" prop="year">
                  <el-select v-model="ruleForm.year" placeholder=""  size="small">
                    <el-option
                      v-for="item in this.year"
                      :key="item.year"
                      :label="item.year"
                      :value="item.year"/>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="项目名称" prop="name">
                  <el-input clearable size="small" ref="ruleFormName" v-model="ruleForm.name" maxlength="100" :disabled="isAudit"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="原始编码" prop="orignalCode">
                  <el-input clearable size="small" v-model="ruleForm.orignalCode" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目类型" prop="typeName">
                  <el-input placeholder="请选择项目类型"  v-model="ruleForm.typeName"  readOnly size="small" >
                  <el-button size="small" slot="append" icon="el-icon-plus" @click="handleProjectType"></el-button>
                </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="项目全称" prop="fullName">
                  <el-input clearable size="small" v-model="ruleForm.fullName" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="建设性质" prop="natureId">
                  <el-select v-model="ruleForm.natureId" placeholder="" size="small"
                  @change="val => ruleForm.nature = constructionType.filter(res => res.id == val)[0].name">
                    <el-option
                      v-for="item in this.constructionType"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="项目阶段" prop="stageId">
                  <el-select v-model="ruleForm.stageId" placeholder="请选择阶段" size="small"
                  @change="val => ruleForm.stage = stage.filter(res => res.id == val)[0].name">
                    <el-option
                      v-for="item in this.stage"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否政府投资" prop="ifGovInvest" class="add-border">
                  <el-radio-group v-model="ruleForm.ifGovInvest">
                    <el-radio
                      v-for="(item,key) in this.dictionary.isOrNot"
                      :key="key"
                      :label="parseInt(item.code)"
                      > {{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="业务区域" prop="areaId">
                  <el-select v-model="ruleForm.areaId" placeholder="" size="small"
                  @change="val => ruleForm.area = area.filter(res => res.id == val)[0].name">
                    <el-option
                      v-for="item in this.area"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="行政区划" prop="district">
                  <el-input placeholder="请选择行政区划"
                            v-model="ruleForm.district"  readonly size="small" >
                  <el-button size="small" slot="append" icon="el-icon-plus" @click="clickByDialogAddData('district')"></el-button>
                </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="详细地址" prop="address">
                  <el-input clearable size="small" v-model="ruleForm.address" maxlength="1023"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="经营方式" prop="operationWay" class="add-border">
                  <el-radio-group v-model="ruleForm.operationWay" @change='changeOpera'>
                    <el-radio
                      v-for="(item,key) in this.dictionary.operate"
                      :key="key"
                      :label="parseInt(item.code)"
                      > {{item.name}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联营单位" prop="enterpriseName" :class="isOperat?'hide':''">
                  <el-input :placeholder="isPlaceHolder"  v-model="ruleForm.enterpriseName" readonly size="small" :disabled="isOperat">
                  <el-button size="small" slot="append" icon="el-icon-plus" @click="toipClick('counterpart')" :disabled='isOperat'></el-button>
                </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="联营说明" prop="operationExplain">
                  <el-input clearable size="small" v-model="ruleForm.operationExplain" maxlength="1023"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item label="建设单位" prop="buildEnterprise">
                  <el-input clearable size="small" v-model="ruleForm.buildEnterprise" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="设计单位" prop="designEnterprise">
                  <el-input clearable size="small" v-model="ruleForm.designEnterprise" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="监理单位" prop="superviseEnterprise">
                  <el-input clearable size="small" v-model="ruleForm.superviseEnterprise" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="单位说明" prop="enterpriseExplain">
                  <el-input clearable size="small" v-model="ruleForm.enterpriseExplain" maxlength="100"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="项目概况" prop="proSummary">
                  <el-input size="small"
                      type="textarea"
                        maxlength="200"
                      :autosize="{ minRows: 3, maxRows: 5}"
                      placeholder="请输入内容"
                      v-model="ruleForm.proSummary">
                    </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <el-form-item label="附件" class="add-border file">
                 <basic-upload ref="refBasicUpload" :formId="itemId">
                  </basic-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="16">
                <el-form-item label="登记人员" prop="inputPerson">
                  <el-input clearable size="small"
                            placeholder="系统自动生成登记人员"
                            v-model="ruleForm.inputPerson" disabled></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记时间" prop="inputTime" class="showTime">
                  <el-input size="small" clearable  v-model="ruleForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <addPop ref="addPop" @getItem="getItem" :type="type" v-show='dialogTableVisible'></addPop>

      <!--项目类型-->
      <basic-dialog v-el-drag-dialog title="项目类型-选择" :visible.sync="projectType.visibleSync" >
        <dialog-project-type ref="refDialogProjectType"
                            @selectionChange="selectionChangeProjectType"></dialog-project-type>
        <div slot="footer" class="dialog-footer">
          <el-button @click="clickProjectTypeCancel">取 消</el-button>
          <el-button type="primary" @click="clickProjectTypeOk">确 定</el-button>
        </div>
      </basic-dialog>
      <!--联营单位-->
      <el-dialog :visible.sync="visibleSyncCounterpart" lock-scroll title="联营单位-选择" width="70%">
        <dialog-transit-unit @selectionChange="selectionChange" filterValid
                             v-if="visibleSyncCounterpart"></dialog-transit-unit>
        <div class="dialog-footer" slot="footer">
          <el-button @click="visibleSyncCounterpart = false">取 消</el-button>
          <el-button @click="handleChange" type="primary">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {tags,getEnumData,getNowFormatDate} from '@/utils'
import {columnsData} from './index.js'
import addPop from './addPop.vue'
import {addItemInfo,modifyItemInfo,showDetail,auditItemInfo,deleteItemInfo,selectListOwn} from '@/api/bpmaManager/early/itemInfo/itemRegister'
  import { selectItemType } from '@/api/bpmaManager/early/itemInfo/itemType' //项目类型

import {getUnitInfoList} from '@/api/sysManager/unit'
import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
import {getArea} from '@/api/sysManager/sysBaseSet/areaManager'
import {getAccountancyYear} from '@/api/sysManager/sysBaseSet/monthYearManager'

import dialogProjectType from '@/views/components/dialog/dialogProjectType' // 项目类型弹窗
import dialogTransitUnit from '@/views/components/dialog/dialogTransitUnit' //联营单位
import {staticDataBasic} from "@/assets/data/basic";

import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
export default {
  name: 'itemDetail',
  mixins: [computed, methods, formatEnum],
  components:{
    addPop,
    dialogProjectType,
    dialogTransitUnit
  },


  data() {
    return {
      ruleForm: {
        id:'',
        validateStatus:2,//审核状态
        code:'',//编码
        typeId :'',//项目类型
        typeName:'',//项目类型名稱
        ifGovInvest :2,//是否政府投资
        area:'',//业务区域
        areaId:'',//业务区域id
        district :'',//行政区划
        districtId :'',//行政区划id
        operationWay :1,//经营方式
        enterpriseId :'',//联营单位id
        enterpriseName:'',//联营单位名称
        operationExplain :'',//联营说明
      },
      columns:[],
      recvPerson1:[],//发送人员
      dictionary:'',
      borderRed:false,
      itemId:'',
      dialogTableVisible:false,
      type:'',
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
         stageId: [
          { required: true, message: ' ', trigger: 'change' }
        ]
      },
      constructionType:[],// 建设性质
      year:[],
      stage:[],// 階段
      area:[],// 业务区域


      /**
       * 项目类型
       * */
      projectType:{
        visibleSync: false,
        projectTypeSelectionChange: null
      },


      /**
       * 联营单位 行政区划弹窗
       * */
      type: null,
      visibleSyncCounterpart: false,
      visibleSyncDistrict: false,
      selectedRow: {},
  }
 },
  deactivated() {
    this.$store.dispatch("cacheId", undefined);
  },
  activated(){
    this.$utilsBasic.loadAddAndDetailData(this, () => {
      if(this.$route.params) {
        this.itemId = this.$route.params.id ? this.$route.params.id : undefined;
      }
      this.add();

    },(id) => {
      this.itemId = id;
      this.getDetail();

    });
  },
  created(){

    this.getEnumData(['GetValidateStatusData','GetIsOrNotData','GetOperate','GetEnabledData','GetIsOrNotData']);
    this.dictionary=this.$store.state.common.dataEnum
    setTimeout( () => {
      this.getDiction()
      this.getAreas()
      this.getYear()
    },100)
    this.$store.dispatch("cacheId",'0');//刷新

  },
  computed:{
    isAudit(){
      if(this.ruleForm.validateStatus ==1){
        return true
      }else{
        return false
      }
    },
    isAudit2(){
      if(this.ruleForm && this.ruleForm.validateStatus !=1){
        return false
      }else{
        return true
      }
    },
    isOperat(){
      if(this.ruleForm.operationWay !=1){
        return false
      }else{
        return true
      }
    },
    isPlaceHolder(){
      if(this.ruleForm.operationWay !=1){
        return '请选择联营单位'
      }else{
        return ''
      }
    }
  },
 methods:{
   //查看详情
   getDetail(){
     console.log(this.itemId,'id')
      showDetail(this.itemId).then(res=>{
          this.ruleForm=res.data
        this.$refs.ruleForm.resetFields()
      }).catch(err=>{
        this.$message.warning(err.message)
      })
   },
   //獲取字典
   getDiction(){
     //階段
     getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then(res=>{
       if(res.status==200){
         this.stage=res.data
       }
     }).catch(err=>{
       this.$message.warning(err.message)
     })
      //建設性質
     getDictionaryDataByTypeFilter('SYS_PRO_NATURE').then(res=>{
       if(res.status==200){
         this.constructionType=res.data
       }
     }).catch(err=>{
       this.$message.warning(err.message)
     })
   },
   //獲取業務區域
   getAreas(page,fuzzy){
          let data={
              page:page,
              limit:100,
              fuzzy:fuzzy,
            validateStatus:1,
            enable: 1
          }
     getArea(data).then(res=>{
          if(res.status==200){
            this.area=res.data.rows
          }
      }).catch(err=>{
        this.$message.warning(err.message)
      })
   },
   //獲取會計年度
   getYear(page,fuzzy){
          let data={
              page:page,
              limit:100,
              fuzzy:fuzzy,
            validateStatus:1,
            enable: 1
          }
     getAccountancyYear(data).then(res=>{
          if(res.status==200){
            this.year=res.data.rows
          }
      }).catch(err=>{
        this.$message.warning(err.message)
      })
   },
   //新增
   add(){
      this.ruleForm= {
        validateStatus:2,
        ifGovInvest:2,
        operationWay:1,
        year:new Date().getFullYear(),
        enterpriseId :'',//联营单位id
        enterpriseName:'',//联营单位名称
        typeId :'',//项目类型
        typeName:'',//项目类型名稱
        district :'',//行政区划
        districtId :'',//行政区划id
      }
      this.itemId=''
     this.$set(this.ruleForm, 'id','')
     this.$refs.ruleForm.resetFields()
     this.$refs.ruleFormName.focus()
     // this.$store.dispatch('setItemInfoId','')
   },
   //保存
   save(formName,boolean){
     return new Promise((reslove,reject) =>{
       this.$refs[formName].validate(async (valid) => {
         if (valid) {
           if(this.itemId){
             modifyItemInfo(this.ruleForm).then(res=>{
               if(res.status==200){
                 this.itemId=res.data.id
                 this.ruleForm=res.data
                 if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                 if(!boolean){
                   this.$message.success(res.message)
                 }
                 console.log('修改成功')
                 reslove()
               }
             }).catch(err=>{
               this.$message.warning(err.message)
             })
           }else{
             addItemInfo(this.ruleForm).then(res=>{
               if(res.status==200){

                 this.itemId=res.data.id
                 this.ruleForm=res.data
                 if(!this.$refs.refBasicUpload.submitUpload(res.data.id)) return false;
                 console.log('保存成功')
                 if(!boolean){
                   this.$message.success(res.message)
                 }
                 // this.$store.dispatch('setItemInfoId',res.data.id)
                 reslove()
               }
             }).catch(err=>{
               this.$message.warning(err.message)
             })
           }
         } else {
           this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'});
           return this.$utilsBasic.valideFocus(this, ['ruleFormName']);

         }
       });
     })

   },
   //审核
   audit(){
     this.$confirm('亲，您是否确定审核当前数据，审核后数据不能修改！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
       await this.save('ruleForm', true)
       auditItemInfo(this.ruleForm).then(res => {
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
   //
  del(){
      this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
              if(this.$utils.isEmpty(this.itemId)){
                this.add()
                return
              }
              deleteItemInfo(this.itemId).then(res=>{
                if(res.status==200){
                    this.$message.success(res.message)
                    this.add()
                }
              }).catch(err=>{
                this.$message.warning(err.message)
              })
        }).catch(() => {

        });
  },
  //选择项目类型
  clickByDialogAddData(type){
    this.type=type
    if(type=='enterpriseName'){
      if(this.ruleForm.operationWay==1){
        return
      }
      console.log(this.ruleForm.operationWay)
    }
    this.dialogTableVisible=true
    setTimeout(() => {
       this.$refs.addPop.openDialog()
        if(type== 'typeName'){
         /* this.getItemType()
          this.$refs.addPop.title='项目类型-选择'
          this.$refs.addPop.type=1
          this.$refs.addPop.columns=columnsData.itemColumns*/
        }else if(type== 'district'){
          this.$refs.addPop.title='行政区域-选择'
          this.$refs.addPop.type=2
          this.$refs.addPop.columns=columnsData.districtColumns
          this.$refs.addPop.tableData=[{district:'北京',districtId:1},{district:'上海',districtId:2}]
        }else{
          this.getUnit()
          this.$refs.addPop.title='联营单位-选择'
          this.$refs.addPop.type=3
          this.$refs.addPop.columns=columnsData.enterpriseColumns
        }
    }, 300);
  },
  getItem(v){
    console.log(v,'v')
    if(v[1]==1){
      console.log(v[0].name)
      this.ruleForm.typeId=v[0].id
      this.ruleForm.typeName=v[0].name
    }else if(v[1]==2){
      this.ruleForm.districtId=v[0].districtId
      this.ruleForm.district=v[0].district
    }else{
      this.ruleForm.enterpriseId=v[0].id
      this.ruleForm.enterpriseName=v[0].name
    }
   },
   //获取项目类型
   getItemType(page,fuzzy){
            let data={
                validateStatus:1,
                enable:1
            }
                selectItemType(data).then(res=>{
                if(res.status == 200){
                    console.log(res.data.rows,'r')
                    if(res.data.rows){
                      this.$refs.addPop.tableData=res.data.rows
                      this.$refs.addPop.page.total=res.data.total
                    }else{
                      this.$refs.addPop.tableData=res.data
                      this.$refs.addPop.page.total=res.data.length
                    }
                }
            }).catch(err=>{
                this.$message.warning(err.$message)
            })
  },
  //获取联营单位
  getUnit(page,fuzzy){
        let data={
                page:page,
                limit:10,
                fuzzy:fuzzy,
                validateStatus:1,
                enable: 1
            }
        getUnitInfoList(data).then((res)=>{
          if(res.status == 200){
            console.log('res',res)
            this.$refs.addPop.tableData=res.data.rows
            this.$refs.addPop.page.total=res.data.total
          }
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
    },
    changeOpera(v){
     if(v==1){
        this.ruleForm.enterpriseId=''
        this.ruleForm.enterpriseName=''
     }
    },
   handleClose(tag){
     this.recvPerson1.splice(this.recvPerson1.indexOf(tag), 1);
   },
   getrecvPerson(v){
     this.recvPerson1=v
     this.borderRed=false
   },
   format(v){
     return ''+v
   },

   /**
    * 项目类型
   * */
   handleProjectType(){
     this.projectType.visibleSync = true;
     this.$nextTick(() => {
      // this.saveBtnDisabledFlag = false;
     })
   },

   /**
    * 项目类型弹框显示和隐藏
    */
   clickProjectTypeCancel() {
     this.projectType.visibleSync = false;
   },
   selectionChangeProjectType(data) {
     console.log('回传 data', data)
     this.projectType.projectTypeSelectionChange = data.selectedRow;
   },
   /**
    * 项目类型弹框显示之后，确定
    */
   clickProjectTypeOk() {
     console.log('clickProjectTypeOk')
     this.projectType.visibleSync = false;
     this.$set(this.ruleForm,'typeName',this.projectType.projectTypeSelectionChange.name)
     this.$set(this.ruleForm,'typeId',this.projectType.projectTypeSelectionChange.id)
     console.log('选择的项目类型',this.ruleForm.typeName)
   },

   /**
    * 点击显示哪种弹窗 联营单位counterpart  行政区划district
    * */
   toipClick(type) {
     if (this.disabled) return
     this.type = type
     this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
   },
   selectionChange(row) {
     console.log('回传row',row)
     this.selectedRow = row.selectedRow
   },

   /**
    * 弹窗传回的名称
    * */
   handleChange() {
     const row = this.selectedRow
     if(!this.isSelectedRow(row)) return false;
     if (Object.keys(row).length === 0) return
     switch (this.type) {
       case 'counterpart':
         this.ruleForm = Object.assign({},this.ruleForm, {
           enterpriseName : row.name,
           enterpriseId : row.id,
         } )
         break

       case 'district':
         this.ruleForm = Object.assign({},this.ruleForm, {
           district : row.name,
           districtId : row.id,
         } )
         break
     }
     this.saveBtnDisabledFlag = false
     this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
   },

 }
}
</script>
<style scoped>
/*.el-form-item{margin-bottom: 5px}
.mt10{margin-top: 15PX;}
.logForm >>> .el-radio__input.is-disabled.is-checked .el-radio__inner{background: #409EFF}
.personWrap{border:1px solid #dcdfe6;position:relative;padding:0 110px 0 5px;min-height: 46px}
.personWrap .tags{width: 100%;}
.el-tag{margin-left: 5px;}
.borderRed{border: 1px solid red}
.form-container .el-button{margin-bottom:-10px}
.form-container >>> .showTime .el-input__inner{padding-left: 30px!important;}
.el-select{width: 100%}
.el-input{width: 100%}
.form-container >>>.el-input-group__append{border:1px solid #909399}
.form-container >>>.hide .el-input-group__append{border:1px solid #dcdfe6;border-left: none}
.form-container >>> .colorB .el-input.is-disabled .el-input__inner{color: #606266}*/
</style>
