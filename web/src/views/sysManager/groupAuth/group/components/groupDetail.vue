<template>
  <div class="groupDetail-container-list">
    <div class="handler-container">
      <el-button type="primary" v-if="groupManager_btn_add" icon="el-icon-plus" size="small" plain @click="handlerRoot">新增根
      </el-button>
      <el-button type="primary" v-if="groupManager_btn_add" icon="el-icon-circle-plus-outline" size="small" plain @click="handlerAdd">新增下级
      </el-button>
      <el-button type="primary" v-if="groupManager_btn_edit" icon="el-icon-if-edit" size="small" plain @click="handlerEdit">编辑
      </el-button>
      <el-button type="danger" v-if="groupManager_btn_del" icon="el-icon-delete" size="small" plain @click="handleDelete"
                 :disabled="disabledDelete">删除
      </el-button>
      <el-button v-if="groupManager_menu" type="primary" size="small" icon="el-icon-if-save-permissions" plain
                 @click="updateAuthorityDialog" :disabled="disabledDelete||disabledAuthority">保存权限</el-button>
      <!--<el-button type="primary" v-if="groupManager_btn_resourceManager" size="small" icon="el-icon-if-save-permissions" plain-->
                 <!--@click="handlerAuthority" :disabled="disabledAuthority">-->
        <!--权限分配-->
      <!--</el-button>-->
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getList()" plain>刷新</el-button>
      <!--<el-button type="primary" v-if="groupManager_btn_userManager" @click="handlerUser">-->
      <!--关联用户</el-button>-->
    </div>
    <basic-split-pane :default-percent='20' :min-percent='20'>
      <template slot="leftContainer">
       <div class="left-container">
    <el-input clearable placeholder="请输入关键字" v-model="filterText" size="small">
      <i class="el-icon-search el-input__icon"
         slot="suffix">
      </i>
    </el-input>
    <el-tree class="filter-tree" :data="treeData" node-key="id" highlight-current :props="defaultProps"
             :filter-node-method="filterNode" ref="groupTree" @node-click="getNodeData"
             :default-expand-all="false"></el-tree>
  </div>
      </template>
      <template slot="rightContainer">
        <div class="right-container white">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
               <el-form :label-position="labelPosition" label-width="80px" :model="form" ref="form" :rules="rulesGroup"
                        :show-message="false">
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
                <el-radio :label="row.code"
                          v-for="(row, key, index) in dataEnum.roleType"
                          :key="row.code" :disabled="formEdit">
                  {{ row.name }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="名称" prop="name" hide-required-asterisk>
              <el-input clearable size="small" ref="refName" v-model="form.name" :disabled="formEdit"
                        placeholder="请输入名称,最大长度50字符"></el-input>
            </el-form-item>
            <el-form-item label="编码" prop="code">
              <el-input clearable size="small" ref="refCode" v-model="form.code" :disabled="formEdit"
                        placeholder="请输入编码,最大长度50字符"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="description">
              <el-input clearable size="small" v-model="form.description" :disabled="formEdit" placeholder="请输入描述,最大长度200字符"></el-input>
            </el-form-item>
            <el-form-item v-if="formStatus == 'update'">
              <el-button type="primary" v-if="groupManager_btn_edit" @click="update" icon="el-icon-if-save" plain>更新
              </el-button>
              <el-button type="danger" @click="onCancel" icon="el-icon-delete" plain>取消</el-button>
            </el-form-item>
            <el-form-item v-if="formStatus == 'create'">
              <el-button type="primary" v-if="groupManager_btn_add" @click="create" icon="el-icon-if-save" plain>保存
              </el-button>
              <el-button type="danger" @click="onCancel" icon="el-icon-delete" plain>取消</el-button>
            </el-form-item>
          </el-form>
            </el-collapse-item>
            <el-collapse-item title="分配权限" name="2" v-if="!disabledAuthority">
              <group-authority :groupId="currentId" ref="groupAuthority"></group-authority>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </basic-split-pane>
    <basic-dialog v-el-drag-dialog :title="dialogUserName" :visible.sync="dialogUserVisible">
      <group-user :groupId="currentId" @closeUserDialog="closeUserDialog" ref="groupUser"></group-user>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :title="dialogAuthorityName" size="large" :visible.sync="dialogAuthorityVisible">

      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAuthorityDialog">取 消</el-button>

      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import {
    fetchTree,
    getObj,
    addObj,
    delObj,
    putObj,
    getRoleTree,
    deleteNoAuditRole
  } from '@/api/sysManager/groupAuth/group/index';
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {staticDataBasic} from "@/assets/data/basic"
  import {validateLength} from "@/utils/validate";
  export default {
    name: 'groupDetail',
    mixins: [computed, methods],
    components: {
      'group-user': () => import('./groupUser'),
      'group-authority': () => import('./groupAuthority')
    },
    props: {
      type: {
        default: '1'
      }
    },
    data() {
      return {
        activeNames: ['1','2'],
        filterText: '',
        list: null,
        total: null,
        formEdit: true,
        formAdd: true,
        formStatus: '',
        dialogUserVisible: false,
        dialogUserName: '关联用户',
        dialogAuthorityVisible: false,
        dialogAuthorityName: '权限分配',
        modelSearchFilter: {
          groupType: this.type,
          name: undefined
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        labelPosition: 'right',
        groupManager_btn_edit: false,
        groupManager_btn_del: false,
        groupManager_btn_add: false,
        groupManager_btn_userManager: false,
        groupManager_btn_resourceManager: false,
        form: {
          type: '1',
          code: undefined,
          name: undefined,
          description: undefined,
          groupType: this.type
        },
        rulesGroup: {
          name: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['名称', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          code: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['编码', 1, 50]);
              },
              trigger: 'change'
            }
          ],
          description: [
            {
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, false, ['描述', 1, 200]);
              },
              trigger: 'change'
            }
          ]
        },
        currentId: -1,
        groupManager_menu: false,
        disabledDelete: true,
        disabledAuthority: true
      }
    },
    watch: {
      filterText(val) {
        this.$refs.groupTree.filter(val);
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetRoleTypeData'
      ]);
      this.getList();
      this.groupManager_btn_edit = this.elements['groupManager:btn_edit'];
      this.groupManager_btn_del = this.elements['groupManager:btn_del'];
      this.groupManager_btn_add = this.elements['groupManager:btn_add'];
      this.groupManager_btn_userManager = this.elements['groupManager:btn_userManager'];
      this.groupManager_btn_resourceManager = this.elements['groupManager:btn_resourceManager'];
      this.groupManager_menu = this.elements['groupManager:menu'];//权限分配弹框
    },
    methods: {
      getList() {
        // fetchTree(this.modelSearchFilter).then(data => {
        //   this.treeData = data;
        // });
        getRoleTree().then(response => {
          this.treeData = response.data;
          this.onCancel();
          this.disabledAuthority = true;
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getNodeData(row) {
        if (!row.id) {
          return false;
        }
        if (!this.formEdit) {
          this.formStatus = 'update';
        }
        getObj(row.id).then(response => {
          this.form = response.data;
          this.$refs['form'].resetFields();
          this.currentId = row.id;
          if (row.groupType == staticDataBasic.groupType) {
            this.disabledDelete = true;
          } else {
            this.disabledDelete = false;
          }
          if (row.typeCode == this.dataEnum.roleType[0].code) {
            this.$refs.groupAuthority.selectData=[];
            this.disabledAuthority = true;
          } else {
            this.disabledAuthority = false;
            this.$nextTick(() => {
              if (this.$refs.groupAuthority) {
                this.$refs.groupAuthority.initAuthoritys();
              }
            });
          }
        });
      },
      handlerEdit() {
        if (this.form.id) {
          this.formEdit = false;
          this.formStatus = 'update';
        }
      },
      handlerRoot() {
        let _self = this;
        _self.formEdit = false;
        _self.formStatus = 'create';
        _self.treeData.push({});
        _self.currentId = -1;
        _self.resetForm();
        _self.$refs.groupTree.setCurrentKey(null);
        _self.$refs['form'].resetFields();
        _self.disabledDelete = true;
        _self.disabledAuthority = true;

        _self.$nextTick(() => {
          _self.setFocus();
          if(_self.$refs.groupAuthority){
            _self.$refs.groupAuthority.selectData=[];
          }
        });
      },
      handlerAdd() {
        let _self = this;
        if (this.currentId == -1) {
          this.$message({
            message: "请先选择角色！",
            type: 'warning'
          })
          return false;
        }
        if (this.form.type == this.dataEnum.roleType[1].code) {
          this.$message({
            message: "类型为角色，无法新增下级！",
            type: 'warning'
          })
          return false;
        }
        this.resetForm();
        this.formEdit = false;
        this.formStatus = 'create';
        this.$refs['form'].resetFields();
        this.disabledDelete = true;
        this.disabledAuthority = true;
        _self.$refs.groupAuthority.selectData=[];
        _self.$nextTick(() => {
          _self.setFocus();
        });
        //初始化角色类型默认值
        //this.form.type = this.form.type ? this.form.type : this.dataEnum.roleType[0].code;
      },
      handleDelete() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteNoAuditRole(this.currentId).then(() => {
            this.getList();
            this.resetForm();
            this.onCancel();
            this.$message({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            });
          });
        });
      },
      update() {
        this.$refs.form.validate(valid => {
          if (valid) {
            putObj(this.form.id, this.form).then(() => {
              this.getList();
              this.$message({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            this.$message({
              message: staticDataBasic.info.updateEmptyError,
              type: 'warning'
            });
            return this.setFocus();
          }
        })
      },
      setFocus() {
        if (!this.$refs.refName.value) {
          this.$refs.refName.focus();
          return false
        }
        if (!this.$refs.refCode.value) {
          this.$refs.refCode.focus();
          return false
        }
      },
      create() {
        this.$refs.form.validate(valid => {
          if (valid) {
            addObj(this.form).then(() => {
              this.getList();
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              });
            });
          } else {
            this.$message({
              message: staticDataBasic.info.updateEmptyError,
              type: 'warning'
            });
            if (!this.$refs.refName.value) {
              this.$refs.refName.focus();
              return false
            }
            if (!this.$refs.refCode.value) {
              this.$refs.refCode.focus();
              return false
            }
          }
        })
      },
      onCancel() {
        this.formEdit = true;
        this.formStatus = '';
        this.$refs['form'].resetFields();
      },
      resetForm() {
        this.form = {
          type: '1',
          parentId: this.currentId,
          code: undefined,
          name: undefined,
          description: undefined,
          groupType: this.type
        };
      },
      handlerUser() {
        this.dialogUserVisible = true;
        if (this.$refs.groupUser !== undefined) {
          this.$refs.groupUser.groupId = this.currentId;
          this.$refs.groupUser.initUsers();
        }
      },
      handlerAuthority() {
        this.dialogAuthorityVisible = true;
        if (this.$refs.groupAuthority !== undefined) {
          this.$refs.groupAuthority.groupId = this.currentId;
          this.$refs.groupAuthority.initAuthoritys();
        }
      },
      closeUserDialog() {
        this.dialogUserVisible = false;
      },
      closeAuthorityDialog() {
        console.log('dialogAuthorityVisible');
        this.dialogAuthorityVisible = false;
      },
      updateAuthorityDialog() {
        let getCheckedKeys=this.$refs.groupAuthority.$refs.menuTree.getCheckedKeys();
        if (!this.$utils.isEmpty(getCheckedKeys)) {
          this.$refs.groupAuthority.update();
        } else {
          this.$message({
            message: '亲，先分配权限！',
            type: 'warning'
          });
        }
      }
    }
  }
</script>
