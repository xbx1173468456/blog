<template>
    <div class="personDialog">
        <basic-dialog v-el-drag-dialog :title="title" :visible.sync="dialogTableVisible">
            <div v-if='this.type !=1'>
                <tableItem :columns="columns" :tableData="tableData"  :page="page" :highlight="true" @handleCurrentChange="handleCurrentChange" :typeTable="true" @currentPage="currentPage"></tableItem>
            </div>
            <div v-else>
                <el-row>
                    <el-col :span="8" class="pdr10">
                        <basic-table-tree :default-expand-all="defaultExpandAll"
                            :data="treeTableData" :columns="treeColumns" border
                            ref="MaterialTableTree"
                            @current-change="rowClick">
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
                    </el-col>
                    <el-col :span="16">
                        <tableItem :columns="columns" :tableData="tableData"  :page="page" :highlight="true" @handleCurrentChange="handleCurrentChange" @handleSelectionChange="handleSelectionChange" :typeTable="true" :type="selection" @currentPage="currentPage"></tableItem>
                    </el-col>
                </el-row>
            </div>
            <div class="btnPerson mt10">
                <el-button type="success"  @click="save">确定</el-button>
                <el-button @click="closeDialog">取消</el-button>
            </div>
        </basic-dialog>
    </div>
</template>
<script>
import tableItem from './logTable'
import splitPane from 'vue-splitpane'
import computed from "@/utils/mixins/computed";
import methods from "@/utils/mixins/methods";
import formatEnum from "@/utils/mixins/formatEnum";
export default {
    mixins:[computed,methods,formatEnum],
    data(){
        return{
            columns:[],
            treeColumns:[],
            type:'',
            expandAll: true,
            selection:'selection',
            title:'',
            dialogTableVisible:false,
            tableData:[],
            treeTableData:[],
            items:[],
            pagination:{},
            defaultExpandAll:false,
            page:{
                total:0,
                pageSize:10,
                currentPage:1
            },
        }
    },
    methods:{
        rowClick(e) {
            // console.log(e,'eee')
            this.$emit('getCheckTree',e,this.pagination)
        },
        handleCurrentChange(o){
             this.items=o
        },
        handleSelectionChange(o){
            this.items=o
        },
        currentPage(pages){
            this.$emit('currentPage',pages,this.type)
        },
        save(){
            if(this.type==1){
                console.log(this.items,'items')
                if(this.items.length==0){
                    this.$store.dispatch("setSelectP", this.$store.getters.getselectP);
                    this.$emit("getItem", [this.$store.getters.getselectP, this.type]);
                }else{
                    let arr = this.$store.getters.getselectP.concat(this.items);
                    var result = [];
                    var obj = {};
                    for (var i = 0; i < arr.length; i++) {
                        console.log(arr[i], "i");
                        if (!obj[arr[i].code]) {
                            result.push(arr[i]);
                            obj[arr[i].code] = true;
                        }
                    }
                    console.log(result[0],'rusult')
                    // return
                    this.$store.dispatch("setSelectP", result);
                    this.$emit("getItem", [result, this.type]);
                }
            }else{
                this.$store.dispatch("setSelectP", []);
                this.$emit('getItem',[this.items,this.type])
            }
            this.closeDialog()
        },
        closeDialog(){
            this.dialogTableVisible=false
        },
        openDialog(){
            this.dialogTableVisible=true
        },
        checkTreeOne(num){
            this.$refs.MaterialTableTree.setCurrentRow(num, true);
        }
    },
    components:{
        tableItem,
        splitPane
    }
}
</script>
<style>
.basic-dialog{width: 80%}
.mt10{margin-top: 10px;}
.pdr10{padding-right: 10px}
.btnPerson{text-align: center}
</style>

