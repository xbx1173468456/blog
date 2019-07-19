<template>
  <div class="groupMechanism-container-list">
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="left-container">
             <div class="handler-container">
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrg(1)" plain>新增类别</el-button>
                <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrg(2)" plain>新增角色</el-button>
                <el-button type="primary" size="small" icon="el-icon-check" @click="clickSave('formData')" plain>保存</el-button>
                <el-button type="primary" size="small" icon="el-icon-delete" plain>删除</el-button>
                <el-button type="primary" size="small" icon="el-icon-if-auth" plain>审核</el-button>
                <el-button type="primary" size="small" icon="el-icon-warning" plain>禁用</el-button>
                <el-button type="primary" size="small" icon="el-icon-circle-check" plain>启用</el-button>
             </div>
          <div class="grid-content bg-purple">
            <TreeGrid :data="dataRoles" :columns="columnsRoles" :expand-all="expandAll" @rowClick="rowClick"/>
          </div>
        </div>
        </el-col>
        <el-col :span="12">
          <div class="right-container grid-content bg-purple-light grid-right">
           <div class="handler-container">
                <el-button :disabled="isOrg" type="primary" size="small" icon="el-icon-plus" @click="addOrg(1)" plain>新增</el-button>
                <el-button type="primary" size="small" icon="el-icon-check" @click="clickSave('formData')" plain>保存</el-button>
                <el-button type="primary" size="small" icon="el-icon-delete" plain>删除</el-button>
                <el-button type="primary" size="small" icon="el-icon-if-auth" plain>审核</el-button>
                <el-button type="primary" size="small" icon="el-icon-warning" plain>禁用</el-button>
                <el-button type="primary" size="small" icon="el-icon-circle-check" plain>启用</el-button>
             </div>
          <div class="grid-content bg-purple">
            <TreeGrid :data="dataSource2" :columns="columns2" :expand-all="expandAll" @rowClick="rowClick"/>
          </div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
  import {
    fetchTree, getObj, addObj, delObj, putObj
  } from '@/api/sysManager/groupAuth/groupManager/index';
import { getNowFormatDate, jsonString } from '@/utils'
import TreeGrid from '@/components/TreeTable'

