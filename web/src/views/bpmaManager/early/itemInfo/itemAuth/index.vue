<template>
  <basic-split-pane class="itemAuth-container"
                    :default-percent='75'
                    :min-percent='25'>
    <template  slot="leftContainer">
      <div class="left-container">
        <basic-handler>
          <el-button v-if="addBtnShowFlag" type="primary" plain icon="el-icon-if-introduce" size="small"
                     @click="handleImportPerson">引入人员</el-button>
          <el-button  v-if="saveBtnShowFlag"  type="primary" plain icon="el-icon-if-save" size="small"
                      @click="handleSavePerson">保存</el-button>
          <el-button  v-if="deleteBtnShowFlag"  type="primary" plain icon="el-icon-delete" size="small"
                      :disabled="deleteBtnDisabledFlag"
                      @click="handleDel">删除</el-button>
          <template slot="search">
            <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                          @clickSearchFilter="clickSearchFilter"></basic-search>
          </template>
        </basic-handler>

        <basic-table ref="refProjectPersonTableData"
                     :dataTable="projectPersonTableData"
                     :columns="columns"
                     @current-change="handleCurrentChange"
                     :pagination="modelSearchFilter"
                     @pagination="getAllProjectPersonData"
                     @selection-change="handleSelectionChange"
        >
          <template slot="selection">
            <el-table-column header-align="center" align="center"
              type="selection"
              width="45">
            </el-table-column>
          </template>
          <template slot-scope="obj" slot="proRole">
            <el-input clearable size="small"  placeholder="请输入项目角色"
                      v-model="obj.scope.row.proRole"></el-input>
          </template>
          <template slot-scope="obj" slot="remark">
            <el-input clearable size="small"  placeholder="请输入角色说明"
                      v-model="obj.scope.row.remark"></el-input>
          </template>

        </basic-table>

        <basic-dialog v-el-drag-dialog :visible.sync="dialogTableVisible" title="人员-选择" >
          <dialog-preson @change="changePerson" checkbox></dialog-preson>
          <div class="dialog-footer" slot="footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button @click="getPersonOk" type="primary">确 定</el-button>
          </div>
        </basic-dialog>
      </div>
    </template>
    <template slot="rightContainer">
      <div class="right-container" >
        <page-select-filter :selectData="selectData" :data="projectPersonData" v-model="selectValue" @change="contractChange" @refreshData="getAllItem"></page-select-filter>
      </div>
    </template>

  </basic-split-pane>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import dialogPreson from "@/views/components/dialog/dialogPreson";
  import {staticDataBasic} from "@/assets/data/basic";

  /**
   * api
   * */

  import {
    getPersonAuth,
    getAllItems,
    addPersonAuth,
    deleteAuth
  } from "@/api/bpmaManager/early/itemInfo/itemAuth/index.js"
  import { getDictionaryDataByTypeFilter }from '@/api/common/dataDictionary.js'
    export default {
        name: 'itemAuth',
      mixins: [computed, methods, formatEnum,formatBasic],
      components: {
        dialogPreson
        },
        data() {
            return {
              addBtnShowFlag:true, //待系统菜单配置
              saveBtnShowFlag:true,
              deleteBtnShowFlag:true,

              modelSearchFilter: {
                page:1,
                limit:10,
                fuzzy: '',
                fuzzyKeys:'',
                proId:undefined,
                orderBy:'personCode'
              },
              projectPersonTableData:{
                data: [],
                total:0
              },

              dialogTableVisible:false,
              selectPersons:null,
              delData:null,
              currentRow:null, //表格当前行
              columns: [ //表格列
                {
                  text: '人员编码',
                  value: 'personCode',
                  width: '130',
                  align: "center",
                  showOverflowTooltip: true,
                },
                {
                  text: '姓名',
                  value: 'personName',
                  width: '130',
                  align: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '主岗岗位',
                  value: 'mainPost',
                  minWidth: 100,
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true
                },
                {
                  text: '项目角色',
                  value: 'proRole',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true,
                  className: "spacing-set",
                },
                {
                  text: '角色说明',
                  value: 'remark',
                  width: '200',
                  align: "left",
                  headerAlign: "center",
                  showOverflowTooltip: true,
                  className: "spacing-set",
                }
              ],

              proData:{},
              selectData: {
                data: [],
                key: 'id',
                name: 'name'
              },
              projectPersonData: {
                name: 'name',
                key: 'stageId',
                data: []
              },
              selectValue: [],
            }
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetValidateStatusData',
          'GetIsOrNotData'
        ]);

        this.getAllItem();
        this.getStage();

      },
      computed:{
        deleteBtnDisabledFlag () {
          return !this.delData;
        }
      },
      methods:{
        contractChange(data) {
          this.proData = data;
          console.log('data',data)
          if (!data) {
            return this.projectPersonTableData.data = []
          }
          this.modelSearchFilter.proId = data.id;
          // this.modelSearchFilter.proName = data.name;
          console.log('proId', this.proData)
          this.getAllProjectPersonData();
        },
        handleImportPerson(){
          if(this.$utils.isEmpty(this.proData)){
            this.$message({message:'当前无项目，无法引入人员！',type: 'warning'})
            return
          }
          this.dialogTableVisible = true
        },
        handleSavePerson(){
          addPersonAuth(this.projectPersonTableData.data).then( (res) =>{
            this.$message.success(res.message)
            this.getAllProjectPersonData()
            console.log('save',res)
            }) .catch(err=>console.log(err))
        },
        handleDel(){
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() =>{
            this.deleteAuthData()

          }).catch(err=>{
            console.log(err)
          })
        },
        /**
         * 表格复选框选中时
         * */
        handleSelectionChange(selection){
          console.log('table selection',selection)
          this.delData = selection
        },
        deleteAuthData(){
          let delDataIds= null;
            let delDataNoIds= null;
          delDataIds =  this.delData.map(item => item.id)
          delDataNoIds = this.delData.filter(item => {return !item.id})
          console.log('delDataIds',delDataIds)
          console.log('delDataNoIds',delDataNoIds)

          if(!this.$utils.isEmpty(delDataIds)){
            deleteAuth(delDataIds).then((res) =>{
              this.$message.success(res.message)
              this.getAllProjectPersonData()
              console.log('del',res)
            }).catch(err=>console.log(err))
          }
          if(!this.$utils.isEmpty(delDataNoIds)){
            delDataNoIds.forEach(item =>{
              this.projectPersonTableData.data.splice(this.projectPersonTableData.data.indexOf(item),1)
            })
          }

        },
        /**
         * 弹窗回传选中的人员
         * */
        changePerson(selection) {
         console.log('changePerson selection',selection)
          this.selectPersons = selection
        },
        getPersonOk(){
          this.dialogTableVisible = false
          this.selectedDataPushTable(this.selectPersons)
        },


        /**
         *  回传数据加入表格
         * */
        selectedDataPushTable(selectionChangeData){
          if(!this.$utils.isEmpty(selectionChangeData)){
            let addNewArr = [] //需新加的数组
            let oldArr = []  //表格原有数组集合
            if(!this.$utils.isEmpty(this.projectPersonTableData.data)){
              oldArr = this.projectPersonTableData.data.map(item =>item.personId)
              for(let itemObj of selectionChangeData){
                if(oldArr.indexOf(itemObj.id) < 0){
                  let newObj = Object.assign({},{
                    personId:itemObj.id,
                    personCode:itemObj.code,
                    personName:itemObj.username,
                    mainPost:itemObj.mainName,
                    proId:this.proData.id
                  })
                  addNewArr.push(newObj)
                }
              }
            }else{
              for(let itemObj of selectionChangeData){
                let newObj = Object.assign({},{
                  personId:itemObj.id,
                  personCode:itemObj.code,
                  personName:itemObj.username,
                  mainPost:itemObj.mainName,
                  proId:this.proData.id
                })
                addNewArr.push(newObj)
              }
            }
            this.projectPersonTableData.data = addNewArr.concat(this.projectPersonTableData.data)
          }
        },


        /**
         * 获取列表所有数据
         * */
        getAllProjectPersonData () {
           console.log('this.modelSearchFilter',this.modelSearchFilter)

          getPersonAuth(this.modelSearchFilter).then( (res) => {
            if(res.status && res.status === 200){

              this.projectPersonTableData.data = res.data.rows;
              this.projectPersonTableData.total = res.data.total;
              console.log('获取列表所有数据',res)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 获取项目所有数据
         * */
        getAllItem () {
          getAllItems({page: 1, limit: 10000}).then((res) =>{

            if(res.status && res.status === 200){
              console.log('获取项目所有数据',res)

              //this.subContractChangeData.data = res.data.rows;
              this.$set(this.projectPersonData,'data',res.data.rows)
              console.log('projectPersonData',this.projectPersonData.data)
            }else{
              this.$message({message: res.message,type: 'warning'})
            }
          }).catch(error => {
            console.log(error)
          })
        },
        /**
         * 当前行
         * */
        handleCurrentChange(row) {
          console.log(row)
          this.currentRow = row
        },
        /**
         * 关键字搜索
         */
        clickSearchFilter() {
          this.$refs.refBasicSearch.searchFilter(this.$refs.refProjectPersonTableData, this.modelSearchFilter, () => {
            this.getAllProjectPersonData();
          });
        },
        /**
         * 前 中 后期
         * */
        getStage () {
          getDictionaryDataByTypeFilter('SYS_PRO_STAGE')
            .then( (res) => {
              if(res.status && res.status === 200){
                this.selectData.data = res.data;
                console.log('this.selectData.data',this.selectData.data)
                this.selectValue = this.selectData.data.map(item => item.id)
                console.log(this.selectValue)


              }else{
                this.$message({message: res.message,type: 'warning'})
              }
            })
        },
      }
    }
</script>

<style scoped>

</style>
