<template>
  <div class="materialDictionary-container-index flex-layout">
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
      <split-pane split="vertical" :min-percent='30' :default-percent='30'>
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                         @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                         @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefreshType()" plain>刷新</el-button>
              <basic-search ref="refBasicSearchType" :modelSearchFilter="modelSearchFilterType"
                            @clickSearchFilter="clickSearchFilterType"></basic-search>
            </div>
            <basic-table-tree ref="refMaterialDictionaryTableTree" :default-expand-all="defaultExpandAll"
                        :data="dataMaterialDictionary" :columns="columns" :filterNodeMethod="filterNodeMethodType"
                        @current-change="rowClick">
            </basic-table-tree>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container">
              <basic-handler>
                  <el-button :disabled="false" @click="add()" icon="el-icon-circle-plus-outline" plain size="small"
                             type="primary">
                    新增物资
                  </el-button>
                  <el-button @click="save"
                             icon="el-icon-if-save" plain size="small" type="primary">保存
                  </el-button>
                  <el-button :disabled="isDel" @click="delDic" icon="el-icon-delete" plain size="small"
                             type="danger">删除
                  </el-button>
                  <el-button :disabled="isAudit" @click="clickValidateStatus" icon="el-icon-if-auth" plain size="small"
                             type="primary">
                    审核
                  </el-button>
                  <el-button :disabled="isEna" @click="enableDicr(2)" icon="el-icon-circle-close-outline" plain size="small"
                             type="danger">禁用
                  </el-button>
                  <el-button :disabled="isEna2" @click="enableDicr(1)" icon="el-icon-circle-check-outline" plain
                             size="small"
                             type="success">启用
                  </el-button>
                  <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
                  <template slot="search">
                    <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
                                  @clickSearchFilter="clickSearchFilter"></basic-search>
                  </template>
              </basic-handler>
            <el-table
              :data="tableData.data"
              :row-class-name="rowClass" @current-change="currentChange"
              border fit highlight-current-row stripe
              ref='refDictionaryTable' height="500">
              <el-table-column align="center" label="序号" type="index" width="50"></el-table-column>
              <el-table-column :formatter="formatValidateStatus" align='center' label="审核状态" prop="validateStatus" width="80">
              </el-table-column>
              <el-table-column :formatter="formatEnable" align='center' label="启用状态" prop="enable" width="80">
              </el-table-column>
              <el-table-column align='center' label="编码" prop="code" min-width="100" showOverflowTooltip>
              </el-table-column>
              <el-table-column align='center' label="名称(*)" prop="name" class-name="spacing-set" min-width="160">
                <template slot-scope="scope">
                  <el-form :model="tableData.data[scope.$index]" :ref="'formName' + scope.$index" :rules="rules"
                           :show-message="false">
                    <el-form-item prop="name">
                      <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                                @change="changeRow(scope.row)"
                                placeholder="请输入名称" v-model="scope.row.name"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column align='center' label="规格型号(*)" prop="model" class-name="spacing-set" min-width="160">
                <template slot-scope="scope">
                  <el-form :model="tableData.data[scope.$index]" :ref="'formModel' + scope.$index" :rules="rules"
                           :show-message="false">
                    <el-form-item prop="model">
                      <el-input clearable size="small" :disabled="scope.row.validateStatus == 1?true:false"
                                @change="changeRow(scope.row)"
                                placeholder="请输入规格型号" v-model="scope.row.model"></el-input>
                    </el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column align='center' label="计量单位" prop="units" class-name="spacing-set" min-width="120">
                <template slot-scope="scope">
                  <el-select :disabled="scope.row.validateStatus == 1?true:false" @change="changeRow(scope.row)"
                             placeholder="请选择单位" v-model="scope.row.units" size="small">
                    <el-option :key="item.name" :label="item.name" :value="item.name" v-for="item in units">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align='center' label="参考单价" prop="price" class-name="spacing-set" min-width="160">
                <template slot-scope="scope">
                  <basic-input
                    clearable
                    size="small"
                    @change="changeRow(scope.row)"
                    :format="formatToThousandsFour"
                    :formatValue="formatToMoneyFour"
                    v-model="scope.row.price"
                    :min="0.0000"
                  ></basic-input>
                </template>
              </el-table-column>
              <el-table-column align='center' label="补充说明" prop="remark" class-name="spacing-set" min-width="160">
                <template slot-scope="scope">
                  <el-tooltip :content="scope.row.remark" :disabled="String(scope.row.remark) == ''" :open-delay="500"
                              class="item"
                              effect="dark" placement="top-start">
                    <el-input clearable size="small" @change="changeRow(scope.row)"
                              placeholder="请输入补充说明"
                              v-model="scope.row.remark"></el-input>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="total" :page.sync="modelSearchFilter.page" :limit.sync="modelSearchFilter.limit"
                        @pagination="selectDictionary()"/>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {validateLength} from "@/utils/validate";
  import {staticDataBasic} from "@/assets/data/basic";
  import splitPane from 'vue-splitpane'
  import formatBasic from "@/utils/mixins/formatBasic";
  import formatEnum from "@/utils/mixins/formatEnum";
  import pagination from '@/components/Pagination'
  import {
    arrayUniqueSameObj,
    deepCloneByObject,
    getChangedTableTreeData,
    updateTableTreeData,
    updateTableTreeEnableData
  } from '@/utils'
  import {
    getMaterial,
    getDiction,
    addDictionary,
    auditDic,
    deleteDic,
    enableDic
  } from '@/api/sysManager/material/dictionary'
