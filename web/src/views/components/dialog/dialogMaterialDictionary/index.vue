<!-- 引入物资 -->
<template>
<div class="dialog-container">
  <basic-handler>
    <el-cascader
      placeholder="请输入【物资名称】搜索"
      filterable
      clearable
      size="small"
      style="width: 400px"
      :props="selectedOptions"
      :options="selectData"
      v-model="selectedData"
      change-on-select
      @change="handleSelectChange"
    >
    </el-cascader>
    <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter" @clickSearchFilter="clickSearchFilter"></basic-search>
  </basic-handler>
  <basic-table ref="refMaterialDictionaryTableData" @select="selectionChangeMaterialDictionary" @select-all="handleSelectionAllChange"
  :dataTable="materialDictionary.tableData" :columns="materialDictionary.tableColumns" :height="300"
  :pagination="modelSearchFilter" @pagination="getMaterialDictionary">
    <template slot="selection">
      <el-table-column v-if="isShowChecked" type="selection" align="center" width="55" :selectable="selectableMaterialDictionary" />
    </template>
    <template slot-scope="obj" slot="price">
      {{formatToThousandsFour(obj.scope.row.price)}}
    </template>
  </basic-table>
  <el-row class="content-container">
    <el-tag v-if="!materialDictionary.selectedAll.length" type="danger">未选择物资！</el-tag>
    <el-tag v-else size="small" closable hit v-for="item in materialDictionary.selectedAll" :key="item.id" @close="closeMaterialDictionary(item)">
      <el-tooltip placement="top" effect="light">
        <div slot="content">
          物资编码：{{item.code}}<br/>
          物资名称：{{item.name}}<br/>
          规格型号：{{item.model}}<br/>
          计量单位：{{item.units}}<br/>
          参考单价：{{formatToThousandsFour(item.price)}}<br/>
          补充说明：{{item.remark}}<br/>
        </div>
        <span>{{item.name}}-{{item.model}}</span>
      </el-tooltip>
    </el-tag>
  </el-row>
</div>
</template>

