<template>
    <div class="overviewSearch-container" >
        <el-form
          :model="filterData"
          ref="refFilterData"
          label-width="80px"
          class="form-container" :show-message="false"
        >
          <el-row :gutter="5">
            <el-col :span="5">
              <el-form-item label="年度批次">
                <el-select size="small"
                           multiple
                           collapse-tags
                           v-model="filterData.year" placeholder="请选择"
                           @change="changeYear"
                >
                  <el-option v-for="(row,key,index) in year"
                             :key="row.code"
                             :value="row.year"
                             :label="row.year"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="项目阶段">
                <el-select size="small"
                           multiple
                           collapse-tags
                           v-model="filterData.stage" placeholder="请选择"
                           @change="changeStage"
                >
                  <el-option v-for="(row,key,index) in stage"
                             :key="row.code"
                             :value="row.id"
                             :label="row.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="经营方式">
                <el-select size="small"
                           multiple
                           collapse-tags
                           v-model="filterData.operationWay" placeholder="请选择"
                           @change="changeOperationWay"
                >
                  <el-option v-for="(row,key,index) in dataEnum.operate"
                             :key="row.code"
                             :value="row.code"
                             :label="row.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="项目名称">
                <el-select size="small"
                           multiple
                           collapse-tags
                           v-model="filterData.name" placeholder="请选择"
                           @change="changeProId"
                >
                  <el-option v-for="(row,key,index) in project"
                             :key="row.code"
                             :value="row.id"
                             :label="row.name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-button size="small" type="primary" @click="handleSearch" plain>查询</el-button>
            </el-col>
          </el-row>



        </el-form>
    </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from '@/utils/mixins/formatBasic'
  import {staticDataBasic} from "@/assets/data/basic";

  /**
   * api
   * */
  import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary'
  import {getAccountancyYear,getProject } from '@/api/bpmaManager/decisionAnalysis/overview/projectOverview'

    export default {
        name: 'overviewSearch',
      mixins: [computed, methods, formatEnum, formatBasic],
      data(){
        return{
          filterData:{},
          year:[], //年度批次
          stage:[], //项目阶段
          operationWay:[], //经营方式
          project:[], //项目名称
          proId:undefined
        }
      },
      created() {

        //初始化数据字典
        this.getEnumData([
          'GetOperate'
        ]);
        this.getYear()
        this.getStage()
        this.getProjectData()

      },
      methods:{
          /**
           * 年度批次
           * */
          getYear(){
            getAccountancyYear({
              page: 1,
              limit: 10000,
              validateStatus: 1,
              enable: 1
            }).then((res) =>{
              if(res.status === 200){
                this.year= res.data.rows
               // console.log('year res', this.year)
              }else{
                this.$message({ message:res.message,type:'warning' })
              }
            }).catch(err=>console.log(err))
          },
        /**
           * 项目阶段
           * */
          getStage(){
          getDictionaryDataByTypeFilter('SYS_PRO_STAGE').then((res) =>{
            if(res.status === 200){
             // console.log('stage res',res)
              this.stage= res.data
            }else{
              this.$message({ message:res.message,type:'warning' })
            }
          }).catch(err=>console.log(err))
          },
        /**
           * 项目
           * */
          getProjectData() {
            let proArguments = {
              year:this.filterData.year ? this.filterData.year.join(',') : '',
              stageId:this.filterData.stage ? this.filterData.stage.join(',') : '',
              operationWay:this.filterData.operationWay ? this.filterData.operationWay.join(','): '',
            }
            // console.log('proArguments',proArguments)
         return getProject(proArguments).then((res) =>{
            if(res.status === 200){
              // console.log('project res',res)
              this.project= res.data
              this.proId = res.data.map(item =>item.id).join(',')
              // console.log('proId',this.proId)
            }else{
              this.$message({ message:res.message,type:'warning' })
            }
          }).catch(err=>console.log(err))
          },

        handleSearch () {
            if(this.$utils.isEmpty(this.proId)){
              this.$message({ message:'项目不能为空',type:'warning' })
              return
            }
         this.bus.$emit('change',this.proId)
         //this.$emit('change',this.proId)
        },
        changeYear (){
          this.$set(this.filterData,'name',[])
          this.getProjectData()

        },
        changeStage (){
          this.$set(this.filterData,'name',[])
          this.getProjectData()
        },
        changeOperationWay (){
          this.$set(this.filterData,'name',[])
          this.getProjectData()
        },
        changeProId (){
          // console.log('changeName',this.filterData.name)
          if(this.$utils.isEmpty(this.filterData.name)) {
            this.getProjectData()
          }else {
            this.proId = this.filterData.name.join(',')
          }
        },
      }
    }
</script>

<style scoped>
.overviewSearch-container{
  height: 32px;

}
  .overviewSearch-container .el-button{
    margin-top: 0;
  }
.overviewSearch-container >>> .el-select__tags-text{
    display:inline-flex;
    max-width: 180px;
    text-overflow:ellipsis;
    white-space: nowrap;
    word-break: keep-all;
  overflow: hidden;
  }
.el-select-dropdown__item{
  max-width:98%;
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
