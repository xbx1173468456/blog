<template>
  <div class="left-container">
    <basic-handler>
      <el-button v-if="AddBtnShowFlag" type="primary" size="small" icon="el-icon-plus" plain @click="clickMonthAdd">新增
      </el-button>

      <el-button v-if="saveBtnShowFlag" type="primary" size="small" icon="el-icon-if-save" plain @click="clickMonthSave">
        保存
      </el-button>

      <el-button v-if="deleteBtnShowFlag" type="danger" size="small" icon="el-icon-delete" plain
                 :disabled="deleteBtnDisabledFlag" @click="clickMonthDelete">删除
      </el-button>
      <el-button v-if="auditBtnShowFlag" deleteBtnDisabledFlag type="primary" size="small" icon="el-icon-if-auth" plain
                 :disabled="auditBtnDisabledFlag" @click="clickMonthAudit">审核
      </el-button>

      <el-button
        v-if="disabledBtnShowFlag"
        size="small" type="danger"
        icon="el-icon-circle-close-outline"
        plain
        :disabled="disabledBtnDisableFlag"
        @click="clickDisabledBtn"
      >禁用
      </el-button>
      <el-button
        size="small"
        v-if="enabledBtnShowFlag"
        type="success"
        icon="el-icon-circle-check-outline"
        plain
        :disabled="enabledBtnDisableFlag"
        @click="clickEnabledBtn"
      >启用
      </el-button>
      <el-button type="primary" size="small" icon="el-icon-refresh" @click="getMonthlist()" plain>刷新</el-button>
    </basic-handler>
    <basic-table ref="refMonthTable"
                 :dataTable="dataMonth" :columns="columns"
                 @current-change="currentChangeRow" :pagination="modelSearchFilterMonth" @pagination="getMonthlist">
      <template slot-scope="obj" slot="validateStatus">
        {{formatValidateStatus(obj.scope.row)}}
      </template>
      <template slot-scope="obj" slot="enable">
        {{formatEnable(obj.scope.row)}}
      </template>
      <template slot-scope="obj" slot="month">
        <el-form :model="dataMonth.data[obj.scope.$index]" :ref="'formMonth' + obj.scope.$index" :rules="rules"
                 :show-message="false">
          <el-form-item prop="month">
            <el-input size="small" :disabled="obj.scope.row.validateStatus == 1?true:false"
                      @change="changeRow(obj.scope.row)" type="number"
                      placeholder="请输入会计月份，1到2位数字" v-model="obj.scope.row.month"></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template slot-scope="obj" slot="reserve">
          <el-input clearable size="small" @change="changeRow(obj.scope.row)"
                    placeholder="请输入补充说明"
                    v-model="obj.scope.row.reserve"></el-input>
      </template>
    </basic-table>
  </div>
</template>

