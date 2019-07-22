<template>
  <div v-if="vIf">
    <el-dialog title="流转确认" :visible.sync="visible" width="75%" @close="handleClose">
      <el-row slot="title">
        <el-button icon="el-icon-arrow-left" type="text" @click="handleBack"></el-button>
        <span>流转确认</span>
      </el-row>
      <el-form class="form-container">
        <basic-form-item label="请选择后继节点" class="add-border" labelWidth="200px">
          <el-radio-group v-model="checkList">
            <el-radio :label="checkList"> {{checkList}}</el-radio>
          </el-radio-group>
        </basic-form-item>
        <basic-form-item :label='isEndEvent ? `请选择抄送人` : `请选择"${checkList}"的办理人`' labelWidth="200px"
          class="basic-form-box">
          <el-row>
            <el-tag closable class="el-tag-margin" size="mini" v-for="item in selected" :key="item.id"
              @close="handleUserClose(item.id)"> {{item.username}} </el-tag>
            <el-tag closable class="el-tag-margin" type="success" size="mini" v-for="item in selection" :key="item.id"
              @close="handleUnitClose(item.id)"> {{item.name}} </el-tag>
          </el-row>
          <el-row>
            <el-button @click="handleSelectUser" icon="el-icon-if-introduce" plain
              size="small" type="primary" class="add-btn">选择用户
            </el-button>
          </el-row>
          <!-- <el-input type="textarea"></el-input> -->
        </basic-form-item>
        <basic-form-item label="处理意见" labelWidth="200px">
          <basic-input type="textarea" v-model="handleText" :rows="10"></basic-input>
        </basic-form-item>
      </el-form>
      <el-row style="text-align: right;">
        <el-button icon="el-icon-circle-check" plain size="small" type="success" class="add-btn" @click="endHandle">办理完成
        </el-button>
      </el-row>
    </el-dialog>
    <basic-dialog v-el-drag-dialog :visible.sync="visibleSyncUserManager" title="人员-选择">
      <el-row slot="title">
        <el-button icon="el-icon-arrow-left" type="text" @click="handleBackProcess"></el-button>
        <span>选择人员</span>
      </el-row>
      <dialog-preson 
        @change="changepreson"
        @selectionChange="selectionChange"
        :checkbox="true"
        :filterLeft="isEndEvent ? null : filterLeft"
        :defaultSelectedLeft="selection"
        :defaultSelectedRight="selected"
        ref="dialogPreson"
        v-if="(visibleSyncUserManager && filterLeft.length > 0) || isEndEvent"
        :isShowChecked="!isEndEvent">
      </dialog-preson>
      <dialog-user-manager
        isShowChecked
        filterCheck
        :filterDatas="filterRight"
        :defaultSelectedRight="selected"
        @selectionChange="changepresons"
        v-else-if="visibleSyncUserManager && filterRight.length > 0"
      >
      </dialog-user-manager>
      <div class="dialog-footer" slot="footer">
        <el-button @click="visibleSyncUserManager = false">取 消</el-button>
        <el-button @click="handleChange" type="primary">确 定</el-button>
      </div>
    </basic-dialog>
  </div>
</template>

<script>
  import {
    getNextTask
  } from '@/api/eoaManager/taskCenterManager'
  import dialogPreson from '@/views/components/dialog/dialogPreson'
  import dialogUserManager from '@/views/components/dialog/dialogUserManager'
  export default {
    name: 'processPersonnelSelect',
    components: {
      dialogPreson,
      dialogUserManager
    },
    data() {
      return {
        visible: true,
        visibleSyncUserManager: false,
        checkList: null,
        filterLeft: [],
        filterRight: [],
        selected: [],
        selection: [],
        handleText: '',
        isEndEvent: null,
        isColseDialog: true
      }
    },
    watch: {
      filterRight: {
        handler() {
          this.selected = this.filterRight
        },
        deep: true
      },
      filterLeft: {
        handler() {
          this.selection = this.filterLeft
        },
        deep: true
      }
    },
    created() {
      this.getNextTask()
      // this.selection = this.filterLeft
    },
    methods: {
      getNextTask() {
        getNextTask({ processId: this.processId }).then(res => {
          this.checkList = res.data[0].taskName
          this.filterLeft = res.data[0].groupList
          this.filterRight = res.data[0].userList
          if(this.filterRight.length > 0) this.selected = this.filterRight
          this.isEndEvent = res.data[0].isEndEvent == 1 ? true : false
          this.$nextTick(() => {
            if (this.isEndEvent) {
              let username = this.formData.inputPerson.split('/')
              this.selected.push({
                id: this.formData.inputPersonId,
                username: username[username.length - 1]
              })
            }
          })
        })
      },
      changepreson(selection) {
        this.selected = selection
      },
      changepresons(selection) {
        this.selected = selection.selectedRows
      },
      handleChange() {
        this.visible = true
        this.visibleSyncUserManager = false
      },
      endHandle() {
        if (this.isEndEvent) {
          if(!this.selected.map(item => item.id).includes(this.formData.inputPersonId)) {
            this.selected = this.selected.concat({
              id: this.formData.inputPersonId
            })
          }
          this.success({
            sendUserId: this.selected.map(item => item.id).join(','),
            handleText: this.handleText
          })
        } else {
          if (this.selected.length == 0 && this.selection.length == 0) {
            return this.$message.warning('请选择处理人或岗位！')
          }
          this.success({
            nextCandidateId: this.selected.map(item => item.id).join(','),
            nextGroupId: this.selection.map(item => item.id).join(','),
            handleText: this.handleText
          })
        }
        this.vIf = false
      },
      selectionChange(selection) {
        this.selection = selection
      },
      handleBack() {
        this.error()
        this.vIf = false
      },
      handleBackProcess() {
        this.visibleSyncUserManager = false
        this.visible = true
      },
      handleUserClose(id) {
        this.selected = this.selected.filter(item => item.id != id)
      },
      handleSelectUser() {
        this.isColseDialog = false
        this.visibleSyncUserManager = true
        this.visible = false
      },
      handleUnitClose(id) {
        let arr = []
        this.selection = this.selection.filter(item => item.id != id)
      },
      handleClose() {
        if(this.isColseDialog) {
          this.$el.parentElement.removeChild(this.$el)
        } else {
          this.isColseDialog = true
        }
      }
    }
  }
</script>

<style scope>
  .basic-form-box .el-form-item__content {
    border: 1px solid #dcdfe6;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .add-btn {
    margin-bottom: 0 !important;
    margin-top: 20px !important;
  }

  .el-tag-margin {
    margin-right: 5px
  }
</style>