import {getMeasureUnitData} from '@/api/common/dataBasic'
  export default {
    mixins: [computed, methods, formatEnum,formatBasic],
    components: {computed, methods, splitPane, pagination},
    data() {
      return {
        //右边数据
        tableData: {
          changedArray: [],//点新增没有保存
          data: [],//数据库查询数据
        },
        units: [],
        defaultExpandAll: false,
        columns: [
          {
            expand: true,
            text: '编码',
            value: 'code',
            width: 120,
            align: "left",
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
          }
        ],
        dataMaterialDictionary: [],
        expandAll: true,
        listId: 0,
        currentRow: undefined,
        currentType: {},
        total: 0,
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: '',
          fuzzyKeys: '',
          typeCode:''
        },
        modelSearchFilterType: {
          fuzzy: '',
          fuzzyKeys: '',
          validateStatus: 1,
          enable: 1
        },
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
          model: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 20]);
              },
              trigger: 'change'
            }
          ]
        },
        heightSplitPane: 500,
        oldJsonString: '',
        setCurrentLine: {}
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData'
      ]);
      this.getUnits()
      this.getMaterialType()
    },
    mounted: function () {
      let _self = this;
      this.$nextTick(() => {
        _self.heightInit(_self.getInnerHeight());
      });
    },
    watch: {
      screenHeight(innerHeight) {
        this.heightInit(innerHeight);
      }
    },
    methods: {
      /**
       * 高度初始化
       * @param innerHeight
       */
      heightInit(innerHeight) {
        const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
        this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
      },
      clickDefaultExpandAll() {
        if (this.defaultExpandAll) {
          this.defaultExpandAll = false;
        } else {
          this.defaultExpandAll = true;
        }
        this.$refs.refMaterialDictionaryTableTree.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefreshType() {
        this.resetData();
        this.getMaterialType()
      },
      clickRefresh() {
        this.modelSearchFilter.fuzzy = '';
        this.selectDictionary(this.currentType.code)
      },
      add() {
        if (this.currentType.ifLastLevel != 1) {
          this.$message.warning('请选择【物资类型】末级!')
          return
        }
        function addRow() {
          let modelDictionary = {
            "enable": 1,
            "typeCode": this.currentType.code,
            "typeId": this.currentType.id,
            "typeName": this.currentType.name,
            price: 0.0000,
            "validateStatus": 2,
            listId: this.listId++
          };
          this.tableData.data.unshift(modelDictionary);
          this.tableData.changedArray.unshift(modelDictionary);
          this.$refs.refDictionaryTable.setCurrentRow(this.tableData.data[0]);
        }

        if (this.modelSearchFilter.page == 1) {
          addRow.call(this);
        } else {
          this.selectDictionary(() => {
            this.modelSearchFilter.page = 1;
            addRow.call(this);
          })
        }
      },
      changeRow(row) {
        if(row){
          this.$set(row,'listId',this.listId++);
          this.tableData.changedArray.push(row)
        }
      },
      save() {
        let result = true
        this.tableData.data.some((item, idx) => {
          this.$refs['formName' + idx].validate(valid => {valid ? null : result = valid})
          this.$refs['formModel' + idx].validate(valid => valid ? null : result = valid)
          return !result
        })
        if (result) {
          let changedArray = arrayUniqueSameObj(this.tableData.changedArray);
          if (changedArray && changedArray.length > 0) {
          addDictionary(changedArray).then((res) => {
            if (res.status == 200) {
              this.selectDictionary()
              this.tableData.changedArray = []
              this.$message.success(res.message)
            } else {
              this.$message.success(res.message)
            }
          }).catch((err) => {
            this.$message.warning(err.message)
          })
          }
          else {
            this.$message({message: staticDataBasic.info.updateEmpty, type: 'warning'})
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return false
        }
      },
      //获取字典类别
      getMaterialType() {
        getMaterial(this.modelSearchFilterType).then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            this.dataMaterialDictionary = res.data;
            this.$nextTick(function () {
              this.$refs.refMaterialDictionaryTableTree.setCurrentRow(this.dataMaterialDictionary[0], true);
            });
          }
        }).catch((err) => {
          console.log(err)
        })
        this.tableData.changedArray = [];
      },
      rowClick(e) {
        if(e){
          this.currentType = e;
          this.modelSearchFilter.page = 1;
          this.modelSearchFilter.typeCode = e.code;
          this.selectDictionary()
        }
      },
      //查询字典
      selectDictionary(callback) {
        getDiction(this.modelSearchFilter).then((res) => {
          this.tableData.data = res.data.rows;
          this.total = res.data.total;
          this.$nextTick(function () {
            if (this.$refs.refDictionaryTable) {
              this.$refs.refDictionaryTable.setCurrentRow(this.tableData.data[0]);
            }
          });
          this.resetData();
          if (typeof callback === "function") {
            callback();
          };
        }).catch((err) => {
          console.log(err)
        })
      },
      //重置数据
      resetData() {
        this.tableData.changedArray = [];
        this.currentRow =undefined;
        this.modelSearchFilterType.fuzzy = '';
      },
      getUnits() {
        getMeasureUnitData().then((res) => {
          this.units = res.data
        }).catch((err) => {
          console.log(err)
        })
      },
      currentChange(row) {
        if(row){
          this.currentRow = row;
        }
      },
      clickValidateStatus() {
        let result = true
        this.tableData.data.some((item, idx) => {
          this.$refs['formName' + idx].validate(valid => valid ? null : result = valid)
          this.$refs['formModel' + idx].validate(valid => valid ? null : result = valid)
          return !result
        })
        if (result) {
          this.$confirm(staticDataBasic.info.audit, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let changedArray = arrayUniqueSameObj(this.tableData.changedArray);
              if (changedArray && changedArray.length > 0) {
                addDictionary(changedArray).then((res) => {
                  if (!this.$utils.isEmpty(res.data)) {
                    //获得当前行，进行审核
                    this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow)=>{
                      this.audit(currentRow);
                      return true;
                    });
                  }
                }).catch((error) => {
                  console.log(error);
                })
              } else {
                this.audit(this.currentRow);
              }
            }, (cancel) => {
              console.log(cancel);
            })
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return false
        }
      },
      //审核
      audit(currentRow) {
        auditDic(deepCloneByObject(currentRow)).then((res) => {
          if (res.status == 200) {
            this.selectDictionary()
            this.$message.success(res.message)
          } else {
            this.$message.warning(res.message)
          }
        }).catch(err => {
          console.log(err.message)
        })
      },
      //删除
      delDic() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.currentRow.id)) {
            this.selectDictionary()
          } else {
            deleteDic(this.currentRow.id).then(res => {
              this.selectDictionary()
              this.$message.success(res.message)
            }).catch(err => {
              this.$message.warning(err.message)
            })
          }
        }).catch((cancel) => {
          console.log(cancel);
        })
      },
      //禁用
      enableDicr(enable) {
        const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {
            id: this.currentRow.id,
            enable: enable
          }
          enableDic(data).then(res => {
            this.currentRow.enable = enable;
            this.$message.success(res.message)
          }).catch(err => {
            this.$message.warning(err.message)
          })
        }).catch(() => {
        })
      },
      rowClass({row, column, rowIndex, columnIndex}) {
        if (row.id == '') {
          return 'noSave'
        }
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refDictionaryTable, this.modelSearchFilter, () => {
          this.selectDictionary();
        });
      },
      /**
       * 关键字搜索
       */
      clickSearchFilterType() {
        this.$refs.refBasicSearchType.searchFilter(this.$refs.refMaterialDictionaryTableTree, this.modelSearchFilterType, () => {
          try {
            this.$refs.refMaterialDictionaryTableTree.filter(this.modelSearchFilterType.fuzzy);
          } catch (error) {
            console.log(error.message)
          }
        });
      },
      filterNodeMethodType(value, data, node) {
        if (!value) return true;
        if (node.children && node.children.length > 0) return true;
        const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilterType);
        return result;
      }
    },
    computed: {
      isAudit() {
        if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      isDel() {
        if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      isEna() {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 2
        }
        return true;
      },
      isEna2() {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 1
        }
        return true;
      }
    }
  }
</script>
