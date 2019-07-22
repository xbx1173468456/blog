<template>
  <el-card class="card-container">
    <div slot="header" class="clearfix">
      <span class="title">项目列表</span>
      <el-row class="fr">
        <el-button size="small" icon="el-icon-refresh" @click="clickRefresh"></el-button>
      </el-row>
    </div>
    <el-form class="form-card" >
      <el-form-item>
        <el-input @input.native="searchInput" @keyup.enter.native.prevent="search(searchData)" clearable placeholder="请输入关键字"
                  v-model="searchData" size="small" @clear="search(searchData)">
          <i class="el-icon-search el-input__icon" slot="suffix">
          </i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-select @change="selectChangeValue" class="select" multiple placeholder="请选择项目阶段" v-model="selectValue"
                   size="mini">
          <el-option
            :key="item[selectData.key || 'key']"
            :label="item.name"
            :value="item[selectData.key || 'key']"
            v-for="item in selectData.data"
            size="mini"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="menu-box">
        <el-menu v-if="listData&&listData.length>0" :default-active="activeSelect" @select="contractChange" ref="menu" size="small">
          <el-menu-item
            :index="(item.id || index) + ''"
            :key="item.id || index"
            v-for="(item, index) in listData"
                  :title="item[data.name || 'name']"
          >
            <span slot="title">{{item[data.name || 'name']}}</span>
          </el-menu-item>
        </el-menu>
        <div v-else>
          <el-alert
            title="暂无项目信息"
            type="info"
            center
            :closable="false">
          </el-alert></div>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  export default {
    name: 'pageSelectFilter',
    data() {
      return {
        selectValue: [],
        listData: [],
        searchData: '',
        clearTime: null,
        show: false,
        isCreated: true,
        activeSelect: null,
        refresh: false
      }
    },
    props: {
      data: {
        type: Object,
        default: () => ({data: []})
      },
      selectData: {
        type: Object,
        default: () => ({
          data: []
        })
      },
      selectChange: {
        type: Function
      },
      syncSearch: {
        type: Number
      },
      value: {
        type: Array,
        default: () => []
      }
    },
    computed: {
      listDataAll() {
        return this.data.data.filter(item => item.validateStatus == 1)
      }
    },
    watch: {
      listDataAll: {
        handler() {
          this.listData = this.filterData(this.listDataAll, this.selectValue)
          this.activeSelect = this.listData[0] ? String(this.listData[0].id) : null
          if (this.isCreated && !this.refresh) {
            this.refresh = false
            this.contractChange(this.activeSelect)
          }
        },
        deep: true
      },
      value(val) {
        this.selectValue = val
      },
      selectValue(val) {
        this.$emit('input', val)
        this.selectChangeValue(this.selectValue)
      }
    },
    created() {
      this.selectValue = this.value
      this.listData = this.filterData(this.listDataAll, this.selectValue)
    },
    methods: {
      clickRefresh() {
        this.refresh = true
        this.$emit('refreshData');
      },
      async selectChangeValue(value) {
        this.show = true
        this.searchData = ''
        if (typeof this.selectChange == 'function') {
          await new Promise((reslove, reject) => {
            this.selectChange(value, reslove)
          })
        }
        const data = this.filterData(this.listDataAll, value)
        this.changeListData(data)
      },
      filterData(data, key, type = true) {
        // if (key === this.selectData.defaultSelect) return data
        return data.filter(item => {
          const value = item[this.data.key || 'key']
          if (type) {
            return key.includes(value)
          } else {
            return !key.includes(value)
          }
        })
      },
      contractChange(index) {
        let data = this.listData.filter(item => item.id == index)[0]
        try {
          this.$emit('change', data)
        } catch (err) {
        }
        return index
      },
      async search(value) {
        this.show = true
        if (typeof this.searchChange == 'function') {
          await new Promise((reslove, reject) => {
            this.searchChange(value, reslove)
          })
        }
        let data = this.keyFilterData(this.listDataAll, value)
        data = this.filterData(data, this.selectValue)
        this.changeListData(data)
      },
      keyFilterData(data, value) {
        let len = value.length
        let regexp = []
        for (let i = 0; i < len; i++) {
          regexp.push(new RegExp(value[i], 'img'))
        }
        return data.filter(item => {
          let lastIndex = 0
          return regexp.every(result => {
            result.lastIndex = lastIndex
            let rel = result.test(item[data.name || 'name'])
            lastIndex = result.lastIndex
            return rel
          })
        })
      },
      searchInput() {
        if (this.syncSearch != null) {
          clearTimeout(this.clearTime)
          this.clearTime = setTimeout(() => {
            this.search(this.searchData)
          }, this.syncSearch)
        }
      },
      changeListData(data) {
        this.show = false
        this.activeSelect = data[0] ? String(data[0].id) : null
        this.listData = data
        return this.contractChange(this.activeSelect)
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .el-card.card-container {
    border: none;
    border-radius: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
   /deep/ .el-card__header {
      span.title {
        color: #409EFF;
        font-size: 14px;
      }
      .el-row {
        .el-button {
          border-width: 0;
          background-color: transparent;
        }
        .el-button--small, .el-button--small.is-round {
          height: 14px;
          margin: -10px;
        }
        [class*="el-icon-"], [class^=el-icon-] {
          font-size: 18px;
        }
      }
    }
   /deep/ .el-card__body {
      padding: 5px 0 0 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #F3F6FA;
      .el-menu {
        border-right-width: 0;
        .el-menu-item, .el-submenu__title {
          height: 38px;
          line-height: 38px;
        }
        .el-menu-item {
          padding-left: 10px !important;
          padding-right: 10px !important;
          border-bottom: 1px solid #DCDFE6;
          color: #454E67;
          background-color: #F3F6FA;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .el-menu-item:focus, .el-menu-item:hover {
          color: #409EFF;
        }
        .el-menu-item.is-active{
          color: #409EFF;
          background-color: #c8dcff;
        }
      }
      .el-form.form-card {
        height: 100%;
        display: flex;
        flex-direction: column;
        .menu-box {
          flex: 1;
          overflow: auto;
        }
      }
    }
  }
</style>
