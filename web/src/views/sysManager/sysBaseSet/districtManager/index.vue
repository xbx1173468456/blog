<template>
  <div class="flex-layout groupMechanism-container-list">
    <div ref="refSplitPane" class="splitPane-container" v-bind:style="{height:heightSplitPane + 'px'}">
      <split-pane split="vertical" :min-percent='30' :default-percent='60'>
        <template slot="paneL">
          <div class="left-container">
            <div class="handler-container">
              <el-button type="primary" size="small" icon="el-icon-refresh" @click="clickRefresh()" plain>刷新</el-button>
            </div>
            <basic-table-tree ref="refGroupTreeData" :default-expand-all="defaultExpandAll"
                        :data="dataSource" :columns="columns"
                        @current-change="rowClick">
              <template slot-scope="treeObj" slot="type">
                {{formatType(treeObj.scope.row)}}
              </template>
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
              <div class="handler-container" v-if="false">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrg(1,-1)" plain>新增根</el-button>
                <el-button :disabled="isOrg2" type="primary" size="small" icon="el-icon-circle-plus-outline"
                           @click="addOrg(1,1)" plain>新增同级
                </el-button>
                <el-button :disabled="disabledBranch" type="primary" size="small" icon="el-icon-circle-plus-outline"
                           @click="addOrg(2,1)" plain>新增下级
                </el-button>
                <el-button :disabled="disabledSave" type="primary" size="small" icon="el-icon-if-save"
                           @click="clickSave('formData')" plain>保存
                </el-button>
                <el-button :disabled="disabledAudit" type="danger" size="small" icon="el-icon-delete" @click="clickDelete" plain>删除
                </el-button>
                <el-button :disabled="disabledAudit" type="primary" size="small" icon="el-icon-if-auth"
                           @click="clickValidateStatus('formData')" plain>审核
                </el-button>
                <el-button :disabled="disabledEnable" type="danger" size="small" icon="el-icon-circle-close-outline"
                           @click="disableStatus(2)" plain>禁用
                </el-button>
                <el-button :disabled="disabledEnable2" type="success" size="small" icon="el-icon-circle-check-outline"
                           @click="disableStatus(1)" plain>启用
                </el-button>
              </div>
              <el-form ref="formData" :model="formData" :rules="rules" label-position="right" label-width="120px"
                       class="form-container" :show-message="false">
                <el-form-item label="审核状态" prop="validateStatus" class="add-border disabled">
                  <el-radio-group v-model="formData.validateStatus">
                    <el-radio :label="parseInt(row.code)"
                              v-for="(row, key, index) in dataEnum.validateStatus"
                              :key="row.code" disabled>
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="启用状态" prop="enable" class="add-border disabled">
                  <el-radio-group v-model="formData.enable">
                    <el-radio :label="parseInt(row.code)"
                              v-for="(row, key, index) in dataEnum.enabled" :key="row.code"
                              disabled>
                      {{ row.name }}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="编码">
                  <el-input clearable size="small" v-model="formData.code" disabled/>
                </el-form-item>
                <el-form-item label="区划代码" prop="stateCode">
                  <el-input clearable ref="refStateCode" v-model="formData.stateCode" placeholder="请输入区划代码"
                            @blur="blurChangedStatus" disabled/>
                </el-form-item>
                <el-form-item label="区划名称" prop="name">
                  <el-input clearable size="small" ref="refName" v-model="formData.name" placeholder="请输入区划名称"
                            @blur="blurChangedStatus" disabled/>
                </el-form-item>
                <el-form-item label="补充说明" prop="remark">
                  <el-input clearable disabled
                            :autosize="{ minRows: 2, maxRows: 4}"
                            v-model="formData.remark"
                            type="textarea"
                            placeholder="请输入补充说明"
                            @blur="blurChangedStatus"
                  />
                </el-form-item>
                <el-form-item label="上级编码">
                  <el-input clearable size="small" v-model="formData.parentCode" :disabled="true"/>
                </el-form-item>
                <el-form-item label="区划全名称">
                  <el-input clearable size="small" v-model="formData.parentName" :disabled="true"/>
                </el-form-item>
                <el-form-item label="登记人员">
                  <el-input clearable size="small" v-model="formData.crtName" :disabled="true"/>
                </el-form-item>
                <el-form-item label="登记时间">
                  <el-input clearable size="small" v-model="formData.crtTime" :disabled="true"/>
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
  import {
    getDistrictPage,
    getSysConfigDistrictList,
    addOrgInfo,
    audits,
    delOrg,
    disableOrg,
    update,
    addOrUpdateOrgInfos
  } from '@/api/sysManager/sysBaseSet/districtManager'
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
        formData: {
          validateStatus: 2, // 审核状态
          enable: 1, // 当前状态
        },
        rules: {
          stateCode: [
            {
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['区划代码', 2, 20]);
              },
              trigger: 'change'
            }
          ],
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['区划名称', 2, 20]);
              },
              trigger: 'change'
            }
          ],
          remark: [
            {
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, false, ['补充说明', 2, 200]);
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
            text: '区划代码',
            value: 'stateCode',
            minWidth: 100,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          {
            text: '区划名称',
            value: 'name',
            width: 120,
            align: "left",
            headerAlign: "center",
            showOverflowTooltip: true
          },
          // {
          //   text: 'tree_id',
          //   value: 'tree_id',
          //   width: '100'
          // },
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
        dataSource: [],
        heightSplitPane: 0,
        heightTableLeft: 0,
        heightTableRight: 0,
        oldJsonString: '',
        changedArray: [],
        setCurrentLine: {}
      }
    },
    computed: {
      isOrg() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.type == '1' && this.formData.type != '2' || this.formData.type == '') {
          return false
        } else {
          return true
        }
      },
      isOrg2() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.type == '1' && this.formData.type != '2' && this.formData.validateStatus != '2') {
          return false
        } else {
          return true
        }
      },
      disabledSave() {
        if (this.$utils.length(this.formData) && this.formData.type != '') {
          return false
        } else {
          return true
        }
      },
      disabledBranch() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.type != '3' && this.formData.validateStatus != '2') {
          return false
        } else {
          return true
        }
      },
      disabledAudit() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.validateStatus == '2') {
          return false
        } else {
          return true
        }
      },
      disabledEnable() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.validateStatus == '1' && this.formData.enable == '1') {
          return this.$utilsBasic.parentDisable(this.formData);
        } else {
          return true
        }
      },
      disabledEnable2() {
        if (this.$utils.length(this.formData) && this.formData.type != '' && this.formData.validateStatus == '1' && this.formData.enable == '2') {
          return this.$utilsBasic.parentDisable(this.formData);
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
      this.getSysConfigDistrictList()
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
      clickRefresh(){
        this.getSysConfigDistrictList()
      },
      getSysConfigDistrictList() {
        getSysConfigDistrictList().then((res) => {
          if (!this.$utils.isEmpty(res.data)) {
            this.dataSource = res.data;
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      // 新增
      addOrg(type, pid) {
        this.$nextTick(function () {
          this.$refs.refName.focus();
        });
        this.sendForm(type, pid);
      },
      audit() {
        audits(deepCloneByObject(this.formData)).then((res) => {
          if (res.status == 200) {
            if (!this.$utils.isEmpty(res.data)) {
              this.formData.validateStatus = res.data.validateStatus;
              this.formData.code = res.data.code;
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
          if (this.$utils.isEmpty(this.formData.id)) {
            this.$refs.refGroupTreeData.delete(this.formData)
            this.formData = {}
            this.changedArray = [];
            this.$refs['formData'].resetFields();
            this.$nextTick(function () {
              this.$refs.refGroupTreeData.setCurrentRow(this.dataSource[0]);
            });
          } else {
            const data = {orgId: this.formData.id}
            delOrg(data).then((res) => {
              if (res.status == 200) {
                this.$refs.refGroupTreeData.delete(this.formData)
                this.formData = {}
                this.changedArray = [];
                this.$refs['formData'].resetFields();
                this.$nextTick(function () {
                  this.$refs.refGroupTreeData.setCurrentRow(this.dataSource[0]);
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
          const data = {orgId: this.formData.id, enable: status}
          disableOrg(data).then((res) => {
            if (res.status == 200) {
              //当前对象
              this.formData.enable = status;
              updateTableTreeEnableData(this.formData, status);

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
      sendForm(type, pid) {
        let addRowData = {
          validateStatus: 2,
          enable: 1,
          ifLastLevel: 1,
          type: type,
          parentCode: this.formData.code ? this.formData.code : '00', // 上级编码
          parentId: this.formData.id > 0 ? this.formData.id : -1,
          level: this.formData.level ? 1 + this.formData.level : 1, // 树形级别
          orgPathName: '/' + this.formData.orgPathName,
          crtTime: getNowFormatDate()
        }
        //追加菜单树
        if (type == 1 && pid == -1) {
          addRowData.parentId = -1
          addRowData.parentCode = '00'
          addRowData.level = 1
          addRowData.orgPathName = '/'
          addRowData.tree_id = this.dataSource.length
          addRowData.treeId = this.dataSource.length
          //新增根
          let row = {tree_parent: '', tree_id: addRowData.tree_id, treeId: addRowData.treeId};
          this.$refs.refGroupTreeData.addBrother(row, addRowData);
          this.$refs.refGroupTreeData.setCurrentRow(row);
        }
        else if (type == 2) {
          //新增同级
          let tree_id = this.formData.tree_id + '-' + (this.$utils.length(this.formData.children)>0 ? this.formData.children.length : '0');
          this.$set(addRowData, "tree_id", tree_id);
          this.$set(addRowData, "treeId", tree_id);
          this.$refs.refGroupTreeData.addBrother(this.formData, addRowData);
          this.$refs.refGroupTreeData.setCurrentRow(addRowData);
        } else {
          //新增下级
          if (this.formData.ifLastLevel == 2) {
            this.$refs.refGroupTreeData.toggleExpandedRow(this.formData.tree_id);
          }
          let tree_id = this.formData.tree_id + '-' + (this.$utils.length(this.formData.children)>0 ? this.formData.children.length : '0');
          this.$set(addRowData, "tree_id", tree_id);
          this.$set(addRowData, "treeId", tree_id);
          this.$refs.refGroupTreeData.addChild(this.formData, addRowData);
          this.$refs.refGroupTreeData.setCurrentRow(addRowData);
        }
      },
      blurChangedStatus(event) {
        if (!this.$utils.isEmpty(this.formData.name)) {
          const newJsonString = JSON.stringify(deepCloneByObject(this.formData));
          getChangedTableTreeData(this.changedArray, this.oldJsonString, newJsonString);
        }
      },
      /**
       * 审核
       * @param formData 当前form数据
       */
      clickValidateStatus(formData) {
        const _self = this;
        this.$refs[formData].validate((valid) => {
          if (valid) {
            this.$confirm(staticDataBasic.info.audit, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                const changedArray = deepCloneByObject(_self.changedArray);
                if (changedArray && changedArray.length > 0) {
                  addOrUpdateOrgInfos(changedArray).then((res) => {
                    if (res.status == 200) {
                      if (!_self.$utils.isEmpty(res.data)) {
                        const responseData = res.data.slice(0);
                        _self.$refs['refGroupTreeData'].updateTableTreeData(responseData, function () {
                          _self.$refs.refGroupTreeData.setCurrentRow(_self.formData);
                          _self.audit();
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
                  _self.audit();
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
       * @param formData 当前form数据
       */
      clickSave(formData) {
        const _self = this;
        this.$refs[formData].validate((valid) => {
          if (valid) {
            const changedArray = deepCloneByObject(_self.changedArray);
            if (changedArray && changedArray.length > 0) {
              addOrUpdateOrgInfos(changedArray).then((res) => {
                if (res.status == 200) {
                  if (!_self.$utils.isEmpty(res.data)) {
                    const responseData = res.data.slice(0);
                    _self.$refs['refGroupTreeData'].updateTableTreeData(responseData);
                    _self.$message({message: res.message, type: 'success'})
                    this.changedArray = [];
                    this.$refs.refGroupTreeData.setCurrentRow(this.formData);
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
      rowClick(row) {
        if (this.$utils.length(row) && !row.name) {
          this.$refs.refName.focus();
        } else {
          this.$refs.refName.blur();
        }
        if (this.$utils.length(row)) {
          this.formData = row;
          console.log("rowClick", row);
          //存放当前选中的对象，转换成字符串值
          this.oldJsonString = JSON.stringify(deepCloneByObject(this.formData));
          getSysConfigDistrictList({stateCode: row.stateCode}).then((res) => {
            if (!this.$utils.isEmpty(res.data)) {
              this.$refs.refGroupTreeData.deleteAllChildrens(row);
              for (const rowData of res.data) {
                this.$refs.refGroupTreeData.addChild(row, rowData);
              }
            }
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
  }
</script>
