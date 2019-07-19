<template>
  <div class="calendar-list-container">
    <div class="handler-container">
      <el-button type="primary" v-if="menuManager_btn_add" icon="el-icon-plus" size="small" plain @click="handlerRoot">
        新增根
      </el-button>
      <el-button type="primary" v-if="menuManager_btn_add" icon="el-icon-circle-plus-outline" size="small" plain
                 @click="handlerAdd">新增下级
      </el-button>
      <el-button type="primary" size="small" v-if="menuManager_btn_edit" icon="el-icon-if-edit" plain @click="handlerEdit">
        编辑
      </el-button>
      <el-button type="danger" size="small" v-if="menuManager_btn_del" icon="el-icon-delete" plain
                 @click="handleDelete">删除
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getList()" plain>刷新</el-button>
    </div>
    <basic-split-pane :default-percent='20' :min-percent='20'>
      <template slot="leftContainer">
        <div class="left-container">
          <el-input clearable placeholder="请输入关键字" v-model="filterText" size="small">
            <i class="el-icon-search el-input__icon"
               slot="suffix">
            </i>
          </el-input>
          <el-tree
            class="filter-tree"
            :data="treeData"
            node-key="id"
            highlight-current
            :props="defaultProps"
            :filter-node-method="filterNode"
            ref="menuTree"
            @node-click="getNodeData"
            :default-expand-all="false"
          >
          </el-tree>
        </div>
      </template>
      <template slot="rightContainer">
        <div class="right-container white">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="基本信息" name="1">
              <div class="handler-container" v-if="formStatus == 'update'">
                <el-button type="primary" size="small"  @click="update" icon="el-icon-if-save" plain>更新</el-button>
                <el-button type="danger" size="small"  @click="onCancel" icon="el-icon-delete" plain>取消</el-button>
              </div>
              <div class="handler-container" v-if="formStatus == 'create'">
                <el-button type="primary" size="small" @click="create" icon="el-icon-if-save" plain>保存</el-button>
                <el-button type="danger" size="small"  @click="onCancel" icon="el-icon-delete" plain>取消</el-button>
              </div>
              <el-form :label-position="labelPosition" label-width="120px" :model="form" ref="form"
                       class="form-container overflowHidden" :rules="rulesMenu" :show-message="false">
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="项目类型" prop="productId">
                      <el-select class="filter-item" v-model="form.productId" :disabled="formEdit"
                                 placeholder="请输入项目类型">
                        <el-option v-for="item in productInfoAll" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="编码" prop="code">
                      <el-input clearable size="small" v-model="form.code" :disabled="formEdit" placeholder="请输入编码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="标题" prop="title">
                      <el-input clearable size="small" v-model="form.title" :disabled="formEdit" placeholder="请输入标题"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="父级节点" prop="parentId">
                      <el-input clearable size="small" v-model="form.parentId" :disabled="true" placeholder="请输入父级节点"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="图标" prop="icon">
                      <el-input clearable size="small" v-model="form.icon" :disabled="formEdit" placeholder="请输入图标"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8" v-show="false">
                    <el-form-item label="前端组件" prop="attr1">
                      <el-input clearable size="small" v-model="form.attr1" :disabled="formEdit" placeholder="请输入前端组件"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否显示" prop="enabled" class="add-border" :class="{disabled:formEdit}">
                      <el-radio-group v-model="form.enabled" :disabled="formEdit">
                        <el-radio :label="String(row.code)"
                                  v-for="(row, key, index) in dataEnum.static.isOrNot" :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="8">
                    <el-form-item label="类型" prop="type">
                      <el-select size="small" class="filter-item" v-model="form.type" :disabled="formEdit" placeholder="请输入资源请求类型">
                        <el-option v-for="item in  typeOptions" :key="item" :label="item" :value="item"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="排序" prop="orderNum">
                      <el-input clearable size="small" v-model="form.orderNum" :disabled="formEdit" placeholder="请输入排序"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="描述" prop="description">
                      <el-input clearable size="small" v-model="form.description" :disabled="formEdit"
                                placeholder="请输入描述"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="10">
                  <el-col :span="16">
                    <el-form-item label="资源路径" prop="href">
                      <el-input clearable size="small" v-model="form.href" :disabled="formEdit" placeholder="请输入资源路径"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="是否可配审批流程" prop="ifCanOverflow" class="add-border" :class="{disabled:formEdit}">
                      <el-radio-group v-model="form.ifCanOverflow" :disabled="formEdit">
                        <el-radio :label="parseInt(row.code)"
                                  v-for="(row, key, index) in dataEnum.isOrNot" :key="row.code">
                          {{ row.name }}
                        </el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <!--<el-col :span="8">-->
                    <!--<el-form-item label="是否已配审批流程" prop="attr5" class="add-border" :class="{disabled:formEdit}">-->
                      <!--<el-radio-group v-model="form.attr5" :disabled="formEdit">-->
                        <!--<el-radio :label="parseInt(row.code)"-->
                                  <!--v-for="(row, key, index) in dataEnum.isOrNot" :key="row.code">-->
                          <!--{{ row.name }}-->
                        <!--</el-radio>-->
                      <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                  <!--</el-col>-->
                </el-row>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="按钮或资源" name="2">
              <menu-element :menuId='currentId' ref="refMenuElement"></menu-element>
            </el-collapse-item>
          </el-collapse>
        </div>
      </template>
    </basic-split-pane>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {
    fetchTree, getObj, addObj, delObj, putObj, getCrmProductInfoAll
  } from '@/api/sysManager/groupAuth/menu/index';
  import {mapState} from 'vuex';
  import splitPane from 'vue-splitpane'
  import {staticDataBasic} from "@/assets/data/basic";
  import BasicSplitPane from "../../../components/basic/basicSplitPane/index";
  export default {
    name: 'menu-manager',
    mixins: [computed, methods],
    components: {
      'menu-element': () => import('./components/element'),
      splitPane
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
        showElement: false,
        typeOptions: ['menu', 'dirt'],
        modelSearchFilter: {
          name: undefined
        },
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        },
        labelPosition: 'right',
        form: {
          code: undefined,
          title: undefined,
          parentId: undefined,
          href: undefined,
          icon: undefined,
          orderNum: undefined,
          description: undefined,
          path: undefined,
          enabled: undefined,
          type: undefined,
          attr1: undefined,
          productId: undefined
        },
        rulesMenu: {
          type: [
            {
              required: true,
              message: '编码',
              trigger: 'change'
            }
          ],
          code: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          title: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          icon: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          productId: [
            {
              required: true,
              trigger: 'change'
            }
          ],
          href: [
            {
              required: true,
              trigger: 'change'
            }
          ]
        },
        productInfoAll: [],
        currentId: -1,
        menuManager_btn_add: false,
        menuManager_btn_edit: false,
        menuManager_btn_del: false,
        heightSplitPane: 0,
      }
    },
    watch: {
      filterText(val) {
        this.$refs.menuTree.filter(val);
      }
    },
    created() {
      //初始化数据字典
      this.getEnumData([
        'GetIsOrNotData',
      ]);
      this.getCrmProductInfoAll();
      this.getList();
      this.menuManager_btn_add = this.elements['menuManager:btn_add'];
      this.menuManager_btn_del = this.elements['menuManager:btn_del'];
      this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
    },
    computed: {
      ...mapState({
        elements: state => state.user.login.elements
      })
    },
    methods: {
      getList() {
        fetchTree(this.modelSearchFilter).then(response => {
          this.treeData = response.data;
          this.handlerRoot();
          this.onCancel();
        });
      },
      getCrmProductInfoAll() {
        getCrmProductInfoAll().then(response => {
          this.productInfoAll = response.data;
        });
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getNodeData(data) {
        if (!this.formEdit) {
          this.formStatus = 'update';
        }
        getObj(data.id).then(response => {
          if (this.$utils.length(response.data)) {
            this.form = response.data;
          } else {
            this.form = {};
          }
        });
        this.currentId = data.id;
        this.showElement = true;
        this.$refs.refMenuElement.menuId = data.id;
        this.$refs.refMenuElement.getListElement();
      },
      handlerEdit() {
        if (this.form.id) {
          this.formEdit = false;
          this.formStatus = 'update';
        }
      },
      handlerRoot() {
        let _self = this;
        this.currentId = -1;
        let productId = this.form.productId;
        this.resetForm();
        _self.$refs.menuTree.setCurrentKey(null);
        this.formEdit = false;
        this.formStatus = 'create';
        if (productId) {
          this.form.productId = productId;
        }
        this.$refs.refMenuElement.list = [];
      },
      handlerAdd() {
        if (this.currentId == -1) {
          this.$message({
            message: "请先选择菜单！",
            type: 'warning'
          })
          return false;
        }
        let productId = this.form.productId;
        this.resetForm();
        this.formEdit = false;
        this.formStatus = 'create';
        if (productId) {
          this.form.productId = productId;
        }
        this.$refs.refMenuElement.list = [];
      },
      handleDelete() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delObj(this.currentId).then(() => {
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
      save(){
        if(this.formStatus == 'update'){
          this.update();
        }
        if(this.formStatus == 'create'){
          this.create();
        }
      },
      update() {
        this.$refs['form'].validate((valid) => {
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
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            return false
          }
        })
      },
      create() {
        this.$refs['form'].validate((valid) => {
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
            this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
            return false
          }
        })
      },
      onCancel() {
        this.formEdit = true;
        this.formStatus = '';
      },
      resetForm() {
        this.form = {
          code: undefined,
          title: undefined,
          parentId: this.currentId,
          href: undefined,
          icon: undefined,
          orderNum: undefined,
          description: undefined,
          path: undefined,
          ifCanOverflow: parseInt(this.dataEnum.static.isOrNot[1].code),
          enabled: parseInt(this.dataEnum.static.isOrNot[0].code),
          attr5: parseInt(this.dataEnum.static.isOrNot[1].code),
        };
      }
    }
  }
</script>
