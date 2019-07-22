import Mock from 'mockjs'
import loginAPI from './user'
import remoteSearchAPI from './remoteSearch'
import calendar from './sysManager/sysBaseSet/workCalendarManager'
import review from './bpmaManager/early/undertakeContract/review'
import biddingAnnouncement from './bpmaManager/early/biddingManagement/biddingAnnouncement'
import setProject from './bpmaManager/early/setProject/review'


// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
Mock.XHR.prototype.send = function() {
  if (this.custom.xhr) {
    this.custom.xhr.withCredentials = this.withCredentials || false
  }
  this.proxy_send(...arguments)
}

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login\/loginbyemail/, 'post', loginAPI.loginByPhone)
Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getInfo)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 日历相关
Mock.mock(/\/get\/workAndRest/, 'get', calendar.workAndRest)
Mock.mock(/\/set\/workAndRest/, 'get', calendar.setWorkAndRest)
Mock.mock(/\/init\/low\/year/, 'get', calendar.initLowYear)

// 合同相关
Mock.mock(/\/get\/all\/contract/, 'get', review.allData)
Mock.mock(/\/get\/review\/form\/list/, 'get', review.reviewFormList)
// Mock.mock('/api/activiti/bpmaContractReview/page', 'get', review.reviewFormList)
Mock.mock(/\/api\/activiti\/bpmaContractReview\/\d+/, 'delete', review.deleteReview)
Mock.mock(/\/api\/activiti\/bpmaContractReview\/\d+/, 'put', review.deleteDoc)
Mock.mock('/api/activiti/bpmaContractReview', 'post', review.saveReview)


/**
 * 投标模块
* */
Mock.mock(/\/api\/biddingAnnouncement\/page\/item/, 'get', biddingAnnouncement.allItemData)
Mock.mock(/\/api\/biddingAnnouncement\/dataDictionary/, 'get', biddingAnnouncement.dataDictionary) //数据字典维护数据  招标方式

Mock.mock(/\/api\/biddingAnnouncement\/page\/announcement/, 'get', biddingAnnouncement.announcementList)
Mock.mock(/\/api\/biddingAnnouncement\/announcement\/\d+/, 'get', biddingAnnouncement.announcementFormData)
Mock.mock(/\/api\/biddingAnnouncement\/addOrSaveAnnouncement/, 'post', biddingAnnouncement.saveAnnouncementFormData)
Mock.mock(/\/api\/biddingAnnouncement\/deleteAnnouncement\/\d+/, 'delete', biddingAnnouncement.deleteAnnouncementFormData)

Mock.mock(/\/api\/biddingAnnouncement\/auditAnnouncement/, 'put', biddingAnnouncement.auditAnnouncementFormData)
Mock.mock(/\/api\/setProject\/workPlan\/add/, 'post', setProject.add)
Mock.mock(/\/api\/setProject\/workPlan\/list/, 'get', setProject.list)
Mock.mock(/\/api\/setProject\/workPlan\/detail/, 'get', setProject.detail)
Mock.mock(/\/api\/setProject\/workPlan\/\d+/, 'delete', setProject.delete)
Mock.mock(/\/api\/setProject\/workPlan\/\d+/, 'put', setProject.save)


export default Mock
