<template>
  <div class="tab-container">
    <el-tabs>
      <el-row class="tb_wrap">
        <el-col :span="12" class="left_tree">
          <div class="grid-content bg-purple-light">
            <div class="tb-content">
              <div class="btn-warp">
                <el-button :disabled="isOrg" type="success" size="small" icon="plus" @click="addOrg(1)">新增类别</el-button>
                <el-button :disabled="isBranch" type="success" size="small" icon="plus" @click="addOrg(2)">新增角色</el-button>
                <el-button type="success" size="small" icon="check" @click="save('formData')">保存</el-button>
                <el-button type="danger" size="small" icon="delete">删除</el-button>
                <el-button type="primary" size="small" icon="date">审核</el-button>
                <el-button type="warning" size="small" icon="warning">禁用</el-button>
                <el-button type="success" size="small" icon="circle-check">启用</el-button>
              </div>
              <div class="grid-content bg-purple">
                <TreeGrid :data="dataSource" :columns="columns" :expand-all="expandAll" @rowClick="rowClick"/>
              </div>

            </div>
          </div>
        </el-col>
        <el-col :span="12" class="left_tree">
          <div class="grid-content bg-purple-light">
            <div class="tb-content">
              <div class="btn-warp">
                <el-button :disabled="isOrg" type="success" size="small" icon="plus" @click="addOrg(1)">新增</el-button>
                <el-button type="success" size="small" icon="check" @click="save('formData')">保存</el-button>
                <el-button type="danger" size="small" icon="delete">删除</el-button>
                <el-button type="primary" size="small" icon="date">审核</el-button>
                <el-button type="warning" size="small" icon="warning">禁用</el-button>
                <el-button type="success" size="small" icon="circle-check">启用</el-button>
              </div>
              <div class="grid-content bg-purple">
                <TreeGrid :data="dataSource" :columns="columns" :expand-all="expandAll" @rowClick="rowClick"/>
              </div>

            </div>
          </div>
        </el-col>

      </el-row>

    </el-tabs>
  </div>
</template>

<script>
import { getOrgInfo, addOrgInfo } from '@/api/sysManager/groupAuth/groupMechanism'
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
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符' }
        ]
      },
      defaultExpandAll: false,
      jsonString: jsonString,
      columns: [
        {
          text: '编码',
          value: 'code'
        },
        {
          text: '名称',
          value: 'name'
        },
        {
          text: '属性',
          value: 'type',
          width: '70'
        },
        {
          text: '审核状态',
          value: 'validateStatus',
          width: '95'
        },
        {
          text: '启用状态',
          value: 'enable',
          width: '95'
        }
      ],
      dataSource: []
    }
  },
  computed: {
    isOrg() {
      if (this.formData.type != '' && this.formData.type == '1' && this.formData.type != '2') {
        return false
      } else {
        return true
      }
    },
    isBranch() {
      if (this.formData.type != '' && this.formData.type != '3') {
        return false
      } else {
        return true
      }
    },
    isJobs() {
      if (this.formData.type != '' && this.formData.type != '3') {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    var userId = 1
    this.getOrgInfo(userId)
  },

  methods: {
    getOrgInfo(id) {
      getOrgInfo(id).then((res) => {
        console.log(res.data)
        // this.dataSource=parseJson(res.data,'validateStatus','enable','ifLastLevel')
        // this.dataSource=filters(res.data,'type','validateStatus','enable','ifLastLevel')
        this.dataSource = res.data
        // var a=filters(res.data,'type','validateStatus','enable')
        console.log(this.dataSource)
      }).catch((err) => {
        var formData2 = {

        }
      })
    },
    // 新增
    addOrg(type) {
      var validateStatus = this.formData.validateStatus
      var enable = this.formData.enable
      console.log(validateStatus, enable)
      if (validateStatus == '2') {
        console.log('请先审核')
      } else if (enable == '2') {
        console.log('请先启用状态')
      } else {
        if (type == 1) {
          console.log('新增机构')
          this.sendForm('1')
        } else if (type == 2) {
          console.log('新增部门')
          this.sendForm('2')
        } else {
          console.log('新增岗位')
          this.sendForm('3')
        }
      }
    },
    sendForm(type) {
      var data = this.formData
      var crtTime = getNowFormatDate()
      this.formData = {
        validateStatus: 2, // 审核状态
        enable: 1, // 当前状态
        code: '', // 编码
        name: '', // 名称
        alias: '', // 简称
        parentCode: data.code, // 上级编码
        level: data.level + 1, // 树形级别
        ifLastLevel: '1', // 是否末级
        type: data.type, // 属性类型
        orgPathName: data.orgPathName, // 组织路径
        duty: '', // 职责
        remark: '', // 说明
        crtName: '13541866334', // 登记人员
        crtTime: crtTime// 登记时间
      }
    },
    save(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          console.log('submit!')

          addOrgInfo(this.formData).then((res) => {
            console.log(res)
          }).catch((err) => {
            console.log(err)
          })
        } else {
          return false
        }
      })

      console.log(this.formData)
    },
    rowClick(e) {
      this.assignForm(e)
    },
    assignForm(e) {
      this.formData = e
      console.log(this.formData)
    },
    formatters(type, v) {
      console.log(type, v)
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

<style scoped>
.tb-content  >>> .el-button{margin-bottom: 10px}
.btn-warp{padding-bottom: 20px}
.tb-content{min-width: 420px;border-left: 1px solid rgb(236, 232, 232);padding-left: 10px;background: #fff;padding:10px;}
.tb_wrap>.el-form-item__label{width: 100px!important}
.tab_form{margin-top: 15px}
.tb_wrap2{margin-bottom: 15px}
.btn_tree{padding: 6px 20px;margin-bottom: 15px}
.el-form-item{margin-bottom: 8px!important}
.btn_save{display:inherit;margin:  10px auto 0}
.left_tree{min-height: 716px;background: #fff;padding: 10px;overflow: auto}
.tab-container >>> .el-radio__input.is-disabled.is-checked .el-radio__inner{background: #42d885!important}
.tab-container >>> .el-form-item__error{top: 7px;left: 50%;}
</style>

