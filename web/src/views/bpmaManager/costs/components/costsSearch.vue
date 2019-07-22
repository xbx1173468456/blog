<template>
  <div class="costsSearch-container">
    <el-form label-width="75px"
             :model="modelSearchFilter"
             ref="refModelSearchFilter"
             class="form-container"
             :show-message="false"
    >
      <el-row :gutter="5">
        <el-col :span="4">
          <el-form-item label="项目名称">
            <el-input size="small" clearable
                      v-model="modelSearchFilter.proName" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-show="billTypeShowFlag">
          <el-form-item label="业务类型">
            <el-select size="small"
                       v-model="modelSearchFilter.billType" placeholder="请选择"
            >
                <el-option v-for="(row,key,index) in dataEnum.proIncomeTypeEnum"
                           :key="row.code"
                           :value="parseInt(row.code)"
                           :label="row.name"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="成本类型"  v-show="costTypeShowFlag">
            <el-select size="small"
                       v-model="modelSearchFilter.costType" placeholder="请选择"
            >
                <el-option v-for="(row,key,index) in dataEnum.proCostTypeEnum"
                           :key="row.code"
                           :value="parseInt(row.code)"
                           :label="row.name"
                ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="单据编码">
            <el-input size="small" clearable
                      v-model="modelSearchFilter.billCode" placeholder="请输入单据编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="开始日期">
            <el-date-picker
              clearable
              size="small"
              :editable="false"
              v-model="modelSearchFilter.startTime"
              :picker-options="pickerOptionsStartTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="截止日期">
            <el-date-picker
              clearable
              size="small"
              :editable="false"
              v-model="modelSearchFilter.endTime"
              :picker-options="pickerOptionsEndTime"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-button size="small" icon="el-icon-search" type="primary"
                     @click="handleSearch">查询</el-button>
          <el-button size="small" @click="clickReset" icon="el-icon-minus" type="primary" plain>重置</el-button>
        </el-col>
      </el-row>


    </el-form>
  </div>

</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
    export default {
        name: 'costsSearch',
      mixins: [computed, methods, formatEnum,formatBasic],
      props:{
        billTypeShowFlag:{
          type:Boolean,
          default:true
        },
        costTypeShowFlag:{
          type: Boolean,
          default: false
        }
      },
      data(){
          let _this = this
          return {
            modelSearchFilter: {},
            pickerOptionsStartTime:{
              disabledDate (time){
                if(!_this.$utils.isEmpty(_this.modelSearchFilter.endTime)){
                  return new Date(time).getTime() > new Date(_this.modelSearchFilter.endTime).getTime();
                }
              }
            },
            pickerOptionsEndTime:{
              disabledDate (time){
                if(!_this.$utils.isEmpty(_this.modelSearchFilter.startTime)){
                  return new Date(time).getTime() < new Date(_this.modelSearchFilter.startTime).getTime();
                }
              }
            }
          }
      },
      created(){
        //初始化数据字典
        this.getEnumData([
          'GetProIncomeTypeEnum',
          'GetProCostTypeEnum'
        ]);
      },
      methods:{
        handleSearch(){
          this.$emit('handle-search',this.modelSearchFilter)
        },
        clickReset(){
          this.modelSearchFilter = {
            proName:'',
            billCode:'',
            startTime:'',
            endTime:''
          }
          if(this.billTypeShowFlag){
            this.$set( this.modelSearchFilter,'billType','')
          }if(this.costTypeShowFlag){
            this.$set( this.modelSearchFilter,'costType','')
          }
          this.$emit('handle-reset',this.modelSearchFilter)
        }
      }
    }
</script>

<style scoped>
.costsSearch-container{
  height: 32px;
  margin-bottom: 6px;
}
.costsSearch-container .el-button{
  margin-top: 0;
}
</style>
