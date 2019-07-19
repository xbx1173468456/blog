<template>
  <div class="workDetail-container-list">
    <basic-handler>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClick()" plain>新增</el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-save" @click="save('ruleForm')" plain>
        保存
      </el-button>
      <el-button :disabled="isAudit2" type="danger" size="small" icon="el-icon-delete" @click="del()" plain>删除
      </el-button>
      <el-button :disabled="isAudit" type="primary" size="small" icon="el-icon-if-auth" @click="audit" plain>审核
      </el-button>
      <!-- <el-button type="primary" size="small" icon="el-icon-refresh" @click="getDetail()" plain>刷新</el-button> -->
    </basic-handler>
    <div class="logForm">
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-form :model="ruleForm.bpmaMaterialRequireMaster" :rules="rules" ref="ruleForm" label-width="120px"
            class="demo-ruleForm form-container">
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="审核状态" prop="validateStatus">
                  <el-input clearable size="small"
                    v-model="ruleForm.bpmaMaterialRequireMaster.validateStatus ==1?'已审核':'未审核'" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据编码" prop="code">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialRequireMaster.code" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="单据名称" prop="name">
                  <el-input clearable size="small" v-model="ruleForm.bpmaMaterialRequireMaster.name" disabled
                    maxlength="100"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="8">
                <basic-form-item label="项目名称" prop="proName">
                  <el-input :disabled="isAudit" readOnly placeholder="请选择项目名称"
                    v-model="ruleForm.bpmaMaterialRequireMaster.proName" size="small">
                    <el-button @click="toipClick('project')" class="el-button-append" icon="el-icon-plus" size="mini"
                      :disabled="isAudit" slot="append"></el-button>
                  </el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="需求人员" prop="handlePerson">
                  <el-input placeholder="编制人员" v-model="ruleForm.bpmaMaterialRequireMaster.person" :disabled="isAudit"
                    maxlength="100" clearable size="small"></el-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="提出日期" prop="date" class="showTime">
                  <el-date-picker size="small" :disabled="isAudit" v-model="ruleForm.bpmaMaterialRequireMaster.date"
                    type="date" value-format="timestamp" placeholder="选择日期"></el-date-picker>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="文档附件" class="add-border file">
                  <basic-upload ref="refBasicUpload" :formId="ruleForm.bpmaMaterialRequireMaster.id"
                    :disabled="isAudit">
                  </basic-upload>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="24">
                <basic-form-item label="用料说明" prop="requireExplain">
                  <el-input type="textarea" :disabled="isAudit" maxlength="200" clearable
                    :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入预算说明"
                    v-model="ruleForm.bpmaMaterialRequireMaster.requireExplain" size="small"></el-input>
                </basic-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="16">
                <basic-form-item label="登记人员">
                  <basic-input disabled placeholder="自动生成登记人员" v-model="ruleForm.bpmaMaterialRequireMaster.inputPerson"></basic-input>
                </basic-form-item>
              </el-col>
              <el-col :span="8">
                <basic-form-item label="登记时间">
                  <basic-input disabled placeholder="自动生成登记时间" v-model="ruleForm.bpmaMaterialRequireMaster.inputTime"></basic-input>
                </basic-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <el-row class="content-container">
      <basic-handler>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="toipClick('materialDictionary')"
          :disabled="isAudit" plain>引入物资</el-button>
        <el-button type="danger" size="small" icon="el-icon-delete" @click="delGoods" plain
          :disabled="!isAudit && Object.keys(selectArray).length?false:true">删除</el-button>
        <!-- <template slot="search">
          <basic-search ref="refBasicSearch" :modelSearchFilter="modelSearchFilter"
            @clickSearchFilter="clickSearchFilter"></basic-search>
        </template> -->
      </basic-handler>
      <basic-table ref="refMaterialRequireTable" :dataTable="showItemsData" :columns="columns"
        @current-change="handleSelectionChange" :isPagination="false" :pagination="modelSearchFilter" :height="320">
        <template slot-scope="obj" slot="sum">
          <basic-input clearable size="small"  :format="formatToThousandsFour"
            :formatValue="formatToMoneyFour" v-model="obj.scope.row.sum" placeholder="请输入数量" :min="0.0000"
            :disabled="isAudit" @change="sumChange(obj.scope.row)" price></basic-input>
        </template>
        <template slot-scope="obj" slot="useDate">
          <el-date-picker v-model="obj.scope.row.useDate" type="date" size="small" placeholder="选择日期"
            :disabled="isAudit"></el-date-picker>
        </template>
        <template slot-scope="obj" slot="postion">
          <basic-input clearable size="small"  v-model="obj.scope.row.postion" placeholder="请输入用料部位"
            :disabled="isAudit"></basic-input>
        </template>
        <template slot-scope="obj" slot="summary">
          <basic-input clearable size="small"  v-model="obj.scope.row.summary" placeholder="请输入需求说明"
            :disabled="isAudit"></basic-input>
        </template>
      </basic-table>
    </el-row>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncProject" title="项目名称-选择">
      <dialog-project @selectionChange="selectionChange" filterValid v-if="visibleSyncProject"></dialog-project>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncProject = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncMaterialDictionary" title="引入物资-选择">
      <dialog-material-dictionary @selectionChange="selectionChangeCheck" filterValid isShowChecked
        :materialDictionaryData="ruleForm.bpmaMaterialRequireDetails" v-if="visibleSyncMaterialDictionary">
      </dialog-material-dictionary>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncMaterialDictionary = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
    <!-- <addItem
      ref="refMaterialContract"
      @getCheckTree="getCheckTree"
      @getItem="getItem"
      v-show="dialogTableVisible"
      @currentPage="currentPage"
    ></addItem> -->
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import formatEnum from "@/utils/mixins/formatEnum";
  import formatBasic from "@/utils/mixins/formatBasic";
  import { getEnumData, getNowFormatDate, strToTime } from "@/utils";
  import {
    add,
    getBudgetDetail,
    auditTrack,
    deleteTrack,
    delDetail
  } from "@/api/bpmaManager/goods/purchase/materialRequire/index.js";
  import addItem from "./addItem.vue";
  import { getDictionaryDataByTypeFilter } from "@/api/common/dataDictionary.js";
  import columns from "./columns.json";
  import { columnsData } from "./index.js";
  import { selectListOwn } from "@/api/bpmaManager/early/itemInfo/itemRegister/index.js";
  import { getMaterial, getDiction } from "@/api/sysManager/material/dictionary";
  import dialogProject from '@/views/components/dialog/dialogProject'
  import dialogMaterialDictionary from '@/views/components/dialog/dialogMaterialDictionary'
  export default {
    name: "goodsBudgetDetail",
    mixins: [computed, methods, formatEnum, formatBasic],
    data() {
      var checkProName = (rule, value, callback) => {
        if (value === "") {
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          bpmaMaterialRequireMaster: {
            id: "",
            validateStatus: 2, //审核状态
            name: "用料需求单", //单据名称
            proName: "", //项目名称
            proId: "", //项目id
            person: this.$store.state.user.login.username,
            date: new Date().getTime() //日期
          },
          bpmaMaterialRequireDetails: []
        },
        activeNames: ["1"],
        h: 500,
        columns,
        fuzzy: "",
        visibleSyncProject: false,
        visibleSyncMaterialDictionary: false,
        proObj: {},
        dictionary: {},
        selectArray: {},
        borderRed: false,
        itemId: "",
        rules: {
          proName: [
            {
              required: true,
              message: " ",
              trigger: "change"
            }
          ],
          name: [
            {
              required: true,
              message: " ",
              trigger: "blur"
            }
          ]
        },
        trackType: [],
        selectedRow: {},
        page: {
          total: 0,
          pageSize: 10,
          currentPage: 1
        },
        itemsData: {
          data: [],
          total: 0
        },
        modelSearchFilter: {
          page: 1,
          limit: 10,
          fuzzy: "",
          fuzzyKeys: ""
        }
      };
    },
    watch: {
      itemsData: {
        handler(val) {
          this.ruleForm.bpmaMaterialRequireDetails = val.data
        },
        deep: true
      }
    },
    methods: {
      /**
       * 关键字搜索
       */
      clickSearchFilter() {
        this.$refs.refBasicSearch.searchFilter(
          this.$refs.refMaterialRequireTable,
          this.modelSearchFilter,
          () => {
            // this.getDetail();
          }
        );
      },
      sumChange(sum, ) {
        console.log(sum)
      },
      priceChange(unitPrice) {
        this.currentRow.totalPrice = unitPrice * this.currentRow.sum;
      },
      toipClick(type) {
        if (this.isAudit) return
        this.type = type
        this['visibleSync' + type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = true
      },
      selectionChange(row) {
        this.selectedRow = row.selectedRow
      },
      selectionChangeCheck(row) {
        this.selectedRow = row.selectedRows
      },
      delGoods() {
        this.$confirm('亲，您是否确定删除当前数据，删除后数据不能恢复！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          if (this.selectArray.id) {
            return this.itemsData.data = this.itemsData.data.map(item => {
              if(item == this.selectArray) {
                this.$set(item, 'persistStatus', 'fdel')
              }
              return item
            })
          } else {
            this.itemsData.data = this.itemsData.data.filter(item => item != this.selectArray)
          }

          // let obj = this.selectArray
          // let allGoods = this.itemsData.data
          // if (obj.id) {
          //   delDetail(obj.id).then(res => {
          //     if (res.status == 200) {
          //       this.$message.success(res.message)
          //       let newGoods = allGoods.filter(item => {
          //         return item !== obj
          //       })
          //       this.itemsData.data = newGoods
          //       this.ruleForm.bpmaMaterialApplyDetails = newGoods
          //     }
          //   })
          // } else {
          //   let newGoods = allGoods.filter(item => {
          //     return item !== obj
          //   })
          //   this.ruleForm.bpmaMaterialRequireDetails = newGoods
          //   this.itemsData.data = newGoods
          // }
        }).catch(error => {
          console.log(error)
        })
      },
      query() { },
      formatToMoney(value, num) {
        return Number(value).toFixed(num);
      },
      toFixd(num) {
        this.ruleForm.bpmaMaterialRequireMaster.budgetPrice = this.formatToMoney(
          num,
          2
        );
      },
      //查看详情
      getDetail() {
        getBudgetDetail(this.itemId)
          .then(res => {
            if (!res.data.bpmaMaterialRequireMaster) return
            this.ruleForm = res.data;
            this.ruleForm.bpmaMaterialRequireMaster.date = strToTime(
              res.data.bpmaMaterialRequireMaster.date
            );
            this.proObj = {
              code: res.data.bpmaMaterialRequireMaster.proCode,
              id: res.data.bpmaMaterialRequireMaster.proId,
              name: res.data.bpmaMaterialRequireMaster.proName
            };
            this.itemsData = {
              data: res.data.bpmaMaterialRequireDetails,
              total: res.data.bpmaMaterialRequireDetails.length
            };
            this.$store.dispatch("setSelectP", res.data.bpmaMaterialRequireDetails);
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      handleChange() {
        let row = this.selectedRow
        // if(!this.isSelectedRows(row)) return false;
        if (Object.keys(row).length === 0) return this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
        switch (this.type) {
          case 'project':
            this.$set(this.ruleForm.bpmaMaterialRequireMaster, 'proName', row.name)
            this.$set(this.ruleForm.bpmaMaterialRequireMaster, 'proId', row.id)
            this.$set(this.ruleForm.bpmaMaterialRequireMaster, 'proCode', row.code)
            break
          case 'materialDictionary':
            let priceObj = {
              unitPrice: 0,
              sum: 0,
              totalPrice: 0,
              transportMode: '',
              summary: ''
            };
            row = row.map(item => {
              if (!item.masterId) {
                item.materialId = item.id
                item.id = "";
                item.masterId = "";
                item = Object.assign(item, priceObj);
              }
              item = Object.assign({}, item);
              return item
            })
            this.itemsData.data = this.itemsData.data.concat(row)
            this.selectedRow = []
            break
        }
        this.isUpdate = false
        this['visibleSync' + this.type.replace(/(^[\w\W])/, (res) => res.toLocaleUpperCase())] = false
      },
      returnFloat(value) {
        var value = Math.round(parseFloat(value) * 100) / 100;
        var xsd = value.toString().split(".");
        if (xsd.length == 1) {
          value = value.toString() + ".00";
          return value;
        }
        if (xsd.length > 1) {
          if (xsd[1].length < 2) {
            value = value.toString() + "0";
          }
          return value;
        }
      },
      //獲取字典
      getDiction() {
        //階段
        getDictionaryDataByTypeFilter("BPMA_PRO_WAY")
          .then(res => {
            if (res.status == 200) {
              this.trackType = res.data;
            }
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      //新增
      addClick() {
        this.itemId = "";
        this.$store.dispatch("setTrackId", "");
        this.$store.dispatch("setSelectP", []);
        this.selectArray = {}
        this.itemsData = {
          data: [],
          total: 0
        };
        this.ruleForm = {
          bpmaMaterialRequireMaster: {
            id: "",
            validateStatus: 2,
            name: "用料预算单",
            proCode: this.proObj.code,
            proId: this.proObj.id,
            proName: this.proObj.name,
            person: this.$store.state.user.login.username,
            date: new Date().getTime()
          },
          bpmaMaterialRequireDetails: []

        };

      },
      //保存
      save(formName, lock) {
        return new Promise((reslove, reject) => {
          this.$refs[formName].validate(valid => {
            if (valid) {
              // this.ruleForm.bpmaMaterialRequireMaster.proCode = this.proObj.code;
              // this.ruleForm.bpmaMaterialRequireMaster.proId = this.proObj.id;
              // this.ruleForm.bpmaMaterialRequireMaster.proName = this.proObj.name;
              if (!this.ruleForm.bpmaMaterialRequireMaster.proName) {

                return;
              }
              add(this.ruleForm)
                .then(res => {
                  if (res.status == 200) {
                    if(!lock) this.$message.success(res.message);
                    this.itemId = res.data.bpmaMaterialRequireMaster.id;
                    this.ruleForm.bpmaMaterialRequireMaster =
                      res.data.bpmaMaterialRequireMaster
                    this.ruleForm.bpmaMaterialRequireMaster.date = strToTime(
                      res.data.bpmaMaterialRequireMaster.date
                    );
                    this.itemsData.data = res.data.bpmaMaterialRequireDetails
                    this.$store.dispatch(
                      "setTrackId",
                      res.data.bpmaMaterialRequireMaster.id
                    );
                    this.$store.dispatch("setSelectP", []);
                    if (!this.$refs.refBasicUpload.submitUpload(this.ruleForm.bpmaMaterialRequireMaster.id)) return false;
                    reslove()
                  }
                })
                .catch(err => {
                  this.$message.warning(err.message);
                });
              // }
            } else {
              return false;
            }
          });
        })
      },
      //审核
      audit() {
        this.$confirm("亲，您是否确定审核当前数据，审核后数据不能修改！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            await this.save('ruleForm', true)
            let data = this.ruleForm.bpmaMaterialRequireMaster;
            auditTrack(this.ruleForm)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  // this.getDetail();
                  this.itemId = res.data.bpmaMaterialRequireMaster.id;
                  this.ruleForm.bpmaMaterialRequireMaster =
                    res.data.bpmaMaterialRequireMaster
                  this.ruleForm.bpmaMaterialRequireMaster.date = strToTime(
                    res.data.bpmaMaterialRequireMaster.date
                  );
                  this.itemsData.data = res.data.bpmaMaterialRequireDetails
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          })
          .catch(err => {
            this.$message.warning(err.message);
          });
      },
      //删除
      del() {
        this.$confirm("亲，您是否确定删除当前数据，删除后数据不能恢复！", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            let id = this.itemId;
            deleteTrack(id)
              .then(res => {
                if (res.status == 200) {
                  this.$message.success(res.message);
                  this.addClick();
                }
              })
              .catch(err => {
                this.$message.warning(err.message);
              });
          })
          .catch(() => { });
      },
      clickByDialogAddData(type) {
        this.type = type;
        this.dialogTableVisible = true;
        setTimeout(() => {
          if (type == "goodsItem") {
            if (Object.keys(this.proObj).length == 0) {
              this.$message.warning('请先选择项目')
              return
            }
            this.$refs.refMaterialContract.openDialog();
            this.getContract(1, 1, 10);
            this.$refs.refMaterialContract.title = "引入物资-选择";
            this.$refs.refMaterialContract.type = 1;
            this.$refs.refMaterialContract.treeColumns = columnsData.materialTypeColumns;
            this.$refs.refMaterialContract.columns = columnsData.materialColumns;
          } else if (type == "proName") {
            this.$refs.refMaterialContract.openDialog();
            this.getContract(2, 1, 10);
            this.$refs.refMaterialContract.title = "项目列表";
            this.$refs.refMaterialContract.type = 2;
            this.$refs.refMaterialContract.columns = columnsData.itemColumns;
          }
        }, 300);
      },
      getContract(num, page, limit, fuzzy) {
        if (
          !this.ruleForm.bpmaMaterialRequireMaster.proId &&
          num != 2 &&
          num != 1
        ) {
          this.$message.warning("请先选择项目");

          return false;
        } else {
          if (num == 1) {
            this.getMaterialType(num, page, limit);
          } else if (num == 2) {
            selectListOwn(this.materialRequirePage)
              .then(res => {
                if (res.status == 200) {
                  if (res.data.rows) {
                    this.$refs.refMaterialContract.tableData = res.data.rows;
                    this.$refs.refMaterialContract.page.total = res.data.total;
                  } else {
                    this.$refs.refMaterialContract.tableData = res.data;
                    this.$refs.refMaterialContract.page.total = res.data.length;
                  }
                }
              })
              .catch(err => {
                this.$message.warning(err.$message);
              });
          }

          return true;
        }
      },
      //获取字典类别
      getMaterialType(num, page, limit) {
        var params = {
          validateStatus: 1,
          enable: 1
        };
        getMaterial(params)
          .then(res => {
            if (!this.$utils.isEmpty(res.data)) {
              this.$refs.refMaterialContract.treeTableData = res.data;
              this.$refs.refMaterialContract.pagination.page = page;
              this.$refs.refMaterialContract.pagination.limit = limit;
              this.$nextTick(function () {
                this.$refs.refMaterialContract.checkTreeOne(res.data[0]);
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      },
      changeOpera(v) {
        if (v == 2) {
          this.ruleForm.bpmaMaterialRequireMaster.changeType = "";
          this.ruleForm.bpmaMaterialRequireMaster.formId = "";
          this.ruleForm.bpmaMaterialRequireMaster.formCode = "";
        }
      },
      changeType(v) {
        this.ruleForm.bpmaMaterialRequireMaster.formId = "";
        this.ruleForm.bpmaMaterialRequireMaster.formCode = "";
      },
      getCheckTree(v, pagination) {
        if (v) {
          this.selectDiction(v.code, pagination.page, pagination.limit);
        }
      },
      //查询字典列表
      selectDiction(typeCode, page, limit) {
        let data = {
          typeCode: typeCode,
          limit: limit,
          page: page,
          validateStatus: 1
        };
        getDiction(data)
          .then(res => {
            this.$refs.refMaterialContract.tableData = res.data.rows;
            this.$refs.refMaterialContract.page.total = res.data.total;
            leTable.setCurrentRow(this.tableData.data[0]);
          })
          .catch(err => {
            console.log(err);
          });
      },
      getItem(v) {
        if (v[1] == 1) {
          let priceObj = {
            unitPrice: 0,
            sum: 0,
            totalPrice: 0,
            transportMode: '',
            summary: ''
          };
          var newArr = [];
          v[0].forEach(item => {
            if (!item.masterId) {
              item.id = "";
              item.masterId = "";
              item = Object.assign(item, priceObj);
            }
            item = Object.assign({}, item);
            newArr.push(item);
          });
          this.itemsData = {
            data: newArr,
            total: newArr.length
          };
          // this.ruleForm.bpmaMaterialRequireDetails = result;
          // this.itemsData.data = result;
        } else if (v[1] == 2) {
          this.ruleForm.bpmaMaterialRequireMaster.proName = v[0].name;
          this.ruleForm.bpmaMaterialRequireMaster.proCode = v[0].code;
          this.ruleForm.bpmaMaterialRequireMaster.proId = v[0].id;
          this.proObj = v[0];
        }


      },
      handleSelectionChange(obj) {
        if (obj && typeof (obj) == 'object') {
          this.selectArray = obj;
        } else {
          this.selectArray = {};
        }
      },
      currentPage(pages, n) {
        this.getContract(n, pages.page, pages.limit);
      }
    },
    computed: {
      isAudit() {
        if (this.ruleForm.bpmaMaterialRequireMaster.validateStatus == 1) {
          return true;
        } else {
          return false;
        }
      },
      isAudit2() {
        if (
          this.itemId != "" &&
          this.ruleForm.bpmaMaterialRequireMaster.validateStatus != 1
        ) {
          return false;
        } else {
          return true;
        }
      },
      showItemsData() {
        return {
          data: this.itemsData.data.filter(item => item.persistStatus != 'fdel'),
          total: this.itemsData.data.filter(item => item.persistStatus != 'fdel').length
        }
      }
    },
    components: {
      dialogProject,
      dialogMaterialDictionary
    },
    created() {
      this.$store.dispatch("cacheId", '0')
      this.getDiction()
      getEnumData(this, ['GetAuditStatusEnum', 'GetIsOrNotData'])
    },
    activated() {
      this.dictionary = this.$store.state.common.dataEnum;
      if (this.$route.params.id) {
        this.$store.dispatch("setTrackId", this.$route.params.id);
        this.itemId = this.$route.params.id;
      } else {
        this.itemId = this.$store.getters.getTrackId;
      }
      if (this.$route.params.proObj) {
        this.proObj = this.$route.params.proObj;
        this.ruleForm.bpmaMaterialRequireMaster.proName = this.$route.params.proObj.name;
        this.ruleForm.bpmaMaterialRequireMaster.proId = this.$route.params.proObj.id;
      }
      this.$utilsBasic.loadAddAndDetailData(this, () => {
        this.addClick()
      }, async id => {
        if (this.itemId) {
          this.getDetail();
        }
      })
      this.$store.dispatch("cacheId", undefined);
    },
  };
</script>

<style scoped>

</style>
