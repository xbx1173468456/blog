<!--搜索布局-->
<!--参考页面1：src\views\sysManager\groupAuth\userManager\index.vue-->
<template>
  <el-form :inline="true" class="right" @submit.native.prevent>
    <el-form-item>
      <el-input clearable size="small" @keyup.prevent.enter.native="clickSearchFilter" @clear="clickSearchFilter"
                v-model="modelSearchFilter.fuzzy"
                placeholder="请输入关键字">
        <i class="el-icon-search el-input__icon"
           slot="suffix">
        </i>
      </el-input>
    </el-form-item>
    <el-form-item v-if="isAdvancedQuery" class="advanced-query">
      <el-button type="primary" size="small" icon="el-icon-if-query" plain>高级查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: "basicSearch",
    props: {
      //搜索对象
      modelSearchFilter: {
        type: Object,
        default: () => {
        }
      },
      //是否显示高级搜索
      isAdvancedQuery: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      /**
       * 搜索按钮
       */
      clickSearchFilter() {
        this.$emit('clickSearchFilter');
      },
      /**
       * 关键字搜索过滤
       * @param refTableObj
       * @param modelSearchFilter
       * @param callBack
       */
      searchFilter(refTableObj, modelSearchFilter, callBack) {
        this.$set(this.modelSearchFilter, 'page', 1);
        let columns = [];
        refTableObj.columns.forEach(row => {
          if (row.property != undefined) {
            columns.push(row.property)
          } else if (row.value != undefined) {
            columns.push(row.value)
          }
        });
        if (columns && columns.length > 0) {
          modelSearchFilter.fuzzyKeys = columns.join(',');
          if (typeof callBack === 'function') {
            callBack();
          }
        }
      },
      /**
       * 根据关键字进行搜索过滤
       * @param dataTable
       * @param modelSearchFilter
       */
      searchFilterByFuzzyKeys(dataTable, modelSearchFilter) {
        return this.$utilsBasic.searchFilterByFuzzyKeys(dataTable, modelSearchFilter);
      }
    }
  }
</script>
