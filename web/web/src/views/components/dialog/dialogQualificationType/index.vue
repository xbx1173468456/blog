<!--岗位（多选及单选）-->
<template>
  <div class="dialog-container">
    <div class="handler-container">
     <span v-show="this.isShowChecked">
      <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                 @click="clickDefaultExpandAll">全部展开
      </el-button>
      <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                 @click="clickDefaultExpandAll">全部折叠
      </el-button>
      </span>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
      <el-form :inline="true" class="demo-form-inline right">
        <el-form-item>
          <el-input clearable placeholder="请输入关键字" v-model="filterText" size="small">
            <i class="el-icon-search el-input__icon"
               slot="suffix">
            </i>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <basic-table-tree ref="refStationTreeData" :default-expand-all="defaultExpandAll"
                      :data="station.treeData" :columns="station.treeColumns"
                      @selection-change="selectionChangeStation" :height="400" @current-change="currentChangeStation">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="55"
                         :selectable="selectableStation"/>
      </template>
    </basic-table-tree>
  </div>
</template>

<script>
  import {
    getQualificationType
  } from '@/api/brpManager/brpqualificationtypeManager'
  export default {
    name: "dialogStation",
    props: {
      stationData: {
        type: Array,
        required: false,
        default: () => []
      },
      isShowChecked: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        defaultExpandAll: false,
        filterText: '',
        //岗位选择
        station: {
          treeData: [],
          treeColumns: [
            {
              expand: true,
              text: '编码',
              value: 'code',
              width: 200,
              align: 'left',
              headerAlign: "center",
              showOverflowTooltip: true
            },
            {
              text: '名称',
              value: 'name',
              minWidth: 140,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
          ],
          selectedRows: [],
          stationSelectedIdArray: []
        },
        search:{
          validateStatus:1,
          enable:1
        }
      }
    },
    created() {
      this.getQualificationType();
    },
    watch: {
      filterText(filterStr) {
        //  this.roles.treeData.filter(val);
      }
    },
    methods: {
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.getQualificationType();
      },
      clickRefresh() {
        this.getQualificationType();
      },
      /**
       * 获得所有岗位
       */
      getQualificationType() {
        getQualificationType(this.search).then((response) => {
          if (response.data && response.data.length > 0) {
            this.station.treeData = response.data;
            //单选和多选
            if (!this.isShowChecked) {
              this.defaultExpandAll = true;
              this.$nextTick(() => {
                this.$refs.refStationTreeData.setCurrentRow(this.stationData[0], true);
              });
            } else {
              //得到已选择ID
              if (this.stationData && this.stationData.length > 0) {
                let stationData = this.stationData;
                this.station.stationSelectedIdArray = stationData.map(row => {
                  return row.id;
                });
              }else{
                this.station.selectedIdArray =[];
              }
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeStation(selection) {
        this.station.selectedRows = selection;
        this.$emit('selectionChange', this.station);
      },
      /**
       * 选择当前行
       */
      currentChangeStation(selection) {
        this.station.selectedRow = selection;
        this.$emit('selectionChange', this.station);
      },
      /**
       * 当前选择框，岗位可勾选，其他不能勾选
       */
      selectableStation(row, index) {
        if (this.station.stationSelectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