<script>
  import methods from "@/utils/mixins/methods"
  import computed from "@/utils/mixins/computed"
  import formatBasic from "@/utils/mixins/formatBasic";
  import pagination from '@/components/Pagination'
  import {
    getMaterialDictionary,
    getMaterial
  } from '@/api/common/dialog/dialogMaterialDictionary'
  import {
    arrayUniqueSameObj
  } from '@/utils'
  export default {
    name: "dialogMaterialDictionary",
    mixins: [computed, methods,formatBasic],
    components: {pagination},
    props:{
      materialDictionaryData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
      filterValid: Boolean
    },
    data(){
      return {
        defaultExpandAll: false,
        filterText: '',
        selectData: [],
        selectedData: [],
        selectedOptions: {
          value: 'code',
          label: 'name',
          checkStrictly: true
        },
        materialDictionary: {
          tableData: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              text:'类别名称',
              value:'typeName',
              align: "left",
              width: 120,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              expand: true,
              text:'物资编码',
              value:'code',
              width: 130,
              showOverflowTooltip:true
            },
            {
              text:'物资名称',
              value:'name',
              align: "left",
              minWidth: 160,
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'规格型号',
              value:'model',
              width: 120,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'计量单位',
              value:'units',
              width: 80,
              showOverflowTooltip:true
            },
            {
              text:'参考单价',
              value:'price',
              width: 120,
              align: "right",
              headerAlign: "center",
              showOverflowTooltip:true
            },
            {
              text:'补充说用',
              value:'remark',
              width: 150,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip:true
            }
          ],
          selectedRows: [],
          materialDictionarySelectedIdArray:[],
          selectedAll:[]
        },
        modelSearchFilter: {
          limit: 10,
          page:1,
          enable: 1,
          validateStatus: 1,
          typeCode:'',
          fuzzy: '',
          fuzzyKeys:''
        }
      }
    },
    async created(){
      this.getMaterial()
    },
    computed: {
      validateStatus() {
        if (!Array.isArray(this.dataEnum.validateStatus)) return {}
        return this.dataEnum.validateStatus.filter(item => item.name === '已审核')[0]
        this.getMaterialDictionary();
      },
      enabled() {
        if (!Array.isArray(this.dataEnum.enabled)) return {}
        return this.dataEnum.enabled.filter(item => item.name === '启用')[0]
        this.getMaterialDictionary();
      }
    },
    methods: {
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refMaterialDictionaryTableData, this.modelSearchFilter, () => {
          this.getMaterialDictionary();
        });
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getMaterialDictionary();
      },
      clickRefresh() {
        this.resetData();
        this.getMaterial();
      },
      resetData() {
        this.materialDictionary.selectedRows = [];
        this.materialDictionary.selectedAll = [];
        this.modelSearchFilter.page = 1;
        this.modelSearchFilter.fuzzy = '';
        this.modelSearchFilter.fuzzyKeys = '';
        this.$emit('selectionChange', '');
      },
      getMaterial() {
        let data = {
          enable: 1,
          validateStatus: 1
        }
        getMaterial(data).then(res => {
          this.selectData = this.filterData(res.data)
          this.getMaterialDictionary()
        })
      },
      filterData(data) {
        return data.map(item => {
          if (item.ifLastLevel == 1) {
            delete item.children
          } else {
            item.children = this.filterData(item.children)
          }
          return item
        })
      },
      handleSelectChange(value) {
        if (this.selectedData.length > 0) {
          Object.assign(this.modelSearchFilter, {typeCode: this.selectedData[this.selectedData.length - 1]})
        } else {
          this.modelSearchFilter.typeCode = '';
        }
        this.getMaterialDictionary();
      },
      getMaterialDictionary() {
        getMaterialDictionary(this.modelSearchFilter).then((response) => {
          this.materialDictionary.tableData.data = response.data.rows;
          this.materialDictionary.tableData.total = response.data.total;
          if(!this.isShowChecked){
            this.defaultExpandAll = true;
            this.$nextTick(() => {
              this.$refs.refMaterialDictionaryTableData.setCurrentRow(this.materialDictionaryData[0], true);
            });
          }else {
            //获得选择的数据
            this.$nextTick(() => {
              this.$refs.refMaterialDictionaryTableData.toggleSelection(this.materialDictionary.selectedAll);
            });
            if(this.materialDictionaryData&&this.materialDictionaryData.length>0){
              let materialDictionaryData = this.materialDictionaryData;
              this.materialDictionary.materialDictionarySelectedIdArray = materialDictionaryData.map(row => {
                return row.materialId;
              });
            }else{
              this.materialDictionary.materialDictionarySelectedIdArray =[];
            }
          }
        })
      },
      handleSelectionAllChange(value) {
        let data = this.materialDictionary.tableData.data;
        //当前值大于0,全选
        if (value && value.length > 0) {
          for (let row of value) {
            if (this.$utils.array.indexOf(this.materialDictionary.selectedAll, row) == -1) {
              this.materialDictionary.selectedAll.push(row);
            }
          }
        }
        //当前值小于0,不全选
        if (value.length == 0) {
          for (let row of data) {
            //删除
            this.$utils.array.remove(this.materialDictionary.selectedAll, row);
          }
        }
        this.materialDictionary.selectedRows = this.materialDictionary.selectedAll;
        this.$emit('selectionChange',this.materialDictionary);
      },
      selectionChangeMaterialDictionary(selections,row) {
        let flag = true;
        for (let selection of selections) {
          if (selection.id === row.id) {
            this.materialDictionary.selectedAll.push(selection);
            flag = false;
            break;
          }
        }
        if (flag) {
          //删除
          this.$utils.array.remove(this.materialDictionary.selectedAll,row);
        }
        this.materialDictionary.selectedRows = this.materialDictionary.selectedAll;
        this.$emit('selectionChange',this.materialDictionary);
      },
      selectableMaterialDictionary(row, index) {
        if (this.materialDictionary.materialDictionarySelectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      },
      closeMaterialDictionary(value){
        if(value){
          //删除tags
          this.$utils.array.remove(this.materialDictionary.selectedAll,value);
          //删除表格中
          this.$nextTick(() => {
            this.$refs.refMaterialDictionaryTableData.toggleSelection(this.materialDictionary.selectedAll);
          });
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .content-container{
    .el-tag{
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
</style>
