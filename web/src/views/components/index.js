import Vue from 'vue'
import basicFormItem from './basic/basicFormItem'
import basicInput from './basic/basicInput'
import basicContainer from './basic/basicContainer'
import basicHandler from './basic/basicHandler'
import basicSearch from './basic/basicSearch'
import basicSplitPane from './basic/basicSplitPane'
import basicTable from './basic/basicTable'
import basicTableTree from './basic/basicTableTree'
import basicValidateStatus from './basic/basicValidateStatus'
import basicDialog from './basic/basicDialog'
import basicUpload from './basic/basicUpload'
import basicIfOrNot from './basic/basicIfOrNot'
import basicUploadFiles from './basic/basicUploadFiles'
import basicChart from './basic/basicChart'
import basicGoodsSearch from './basic/basicGoodsSearch'
import basicSeeProcess from './basic/basicSeeProcess'

import pageSelectFilter from './page/pageSelectFilter'
import pageFormAuthInfo from './page/pageFormAuthInfo'
import pageProcessPersonnelSelect from './page/pageProcessPersonnelSelect'
import pageProcessStep from './page/pageProcessStep'

/**
 * basic注册
 */
Vue.component('basicFormItem', basicFormItem) // el-form-item二次封装组件
Vue.component('basicInput', basicInput) // el-input二次封装组件
Vue.component('basicContainer', basicContainer) // 自动撑开高度适应全屏
Vue.component('basicHandler', basicHandler) // 按钮盒子组件
Vue.component('basicSearch', basicSearch) // 搜索组件
Vue.component('basicSplitPane', basicSplitPane) // 布局拖动组件二次封装
Vue.component('basicTable', basicTable) // el-table二次封装组件
Vue.component('basicTableTree', basicTableTree) // 表格树组件
Vue.component('basicValidateStatus', basicValidateStatus) // 审核状态ui组件
Vue.component('basicDialog', basicDialog) // 弹框
Vue.component('basicUpload', basicUpload) // 文件上传
Vue.component('basicIfOrNot', basicIfOrNot) // 是否ui组件
Vue.component('basicUploadFiles', basicUploadFiles) // 原生文件上传
Vue.component('basicChart', basicChart) // echart
Vue.component('basicGoodsSearch', basicGoodsSearch) // 物资搜索
Vue.component('basicSeeProcess', basicSeeProcess) // 流程查看
/**
 * page注册
 */
Vue.component('pageSelectFilter', pageSelectFilter) // 项目选择过滤器组件
Vue.component('pageFormAuthInfo', pageFormAuthInfo) // 授权基本信息
Vue.prototype.$pagePPSelect = pageProcessPersonnelSelect
Vue.prototype.$pageProcessStep = pageProcessStep
