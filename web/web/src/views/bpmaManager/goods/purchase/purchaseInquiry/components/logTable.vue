<template>
    <div>
        <el-table
            ref="singleTable"
            :data="tableData"
            tooltip-effect="dark"
            border
            :height="heightUserManager"
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
            <pagination :total="page.total" :page.sync="page.currentPage" :limit.sync="page.pageSize" @pagination="currentPage" />
    </div>
</template>
<script>
import pagination from '@/components/Pagination'
import {getMeasureUnitData} from '@/api/common/dataBasic'
import { getEnumData } from 'utils'
import {getDictionaryDataByTypeFilter} from '@/api/common/dataDictionary.js'
export default {
    name:"logTable",
    data(){
        return {
            heightUserManager:'0',
            dictionary:'',
            trackType:[],
            units: []
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
                    this.heightUserManager=document.documentElement.clientHeight-226 || document.body.clientHeight-226;
                }
            })
        },
        //獲取字典
        getDiction(){
            //階段
            getDictionaryDataByTypeFilter('BPMA_PRO_WAY').then(res=>{
            if(res.status==200){
                this.trackType=res.data
            }
            }).catch(err=>{
            this.$message.warning(err.message)
            })
        },
        getUnits() {
            getMeasureUnitData().then((res) => {
            this.units = res.data
            }).catch((err) => {
            console.log(err)
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
        formatter(scope,col){
        if(col.value  == 'validateStatus'){
            for(let obj of this.dictionary.validateStatus){
                if(scope.row[col.value] == obj.code){
                    return obj.name
                }
            }
        }else if(col.value  == 'offerExpiryDate'){
            if(scope.row[col.value]){
                return scope.row[col.value].substring(0,10)
            }
        }else if (col.value == 'units') {
                for (let obj of this.units) {
                    if (scope.row[col.value] == obj.id) {
                        return obj.name
                    }
                }
            }else if(col.value  == 'price'){
                if(!scope.row[col.value]){
                    return
                }
                let v=''+scope.row[col.value]
                if(v.indexOf('.')<0){
                    return scope.row[col.value]+'.00'
                }else{
                    return scope.row[col.value]
                }
            }else if(col.value  == 'enterprise'){
            if(!scope.row[col.value]){
                return ''
            }else{
                return scope.row[col.value]
            }
        }else{
          return scope.row[col.value]
        }
      }
    },
    created(){
        //初始化数据字典
        getEnumData(this,[
                'GetValidateStatusData'
        ]);
        this.dictionary=this.$store.state.common.dataEnum
        this.getDiction()
        this.getUnits()
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
.el-table td.is-center.left{text-align: left!important}
</style>


