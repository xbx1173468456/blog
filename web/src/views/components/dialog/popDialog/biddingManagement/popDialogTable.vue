<template>
  <div >
    <div class="handler-container">
      <el-form :inline="true" class="right">
        <el-form-item>
          <el-input clearable @keyup.enter.native.prevent="clickSearchFilter" v-model="modelSearchFilter.fuzzy" placeholder="请输入关键字">
            <i class="el-icon-search el-input__icon"
               slot="suffix">
            </i>
          </el-input>
        </el-form-item>
        <el-form-item class="advanced-query">
          <el-button type="primary" icon="el-icon-if-query" plain>高级查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="refData" :popData="popData" :data="tableData" border row-key="id"
              highlight-current-row @row-click="handleClick">
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
      <el-table-column v-for="(item, index) in titleData" :key="item.index" :prop="item.prop" :label="item.name"
                       :width="item.width"
                       :align="item.align"
                       :header-align= "item.headerAlign"
                       show-overflow-tooltip></el-table-column>
    </el-table>
    <!--<pagination v-show="total>0" :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getUserManagerData" />   分页模板-->
    <pagination v-show="total>0" :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit" @pagination="getPaginationData"/>

  </div>
</template>

<script>
  import pagination from '@/components/Pagination'

  export default {
    name: 'popDialogTable',
    components: {
      pagination
    },
  /*  props: ['data', 'titleData'],*/
    props: {
      popData: {
        type: Object,
        default: () => {}
      },
      titleData: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        modelSearchFilter: {
          page:1,
          limit:10,
          fuzzy: '',
          fuzzyKeys:'',
        }
      }
    },
    computed:{
      tableData () {
        return this.popData.data;
      },
      total () {
        return this.popData.total;
      }
    },
    mounted() {
      console.log('popData2',this.popData)
      console.log('titleData2',this.titleData)
    },
    watch: {
      popData (newVal, oldVal) {
        return newVal
      },
      titleData (newVal, oldVal) {
        return newVal
      }
    },
    methods: {
      handleClick(row) {
        this.$emit('rowChange', row)
        console.log('popRow',row)
      },
      getPaginationData () {
        return this.popData
      },
      /**
       * 搜索按钮
       */
      clickSearchFilter() {
        let columns=[];
        this.$refs.refData.columns.forEach(row => {
          if(row.property != undefined){
            columns.push(row.property)
          }
        });
        this.modelSearchFilter.fuzzyKeys=columns.join(',');

        this.getPaginationData();
        console.log( this.modelSearchFilter)
      },
    }
  }
</script>

<style scoped>
  .el-table{
    min-height: 500px;
  }
</style>
