<template>
    <div>
        <el-table
            :key="tableKey"
            ref="singleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            fit stripe

            :highlight-current-row='highlight'
            @row-dblclick="dblclick"
            @current-change="handleCurrentChange"
            @selection-change="handleSelectionChange"
            style="width: 100%">
            <el-table-column
            :type="type"
            label="序号"
            width="60"
            align="center"
            >
            </el-table-column>
            <el-table-column
            :show-overflow-tooltip='true'
            align="center"
            v-for="(col,i) in columns" :label="col.text" :key="i" :width="col.width" :class-name='col.align'
            >
            <template slot-scope="scope" >
                        <div v-if="!col.showTable && !col.datePicker">
                            {{formatter(scope,col)}}
                        </div>
                        <div v-if="col.showTable" class="tableClass">
                            <el-form :model="tableData[scope.$index]" ref="'formModel' + scope.$index" label-width="120px" class="demo-ruleForm">
                                <el-form-item :prop="col.value">
                                    <el-input clearable size="small" v-model="scope.row[col.value]" maxlength="100" :ref="col.value" :disabled="col.disable" :type="col.types?'number':'text'" @blur="calculate(scope.row,col,$event)" @keyup.native="proving1(scope.row,col,$event)" :min="0"></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div v-if="col.datePicker">
                            <el-date-picker size="small" :editable="false" v-model="scope.row[col.value]" type="date" format="yyyy-MM-dd" value-format="timestamp" placeholder="选择日期"></el-date-picker>
                        </div>
            </template>
            </el-table-column>
        </el-table>
        <div class="pagination mt10">
            <pagination v-show="page.total>0" :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" @pagination="currentPage"/>
        </div>
    </div>
</template>
<script>
import pagination from '@/components/Pagination'
import {getEnumData } from 'utils'
import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
import {getArea} from '@/api/sysManager/sysBaseSet/areaManager'
import {getAccountancyYear} from '@/api/sysManager/sysBaseSet/monthYearManager'
export default {
    name:"logTable",
    data(){
        return {
            tableKey:0,
            heightUserManager:'0',
            dictionary:[],
            stage:[],
            constructionType:[],
            area:[],
            year:[]
        }
    },
    props:{
        columns: {
            type: Array,
            default: []
        },
         tableData: {
            type: Array,
            default: []
        },
         page: {
            type: Object,
            default: {}
        },
         type: {
            type: String,
            default: 'index'
        },
        highlight:{
            type: Boolean,
            default: true
        },
        typeTable:{
            type: Boolean,
            default: false
        },
        ifChange:{
            type:Number,
            default:2
        }
    },
    components:{
        pagination
    },
    methods:{
        calculate(scope,col,$event){
            this.tableKey++
            if(col.types){
                if(scope.sum<0){
                    scope.sum=0
                }
                $event.target.value=Number($event.target.value).toFixed(4)
                scope.sum=Number(scope.sum).toFixed(4)
                scope.unitPrice=Number(scope.unitPrice).toFixed(4)
                scope.totalPrice=Number(scope.sum*scope.unitPrice).toFixed(2)
            }
        },
        currentPage(pages){
            this.$emit('currentPage',pages.page)
        },
        handleCurrentChange(o){
            if(o){
                this.$emit('handleCurrentChange',o)
            }
        },
        handleSelectionChange(v){
            this.$emit('handleSelectionChange',v)
        },
        dblclick(row){
            this.$emit('dblclick',row)
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
                    fuzzy:fuzzy
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
                    fuzzy:fuzzy
                }
            getAccountancyYear(data).then(res=>{
                if(res.status==200){
                    this.year=res.data.rows
                }
            }).catch(err=>{
                this.$message.warning(err.message)
            })
        },
      formatter(scope,col){
        if(col.value == 'stageId'){
            for(let obj of this.stage){
                if(scope.row[col.value] == obj.id){
                    return obj.name
                }
            }
        }else if(col.value  == 'natureId'){
            for(let obj of this.constructionType){
                if(scope.row[col.value] == obj.id){
                    return obj.name
                }
            }
        }else if(col.value  == 'ifGovInvest'){
            for(let obj of this.dictionary.isOrNot){
                if(scope.row[col.value] == obj.code){
                    return obj.name
                }
            }
        }else if(col.value  == 'operationWay'){
            for(let obj of this.dictionary.operate){
                if(scope.row[col.value] == obj.code){
                    return obj.name
                }
            }
        }else if(col.value  == 'areaId'){
            for(let obj of this.area){
                if(scope.row[col.value] == obj.id){
                    return obj.name
                }
            }
        }else if(col.value  == 'year'){
            for(let obj of this.year){
                if(scope.row[col.value] == obj.id){
                    return obj.year
                }
            }
        }else if(col.value  == 'validateStatus'){
            for(let obj of this.dictionary.validateStatus){
                if(scope.row[col.value] == obj.code){
                    return obj.name
                }
            }
        }else{
          return scope.row[col.value]
        }
      }
    },
    created(){
        console.log(this.ifChange,'ifChange')
        this.getDiction()
        this.getAreas()
        this.getYear()
        //初始化数据字典
        getEnumData(this,['GetValidateStatusData','GetIsOrNotData','GetOperate']);
        this.dictionary=this.$store.state.common.dataEnum
        console.log(this.dictionary)
    }
}
</script>
<style scoped>
.mt10{margin-top: 15PX;}
.pagination{text-align: right}
.el-table td.is-center.left{text-align: left!important}
.tableClass >>> .el-form-item__content{margin-left: 0!important}
.tableClass >>> .el-form-item{margin-bottom: 10px!important}

</style>


