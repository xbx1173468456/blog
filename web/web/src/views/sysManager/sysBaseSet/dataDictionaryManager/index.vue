<template>
  <div class="dataDictionary-container-index flex-layout">
    <div class="splitPane-container" ref="refSplitPane" :style="{height:heightSplitPane + 'px'}">
      <split-pane split="vertical" :min-percent='20' :default-percent='50'>
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                v-if="sysDataDictionary_btn_add"
                @click="handleSysDataDictionaryAdd"
                plain>新增
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-if-save"
                v-if="sysDataDictionary_btn_edit"
                @click="handleSysDataDictionaryEdit"
                plain
              >
                保存
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                v-if="sysDataDictionary_btn_delete"
                :disabled="disableSysDataDictionary_delete"
                @click="handleSysDataDictionaryDelete"
                plain>删除
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-if-auth"
                v-if="sysDataDictionary_btn_audit"
                :disabled="disableSysDataDictionary_audit"
                @click="handleSysDataDictionaryAudit"
                plain>审核
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-circle-close-outline"
                v-if="sysDataDictionary_btn_disable"
                :disabled="disableSysDataDictionary_disable"
                @click="handleSysDataDictionaryDisable"
                plain>禁用
              </el-button>
              <el-button
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                v-if="sysDataDictionary_btn_enable"
                :disabled="disableSysDataDictionary_enable"
                @click="handleSysDataDictionaryEnable"
                plain>启用
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="getSysTypeDataDictionary()" plain>
                刷新
              </el-button>
            </div>
            <el-table
              ref="refSysDataDictionary"
              :data="sysDataDictionary"
              border fit highlight-current-row stripe
              @current-change="handleCurrentChange" height="500">
              <el-table-column
                label="序号"
                type="index"
                width="50" align="center">
              </el-table-column>
              <el-table-column
                prop="validateStatus"
                label="审核状态"
                width="80" align="center" :formatter="formatValidateStatus">
              </el-table-column>
              <el-table-column
                prop="enable"
                label=" 禁用状态"
                width="80" align="center" header-align="center" :formatter="formatEnable">
              </el-table-column>
              <el-table-column
                prop="code"
                label="编码"
                width="80" align="center">
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="名称"
                align="left" header-align="center" show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form :model="sysDataDictionary[scope.$index]" :ref="'formName' + scope.$index" :rules="rules"
                           :show-message="false">
                    <el-form-item prop="name">
                      <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                                @change="changeRow(scope.row)"
                                placeholder="请输入名称" v-model="scope.row.name"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="数据标识"
                align="left" header-align="center" show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form :model="sysDataDictionary[scope.$index]" :ref="'formLabel' + scope.$index" :rules="rules"
                           :show-message="false">
                    <el-form-item prop="label">
                      <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                                @change="changeRow(scope.row)"
                                placeholder="请输入数据标识" v-model="scope.row.label"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="补充说明"
                min-width="120" align="left" header-align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-input clearable size="small" @change="changeRow(scope.row)"
                            placeholder="请输入补充说明"
                            v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="total" :page.sync="modelSearchFilter.page"
                        :limit.sync="modelSearchFilter.limit" @pagination="getSysTypeDataDictionary"/>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
            <div class="handler-container">
              <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                v-if="sysDataDictionaryDetail_btn_add"
                :disabled="disableSysDataDictionaryDetail_add"
                @click="handleSysDataDictionaryDetailAdd"
                plain>新增
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-if-save"
                v-if="sysDataDictionaryDetail_btn_edit"
                :disabled="disableSysDataDictionaryDetail_edit"
                @click="handleSysDataDictionaryDetailEdit"
                plain
              >
                保存
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-delete"
                v-if="sysDataDictionaryDetail_btn_delete"
                :disabled="disableSysDataDictionaryDetail_delete"
                @click="handleSysDataDictionaryDetailDelete"
                plain>删除
              </el-button>
              <el-button
                type="primary"
                size="small"
                icon="el-icon-if-auth"
                v-if="sysDataDictionaryDetail_btn_audit"
                :disabled="disableSysDataDictionaryDetail_audit"
                @click="handleSysDataDictionaryDetailAudit"
                plain>审核
              </el-button>
              <el-button
                type="danger"
                size="small"
                icon="el-icon-circle-close-outline"
                v-if="sysDataDictionaryDetail_btn_disable"
                :disabled="disableSysDataDictionaryDetail_disable"
                @click="handleSysDataDictionaryDetailDisable"
                plain>禁用
              </el-button>
              <el-button
                type="success"
                size="small"
                icon="el-icon-circle-check-outline"
                v-if="sysDataDictionaryDetail_btn_enable"
                :disabled="disableSysDataDictionaryDetail_enable"
                @click="handleSysDataDictionaryDetailEnable"
                plain>启用
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh"
                         @click="getSysDataDictionaryDetail()" plain>刷新
              </el-button>
            </div>
            <el-table
              min-height="500"

              :data="sysDataDictionaryDetail"
              ref="refSysDataDictionaryDetail"
              border fit highlight-current-row stripe
              @current-change="handleCurrentChangeDetail" height="500">
              <el-table-column
                label="序号"
                type="index"
                width="50" align="center">
              </el-table-column>
              <el-table-column
                prop="validateStatus"
                label="审核状态"
                width="80" align="center" :formatter="formatValidateStatus">
              </el-table-column>
              <el-table-column
                prop="enable"
                label=" 禁用状态"
                width="80" align="center" header-align="center" :formatter="formatEnable">
              </el-table-column>
              <el-table-column
                prop="code"
                label="编码"
                width="80" align="center">
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="名称"
                align="left" header-align="center" show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-form :model="sysDataDictionaryDetail[scope.$index]" :ref="'formNameDetail' + scope.$index"
                           :rules="rulesDetail"
                           :show-message="false">
                    <el-form-item prop="name">
                      <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                                @change="changeRowDetail(scope.row)"
                                placeholder="请输入名称" v-model="scope.row.name"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="数据标识"
                align="left" header-align="center" show-overflow-tooltip
                min-width="160">
                <template slot-scope="scope">
                  <el-input size="small" :disabled="true"
                            @change="changeRowDetail(scope.row)"
                            placeholder="请输入数据标识" v-model="scope.row.dataTypeLabel"></el-input>
                </template>
              </el-table-column>
              <el-table-column
                class-name="spacing-set"
                label="补充说明"
                min-width="120" align="left" header-align="center" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-input clearable size="small" @change="changeRowDetail(scope.row)"
                              placeholder="请输入补充说明"
                              v-model="scope.row.remark"></el-input>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="detailTotal" :page.sync="modelSearchFilterDetail.page"
                        :limit.sync="modelSearchFilterDetail.limit"
                        @pagination="getSysDataDictionaryDetail()"/>

          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions} from 'vuex'
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {arrayUniqueSameObj, deepCloneByObject} from "@/utils/index";
  import {staticDataBasic} from "@/assets/data/basic";
  import {validateLength} from "@/utils/validate";
  import formatEnum from "@/utils/mixins/formatEnum";
  import splitPane from 'vue-splitpane'
  import pagination from '@/components/Pagination'

  export default {
    name: "DataDictionaryManager",
    components: {
      splitPane,
      pagination
    },
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        sysDataDictionary_btn_add: true,
        sysDataDictionary_btn_edit: true,
        sysDataDictionary_btn_delete: true,
        sysDataDictionary_btn_audit: true,
        sysDataDictionary_btn_disable: true,
        sysDataDictionary_btn_enable: true,

        // sysDataDictionaryL: 600, //左表高度
        // sysDataDictionaryR: 600,  //右表高度
        listId: 0,
        heightSplitPane: 0,
        sysDataChangedArray: [],//点新增没有保存
        sysDataDictionary: [],
        total: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10
        },
        currentRowType: null,
        sysDataDictionaryDetail_btn_add: true,
        sysDataDictionaryDetail_btn_edit: true,
        sysDataDictionaryDetail_btn_delete: true,
        sysDataDictionaryDetail_btn_audit: true,
        sysDataDictionaryDetail_btn_disable: true,
        sysDataDictionaryDetail_btn_enable: true,

        sysDataDictionaryDetailShow: true,//类型字典是否显示
        sysDataChangedArrayDetail: [],//点新增没有保存
        sysDataDictionaryDetail: [],
        detailTotal: 0,
        modelSearchFilterDetail: {
          page: 1,
          limit: 10,
          dataTypeId: ''  //左边类型id
        },
        listIdDetail: 0,
        currentRowDetail: null,
        rules: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 20]);
              },
              trigger: 'change'
            }
          ],
          label: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['数据标识', 1, 20]);
              },
              trigger: 'change'
            }
          ]
        },
        rulesDetail: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 20]);
              },
              trigger: 'change'
            }
          ]
        }
      }
    },
    mounted() {
      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },
    watch: {
      currentRowType: function (newRow, oldRow) {
        if(newRow){
          this.$refs['refSysDataDictionary'].setCurrentRow(newRow);
          if (newRow.id) {
            this.modelSearchFilterDetail.dataTypeId = newRow.id;
            this.getSysDataDictionaryDetail()
          } else {
            this.sysDataDictionaryDetail = []
          }
        }
      },
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }

    },
    computed: {
      disableSysDataDictionary_enable: function () {
        if (this.currentRowType && this.currentRowType.validateStatus === 1) {
          return this.currentRowType.enable === 1
        }
        return true;
      },
      disableSysDataDictionary_disable: function () {
        if (this.currentRowType && this.currentRowType.validateStatus === 1) {
          return this.currentRowType.enable === 2
        }
        return true;
      },
      disableSysDataDictionary_audit: function () {
        if (this.currentRowType && this.currentRowType.validateStatus != '' && this.currentRowType.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionary_delete: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionaryDetail_add: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus == 1) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionaryDetail_edit: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowType.validateStatus == 1 && this.currentRowDetail) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionaryDetail_delete: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionaryDetail_audit: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus != '' && this.currentRowDetail.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      disableSysDataDictionaryDetail_enable: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus === 1) {
          return this.currentRowDetail.enable === 1
        }
        return true;
      },
      disableSysDataDictionaryDetail_disable: function () {
        if (this.currentRowType && this.currentRowType.enable == 1 && this.currentRowDetail && this.currentRowDetail.validateStatus === 1) {
          return this.currentRowDetail.enable === 2
        }
        return true;
      }

    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
      ]);
      this.getSysTypeDataDictionary();

    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
        this.heightSplitPane = innerHeight - offsetTopSplitPane - 12;
      },
      /**
       * 获取类型数据
       * */
      getSysTypeDataDictionary(callback) {
        return this.$store.dispatch('GetSysConfigDataDictionary', this.modelSearchFilter)
          .then((res) => {
            this.total = res.data.total;
            this.sysDataDictionary = res.data.rows;
            this.$nextTick(function () {
              if (this.$refs.refSysDataDictionary) {
                this.$refs.refSysDataDictionary.setCurrentRow(this.sysDataDictionary[0]);
              }
            });
            this.resetData();
            if (typeof callback === "function") {
              callback();
            };
          }).catch((error) => {
            console.log(error);
          })
      },
      //重置数据
      resetData() {
        this.sysDataChangedArray = [];
        this.currentRowType =undefined;
      },
      saveSysDataDictionary: function (sysDataDictionary) {
        return this.$store.dispatch('PutSysConfigDataDictionary', sysDataDictionary)
          .then((response) => {
            if (response.status === 200) {
              this.getSysTypeDataDictionary();
              this.$message({
                message: response.message,
                type: 'success'
              })
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              })
            }
          })
      },
      auditSysConfigDataDictionary: function (sysConfigDataDictionary) {
        return this.$store.dispatch('PutSysConfigDataDictionaryAudit', sysConfigDataDictionary)
          .then((response) => {
            if (response.status === 200) {
              this.getSysTypeDataDictionary();
              this.$message({
                message: response.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              })
            }
          })
      },
      handleSysDataDictionaryAdd() {
        function addRow() {
        let newVal = {
          validateStatus: 2,
          enable: 1,
          listId: this.listId++
        }
        this.sysDataChangedArray.unshift(newVal);
        this.sysDataDictionary.unshift(newVal);
        this.$refs.refSysDataDictionary.setCurrentRow(this.sysDataDictionary[0]);
        }

        if (this.modelSearchFilter.page == 1) {
          addRow.call(this);
        } else {
          this.getSysTypeDataDictionary(() => {
            this.modelSearchFilter.page = 1;
            addRow.call(this);
          })
        }
      },
      handleSysDataDictionaryEdit() {
        return this.validateAfter(() => {
          let changedArray = arrayUniqueSameObj(this.sysDataChangedArray);
          if (changedArray && changedArray.length > 0) {
            this.saveSysDataDictionary(changedArray);
          }
          else {
            this.$message({message: staticDataBasic.info.updateEmpty, type: 'warning'})
          }
        });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfter(callback) {
        let result = true
        this.sysDataDictionary.some((item, idx) => {
          this.$refs['formName' + idx].validate(valid => {
            valid ? null : result = valid
          })
          this.$refs['formLabel' + idx].validate(valid => valid ? null : result = valid)
          return !result
        })
        if (result) {
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return false
        }
      },
      handleSysDataDictionaryDelete() {
        if (this.currentRowType.validateStatus == 2) {
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.currentRowType.id) {
              this.$store.dispatch('DeleteSysConfigDataDictionary', this.currentRowType.id)
                .then((response) => {
                  if (response.status === 200) {
                    this.$message({
                      message: response.message,
                      type: 'success'
                    });
                    this.getSysTypeDataDictionary()
                  } else {
                    this.$message({
                      message: response.message,
                      type: 'warning'
                    })
                  }
                })
            } else {
            this.getSysTypeDataDictionary();
            }
          }).catch((cancel) => {
            console.log(cancel);
          })
        }
      },
      handleSysDataDictionaryAudit() {
        return this.validateAfter(() => {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let changedArray = arrayUniqueSameObj(this.sysDataChangedArray);
            if (changedArray && changedArray.length > 0) {
              this.$store.dispatch('PutSysConfigDataDictionary', changedArray).then((res) => {
                if (!this.$utils.isEmpty(res.data)) {
                  //获得当前行，进行审核
                  this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRowType, (currentRow)=>{
                    this.auditSysConfigDataDictionary(currentRow);
                    return true;
                  });
                }
              }).catch((error) => {
                console.log(error);
              })
            } else {
              this.auditSysConfigDataDictionary(this.currentRowType);
            }
          }).catch((cancel) => {
            console.log(cancel);
          })
        });
      },
      handleSysDataDictionaryEnable() {
        if (this.isSelectedRow(this.currentRowType)) {
          if (this.currentRowType.enable === 2) {
            this.handleSysDataDictionaryEnableOrDisable(staticDataBasic.info.enable, 1)
          }
        }
      },
      handleSysDataDictionaryDisable() {
        if (this.isSelectedRow(this.currentRowType)) {
          if (this.currentRowType.enable === 1) {
            this.handleSysDataDictionaryEnableOrDisable(staticDataBasic.info.disEnable, 2)
          }
        }
      },
      handleSysDataDictionaryEnableOrDisable(info, enable) {
        this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.currentRowType.id) {
            let currentRowTypeObj = deepCloneByObject(this.currentRowType)
            currentRowTypeObj.enable = enable;
            this.$store.dispatch('PutSysConfigDataDictionaryEnable', currentRowTypeObj)
              .then((response) => {
                if (response.status === 200) {
                  this.currentRowType.enable = enable;
                  this.getSysDataDictionaryDetail();
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  })
                }
              })
          } else {

          }

        }).catch((error) => {
          console.log(error)
        })
      },

      /**
       * 获取对应类型的数据
       * */
      getSysDataDictionaryDetail(callback) {
        this.$store.dispatch('GetSysConfigDataDictionaryDetail', this.modelSearchFilterDetail)
          .then((res) => {
            if (!this.$utils.isEmpty(res.data.rows)) {
              this.sysDataDictionaryDetail = res.data.rows;
              this.detailTotal = res.data.total;
              this.$nextTick(function () {
                if (this.$refs.refSysDataDictionaryDetail) {
                  this.$refs.refSysDataDictionaryDetail.setCurrentRow(this.sysDataDictionaryDetail[0]);
                }
              });
            } else {
              this.currentRowDetail = undefined;
              this.sysDataDictionaryDetail = [];
              this.detailTotal = 0;
            }
            this.resetDataDetail();
            if (typeof callback === "function") {
              callback();
            };
          }).catch((error) => {
          console.log(error);
        })
      },
      handleSysDataDictionaryDetailAdd() {
        function addRowDetail() {
        let newVal = {
          dataTypeLabel: this.currentRowType.label,
          validateStatus: 2,
          enable: 1,
          dataTypeId: this.currentRowType.id,
          listId: this.listIdDetail++
        }
        this.sysDataChangedArrayDetail.unshift(newVal);
        this.sysDataDictionaryDetail.unshift(newVal);
        this.$refs.refSysDataDictionaryDetail.setCurrentRow(this.sysDataDictionaryDetail[0]);
        }

        if (this.modelSearchFilterDetail.page == 1) {
          addRowDetail.call(this);
        } else {
          this.getSysDataDictionaryDetail(() => {
            this.modelSearchFilterDetail.page = 1;
            addRowDetail.call(this);
          })
        }
      },
      //重置数据
      resetDataDetail() {
        this.sysDataChangedArrayDetail = [];
        this.currentRowDetail =undefined;
      },
      handleSysDataDictionaryDetailEdit() {
        return this.validateAfterDetail(() => {
          let changedArray = arrayUniqueSameObj(this.sysDataChangedArrayDetail);
          if (changedArray && changedArray.length > 0) {
            this.$store.dispatch('PutSysConfigDataDictionaryDetail', changedArray)
              .then((response) => {
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  })
                  this.getSysDataDictionaryDetail();
                }
              })
          }
          else {
            this.$message({message: staticDataBasic.info.updateEmpty, type: 'warning'})
          }
        });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfterDetail(callback) {
        let result = true
        this.sysDataDictionaryDetail.some((item, idx) => {
          this.$refs['formNameDetail' + idx].validate(valid => {
            valid ? null : result = valid
          })
          return !result
        })
        if (result) {
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return false
        }
      },
      handleSysDataDictionaryDetailDelete() {
        if (this.isSelectedRow(this.currentRowDetail)) {
          if (this.currentRowDetail.validateStatus === 2) {
            this.$confirm(staticDataBasic.info.delete, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              if (this.currentRowDetail.id) {

                this.$store.dispatch('DeleteSysConfigDataDictionaryDetail', this.currentRowDetail.id)
                  .then((response) => {
                    if (response.status === 200) {
                      this.$message({
                        message: response.message,
                        type: 'success'
                      });
                      this.getSysDataDictionaryDetail() //删除后需刷新页面
                    } else {
                      this.$message({
                        message: response.message,
                        type: 'warning'
                      })
                    }
                  })
              } else {
                this.getSysDataDictionaryDetail() //删除后需刷新页面
              }
            }).catch((error) => {
              console.log(error);
            })
          } else {
          }
        }
      },
      auditSysConfigDataDictionaryDetail(currentRow) {
        this.$store.dispatch('PutSysConfigDataDictionaryDetailAudit', currentRow)
          .then((response) => {
            if (response.status === 200) {
              this.getSysDataDictionaryDetail();
              this.$message({
                message: response.message,
                type: 'success'
              });
            } else {
              this.$message({
                message: response.message,
                type: 'warning'
              })
            }

          })
      },
      handleSysDataDictionaryDetailAudit() {
        return this.validateAfterDetail(() => {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let changedArray = arrayUniqueSameObj(this.sysDataChangedArrayDetail);
            if (changedArray && changedArray.length > 0) {
              this.$store.dispatch('PutSysConfigDataDictionaryDetail', changedArray).then((res) => {
                if (!this.$utils.isEmpty(res.data)) {
                  //获得当前行，进行审核
                  this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRowDetail, (currentRow)=>{
                    this.auditSysConfigDataDictionaryDetail(currentRow)
                    return true;
                  });
                }
              }).catch((error) => {
                console.log(error);
              })
            } else {
              this.auditSysConfigDataDictionaryDetail(this.currentRowDetail)
            }
          }).catch((cancel) => {
            console.log(cancel);
          })
        });
      },
      handleSysDataDictionaryDetailDisable() {
        if (this.isSelectedRow(this.currentRowDetail)) {
          if (this.currentRowDetail.enable === 1) {
            this.handleSysDataDictionaryDetailEnableOrDisable(staticDataBasic.info.disEnable, 2)
          }
        }
      },
      handleSysDataDictionaryDetailEnable() {
        if (this.isSelectedRow(this.currentRowDetail)) {
          if (this.currentRowDetail.enable === 2) {
            this.handleSysDataDictionaryDetailEnableOrDisable(staticDataBasic.info.enable, 1)
          }
        }
      },
      handleSysDataDictionaryDetailEnableOrDisable(info, enable) {
        this.$confirm(info, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.currentRowDetail.id) {
            let currentRowDetail = deepCloneByObject(this.currentRowDetail)
            currentRowDetail.enable = enable;
            this.$store.dispatch('PutSysConfigDataDictionaryDetailEnable', currentRowDetail)
              .then((response) => {
                this.currentRowDetail.enable = enable;
                if (response.status === 200) {
                  this.$message({
                    message: response.message,
                    type: 'success'
                  });
                } else {
                  this.$message({
                    message: response.message,
                    type: 'warning'
                  })
                }
              })
          }
        }).catch((error) => {
          console.log(error)
        })

      },
      changeRow(row) {
        if(row){
          this.$set(row,'listId',this.listId++);
          this.sysDataChangedArray.push(row)
        }
      },
      /**
       * 获得当前类型信息
       */
      handleCurrentChange(row, oldRow) {
        if (row) {
          this.currentRowType = row;
        }
      },
      changeRowDetail(row) {
        if(row){
          this.$set(row,'listId',this.listIdDetail++);
          this.sysDataChangedArrayDetail.push(row)
        }
      },
      /**
       * 获得当前类型详细信息
       */
      handleCurrentChangeDetail(row) {
        if (row) {
          this.currentRowDetail = row;
        }
      },
    }
  }
</script>