<script>
  import computed from "@/utils/mixins/computed";
  import methods from "@/utils/mixins/methods";
  import {arrayUniqueSameObj, deepCloneByObject} from "@/utils/index";
  import {validateLength,validateValue} from "@/utils/validate";
  import formatEnum from "@/utils/mixins/formatEnum";
  import {staticDataBasic} from "@/assets/data/basic";
  export default {
    name: "monthManager",
    mixins: [computed, methods, formatEnum],
    data() {
      return {
        AddBtnShowFlag: true,  //待系统菜单配置后更改
        saveBtnShowFlag: true,
        deleteBtnShowFlag: true,
        auditBtnShowFlag: true,
        disabledBtnShowFlag: true,
        enabledBtnShowFlag: true,
        dataMonth:{
          data:[],
          total:0
        },
        listIdMonth: 0,
        currentRow: null,//月份当前行
        monthChangedArray: [],//月份新增数组
        rules: {
          month: [
            {
              required: true,
              validator: (rule, value, callback) => {
                validateLength(rule, value, callback, true, ['会计月份', 1, 2]);
              },
              trigger: 'change'
            }
          ]
        },
        monthNum: '',
        modelSearchFilterMonth: {
          page: 1,
          limit: 10
        },
        columns: [
          {
            text: '审核状态',
            value: 'validateStatus',
            width: '80',
            align: "center"
          },
          {
            text: '启用状态',
            value: 'enable',
            width: '80',
            align: "center"
          },
          {
            text: '会计月份',
            value: 'month',
            minWidth: 100,
            align: "left",
            headerAlign: "center",
            className:'spacing-set'
          },
          {
            text: '补充说明',
            value: 'reserve',
            minWidth: 140,
            align: "left",
            headerAlign: "center",
            className:'spacing-set'
          }
        ]
      }
    },
    mounted() {
      //初始化数据字典
      this.getEnumData([
        'GetValidateStatusData',
        'GetEnabledData',
      ]);

      this.getMonthlist();
    },
    computed: {
      deleteBtnDisabledFlag: function () {
        if (this.currentRow && this.currentRow.enable == 1&&this.currentRow.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      auditBtnDisabledFlag: function () {
        if (this.currentRow && this.currentRow.validateStatus != '' && this.currentRow.validateStatus != 1) {
          return false
        } else {
          return true
        }
      },
      disabledBtnDisableFlag: function () {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 2
        }
        return true;
      },
      enabledBtnDisableFlag: function () {
        if (this.currentRow && this.currentRow.validateStatus === 1) {
          return this.currentRow.enable === 1
        }
        return true;
      },

    },
    methods: {
      //新增一行月份加入当前数组
      clickMonthAdd() {
        function addRowMonth() {
          let clickMonthAdd = {
            enable: 1,
            validateStatus: 2,
            listId: this.listIdMonth++
          };
          this.dataMonth.data.unshift(clickMonthAdd);
          this.monthChangedArray.unshift(clickMonthAdd);
          this.$refs.refMonthTable.setCurrentRow(this.dataMonth.data[0]);
        }
        if (this.modelSearchFilterMonth.page == 1) {
          addRowMonth.call(this);
        } else {
          this.getMonthlist(() => {
            this.modelSearchFilterMonth.page = 1;
            addRowMonth.call(this);
          })
        }
      },
      changeRow(row) {
        if(row) {
          this.$set(row, 'listId', this.listIdMonth++);
          this.monthChangedArray.push(row)
        }
      },
      //月份保存方法
      clickMonthSave() {
        return this.validateAfterMonth(() => {
          let changedArray = arrayUniqueSameObj(this.monthChangedArray);
          if (changedArray && changedArray.length > 0) {
            this.addMonthList(changedArray);
          }
          else {
            this.$message({message: staticDataBasic.info.updateEmpty, type: 'warning'})
          }
        });
      },
      /**
       * 保存或者审核之前验证
       */
      validateAfterMonth(callback) {
        let resultMonth = true
        this.dataMonth.data.some((item, idx) => {
          this.$refs['formMonth' + idx].validate(valid => {
            valid ? null : resultMonth = valid
          })
          return !resultMonth
        })
        if (resultMonth) {
          if (typeof callback === "function") {
            callback();
          }
        } else {
          this.$message({message: staticDataBasic.info.updateEmptyError, type: 'warning'})
          return false
        }
      },
      //月份批量新增或者修改
      addMonthList(arr) {
        this.$store.dispatch('AddAccountancyMonth', arr).then((response) => {
          if (response.status === 200) {
            this.getMonthlist();
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
        }).catch((error) => {
          console.log(error)
        })
      },
      //删除月份
      clickMonthDelete() {
        if (this.currentRow.validateStatus == 2) {
          this.$confirm(staticDataBasic.info.delete, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              if (this.currentRow.id) {
                this.$store.dispatch('DeleteAccountancyMonth', this.currentRow.id).then((response) => {
                  if (response.status === 200) {
                    this.getMonthlist();
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
                }).catch((error) => {
                  console.log(error)
                })
              } else {
                this.getMonthlist();
              }
            })
            .catch(action => {
            });
        } else {

        }

      },
      //月份获取当前行
      currentChangeRow(row) {
        if (row) {
          this.currentRow = row;
        }
      },
      //审核月份
      clickMonthAudit() {
        return this.validateAfterMonth(() => {
          let currentRow = this.currentRow;
          this.$confirm(staticDataBasic.info.audit, '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning'
          })
            .then(() => {
              let changedArray = arrayUniqueSameObj(this.monthChangedArray);
              if (changedArray && changedArray.length > 0) {
                this.$store.dispatch('AddAccountancyMonth', changedArray).then((res) => {
                  if (!this.$utils.isEmpty(res.data)) {
                    //获得当前行，进行审核
                    this.$utilsBasic.getCurrentRowByListId(res.data, this.currentRow, (currentRow)=>{
                      this.auditMonth(currentRow);
                      return true;
                    });
                  }
                }).catch((error) => {
                  console.log(error);
                })
              } else {
                this.auditMonth(currentRow)
              }
            }).catch((cancel) => {
            console.log(cancel);
          })
        });
      },
      auditMonth: function (currentRow) {
        return this.$store.dispatch('ConfigAccountancyMonth', currentRow)
          .then((response) => {
            if (response.status === 200) {
              this.getMonthlist();
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
      clickEnabledBtn() {
        this.$confirm(staticDataBasic.info.enable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableOrDisableMonth(1).then(() => {
            //this.getMonthlist()
          })
        }).catch((error) => {
          console.log(error)
        })
      },
      clickDisabledBtn() {
        this.$confirm(staticDataBasic.info.disEnable, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.enableOrDisableMonth(2).then(() => {
            //.this.getMonthlist()
          })
        }).catch((error) => {
          console.log(error)
        })
      },


      enableOrDisableMonth(enable) {
        let currentRowObj = deepCloneByObject(this.currentRow)
        currentRowObj.enable = enable;
        return this.$store.dispatch('EnableOrDisabledMonth', currentRowObj)
          .then((response) => {
            if (response.status === 200) {
              this.currentRow.enable = enable;
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
      //获取月份列表
      getMonthlist(callback) {
        //this.monthNum = this.dataMonth.data.indexOf(this.currentRow);
        this.$store.dispatch('GetAccountancyMonth', this.modelSearchFilterMonth).then((response) => {
          this.dataMonth.data = response.data.rows;
          this.dataMonth.total = response.data.total;
          this.$nextTick(function () {
            if (this.$refs.refMonthTable) {
              this.$refs.refMonthTable.setCurrentRow(this.dataMonth.data[0]);
            }
          });
          this.resetData();
          if (typeof callback === "function") {
            callback();
          };
        }).catch((error) => {
          console.log(error)
        })
      },
      //自动定位月份光标
      setMonth() {
        if (this.monthNum) {
          this.$refs.refMonthTable.setCurrentRow(this.dataMonth.data[this.monthNum]);
        }
      },
      //重置数据
      resetData() {
        this.monthChangedArray = [];
        this.currentRow =undefined;
      },
    }
  }
</script>
