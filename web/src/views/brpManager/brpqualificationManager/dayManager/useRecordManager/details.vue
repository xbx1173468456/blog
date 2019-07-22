<template>
  <div class="app-container useRecordManager-container">
    <div class="handler-container">
      <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-plus"
        @click="resetData">
        新增
      </el-button>
      <el-button
        type="primary"
        plain
        size="small"
        :disabled="saveBtnDisabledFlag ||auditStatus "
        icon="el-icon-if-save"
        @click="changeDatalist">
        保存
      </el-button>
      <el-button
        type="primary"
        :disabled="auditStatus"
        plain
        size="small"
        icon="el-icon-delete"
        @click="deleteHint">
        删除
      </el-button>
      <el-button
        type="primary"
        :disabled="auditStatus"
        plain
        size="small"
        icon="el-icon-if-auth"
        @click="handleAudit">
        审核
      </el-button>
    </div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1" title="基本信息">
      <el-form label-width="120px" class="form-container" :model="formData" :rules="rules" ref="formData" :show-message="false">
        <el-row :gutter="10">
          <el-col :span="8">
            <basic-validate-status :model="formData"></basic-validate-status>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据编码">
              <el-input clearable size="small" v-model="formData.code" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="单据名称">
              <el-input clearable size="small" v-model="formData.name" :disabled="auditStatus"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用人员" prop="usePerson">
              <el-input size="small" v-model="formData.usePerson" readOnly placeholder="请选择使用人员" :disabled="auditStatus">
                <el-button size="small" slot="append" icon="el-icon-plus" class="form-btn" @click="dialog=true" :disabled="auditStatus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="使用日期" prop="useTime">
              <el-date-picker size="small"
                v-model="formData.useTime"
                type="date"
                :editable="false"
                format="yyyy-MM-dd"
                @change="formatTime"
                :disabled="auditStatus"
                >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="使用事由" prop="useReason">
              <el-input
                v-model="formData.useReason"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                maxlength="100"
                :disabled="auditStatus"
                placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="补充说明">
              <el-input
                v-model="formData.remark"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 6}"
                maxlength="100"
                :disabled="auditStatus"
                placeholder="请输入内容">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </el-collapse-item>
    </el-collapse>
    <transition name="slide-fade">
      <div class="content-container">
    <div class="handler-container">
      <el-button type="primary"
                 :disabled="auditStatus"
                 plain @click="changeDialog=true">引入资证</el-button>
      <el-button type="primary"  plain @click="handleDeleList" :disabled="status">删除</el-button>
    </div>
    <el-table
      ref="refUseRecord"
      :height="tableHeight"
      :data="addList"
      border
      fit
      stripe
      highlight-current-row stripe
      @current-change="currentRow">
      <el-table-column
        label="序号"
        type="index"
        width="60" align="center">
      </el-table-column>
      <el-table-column
        prop="qualiCode"
        label="系统编码"
        width="130" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="qualiType"
        label="资证类型"
        width="130"
        align="left"
        header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="qualiName"
        label="资证名称"
        min-width="200"
        align="left"
        header-align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="originalCode"
        label="原始编码"
        width="130"
        align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="obtainDate"
        label="获取日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <el-table-column
        prop="expiryDate"
        label="截止日期"
        width="130" align="center" :formatter="formatDate">
      </el-table-column>
      <!--<el-table-column
        prop="borrowPerson"
        label="有效期限"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>-->
      <el-table-column
        prop="authorizeOrg"
        label="发证机构"
        width="120" align="center" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="200"
        align="left"
        header-align="center" show-overflow-tooltip>
      </el-table-column>
    </el-table>
      </div>
    </transition>
    <basic-dialog v-el-drag-dialog title="操作人员-选择" :visible.sync="dialog" >
      <dialogUserManager @selectionChange="selectionChange" filterValid v-if="dialog"></dialogUserManager>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog title="资证信息-选择" :visible.sync="changeDialog" >
      <dialogQualificationInfo ref="refDialogQualification" :aualificationInfoData="addList" :isShowChecked="true"
                      @selectionChange="selectionChangeQualification" v-if="changeDialog">
      </dialogQualificationInfo>
      <div slot="footer" class="dialog-footer">
        <el-button @click="changeDialog=false">取 消</el-button>
        <el-button type="primary" @click="clickQualificationOk">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatBasic from "@/utils/mixins/formatBasic";
  import basicValidateStatus from "@/views/components/basic/basicValidateStatus/index";
  import dialogUserManager from '@/views/components/dialog/dialogUserManager'
  import dialogQualificationInfo from '@/views/components/dialog/dialogQualificationInfo'

  import {staticDataBasic} from "@/assets/data/basic";

  export default {
    mixins: [computed, methods,formatBasic],
    components:{
      basicValidateStatus,
      dialogUserManager,
      dialogQualificationInfo
    },
    data() {
      return {
        activeNames: ['1'],
        dataList: [],
        currentPage: 10,
        timeData: [],

        saveBtnDisabledFlag:true,
        qualiStatus:false,
        showStatus: '',
        dialog:false,//弹出框状态
        changeDialog:false,//弹出框状态
        qualificationSelectionChange:[],//选中资证列表
        tableHeight:300,
        addList:[],//已引入资证列表

        typeList:[],//资证列表
        pitchList:[],
        personList:{},//已选中人员


        formData: {
          authCode: "",//用户授权编码
          code: "",//编码
          enable:1,//启用状态
          expiryTime:"",//过期时间
          inputPerson: "",//登记人员
          inputPersonId: '',//登记人员ID
          inputTime: "",//登记时间
          name: "",//单据名称
          id:"",//ID
          obtainTime:"",//获取日期
          remark: "",//备注
          reserve: "",//保留
          usePerson:"",//使用人员
          usePersonId:"",//使用人员ID
          useReason:"",//使用事由
          useTime:"",//使用时间
          validateStatus: 2,//审核状态
          detailList:[]
        },
        defaultExpandAll: true,//全部展开
        rowData: null,//当前行数据
        search:{
          validateStatus:1,
          enable:1
        },
        rules: {
          useTime:[
            { required: true, message: '请选择时间', trigger: 'change' }
          ],
          useReason:[
            { required: true, trigger: 'change'},
          ],
          usePerson:[
            { required: true, trigger: 'change'},
          ]
        },
        selectedRow: {},
      }
    },
    deactivated() {
      this.$store.dispatch("cacheId", undefined);
    },
    activated() {
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        if(this.$route.params) {
          this.formData.id = this.$route.params.id ? this.$route.params.id : undefined;
        }
        this.resetData();

      },(id) => {
        this.getDatalist(id);
        this.getTypeList(id);
      });
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData'
      ]);
      this.$store.dispatch("cacheId",'0');//刷新
    },
    mounted() {
      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },
    computed:{
      auditStatus (){
        if(!this.$utils.isEmpty(this.formData) ){
          return this.formData.validateStatus == 1
        }
        return true;
      },
      status () {
        return this.rowData === null || this.auditStatus
      }
    },
    watch:{
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      },
      formData:{
        handler() {
          this.saveBtnDisabledFlag = false
        },
        deep:true
      }
    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        if (!this.$refs.refUseRecord) return
        const offsetTopTable = this.$refs.refUseRecord.$el.getBoundingClientRect().top;
        //this.tableHeight = innerHeight - offsetTopTable;
        this.tableHeight = (innerHeight - offsetTopTable) > 300 ? (innerHeight - offsetTopTable): 300;
      },

      /**
       * 弹窗传回的项目名称
       * */
      handleChange() {
        const row = this.selectedRow
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        this.formData = Object.assign({}, this.formData, {
          usePerson: row.username,
          usePersonId: row.id
        })
        this.dialog = false;
      },
      /*拿到选择操作人员的对象*/
      selectionChange(row) {
        console.log(row.selectedRow)
        this.selectedRow=row.selectedRow;
      },
      handleChangeList(){
        const row = this.pitchList
        if(!this.isSelectedRow(row)) return false;
        if (Object.keys(row).length === 0) return
        /*this.formData.usePerson = row.name;
        this.formData.usePersonId = row.id;*/
        this.dialog = false;
      },
      selectionChangeQualification(data) {
        this.qualificationSelectionChange = data.selectedRows;
        console.log(data.selectedRows)
      },
      clickQualificationOk() {
        this.changeDialog = false;
        //this.addList.push(this.qualificationSelectionChange)
        let arr=this.qualificationSelectionChange.concat();

        arr.forEach(x=>{
          let obj = Object.assign({}, {
            masterId: this.formData.id,
            qualiId: x.id,
            qualiCode: x.code,
            qualiType: x.typeName,
            qualiName: x.name,
            originalCode: x.originalCode,
            obtainDate: x.obtainDate,
            expiryDate: x.expiryDate,
            authorizeOrg: x.authorizeOrg,
            remark: x.remark
          })

          this.addList.unshift(obj)
          this.$set(this.formData,'detailList',this.addList)
        })
        console.log('this.addList',this.addList)
      },

      /*删除已引入的资证*/
      handleDeleList(){
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() =>{

          this.deleteByIdData(this.addList, this.rowData,(allData,data)=>{
            this.$set(this.formData,'detailList',allData) //所有数据（删除时，只改变删除数据的状态，点保存后才删除）
            this.addList = data; //除去需要删除的数据
          });

        }).catch(error => {
          console.log(error)
        })
      },
      deleteList(){
        // console.log(this.rowData.qualiId)
        return this.$store.dispatch('DeleteQualificationUseDetail', this.rowData.id).then((response) => {
            this.$message.success(response.message);
          }).catch((err) => {
            console.log(err)
          })


      },

      /*已引入的资证列表*/
      getTypeList(id) {

        this.$store.dispatch('GetQualificationUseDetaillistByMasterId',id).then((response) => {
          this.addList = response.data.rows;
          this.$set(this.formData,'detailList',response.data.rows)
        }).catch((err) => {
          console.log(err)
        })
      },
      /*获取当前行信息*/
      currentRow(currentRow) {
        this.rowData = currentRow;
        console.log('currentRow',currentRow)
      },
      /*获取记录信息*/
      getDatalist(id) {
       return this.$store.dispatch('GetQualificationUseMasterDetails', id).then((response) => {
          this.formData = response.data;
        }).catch(() => {
          console.log(23)
        })
      },
      /*新增或修改*/
      changeDatalist() {
        this.$refs.formData.validate((valid) => {
          if (valid) {
           this.saveOrUpdate().catch((err) => {
             console.log(err)
           })
          }else{
            this.$message({
              message: staticDataBasic.info.updateEmptyError,
              type: 'warning'
            });
          }
        })
      },
      saveOrUpdate(boolean) {
        // this.$set(this.formData,'detailList',this.addList)
        console.log('this.addList',this.addList)
        return this.$store.dispatch('SaveQualificationUseMaster', this.formData).then((response) => {
          console.log(response)
          this.formData = response.data
          this.addList = response.data.detailList
          if(!boolean){
            this.$message.success(response.message);
          }

        }).catch((err) => {
          console.log(err)
        })

      },


      formatTime(time){
        this.formData.useTime = new Date(this.formData.useTime).getTime();
      },
      /*删除提示*/
      deleteHint() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$utils.isEmpty(this.formData.id)){
            this.resetData();
          }else{
            this.deleteDatalist().then( () =>{
              this.resetData();
            })
          }

        }).catch(() => {
        })
      },
      /*删除*/
      deleteDatalist() {
       return this.$store.dispatch('DeleteQualificationUseMaster', this.formData.id).then((response) => {
          this.$message.success(response.message);

        }).catch(() => {
          console.log(23)
        })
      },
      /*审核*/
      handleAudit(){
        this.$confirm('亲，您是否确定审核当前数据，审核后数据不能恢复！, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs.formData.validate((valid) => {
            if (valid) {
              this.saveOrUpdate(true).then(() =>{
                this.auditDatalist()
              }).catch((err) => {
                console.log(err)
              })
            }else{
              this.$message({
                message: staticDataBasic.info.updateEmptyError,
                type: 'warning'
              });
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      },
      auditDatalist() {
      return this.$store.dispatch('AuditQualificationUseMaster',this.formData).then((response) => {
          this.$message.success(response.message);
        this.formData = response.data
        this.addList = response.data.detailList
        }).catch((err) => {
          console.log(err)
        })
      },


      /*清空当前*/
      resetData() {
        this.formData = {
          authCode: "",//用户授权编码
            code: "",//编码
            enable:1,//启用状态
            expiryTime:"",//过期时间
            inputPerson: "",//登记人员
            inputPersonId: '',//登记人员ID
            inputTime: "",//登记时间
            name: "",//单据名称
            id:"",//ID
            obtainTime:"",//获取日期
            remark: "",//备注
            reserve: "",//保留
            usePerson:"",//使用人员
            usePersonId:"",//使用人员ID
            useReason:"",//使用事由
            useTime:new Date().getTime(),//使用时间
            validateStatus: 2,//审核状态
            detailList:[]
        };
        this.addList=[];
        this.$refs.formData.resetFields()
      }
    }
  }
</script>

<style scoped>
/*.popbtn{
  height: 38px;
  line-height: 38px;
  padding-left: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  width: 100%
}*/
</style>
