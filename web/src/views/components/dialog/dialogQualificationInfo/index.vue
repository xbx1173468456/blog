<!--资证信息（多选）-->
<template>
  <div class="dialog-container">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getQualificationInfoData()" plain>刷新
      </el-button>
      <template slot="search">
        <basic-search ref="refBasicSearch" :isAdvancedQuery="true" :modelSearchFilter="modelSearchFilter"
                      @clickSearchFilter="clickSearchFilter"></basic-search>
      </template>
    </basic-handler>
    <basic-table ref="refQualificationInfoTableData"
                 :dataTable="qualificationInfo.dataArea" :columns="qualificationInfo.tableColumns"
                 :height="400" @selection-change="selectionChangeQualificationInfo" :pagination="modelSearchFilter">
      <template slot="selection">
        <el-table-column v-if="isShowChecked" type="selection" align="center" width="55"
                         :selectable="selectableQualificationInfo"/>
      </template>
      <template slot-scope="obj" slot="validateStatus">
        {{formatValidateStatus(obj.scope.row)}}
      </template>
      <template slot-scope="obj" slot="enable">
        {{formatEnable(obj.scope.row)}}
      </template>
      <template slot-scope="obj" slot="obtainDate">
        {{formatDate(obj.scope.row.obtainDate)}}
      </template>
      <template slot-scope="obj" slot="expiryDate">
        {{formatDate(obj.scope.row.expiryDate)}}
      </template>
    </basic-table>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "src/utils/mixins/formatBasic";
  import {
    getQualificationInfoData
  } from '@/api/common/dialog/dialogQualificationInfo'

  export default {
    name: "dialogQualificationInfo",
    mixins: [computed, methods, formatEnum,formatBasic],
    props: {
      aualificationInfoData: {
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
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: '',
          validateStatus:1,
          enable:1
        },
        qualificationInfo: {
          dataArea: {
            data: [],
            total: 0
          },
          tableColumns: [
            {
              text: '审核状态',
              value: 'validateStatus',
              width: 80,
              align: 'center',
              headerAlign: "center",
            },
            {
              text: '启用状态',
              value: 'enable',
              width: 80,
              align: "center",
              headerAlign: "center",
            },
            {
              text: '系统编码',
              value: 'code',
              width: 120,
              showOverflowTooltip: true
            },
            {
              text: '资证类型',
              value: 'typeName',
              width: 120,
              align: "left",
              showOverflowTooltip: true
            },
            {
              text: '资证名称',
              value: 'name',
              minWidth: 120,
              align: "left",
              showOverflowTooltip: true
            },
            {
              text: '原始编码',
              value: 'originalCode',
              width: 120,
              align: "center",
              showOverflowTooltip: true
            },
            {
              text: '发证机构',
              value: 'authorizeOrg',
              width: 120,
              align: "left",
              showOverflowTooltip: true
            },
            {
              text: '获取日期',
              value: 'obtainDate',
              width: 160,
              align: "center",
            },
            {
              text: '截止日期',
              value: 'expiryDate',
              width: 160,
              align: "center",
            },
            {
              text: '外借人员',
              value: 'borrowPerson',
              width: 120,
              align: "center",
              showOverflowTooltip: true
            },
            {
              text: '外借事由',
              value: 'borrowReason',
              width: 120,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },{
              text: '备注',
              value: 'remark',
              width: 120,
              align: "left",
              headerAlign: "center",
              showOverflowTooltip: true
            },
          ],
          selectedRows: [],
          selectedIdArray: []
        },
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
      ]);
      this.getQualificationInfoData();
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {

        this.$refs.refBasicSearch.searchFilter(this.$refs.refQualificationInfoTableData, this.modelSearchFilter, () => {
          this.getQualificationInfoData();
        });
      },
      clickRefresh() {
          this.getQualificationInfoData();
      },
      /**
       * 获得数据
       */
      getQualificationInfoData() {
        getQualificationInfoData(this.modelSearchFilter).then((response) => {
          if (response.data && response.data) {
            this.qualificationInfo.dataArea.data = response.data.rows;
            this.qualificationInfo.dataArea.total = response.data.total;
            //得到已选择ID
            if (this.aualificationInfoData && this.aualificationInfoData.length > 0) {
              let aualificationInfoData = this.aualificationInfoData;
              this.qualificationInfo.selectedIdArray = aualificationInfoData.map(row => {
                return row.qualiId;
              });
            }else{
              this.qualificationInfo.selectedIdArray =[];
            }
          }
        })
      },
      /**
       * 选择当前选择框
       */
      selectionChangeQualificationInfo(selection) {
        this.qualificationInfo.selectedRows = selection;
        this.$emit('selectionChange', this.qualificationInfo);
      },
      /**
       * 当前选择框，未加入可勾选，其他不能勾选
       */
      selectableQualificationInfo(row, index) {
        if (this.qualificationInfo.selectedIdArray.includes(row.id))
          return 0;//不可勾选
        else
          return 1;//可勾选
      }
    }
  }
</script>
