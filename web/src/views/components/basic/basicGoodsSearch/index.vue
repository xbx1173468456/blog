<!--物资查询-->
<!--参考页面1：src\views\bpmaManager\goods\inventory\currentInventory\index.vue-->
<template>
  <el-form :inline="true" class="form-inline-search left" ref="form" :model="modelSearchFilter" @submit.native.prevent>
    <el-form-item label="物资类型" v-show="false">
      <el-cascader
        placeholder="请输入【物资名称】搜索"
        size="small"
        filterable
        :show-all-levels="false"
        :props="selectedOptions"
        change-on-select
        :options="optionsData"
        v-model="selectedData"
      >
        <template slot-scope="{ node, data }">
          <span>{{ data.name }}</span>
          <span v-if="data.children.length == 0"> ({{ data.children.length }}) </span>
        </template>
      </el-cascader>
    </el-form-item>
    <el-form-item :label="inMasterCodeName">
      <el-input
        style="width: 150px"
        clearable
        size="small"
        v-model="modelSearchFilter.inMasterCode"
        maxlength="100"
        :placeholder="'请输入'+inMasterCodeName"
      ></el-input>
    </el-form-item>
    <el-form-item label="入库类型" v-show="isShowInType">
      <el-select style="width: 150px" size="small" v-model="modelSearchFilter.inType"
                 placeholder="请选择入库类型">
        <el-option
          v-for="item in dataEnum.static.inPutType"
          :key="parseInt(item.code)"
          :label="item.name"
          :value="parseInt(item.code)"/>
      </el-select>
    </el-form-item>
    <el-form-item label="物资编码">
      <el-input
        style="width: 150px"
        clearable
        size="small"
        v-model="modelSearchFilter.code"
        maxlength="100"
        placeholder="请输入物资编码"
      ></el-input>
    </el-form-item>
    <el-form-item label="物资名称">
      <el-input
        style="width: 150px"
        clearable
        size="small"
        v-model="modelSearchFilter.name"
        maxlength="100"
        placeholder="请输入物资名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="规格型号">
      <el-input style="width: 150px" clearable size="small"
                v-model="modelSearchFilter.model" maxlength="100"
                placeholder="请输入规格型号"
      ></el-input>
    </el-form-item>
    <slot name="search"></slot>
    <el-form-item>
      <el-button size="small" @click="clickQuery"  icon="el-icon-search" type="primary">搜索</el-button>
      <el-button size="small" @click="clickReset" icon="el-icon-minus" type="primary" plain>重置</el-button>
      <slot name="button"></slot>
    </el-form-item>
  </el-form>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataEnum} from "@/assets/data/enum";
  import {
    getMaterial
  } from "@/api/bpmaManager/goods/inventory/currentInventory/index.js";

  export default {
    name: "basicGoodsSearch",
    mixins: [computed, methods, formatEnum],
    props: {
      //是否显示入库类型
      isShowInType: {
        type: Boolean,
        default: true
      },
      //名称显示方式
      inMasterCodeName: {
        type: String,
        default: '入库单号'
      }
    },
    data(){
      return{
        modelSearchFilter: {
          page: 1,
          limit: 10,
          code: '',
          name: '',
          model: '',
          inType: '',
          inMasterCode: ''
        },
        selectedData:[],
        optionsData:[],
        selectedOptions: {
          value: 'code',
          label: 'name',
          checkStrictly: true
        },
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetStockTypeData',
      ]);
      //this.getMaterialType();
    },
    methods: {
      //获取字典类别
      getMaterialType() {
        var params = {
          validateStatus: 1,
          enable: 1
        }
        getMaterial(params).then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            var b = this.go(res.data)
            this.optionsData = this.filterData(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      go(data) {
        for (var key in data) {
          data[key].value = data[key].code
          data[key].label = data[key].name
          if (data[key].children.length > 0) {
            this.go(data[key].children)
          }
        }
        return data
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
      /**
       * 搜索按钮
       */
      clickQuery() {
        if (this.selectedData.length > 0) {
          Object.assign(this.modelSearchFilter, {options: this.selectedData[this.selectedData.length - 1]})
        } else {
          //this.modelSearchFilter.options = '';
        }
        this.$emit('clickQuery',this.modelSearchFilter);
      },
      /**
       * 搜索按钮
       */
      clickReset() {
        this.selectedData = [];
        this.modelSearchFilter.inMasterCode = '';
        this.modelSearchFilter.inType = '';
        this.modelSearchFilter.code = '';
        this.modelSearchFilter.name = '';
        this.modelSearchFilter.model = '';
        this.$emit('clickReset',this.modelSearchFilter);
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