export default {
  name: 'Hello',
  components: {
    TreeGrid
  },
  data() {
    return {
      formData: {
        validateStatus: 2, // 审核状态
        enable: 1, // 当前状态
        code: '', // 编码
        name: '', // 名称
        alias: '', // 简称
        parentCode: '', // 上级编码
        parentId: '',
        level: '', // 树形级别
        ifLastLevel: '', // 是否末级
        type: '', // 属性类型
        orgPathName: '', // 组织路径
        duty: '', // 职责
        remark: '', // 说明
        crtName: '', // 登记人员
        crtTime: ''// 登记时间
      },
      expandAll: false,
      jsonString: jsonString,
      modelSearchFilter: {
        name: undefined
      },
      dataRoles: [],
      columnsRoles: [
        {
          text: '编码',
          value: 'code'
        },
        {
          text: '名称',
          value: 'title'
        },
        {
          text: '属性',
          value: 'type',
          width: '80'
        },
        {
          text: '审核状态',
          value: 'validateStatus',
          width: '100'
        },
        {
          text: '启用状态',
          value: 'enable',
          width: '100'
        }
      ],
      columns2: [
        {
          text: '菜单编码',
          value: 'code',
          width: '120'
        },
        {
          text: '菜单名称',
          value: 'name'
        },
        {
          text: 'url',
          value: 'type',
          width: '80'
        },
        {
          text: '产品编码',
          value: 'validateStatus',
          width: '100'
        },
        {
          text: '产品名称',
          value: 'enable',
          width: '100'
        }
      ],
      dataSource1: [],
      dataSource2: []
    }
  },
  mounted() {
    this.getRoleList();
    this.menuManager_btn_add = this.elements['menuManager:btn_add'];
    this.menuManager_btn_del = this.elements['menuManager:btn_del'];
    this.menuManager_btn_edit = this.elements['menuManager:btn_edit'];
  },
  computed: {
    isOrg() {
      if (this.formData.type != '' && this.formData.type == '1' && this.formData.type != '2' || this.formData.type == '') {
        return false
      } else {
        return true
      }
    },
    isOrg2() {
      if (this.formData.type != '' && this.formData.type == '1' && this.formData.type != '2' && this.formData.validateStatus != '2') {
        return false
      } else {
        return true
      }
    },
    disabledSave() {
      if (this.formData.type != '') {
        return false
      } else {
        return true
      }
    },
    disabledBranch() {
      if (this.formData.type != '' && this.formData.type != '3' && this.formData.validateStatus != '2') {
        return false
      } else {
        return true
      }
    },
    disabledJobs() {
      if (this.formData.type != '' && this.formData.type != '3' && this.formData.validateStatus != '2') {
        return false
      } else {
        return true
      }
    },
    disabledAudit() {
      if (this.formData.type != '' && this.formData.validateStatus == '2') {
        return false
      } else {
        return true
      }
    },
    disabledEnable() {
      if (this.formData.type != '' && this.formData.validateStatus == '1' && this.formData.enable == '1') {
        return this.$utilsBasic.parentDisable(this.formData);
      } else {
        return true
      }
    },
    disabledEnable2() {
      if (this.formData.type != '' && this.formData.validateStatus == '1' && this.formData.enable == '2') {
        return this.$utilsBasic.parentDisable(this.formData);
      } else {
        return true
      }
    }
  },
  created() {
   // this.getOrgInfos()
  },

  methods: {
    /**
     * 获得角色列表
     */
    getRoleList() {
      fetchTree(this.modelSearchFilter).then(data => {
        console.log(data);
        this.dataRoles = data;
      });
    },
    getOrgInfos() {
      var params = {
        page: 1,
        limit: 100
      }
      getOrgInfo(params).then((res) => {
        console.log(res.data.rows)
        this.dataSource = res.data.rows
      }).catch((err) => {
        console.log(err)
      })
    },
    // 新增
    addOrg(type, pid) {
      var validateStatus = this.formData.validateStatus
      var enable = this.formData.enable
      console.log(validateStatus, enable)

      if (enable == '2') {
        console.log('请先启用状态')
        this.$message({ message: '请先启用状态', type: 'warning' })
      } else {
        if (type == -1) {
          console.log('新增机构')
          this.sendForm(-1, pid)
        } else if (type == 1) {
          console.log('新增子机构')
          this.sendForm(1, pid)
        } else if (type == 2) {
          console.log('新增子部门')
          this.sendForm(2, pid)
        } else {
          console.log('新增岗位')
          this.sendForm(3, pid)
        }
      }
    },
    audit() {
      console.log('审核')
      const data = {
        'orgId': this.formData.id,
        'validateStatus': 1
      }
      audits(data).then((res) => {
        if (res.code == 200) {
          this.getOrgInfos()
          this.$message({ message: '审核成功', type: 'success' })
        } else {
          this.$message({ message: '审核失败', type: 'error' })
        }
      }).catch((err) => {
        this.$message({ message: '审核失败', type: 'error' })
      })
    },
    update() {
      console.log('修改')
    },
    del() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { orgId: this.formData.id }
        delOrg(data).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.getOrgInfos()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '删除失败!'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    disableSstus(status) {
      const text = status == 1 ? ' 亲，您是否确定启用当前数据，启用后数据即可使用！' : ' 亲，您是否确定禁用当前数据，禁用后数据不能使用！'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = { orgId: this.formData.id, enable: status }
        disableOrg(data).then((res) => {
          console.log(res)
          if (res.code == 200) {
            this.getOrgInfos()
            this.$message({
              type: 'success',
              message: text + '成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: text + '失败!'
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }).catch(() => {
      })
    },
    sendForm(type, pid) {
      var data = this.formData
      var crtTime = getNowFormatDate()
      console.log(type, pid, 'pid2')
      this.formData = {
        validateStatus: 2, // 审核状态
        enable: 1, // 当前状态
        code: '', // 编码
        name: '', // 名称
        alias: '', // 简称
        parentCode: data.code ? data.code : '00', // 上级编码
        parentId: data.id > 0 ? data.id : -1,
        level: data.level ? 1 + data.level : 1, // 树形级别
        ifLastLevel: 1, // 是否末级
        type: type, // 属性类型
        orgPathName: '/' + data.orgPathName, // 组织路径
        duty: '', // 职责
        id: '',
        remark: '', // 说明
        crtName: '13541866334', // 登记人员
        crtTime: crtTime// 登记时间
      }
      if (pid == '-1') {
        this.formData.parentId = -1
        this.formData.parentCode = '00'
        this.formData.level = 1
        this.formData.orgPathName = '/'
      }
    },
    save(formData) {
      console.log('保存')
    },
    rowClick(e) {
      const data = {
        validateStatus: e.validateStatus, // 审核状态
        enable: e.enable, // 当前状态
        code: e.code, // 编码
        name: e.name, // 名称
        alias: e.alias, // 简称
        parentCode: e.code ? e.code : '00', // 上级编码
        parentId: e.id,
        level: e.level, // 树形级别
        ifLastLevel: e.ifLastLevel, // 是否末级
        type: e.type, // 属性类型
        orgPathName: e.orgPathName, // 组织路径
        duty: e.duty, // 职责
        id: e.id,
        remark: e.remark, // 说明
        crtName: e.crtName, // 登记人员
        crtTime: e.crtTime// 登记时间
      }
      this.assignForm(data)
    },
    assignForm(e) {
      this.formData = e
    },
    formatters(type, v) {
      if (type == 'type') {
        switch (v) {
          case 1:
            return jsonString.type[0].name
            break
          case 2:
            return jsonString.type[1].name
            break
          default:
            return jsonString.type[2].name
            break
        }
      }
    }
  }
}
</script>

