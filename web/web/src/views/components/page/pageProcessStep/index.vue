<template>
    <basic-dialog title="审批详情" :visible.sync="vIf" width="1000px" top="100px" @close="handleClose">
      <div class="imgbox">
        <img :src="flow" alt="">
      </div>
      <el-table ref="detailTable" highlight-current-row :data="detailData" border fit stripe height="400">
        <el-table-column type="index" align="center" width="60" label="序号" />
        <el-table-column property="taskId" align="center" width="100" label="任务编码" show-overflow-tooltip />
        <el-table-column property="taskName" align="center" width="100" label="任务名称" show-overflow-tooltip />
        <el-table-column property="opName" align="center" width="120" label="审批人" show-overflow-tooltip />
        <el-table-column property="opinion" align="center" label="审批信息" width="120" show-overflow-tooltip />
        <el-table-column property="inTime" align="center" label="创建时间" width="160" show-overflow-tooltip />
        <el-table-column property="createTime" align="center" width="160" label="审批时间" show-overflow-tooltip />
        <el-table-column property="usedTime" align="center" width="140" label="处理用时(小时)" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{Math.ceil(scope.row.usedTime/3600000)}}</span>
          </template>
        </el-table-column>
        <el-table-column property="flag" align="center" width="100" label="是否通过" show-overflow-tooltip>
          <template slot-scope="scope">
            {{formatAuditStatusEnum(scope.row.flag)}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="vIf=false">关闭</el-button>
      </span>
    </basic-dialog>
</template>

<script>
import $store from '@/store'
import formatEnum from '@/utils/mixins/formatEnum.js'
import methods from '@/utils/mixins/methods.js'
import computed from '@/utils/mixins/computed'
export default {
  mixins: [formatEnum, methods, computed],
  data() {
    return {
      flow: '',
      detailData: []
    }
  },
  created() {
    if(!this.$store) this.$store = $store
    this.getEnumData(['GetAuditStatusEnum'])
    this.$store
      .dispatch("ReadResource", this.id)
      .then(response => {
        this.flow = "data:image/png;base64," + response.images;
      })
      .catch(err => {});
    this.$store
      .dispatch("LookShowTask", this.id)
      .then(response => {
        this.detailData = response.data;
      })
      .catch(err => {});
  },
  methods: {
    handleClose() {
      this.$el.parentElement.removeChild(this.$el)
    }
  }
}
</script>

<style>

</style>
