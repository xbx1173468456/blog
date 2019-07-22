<template>
    <div class="personDialog">
        <basic-dialog v-el-drag-dialog :title="title" :visible.sync="dialogTableVisible">
            <div v-if='this.type !=1'>
                <tableItem :columns="columns" :tableData="tableData"  :page="page" :highlight="true" @handleCurrentChange="handleCurrentChange" :typeTable="true"></tableItem>
            </div>
            <div v-else>
                <basic-table-tree :default-expand-all="defaultExpandAll"
                            :data="tableData" :columns="columns"
                            @current-change="handleCurrentChange">
                                <template slot-scope="treeObj" slot="validateStatus">
                                    {{formatValidateStatus(treeObj.scope.row)}}
                                </template>
                                <template slot-scope="treeObj" slot="ifLastLevel">
                                    {{formatIfLastLevel(treeObj.scope.row)}}
                                </template>
                                <template slot-scope="treeObj" slot="enable">
                                    {{formatEnable(treeObj.scope.row)}}
                                </template>
                </basic-table-tree>
            </div>
            <div class="dialog-footer">
                <el-button type="primary"  @click="save">确定</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </div>
        </basic-dialog>
    </div>
</template>
<script>
import tableItem from './logTable'
import {selectListOwn} from '@/api/bpmaManager/early/itemInfo/itemRegister/index.js'
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
export default {
    mixins:[computed,methods,formatEnum],
    data(){
        return{
            columns:[],
            type:'',
            expandAll: true,
            selection:'selection',
            title:'',
            dialogTableVisible:false,
            tableData:[],
            items:{},
            defaultExpandAll:false,
            page:{
                total:0,
                pageSize:10,
                currentPage:1
            },
        }
    },
    methods:{
        handleCurrentChange(o){
             this.items=o
        },
        save(){
            this.$emit('getItem',[this.items,this.type])
            this.closeDialog()
        },
        closeDialog(){
            this.dialogTableVisible=false
        },
        openDialog(){
            this.dialogTableVisible=true
        }
    },
    components:{
        tableItem,

    }
}
</script>
<style>
/*.basic-dialog{width: 80%}
.mt10{margin-top: 10px;}
.btnPerson{text-align: center}*/
.dialog-footer {
  padding: 10px 20px 20px;
  text-align: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>

