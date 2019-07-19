<template>
    <div>
        <el-table
            ref="singleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            :height="heightUserManager"

            stripe
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
                <div>
                {{formatter(scope,col)}}
                </div>
            </template>
            </el-table-column>
        </el-table>
            <pagination  :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" @pagination="currentPage" />
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
        }
    },
    components:{
        pagination
    },
    methods:{
        heightInit() {
            this.$nextTick(()=>{
                if(this.typeTable){
                    this.heightUserManager=document.documentElement.clientHeight-380 || document.body.clientHeight-380;
                }else{
                    this.heightUserManager=document.documentElement.clientHeight-204 || document.body.clientHeight-204;
                }
            })
        },
        currentPage(pages){
            this.$emit('currentPage',pages)
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
        this.getDiction()
        this.getAreas()
        this.getYear()
        //初始化数据字典
        getEnumData(this,['GetValidateStatusData','GetIsOrNotData','GetOperate']);
        this.dictionary=this.$store.state.common.dataEnum
        console.log(this.dictionary)
    },
    mounted(){
        this.heightInit()
        let that=this
        window.onresize =function(){
            that.heightInit()
        }
    }
}
</script>
<style>
.mt10{margin-top: 15PX;}
.pagination{text-align: right}
.el-table td.is-center.left{text-align: left!important}
</style>


