<template>
  <div class="materialType-container-index flex-layout">
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
      <split-pane split="vertical" :min-percent='30' :default-percent='60'>
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button v-if="!defaultExpandAll" type="primary" size="small" icon="el-icon-if-open" plain
                         @click="clickDefaultExpandAll">全部展开
              </el-button>
              <el-button v-if="defaultExpandAll" type="primary" size="small" icon="el-icon-if-fold" plain
                         @click="clickDefaultExpandAll">全部折叠
              </el-button>
             <!-- <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh" plain>刷新</el-button>-->
              <basic-search ref="refBasicSearch"  :modelSearchFilter="modelSearchFilter"
                            @clickSearchFilter="clickSearchFilter"></basic-search>
            </div>
            <basic-table-tree ref="refQualificationTypeTableTree" :default-expand-all="defaultExpandAll"
                              :data="dataQualificationType" :columns="columns" border
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
            <div class="handler-container">
              <el-button type="primary" size="small" icon="el-icon-plus" @click="clickLevel(1,-1)" plain>新增根</el-button>
              <el-button :disabled="disabledLevel" type="primary" size="small" icon="el-icon-circle-plus-outline"
                         @click="clickLevel(1,1)" plain>新增同级
              </el-button>
              <el-button :disabled="disabledBranch" type="primary" size="small" icon="el-icon-circle-plus-outline"
                         @click="clickLevel(2,1)" plain>新增下级
              </el-button>
              <el-button :disabled="disabledSave" type="primary" size="small" icon="el-icon-if-save"
                         @click="clickSave('refQualificationTypeForm')" plain>保存
              </el-button>
              <el-button :disabled="disabledAudit" type="danger" size="small" icon="el-icon-delete" @click="clickDelete" plain>删除
              </el-button>
              <el-button :disabled="disabledAudit" type="primary" size="small" icon="el-icon-if-auth"
                         @click="clickValidateStatus('refQualificationTypeForm')" plain>审核
              </el-button>
              <el-button :disabled="disabledDisnable" type="danger" size="small" icon="el-icon-circle-close-outline"
                         @click="disableStatus(2)" plain>禁用
              </el-button>
              <el-button :disabled="disabledEnable" type="success" size="small" icon="el-icon-circle-check-outline"
                         @click="disableStatus(1)" plain>启用
              </el-button>
            </div>
            <el-form ref="refQualificationTypeForm" :model="modelQualificationTypeForm" :rules="rules" label-position="right" label-width="120px"
                     class="form-container" :show-message="false">
              <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                <el-radio-group v-model="modelQualificationTypeForm.validateStatus">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.validateStatus"
                            :key="row.code" disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="启用状态" prop="enable" class="add-border disabled">
                <el-radio-group v-model="modelQualificationTypeForm.enable">
                  <el-radio :label="parseInt(row.code)"
                            v-for="(row, key, index) in dataEnum.enabled" :key="row.code"
                            disabled>
                    {{ row.name }}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="编码">
                <el-input clearable size="small" v-model="modelQualificationTypeForm.code" disabled/>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input clearable size="small" v-model="modelQualificationTypeForm.name" ref="refName" placeholder="请输入名称,最大长度20字符"
                          @blur="blurChangedStatus" :disabled="disabledAudit"/>
              </el-form-item>
              <el-form-item label="补充说明" prop="remark">
                <el-input clearable
                          :autosize="{ minRows: 2, maxRows: 4}"
                          v-model="modelQualificationTypeForm.remark"
                          type="textarea"
                          placeholder="请输入补充说明,最大长度200字符"
                          @blur="blurChangedStatus"
                />
              </el-form-item>
              <el-form-item label="上级编码">
                <el-input clearable size="small" v-model="modelQualificationTypeForm.parentCode" :disabled="true"/>
              </el-form-item>
              <el-form-item label="上级名称">
                <el-input clearable size="small" v-model="modelQualificationTypeForm.parentName" :disabled="true"/>
              </el-form-item>
              <el-form-item label="登记人员">
                <el-input clearable size="small" :disabled="true"  v-model="modelQualificationTypeForm.inputPerson" />
              </el-form-item>
              <el-form-item label="登记时间">
                <el-input clearable size="small" :disabled="true"  v-model="modelQualificationTypeForm.inputTime" />
              </el-form-item>
            </el-form>
          </div>
        </template>
      </split-pane>
    </div>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import { getQualificationTypeData, validateStatusQualificationType,
    enableQualificationType, deleteQualificationType,addOrUpdateQualificationType } from '@/api/brpManager/brpqualificationtypeManager/qualificationType'
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
    components: {computed, methods, splitPane},
    data() {
      return {
        modelQualificationTypeForm: {
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
          inputPerson: '',
          inputTime: ''
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
            width: 250,
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
        dataQualificationType: [],
        heightSplitPane: 0,
        heightTableLeft: 0,
        heightTableRight: 0,
        oldJsonString: '',
        changedArray: [],
        setCurrentLine: {},
        modelSearchFilter:{
          page:1,
          limit:10000,
          fuzzy: '',
          fuzzyKeys:'',
        }
      }
    },
    computed: {
      disabledLevel() {
        if (this.$utils.length(this.modelQualificationTypeForm) && this.modelQualificationTypeForm.validateStatus != '2' && this.modelQualificationTypeForm.enable == '1') {
          return false
        } else {
          return true
        }
      },
      disabledSave() {
        if (this.$utils.length(this.modelQualificationTypeForm) ) {
          return false
        } else {
          return true
        }
      },
      disabledBranch() {
        if (this.$utils.length(this.modelQualificationTypeForm) && this.modelQualificationTypeForm.validateStatus != '2' && this.modelQualificationTypeForm.enable == '1') {
          return false
        } else {
          return true
        }
      },
      disabledAudit() {
        if (this.$utils.length(this.modelQualificationTypeForm) && this.modelQualificationTypeForm.validateStatus == '2') {
          return false
        } else {
          return true
        }
      },
      disabledDisnable() {
        if (this.$utils.length(this.modelQualificationTypeForm) && this.modelQualificationTypeForm.validateStatus == '1' && this.modelQualificationTypeForm.enable == '1') {
          return this.$utilsBasic.parentDisable(this.modelQualificationTypeForm);
        } else {
          return true
        }
      },
      disabledEnable() {
        if (this.$utils.length(this.modelQualificationTypeForm) && this.modelQualificationTypeForm.validateStatus == '1' && this.modelQualificationTypeForm.enable == '2') {
          return this.$utilsBasic.parentDisable(this.modelQualificationTypeForm);
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
      this.getQualificationTypeData()
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
        if(this.$refs.refSplitPane){
          const offsetTopSplitPane = this.$refs.refSplitPane.getBoundingClientRect().top;
          this.heightSplitPane = innerHeight - offsetTopSplitPane - 14;
        }
      },
      clickDefaultExpandAll(){
        if(this.defaultExpandAll)
        {
          this.defaultExpandAll = false;
        }else{
          this.defaultExpandAll = true;
        }
        this.$refs.refQualificationTypeTableTree.toggleExpandedAll(this.defaultExpandAll);
      },
      clickRefresh(){
        this.resetData();
        this.getQualificationTypeData()
      },
      //重置数据
      resetData() {
        this.modelQualificationTypeForm = {};
        this.changedArray = [];
        //this.modelSearchFilter.fuzzy = '';
        this.$refs['refQualificationTypeForm'].resetFields();
      },
      getQualificationTypeData() {
        getQualificationTypeData().then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            this.dataQualificationType = res.data;
            this.$nextTick(function () {
              this.$refs.refQualificationTypeTableTree.setCurrentRow(this.dataQualificationType[0]);
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
        this.$refs.refBasicSearch.searchFilter(this.$refs.refQualificationTypeTableTree, this.modelSearchFilter, () => {
          try {
            this.$refs.refQualificationTypeTableTree.filter(this.modelSearchFilter.fuzzy);
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
          parentCode: this.modelQualificationTypeForm.code ? this.modelQualificationTypeForm.code : '00', // 上级编码
          parentId: this.modelQualificationTypeForm.id > 0 ? this.modelQualificationTypeForm.id : -1,
          parentName: this.modelQualificationTypeForm.name ? this.modelQualificationTypeForm.name : '',
          level: this.modelQualificationTypeForm.level ? 1 + this.modelQualificationTypeForm.level : 1, // 树形级别
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
          let treeId = this.dataQualificationType.length;
          let row = {tree_parent: '', tree_id: treeId, treeId: treeId};
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refQualificationTypeTableTree.addBrother(row, addRowData);
          this.$refs.refQualificationTypeTableTree.setCurrentRow(row);
        }
        else if (type == 1) {
          this.$set(addRowData, "parentCode", this.modelQualificationTypeForm.parentCode);
          this.$set(addRowData, "parentId", this.modelQualificationTypeForm.parentId);
          this.$set(addRowData, "parentName", this.modelQualificationTypeForm.parentName);
          //新增同级
          let treeId = this.modelQualificationTypeForm.tree_id + '-' + (this.$utils.length(this.modelQualificationTypeForm.children)>0 ? this.modelQualificationTypeForm.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.$refs.refQualificationTypeTableTree.addBrother(this.modelQualificationTypeForm, addRowData);
          this.$refs.refQualificationTypeTableTree.setCurrentRow(addRowData);
        } else {
          //新增下级
          this.$refs.refQualificationTypeTableTree.toggleExpandedRow(this.modelQualificationTypeForm.tree_id);
          let treeId = this.modelQualificationTypeForm.tree_id + '-' + (this.$utils.length(this.modelQualificationTypeForm.children)>0 ? this.modelQualificationTypeForm.children.length : '0');
          this.$set(addRowData, "tree_id", treeId);
          this.$set(addRowData, "treeId", treeId);
          this.modelQualificationTypeForm.ifLastLevel = '2';
          this.$refs.refQualificationTypeTableTree.addChild(this.modelQualificationTypeForm, addRowData);
          this.$refs.refQualificationTypeTableTree.setCurrentRow(addRowData);
        }
        this.$nextTick(function () {
          this.$refs.refName.focus();
        });
      },
      validateStatusQualificationType(obj) {
        validateStatusQualificationType(deepCloneByObject(obj)).then((res) => {
          if (res.status == 200) {
            if (!this.$utils.isEmpty(res.data)) {
              this.modelQualificationTypeForm.validateStatus = res.data.validateStatus;
              this.modelQualificationTypeForm.code = res.data.code;
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
          if (this.$utils.isEmpty(this.modelQualificationTypeForm.id)) {
            this.$refs.refQualificationTypeTableTree.delete(this.modelQualificationTypeForm)
            this.modelQualificationTypeForm = {}
            this.changedArray = [];
            this.$refs['refQualificationTypeForm'].resetFields();
            this.$nextTick(function () {
              this.$refs.refQualificationTypeTableTree.setCurrentRow(this.dataQualificationType[0]);
            });
          } else {
            const data = {id: this.modelQualificationTypeForm.id}
            deleteQualificationType(data).then((res) => {
              if (res.status == 200) {
                this.$refs.refQualificationTypeTableTree.delete(this.modelQualificationTypeForm)
                this.modelQualificationTypeForm = {}
                this.changedArray = [];
                this.$refs['refQualificationTypeForm'].resetFields();
                this.$nextTick(function () {
                  this.$refs.refQualificationTypeTableTree.setCurrentRow(this.dataQualificationType[0]);
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
          let modelQualificationTypeForm = deepCloneByObject(this.modelQualificationTypeForm)
          modelQualificationTypeForm.enable = status;
          enableQualificationType(deepCloneByObject(modelQualificationTypeForm)).then((res) => {
            if (res.status == 200) {
              //当前对象
              this.modelQualificationTypeForm.enable = status;
              updateTableTreeEnableData(this.modelQualificationTypeForm, status);

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
        if (!this.$utils.isEmpty(this.modelQualificationTypeForm.name)) {
          const newJsonString = JSON.stringify(deepCloneByObject(this.modelQualificationTypeForm));
          this.changedArray = getChangedTableTreeData(this.changedArray, this.oldJsonString, newJsonString);
        }
      },
      /**
       * 审核
       * @param modelQualificationTypeForm 当前form数据
       */
      clickValidateStatus(modelQualificationTypeForm) {
        const _self = this;
        this.$refs[modelQualificationTypeForm].validate((valid) => {
          if (valid) {
            this.$confirm(staticDataBasic.info.audit, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                const changedArray = deepCloneByObject(_self.changedArray);
                if (changedArray && changedArray.length > 0) {
                  addOrUpdateQualificationType(changedArray).then((res) => {
                    if (res.status == 200) {
                      if (!_self.$utils.isEmpty(res.data)) {
                        const responseData = res.data.slice(0);
                        _self.$refs['refQualificationTypeTableTree'].updateTableTreeData(responseData, function () {
                          _self.$refs.refQualificationTypeTableTree.setCurrentRow(_self.modelQualificationTypeForm);
                          _self.validateStatusQualificationType(_self.modelQualificationTypeForm);
                        });
                        _self.changedArray = [];
                      }
                    } else {
                      this.$message({message: res.message, type: 'error'})
                    }
                  }).catch((err) => {
                    console.log(err)
                  })
                } else {
                  _self.validateStatusQualificationType(this.modelQualificationTypeForm);
                  this.changedArray = [];
                }
              }, (cancel) => {
                console.log(cancel);
              })
          } else {
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
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
       * @param modelQualificationTypeForm 当前form数据
       */
      clickSave(modelQualificationTypeForm) {
        const _self = this;
        this.$refs[modelQualificationTypeForm].validate((valid) => {
          if (valid) {
            const changedArray = deepCloneByObject(_self.changedArray);
            if (changedArray && changedArray.length > 0) {
              addOrUpdateQualificationType(changedArray).then((res) => {
                if (res.status == 200) {
                  if (!_self.$utils.isEmpty(res.data)) {
                    const responseData = res.data.slice(0);
                    _self.$refs['refQualificationTypeTableTree'].updateTableTreeData(responseData);
                    _self.$refs.refQualificationTypeTableTree.setCurrentRow(_self.modelQualificationTypeForm);
                    _self.$set(_self.modelQualificationTypeForm, 'update', _self.$utils.number.random(1, 10));
                    _self.changedArray = [];
                    _self.$message({message: res.message, type: 'success'})
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
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
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
          this.modelQualificationTypeForm = row;
          //存放当前选中的对象，转换成字符串值
          this.oldJsonString = JSON.stringify(deepCloneByObject(this.modelQualificationTypeForm));
        }
      }
    }
  }
</script>
