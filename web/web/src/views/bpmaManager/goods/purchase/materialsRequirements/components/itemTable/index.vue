<template>
    <div ref="refSplitPane" class="splitPane-container mt5">
        <split-pane split="vertical" :min-percent='30' :default-percent='100'>
            <template slot="paneL">
                <div class="right-container">
                        <logTable :tableData="tableData" :columns="columns" :page="page" @handleCurrentChange="handleCurrentChange" @currentPage="currentPage" ref="logTable" :ifChange="ifChange" :type="selection" @handleSelectionChange="handleSelectionChange"></logTable>
                </div>
            </template>
        </split-pane>
    </div>
</template>
<script>
import splitPane from 'vue-splitpane'
import logTable from './logTable'
export default {
    data(){
        return{
            page:{
                total:0,
                pageSize:10,
                currentPage:1
            },
            selection:'selection'
        }
    },
    props:{
        columns:{
            type:Array,
            default:()=>{return [] }
        },
        tableData:{
            type:Array,
            default:()=>{return []}
        },
        ifChange:{
            type:Number,
            default:()=>{return 2}
        }
    },
    methods:{

        //分页
        currentPage(v){
            this.page.currentPage=v
            // this.getLogs(v)
        },
        handleSelectionChange(obj){
            this.$emit('handleSelectionChange',obj)
        },
        handleCurrentChange(v){
            console.log(v,'vv')
            // this.rowId=v.id
        }
        },
    components:{
        logTable,
        splitPane
    }
}
</script>
<style scoped>
.mt10{margin-top: 30px!important}
.mt5{margin-top: 10px!important}
.topBtn{width:250px;float:right}
</style>


