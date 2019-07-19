<template>
  <div class="itemType-container-list flex-layout">
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
      <split-pane split="vertical" :min-percent='30' :default-percent='40'>
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button v-if="!defaultExpandAll" type="primary" icon="el-icon-if-open" plain
                         @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button v-if="defaultExpandAll" type="primary" icon="el-icon-if-fold" plain
                         @click="clickDefaultExpandAll">全部折叠
              </el-button>
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>
              <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                            @clickSearchFilter="clickSearchFilter"></basic-search>
            </div>
            <basic-table-tree ref="refItemTypeTableTree" :default-expand-all="defaultExpandAll"
                        :data="dataItemType" :columns="columns" border
                              :filterNodeMethod="filterNodeMethod"
                        @current-change="rowClick">
              <template slot-scope="treeObj" slot="validateStatus">
                {{formatValidateStatus(treeObj.scope.row)}}
              </template>
              <template slot-scope="treeObj" slot="enable">
                {{formatEnable(treeObj.scope.row)}}
              </template>
            </basic-table-tree>
          </div>
        </template>
        <template slot="paneR">
          <div class="right-container white">
            <div class="tb-content">
              <div class="handler-container">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="clickLevel(1,-1)" plain>新增根</el-button>
                <el-button :disabled="disabledLevel" type="primary" size="small" icon="el-icon-circle-plus-outline"
                           @click="clickLevel(1,1)" plain>新增同级
                </el-button>
                <el-button :disabled="disabledBranch" type="primary" size="small" icon="el-icon-circle-plus-outline"
                           @click="clickLevel(2,1)" plain>新增下级
                </el-button>
                <el-button :disabled="disabledSave" type="primary" size="small" icon="el-icon-if-save"
                           @click="clickSave('refItemTypeForm')" plain>保存
                </el-button>
                <el-button :disabled="disabledAudit" type="danger" size="small" icon="el-icon-delete" @click="clickDelete" plain>删除
                </el-button>
                <el-button :disabled="disabledAudit" type="primary" size="small" icon="el-icon-if-auth"
                           @click="clickValidateStatus('refItemTypeForm')" plain>审核
                </el-button>
                <el-button :disabled="disabledDisnable" type="danger" size="small" icon="el-icon-circle-close-outline"
                           @click="disableStatus(2)" plain>禁用
                </el-button>
                <el-button :disabled="disabledEnable" type="success" size="small" icon="el-icon-circle-check-outline"
                           @click="disableStatus(1)" plain>启用
                </el-button>
              </div>

              <el-form ref="refItemTypeForm" :model="modelItemTypeForm" :rules="rules" label-position="right" label-width="120px"
                       class="form-container" :show-message="false">
                <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                  <el-radio-group v-model="modelItemTypeForm.validateStatus">
                    <el-radio :label="parseInt(row.code)"
                              v-for="(row, key, index) in dataEnum.validateStatus"
                              :key="row.code" disabled>
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="启用状态" prop="enable" class="add-border disabled">
                  <el-radio-group v-model="modelItemTypeForm.enable">
                    <el-radio :label="parseInt(row.code)"
                              v-for="(row, key, index) in dataEnum.enabled" :key="row.code"
                              disabled>
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="编码">
                  <el-input clearable size="small" v-model="modelItemTypeForm.code" disabled/>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input clearable size="small" ref="refName" v-model="modelItemTypeForm.name" placeholder="请输入名称,最大长度20字符"
                            @blur="blurChangedStatus"/>
                </el-form-item>
                <el-form-item label="补充说明" prop="remark">
                  <el-input clearable
                            :autosize="{ minRows: 2, maxRows: 4}"
                            v-model="modelItemTypeForm.remark"
                            type="textarea"
                            placeholder="请输入补充说明,最大长度200字符"
                            @blur="blurChangedStatus"
                  />
                </el-form-item>
                <el-form-item label="上级编码">
                  <el-input clearable size="small" v-model="modelItemTypeForm.parentCode" :disabled="true"/>
                </el-form-item>
                <el-form-item label="上级名称">
                  <el-input clearable size="small" v-model="modelItemTypeForm.parentName" :disabled="true"/>
                </el-form-item>
                <el-form-item label="登记人员">
                  <el-input clearable size="small" :disabled="true"  v-model="modelItemTypeForm.inputPerson" />
                </el-form-item>
                <el-form-item label="登记时间">
                  <el-input size="small" clearable  v-model="modelItemTypeForm.inputTime" :disabled="true" placeholder="系统自动生成登记时间"/>
                </el-form-item>
              </el-form>

            </div>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import { selectItemType,addOrUpdateItemType,validateStatusItemType,enableItemType,deleteItemType } from '@/api/bpmaManager/early/itemInfo/itemType'
  import {
    getNowFormatDate,
    deepCloneByObject,
    getChangedTableTreeData,
    updateTableTreeData,
    updateTableTreeEnableData
  } from '@/utils'
  import {validateLength} from "@/utils/validate";
  import {staticDataBasic} from "@/assets/data/basic";
  import splitPane from 'vue-splitpane'
  import formatEnum from "@/utils/mixins/formatEnum";
  export default {
    mixins: [computed, methods, formatEnum],
    components: {computed, methods, splitPane, },
    data() {
      return {
        modelItemTypeForm: {
          validateStatus: 2, // 审核状态
          enable: 1, // 当前状态
          code: '', // 编码
          name: '', // 名称
          parentCode: '', // 上级编码
          parentName: '',
          parentId: '',
          level: '', // 树形级别
          ifLastLevel: '', // 是否末级
          type: '', // 属性类型
          remark: '', // 说明
          //inputPerson: this.$store.state.user.login.inputPersonFullPath,
          //inputTime: new Date().getTime()
        },
        modelSearchFilter:{
          page:1,
          limit:10000,
          fuzzy: '',
          fuzzyKeys:'',
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
          remark: [
            {
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, false, ['补充说明', 1, 200]);
              },
              trigger: 'change'
            }
          ]
        },
        defaultExpandAll: false,
        columns: [
          {
            expand: true,
            text: '编码',
            value: 'code',
            width: 160,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '名称',
            value: 'name',
            minWidth: 200,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '审核状态',
            value: 'validateStatus',
            width: '80'
          },
          {
            text: '启用状态',
            value: 'enable',
            width: '80'
          }
        ],
        dataItemType: [],
        heightSplitPane: 0,
        heightTableLeft: 0,
        heightTableRight: 0,
        oldJsonString: '',
        changedArray: [],
        setCurrentLine: {}
      }
    },
    computed: {
      disabledLevel() {
        if (this.$utils.length(this.modelItemTypeForm) && this.modelItemTypeForm.validateStatus != '2' && this.modelItemTypeForm.enable == '1') {
          return false
        } else {
          return true
        }
      },
      disabledSave() {
        if (this.$utils.length(this.modelItemTypeForm) ) {
          return false
        } else {
          return true
        }
      },
      disabledBranch() {
        if (this.$utils.length(this.modelItemTypeForm) && this.modelItemTypeForm.validateStatus != '2' && this.modelItemTypeForm.enable == '1') {
          return false
        } else {
          return true
        }
      },
      disabledAudit() {
        if (this.$utils.length(this.modelItemTypeForm) && this.modelItemTypeForm.validateStatus == '2') {
          return false
        } else {
          return true
        }
      },
      disabledDisnable() {
        if (this.$utils.length(this.modelItemTypeForm) && this.modelItemTypeForm.validateStatus == '1' && this.modelItemTypeForm.enable == '1') {
          return this.$utilsBasic.parentDisable(this.modelItemTypeForm);
        } else {
          return true
        }
      },
      disabledEnable() {
        if (this.$utils.length(this.modelItemTypeForm) && this.modelItemTypeForm.validateStatus == '1' && this.modelItemTypeForm.enable == '2') {
          return this.$utilsBasic.parentDisable(this.modelItemTypeForm);
        } else {
          return true
        }
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
        'GetIsOrNotData',
        'GetGenderData'
      ]);
      this.selectItemType()
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
      clickDefaultExpandAll(){
        if(this.defaultExpandAll)
        {
          this.defaultExpandAll = false;
        }else{
          this.defaultExpandAll = true;
        }
        this.$refs.refItemTypeTableTree.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefresh(){
        this.resetData();
        this.selectItemType()
      },
      //重置数据
      resetData() {
        this.modelItemTypeForm = {};
        this.changedArray = [];
        //this.modelSearchFilter.fuzzy = '';
        this.$refs['refItemTypeForm'].resetFields();
      },
      selectItemType() {
        selectItemType().then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            this.dataItemType = res.data;
            this.$nextTick(function () {
              this.$refs.refItemTypeTableTree.setCurrentRow(this.dataItemType[0]);
            });
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(this.$refs.refItemTypeTableTree, this.modelSearchFilter, () => {
          try {
          this.$refs.refItemTypeTableTree.filter(this.modelSearchFilter.fuzzy);
          } catch (error) {
            console.log(error.message)
          }
        });
      },
      filterNodeMethod(value, data, node) {
        if (!value) return true;
        if (node.children && node.children.length > 0) return true;
        const result = this.$utilsBasic.searchFilterByFuzzyKeysRow(node, this.modelSearchFilter);
        return result;
      },

      // 新增
      clickLevel(type, pid) {
        let addRowData = {
          validateStatus: 2,
          enable: 1,
          ifLastLevel: 1,
          type: type,
          //inputPerson:this.$store.state.user.login.inputPersonFullPath,
          //inputTime:new Date().getTime(),
          parentCode: this.modelItemTypeForm.code ? this.modelItemTypeForm.code : '00', // 上级编码
          parentId: this.modelItemTypeForm.id > 0 ? this.modelItemTypeForm.id : -1,
          parentName: this.modelItemTypeForm.name ? this.modelItemTypeForm.name : '',
          level: this.modelItemTypeForm.level ? 1 + this.modelItemTypeForm.level : 1, // 树形级别
          crtTime: getNowFormatDate()
        }
        //追加菜单树
        if (type == 1 && pid == -1) {
          //新增根
          this.$set(addRowData, "parentCode", '00');
          this.$set(addRowData, "parentId", -1);
          this.$set(addRowData, "parentName", '');
          this.$set(addRowData, "level", 1);
          this.$set(addRowData, "orgPathName", '/');
          let treeId = this.dataItemType.length;
          let row = {tree_parent: '', tree_id: treeId, treeId: treeId};
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refItemTypeTableTree.addBrother(row, addRowData);
          this.$refs.refItemTypeTableTree.setCurrentRow(row);
        }
        else if (type == 1) {
          this.$set(addRowData, "parentCode", this.modelItemTypeForm.parentCode);
          this.$set(addRowData, "parentId", this.modelItemTypeForm.parentId);
          this.$set(addRowData, "parentName", this.modelItemTypeForm.parentName);
          //新增同级
          let treeId = this.modelItemTypeForm.tree_id + '-' + (this.$utils.length(this.modelItemTypeForm.children)>0 ? this.modelItemTypeForm.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refItemTypeTableTree.addBrother(this.modelItemTypeForm, addRowData);
          this.$refs.refItemTypeTableTree.setCurrentRow(addRowData);
        } else {
          //新增下级
          this.$refs.refItemTypeTableTree.toggleExpandedRow(this.modelItemTypeForm.tree_id);
          let treeId = this.modelItemTypeForm.tree_id + '-' + (this.$utils.length(this.modelItemTypeForm.children)>0 ? this.modelItemTypeForm.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.modelItemTypeForm.ifLastLevel = '2';
          this.$refs.refItemTypeTableTree.addChild(this.modelItemTypeForm, addRowData);
          this.$refs.refItemTypeTableTree.setCurrentRow(addRowData);
        }
        this.$nextTick(function () {
          this.$refs.refName.focus();
        });
      },
      validateStatusItemType(obj) {
        validateStatusItemType(deepCloneByObject(obj)).then((res) => {
          if (res.status == 200) {
            if (!this.$utils.isEmpty(res.data)) {
              this.modelItemTypeForm.validateStatus = res.data.validateStatus;
              this.modelItemTypeForm.code = res.data.code;
            }
            this.$message({message: res.message, type: 'success'})
          } else {
            this.$message({message: res.message, type: 'error'})
          }
        }).catch((err) => {
          console.log(err);
        })
      },
      clickDelete() {
        this.$confirm(staticDataBasic.info.delete, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$utils.isEmpty(this.modelItemTypeForm.id)) {
            this.$refs.refItemTypeTableTree.delete(this.modelItemTypeForm)
            this.modelItemTypeForm = {}
            this.changedArray = [];
            this.$refs['refItemTypeForm'].resetFields();
            this.$nextTick(function () {
              this.$refs.refItemTypeTableTree.setCurrentRow(this.dataItemType[0]);
            });
          } else {
            const data = {id: this.modelItemTypeForm.id}
            deleteItemType(data).then((res) => {
              if (res.status == 200) {
                this.$refs.refItemTypeTableTree.delete(this.modelItemTypeForm)
                this.modelItemTypeForm = {}
                this.changedArray = [];
                this.$refs['refItemTypeForm'].resetFields();
                this.$nextTick(function () {
                  this.$refs.refItemTypeTableTree.setCurrentRow(this.dataItemType[0]);
                });
                this.$message({
                  type: 'success',
                  message: res.message
                })
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
              }
            }).catch((err) => {
              console.log(err)
            })
          }
        }).catch(() => {

        })
      },
      disableStatus(status) {
        const text = status == 1 ? staticDataBasic.info.enable : staticDataBasic.info.disEnable
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.modelItemTypeForm.enable = status;
          enableItemType(deepCloneByObject(this.modelItemTypeForm)).then((res) => {
            if (res.status == 200) {
              //当前对象
              this.modelItemTypeForm.enable = status;
              updateTableTreeEnableData(this.modelItemTypeForm, status);

              this.$message({
                type: 'success',
                message: res.message
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          }).catch((err) => {
            console.log(err)
          })
        }).catch(() => {
        })
      },
      blurChangedStatus(event) {
        if (!this.$utils.isEmpty(this.modelItemTypeForm.name)) {
          const newJsonString = JSON.stringify(deepCloneByObject(this.modelItemTypeForm));
          this.changedArray = getChangedTableTreeData(this.changedArray, this.oldJsonString, newJsonString);
        }
      },
      /**
       * 审核
       * @param modelItemTypeForm 当前form数据
       */
      clickValidateStatus(modelItemTypeForm) {
        const _self = this;
        this.$refs[modelItemTypeForm].validate((valid) => {
          if (valid) {
            this.$confirm(staticDataBasic.info.audit, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                const changedArray = deepCloneByObject(_self.changedArray);
                if (changedArray && changedArray.length > 0) {
                  addOrUpdateItemType(changedArray).then((res) => {
                    if (res.status == 200) {
                      if (!_self.$utils.isEmpty(res.data)) {
                        _self.$refs['refItemTypeTableTree'].updateTableTreeData(res.data.slice(0), function () {
                          _self.$refs.refItemTypeTableTree.setCurrentRow(_self.modelItemTypeForm);
                          _self.validateStatusItemType(_self.modelItemTypeForm);
                        });

                        this.changedArray = [];
                      }
                    } else {
                      this.$message({message: res.message, type: 'error'})
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
                } else {
                  _self.validateStatusItemType(this.modelItemTypeForm);
                  this.changedArray = [];
                }
              }, (cancel) => {
                console.log(cancel);
              })
          } else {
            if (this.$refs.refName && !this.$refs.refName.value) {
              this.$refs.refName.focus();
              return false
            }
            return false
          }
        })
      },
      /**
       * 保存
       * @param modelItemTypeForm 当前form数据
       */
      clickSave(modelItemTypeForm) {
        const _self = this;
        this.$refs[modelItemTypeForm].validate((valid) => {
          if (valid) {
            const changedArray = deepCloneByObject(_self.changedArray);
            if (changedArray && changedArray.length > 0) {
              addOrUpdateItemType(changedArray).then((res) => {
                if (res.status == 200) {
                  if (!_self.$utils.isEmpty(res.data)) {
                    const responseData = res.data.slice(0);
                    _self.$refs['refItemTypeTableTree'].updateTableTreeData(responseData);
                    _self.$message({message: res.message, type: 'success'})
                    this.changedArray = [];
                    this.$refs.refItemTypeTableTree.setCurrentRow(this.modelItemTypeForm);
                  }
                } else {
                  this.$message({message: res.message, type: 'error'})
                }
              }).catch((err) => {
                console.log(err)
              })
            } else {
              _self.$message({message: staticDataBasic.info.updateEmpty, type: 'warning'})
            }
          } else {
            if (this.$refs.refName && !this.$refs.refName.value) {
              this.$refs.refName.focus();
              return false
            }
            return false
          }
        })
      },
      rowClick(row,oldCurrentRow) {

        if (this.$utils.length(row) && !row.name) {
          this.$refs.refName.focus();
        } else {
          this.$refs.refName.blur();
        }
        if (this.$utils.length(row)) {
          this.modelItemTypeForm = row;
          //存放当前选中的对象，转换成字符串值
          this.oldJsonString = JSON.stringify(deepCloneByObject(this.modelItemTypeForm));
        }
      }
    }
  }
</script>
