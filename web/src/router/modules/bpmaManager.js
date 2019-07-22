/* jshint esversion: 6 */
import Layout from '@/views/layout/Layout'

const bpmaManagerRouter = {
  path: '/bpmaManager',
  component: Layout,
  redirect: '/bpmaManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/bpmaManager/index'),
      name: 'bpmaManagerIndex',
      meta: { title: '施工首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'decisionAnalysis',
      component: () => import('@/views/bpmaManager/decisionAnalysis/index'),
      name: 'decisionAnalysis',
      meta: { title: '决策分析', icon: 'dashboard', noCache: false, affix: false },
      children:[
        {
          path: 'overview',
          component: () => import('@/views/bpmaManager/decisionAnalysis/overview/index'),
          name: 'overview',
          meta: {title: '总览', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'projectOverview',
              component: () => import('@/views/bpmaManager/decisionAnalysis/overview/projectOverview/index'),
              name: 'projectOverview',
              meta: { title: '项目总览', icon: 'dashboard', noCache: false, affix: false }
            },
          ]
        }
          ]
    },
    {
      path: 'early',
      component: () => import('@/views/bpmaManager/early/index'),
      name: 'early',
      meta: { title: '前期管理', icon: 'dashboard', noCache: false, affix: false },
      children:[
        {
        path: 'itemInfo',
        component: () => import('@/views/bpmaManager/early/itemInfo/index'),
        name: 'itemInfo',
        meta: { title: '项目信息', icon: 'dashboard', noCache: false, affix: false },
        children: [
          {
            path: 'itemType',
            component: () => import('@/views/bpmaManager/early/itemInfo/itemType/index'),
            name: 'itemType',
            meta: { title: '项目类型', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'itemRegister',
            component: () => import('@/views/bpmaManager/early/itemInfo/itemRegister/index'),
            name: 'itemRegister',
            meta: { title: '项目登记', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'item/id/:id*',
            component: () => import('@/views/bpmaManager/early/itemInfo/itemRegister/components/itemDetail'),
            name: 'itemDetail',
            meta: { title: '项目详情', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'itemAuth',
            component: () => import('@/views/bpmaManager/early/itemInfo/itemAuth/index'),
            name: 'itemAuth',
            meta: { title: '项目权限', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'trackRecord',
            component: () => import('@/views/bpmaManager/early/itemInfo/trackRecord/index'),
            name: 'trackRecord',
            meta: { title: '跟踪记录', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'trackRecord/id/:id*',
            component: () => import('@/views/bpmaManager/early/itemInfo/trackRecord/detail'),
            name: 'trackRecordDetail',
            meta: { title: '跟踪记录-详情', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'reconnaissanceRecord',
            component: () => import('@/views/bpmaManager/early/itemInfo/reconnaissanceRecord/index'),
            name: 'reconnaissanceRecord',
            meta: { title: '踏勘记录', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'reconnaissanceRecord/id/:id*',
            component: () => import('@/views/bpmaManager/early/itemInfo/reconnaissanceRecord/detail'),
            name: 'reconnaissanceRecordDetail',
            meta: { title: '踏勘记录-详情', icon: 'dashboard', noCache: false, affix: false }
          }
        ]
      },
        {
          path: 'biddingManagement',
          component: () => import('@/views/bpmaManager/early/biddingManagement/index'),
          name: 'biddingManagement',
          meta: { title: '投标管理', icon: 'dashboard', noCache: false, affix: false },
          children: [
            {
              path: 'biddingAnnouncement',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingAnnouncement/index'),
              name: 'BiddingAnnouncement',
              meta: { title: '招标公告列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'biddingAnnouncement/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingAnnouncement/detail'),
              name:'BiddingAnnouncementDetail',
              meta: { title: '招标公告-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'biddingDocument',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingDocument/index'),
              name: 'BiddingDocument',
              meta: { title: '招标文件列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'biddingDocument/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingDocument/detail'),
              name:'BiddingDocumentDetail',
              meta: { title: '招标文件-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'biddingStrategy',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingStrategy/index'),
              name: 'BiddingStrategy',
              meta: { title: '投标策略列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'biddingStrategy/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/biddingStrategy/detail'),
              name:'BiddingStrategyDetail',
              meta: { title: '投标策略-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderDocument',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderDocument/index'),
              name: 'TenderDocument',
              meta: { title: '投标文件列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderDocument/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderDocument/detail'),
              name:'TenderDocumentDetail',
              meta: { title: '投标文件-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderQuestion',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderQuestion/index'),
              name: 'TenderQuestion',
              meta: { title: '投标答疑列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderQuestion/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderQuestion/detail'),
              name:'TenderQuestionDetail',
              meta: { title: '投标答疑-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderFee',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderFee/index'),
              name: 'TenderFee',
              meta: { title: '投标费用列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderFee/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderFee/detail'),
              name:'TenderFeeDetail',
              meta: { title: '投标费用-详情', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderResult',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderResult/index'),
              name: 'TenderResult',
              meta: { title: '投标结果列表', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'tenderResult/id/:id*',
              component: () => import('@/views/bpmaManager/early/biddingManagement/tenderResult/detail'),
              name:'TenderResultDetail',
              meta: { title: '投标结果-详情', icon: 'dashboard', noCache: false, affix: false }
            }
          ]
        },
        {
        path: 'undertakeContract',
        component: () => import('@/views/bpmaManager/early/undertakeContract/index'),
        name: 'undertakeContract',
        meta: { title: '承接合同', icon: 'dashboard', noCache: false, affix: false },
        children: [
          {
            path: 'review',
            component: () => import('@/views/bpmaManager/early/undertakeContract/review/index'),
            name: 'review1',
            meta: { title: '承接合同评审', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'contract',
            component: () => import('@/views/bpmaManager/early/undertakeContract/contract'),
            name: 'contract',
            meta: { title: '承接合同登记', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'change',
            component: () => import('@/views/bpmaManager/early/undertakeContract/change'),
            name: 'change1',
            meta: { title: '承接合同变更', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'review/id/:id*/:detail',
            component: () => import('@/views/bpmaManager/early/undertakeContract/review/detail'),
            name: 'reviewDetail1',
            meta: { title: '评审单-详情', icon: 'dashboard', noCache: false, affix: false },
            props: (route) => ({isInitData: route.query.isInitData})
          },
          {
            path: 'change/id/:id*/:detail',
            component: () => import('@/views/bpmaManager/early/undertakeContract/change/detail'),
            name: 'changeDetail1',
            meta: { title: '变更单-详情', icon: 'dashboard', noCache: false, affix: false },
          },
          {
            path: 'contract/id/:id*/:detail',
            component: () => import('@/views/bpmaManager/early/undertakeContract/contract/detail'),
            name: 'contractDetail1',
            meta: { title: '合同登记-详情', icon: 'dashboard', noCache: false, affix: false },
          }
        ]
      },
        {
        path: 'setProject',
        component: () => import('@/views/bpmaManager/early/setProject/index'),
        name: 'setProject',
        meta: { title: '立项管理', icon: 'dashboard', noCache: false, affix: false },
        children: [
          {
            path: 'workPlan',
            component: () => import('@/views/bpmaManager/early/setProject/workPlan/index'),
            name: 'workPlan',
            meta: { title: '施工方案', icon: 'dashboard', noCache: false, affix: false }
          },
          {
            path: 'workPlan/id/:id*',
            component: () => import('@/views/bpmaManager/early/setProject/workPlan/detail'),
            name: 'WorkPlanDetail',
            meta: { title: '施工方案-详情', icon: 'dashboard', noCache: false, affix: false }
          }
        ]
      }],
    },
    {
      path: 'schedule',
      component: () => import('@/views/bpmaManager/schedule'),
      name: 'schedule',
      meta: {title: '进度管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'duration',
          component: () => import('@/views/bpmaManager/schedule/duration'),
          name: 'duration',
          meta: {title: '工期管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'planEdit',
              component: () => import('@/views/bpmaManager/schedule/duration/planEdit'),
              name: 'planEdit',
              meta: {title: '计划编审', icon: 'dashboard', noCache: false, affix: false, process: 'planEdit'}
            },
            {
              path: 'planEdit/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/schedule/duration/planEdit/detail'),
              name: 'planEditDetail',
              meta: {title: '计划编审-详情', icon: 'dashboard', noCache: false, affix: false, process: 'planEdit'}
            },
            {
              path: 'planAdjustment',
              component: () => import('@/views/bpmaManager/schedule/duration/planAdjustment'),
              name: 'planAdjustment',
              meta: {title: '计划调整', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'planAdjustment/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/schedule/duration/planAdjustment/detail'),
              name: 'planAdjustmentDetail',
              meta: {title: '计划调整-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'report',
              component: () => import('@/views/bpmaManager/schedule/duration/report'),
              name: 'report',
              meta: {title: '进度报告', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'report/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/schedule/duration/report/detail'),
              name: 'reportDetail',
              meta: {title: '进度报告-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'track',
              component: () => import('@/views/bpmaManager/schedule/duration/track'),
              name: 'track',
              meta: {title: '进度跟踪', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'recording',
              component: () => import('@/views/bpmaManager/schedule/duration/recording'),
              name: 'recording',
              meta: {title: '跟踪记录', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'recording/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/schedule/duration/recording/detail'),
              name: 'recordingDetail',
              meta: {title: '跟踪记录-详情', icon: 'dashboard', noCache: false, affix: false}
            },
          ]
        },
        {
          path: 'basicSetting',
          component: () => import('@/views/bpmaManager/schedule/basicSetting'),
          name: 'basicSetting',
          meta: {title: '基础设置', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'template',
              component: () => import('@/views/bpmaManager/schedule/basicSetting/template/index.vue'),
              name: 'template',
              meta: {title: '计划模板', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        }
      ]
    },
    {
      path: 'laterManager',
      component: () => import('@/views/bpmaManager/laterManager/index'),
      name: 'laterManager',
      meta: {title: '后期管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'completedManager',
          component: () => import('@/views/bpmaManager/laterManager/completedManager/index'),
          name: 'completedManager',
          meta: {title: '竣工管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'completedReport',
              component: () => import('@/views/bpmaManager/laterManager/completedManager/completedReport/index'),
              name: 'completedReport',
              meta: {title: '竣工报告', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'completedReport/id/:id*',
              component: () => import('@/views/bpmaManager/laterManager/completedManager/completedReport/detail'),
              name: 'completedReportDetail',
              meta: {title: '竣工-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'projectHandOver',
              component: () => import('@/views/bpmaManager/laterManager/completedManager/projectHandOver/index'),
              name: 'projectHandOver',
              meta: {title: '项目移交', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'projectHandOver/id/:id*',
              component: () => import('@/views/bpmaManager/laterManager/completedManager/projectHandOver/detail'),
              name: 'projectHandOverDetail',
              meta: {title: '移交-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'maintRecord',
          component: () => import('@/views/bpmaManager/laterManager/maintRecord/index'),
          name: 'maintRecord',
          meta: {title: '维保记录', icon: 'dashboard', noCache: false, affix: false}
        },
        {
          path: 'maintRecord/id/:id*',
          component: () => import('@/views/bpmaManager/laterManager/maintRecord/detail'),
          name: 'maintRecordDetail',
          meta: {title: '维保-详情', icon: 'dashboard', noCache: false, affix: false}
        }
      ]
    },
    // /*
    {
      path:'turnoverMaterials',
      component:()=>import('@/views/bpmaManager/turnoverMaterials/index'),
      name:'turnoverMaterials',
      meta:{title:'周转材料',icon:'dashboard',noCache:false,affix:false},
      children:[{
        path:'applicationManagement',
        component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/index'),
        name:'applicationManagement',
        meta:{title:'申请管理',icon: 'dashboard', noCache: false, affix: false},
        children:[{
          path:'usageRequirement',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/index'),
          name:'usageRequirement',
          meta:{title:'使用需求',icon: 'dashboard', noCache: false, affix: false}
        },{
          path:'usageRequirement/id/:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/detail'),
          name:'usageRequirementDetail',
          meta:{title:'使用需求-详情',icon: 'dashboard', noCache: false, affix: false}
        },{
          path:'leaseSettlement',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/leaseSettlement/index'),
          name:'leaseSettlement',
          meta:{title:'租赁结算',icon: 'dashboard', noCache: false, affix: false},
        },{
          path:'leaseSettlement/id/:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/leaseSettlement/detail'),
          name:'leaseSettlementDetail',
          meta:{title:'租赁结算-详情',icon: 'dashboard', noCache: false, affix: false}
        }]
      },{
        path:'contractManagement',
        component:()=>import('@/views/bpmaManager/turnoverMaterials/contractManagement/index'),
        name:'contractManagement',
        meta:{title:'合同管理',icon: 'dashboard', noCache: false, affix: false},
        children:[
        //   {
        //   path:'contractReview',
        // component:()=>import('@/views/bpmaManager/turnoverMaterials/contractManagement/contractReview/index'),
        // name:'contractReview',
        // meta:{title:'周材合同评审',icon: 'dashboard', noCache: false, affix: false}
        // },{
        //   path:'contractReview/id:id*',
        //   component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/detail'),
        //   name:'contractReview',
        //   meta:{title:'周材合同评审-详情',icon: 'dashboard', noCache: false, affix: false}
        // },
        {
          path:'contractRegistration',
        component:()=>import('@/views/bpmaManager/turnoverMaterials/contractManagement/contractRegistration/index'),
        name:'contractRegistration',
        meta:{title:'周材合同登记',icon: 'dashboard', noCache: false, affix: false}
        },{
          path:'contractRegistration/id/:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/contractManagement/contractRegistration/detail'),
          name:'contractRegistrationDetail',
          meta:{title:'周材合同登记-详情',icon: 'dashboard', noCache: false, affix: false}
        },
        // {
        //   path:'modificationContract',
        // component:()=>import('@/views/bpmaManager/turnoverMaterials/contractManagement/modificationContract/index'),
        // name:'modificationContract',
        // meta:{title:'周材合同查询',icon: 'dashboard', noCache: false, affix: false}
        // },{
        //   path:'modificationContract/id:id*',
        //   component:()=>import('@/views/bpmaManager/turnoverMaterials/applicationManagement/usageRequirement/detail'),
        //   name:'modificationContract',
        //   meta:{title:'周材合同查询-详情',icon: 'dashboard', noCache: false, affix: false}
        // }
      ]
      },{
        path:'fieldControl',
        component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/index'),
        name:'fieldControl',
        meta:{title:'现场管理',icon: 'dashboard', noCache: false, affix: false},
        children:[{
          path:'enterTheArena',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/enterTheArena/index'),
          name:'enterTheArena',
          meta:{title:'周材进场',icon: 'dashboard', noCache: false, affix: false},
        },{
          path:'enterTheArena/id:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/enterTheArena/detail'),
          name:'enterTheArenaDetail',
          meta:{title:'周材进场-详情',icon: 'dashboard', noCache: false, affix: false}
        },{
          path:'gaugeTicket',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/gaugeTicket/index'),
          name:'gaugeTicket',
          meta:{title:'周材计量',icon: 'dashboard', noCache: false, affix: false},
        },{
          path:'gaugeTicket/id/:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/gaugeTicket/detail'),
          name:'gaugeTicketDetail',
          meta:{title:'周材计量-详情',icon: 'dashboard', noCache: false, affix: false}
        },{
          path:'zhouCaiLeave',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/zhouCaiLeave/index'),
          name:'zhouCaiLeave',
          meta:{title:'周材出场',icon: 'dashboard', noCache: false, affix: false},
        },{
          path:'zhouCaiLeave/id:id*',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/fieldControl/zhouCaiLeave/detail'),
          name:'zhouCaiLeaveDetail',
          meta:{title:'周材出场-详情',icon: 'dashboard', noCache: false, affix: false}
        }]
      },{
        path:'commonTable',
        component:()=>import('@/views/bpmaManager/turnoverMaterials/commonTable/index'),
        name:'commonTable',
        meta:{title:'公共表',icon: 'dashboard', noCache: false, affix: false},
        children:[{
          path:'zhouCaiInventory',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/commonTable/zhouCaiInventory/index'),
          name:'zhouCaiInventory',
          meta:{title:'周材库存表',icon: 'dashboard', noCache: false, affix: false},
        },{
          path:'carryForward',
          component:()=>import('@/views/bpmaManager/turnoverMaterials/commonTable/carryForward/index'),
          name:'carryForward',
          meta:{title:'计量结转表',icon: 'dashboard', noCache: false, affix: false},
        }]
      }]
    },
    // */
    {
      path: 'outputValue',
      component: () => import('@/views/bpmaManager/outputValue'),
      name: 'outputValue',
      meta: {title: '产值管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'settlement',
          component: () => import('@/views/bpmaManager/outputValue/settlement'),
          name: 'settlement',
          meta: {title: '产值结算', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'stage',
              component: () => import('@/views/bpmaManager/outputValue/settlement/stage'),
              name: 'stage',
              meta: {title: '阶段结算', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'stage/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/settlement/stage/detail'),
              name: 'stageDetail',
              meta: {title: '阶段结算-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'completion',
              component: () => import('@/views/bpmaManager/outputValue/settlement/completion'),
              name: 'completion',
              meta: {title: '完工结算', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'completion/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/settlement/completion/detail'),
              name: 'completionDetail',
              meta: {title: '完工结算-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'visa',
          component: () => import('@/views/bpmaManager/outputValue/visa'),
          name: 'visa',
          meta: {title: '工程签证', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'data',
              component: () => import('@/views/bpmaManager/outputValue/visa/data'),
              name: 'data',
              meta: {title: '签证资料', icon: 'dashboard', noCache: false, affix: false}
            },{
              path: 'data/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/visa/data/detail'),
              name: 'dataDetail',
              meta: {title: '签证资料-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration',
              component: () => import('@/views/bpmaManager/outputValue/visa/registration'),
              name: 'registration',
              meta: {title: '签证登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/visa/registration/detail'),
              name: 'registrationDetail',
              meta: {title: '签证登记-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'claimDemage',
          component: () => import('@/views/bpmaManager/outputValue/claimDemage'),
          name: 'claimDemage',
          meta: {title: '索赔管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'evidence',
              component: () => import('@/views/bpmaManager/outputValue/claimDemage/evidence'),
              name: 'evidence',
              meta: {title: '索赔取证', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'evidence/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/claimDemage/evidence/detail'),
              name: 'evidenceDetail',
              meta: {title: '索赔取证-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration',
              component: () => import('@/views/bpmaManager/outputValue/claimDemage/registration'),
              name: 'registration1',
              meta: {title: '索赔登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/claimDemage/registration/detail'),
              name: 'registrationDetail1',
              meta: {title: '索赔登记-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'cost',
          component: () => import('@/views/bpmaManager/outputValue/cost'),
          name: 'cost',
          meta: {title: '费用管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'reward',
              component: () => import('@/views/bpmaManager/outputValue/cost/reward'),
              name: 'reward',
              meta: {title: '奖励登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'reward/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/cost/reward/detail'),
              name: 'rewardDetail',
              meta: {title: '奖励登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'punishment',
              component: () => import('@/views/bpmaManager/outputValue/cost/punishment'),
              name: 'punishment',
              meta: {title: '扣罚登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'punishment/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/outputValue/cost/punishment/detail'),
              name: 'punishmentDetail',
              meta: {title: '扣罚登记-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        }
      ]
    },
    {
      path: 'finance',
      component: () => import('@/views/bpmaManager/finance'),
      name: 'finance',
      meta: {title: '财务管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'borrow',
          component: () => import('@/views/bpmaManager/finance/borrow'),
          name: 'borrow',
          meta: {title: '借款管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'borrowBill',
              component: () => import('@/views/bpmaManager/finance/borrow/borrowBill'),
              name: 'borrowBill',
              meta: {title: '借款单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'borrowBill/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/borrow/borrowBill/detail'),
              name: 'borrowBillDetail',
              meta: {title: '借款单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'repayBill',
              component: () => import('@/views/bpmaManager/finance/borrow/repayBill'),
              name: 'repayBill',
              meta: {title: '还款单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'repayBill/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/borrow/repayBill/detail'),
              name: 'repayBillDetail',
              meta: {title: '还款单-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'cost',
          component: () => import('@/views/bpmaManager/finance/cost'),
          name: 'cost1',
          meta: {title: '费用管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'budget',
              component: () => import('@/views/bpmaManager/finance/cost/budget'),
              name: 'budget',
              meta: {title: '费用预算', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'budget/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/cost/budget/detail'),
              name: 'budgetDetail',
              meta: {title: '费用预算-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'dailyReimbursement',
              component: () => import('@/views/bpmaManager/finance/cost/dailyReimbursement'),
              name: 'dailyReimbursement',
              meta: {title: '日常报销', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'dailyReimbursement/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/cost/dailyReimbursement/detail'),
              name: 'dailyReimbursementDetail',
              meta: {title: '日常报销-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'businessReimbursement',
              component: () => import('@/views/bpmaManager/finance/cost/businessReimbursement'),
              name: 'businessReimbursement',
              meta: {title: '业务报销', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'businessReimbursement/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/cost/businessReimbursement/detail'),
              name: 'businessReimbursementDetail',
              meta: {title: '业务报销-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'collectMoney',
          component: () => import('@/views/bpmaManager/finance/collectMoney'),
          name: 'collectMoney',
          meta: {title: '收款管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'registration',
              component: () => import('@/views/bpmaManager/finance/collectMoney/registration'),
              name: 'registration2',
              meta: {title: '应收登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/collectMoney/registration/detail'),
              name: 'registration2Detail',
              meta: {title: '应收登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receivable',
              component: () => import('@/views/bpmaManager/finance/collectMoney/receivable'),
              name: 'receivable',
              meta: {title: '应收查询', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'invoiceBill',
              component: () => import('@/views/bpmaManager/finance/collectMoney/invoiceBill'),
              name: 'invoiceBill',
              meta: {title: '开票单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'invoiceBill/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/collectMoney/invoiceBill/detail'),
              name: 'invoiceBillDetail',
              meta: {title: '开票单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receipt',
              component: () => import('@/views/bpmaManager/finance/collectMoney/receipt'),
              name: 'receipt',
              meta: {title: '收款单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receipt/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/collectMoney/receipt/detail'),
              name: 'receiptDetail',
              meta: {title: '收款单-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'payment',
          component: () => import('@/views/bpmaManager/finance/payment'),
          name: 'payment',
          meta: {title: '付款管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'registration',
              component: () => import('@/views/bpmaManager/finance/payment/registration'),
              name: 'registration3',
              meta: {title: '应付登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/payment/registration/detail'),
              name: 'registrationDetail2',
              meta: {title: '应付登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receivable',
              component: () => import('@/views/bpmaManager/finance/payment/receivable'),
              name: 'receivable2',
              meta: {title: '应收查询', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receipt',
              component: () => import('@/views/bpmaManager/finance/payment/receipt'),
              name: 'receipt2',
              meta: {title: '收票单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receipt/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/payment/receipt/detail'),
              name: 'receiptDetail2',
              meta: {title: '收票单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'document',
              component: () => import('@/views/bpmaManager/finance/payment/document'),
              name: 'document',
              meta: {title: '付款单', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'document/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/finance/payment/document/detail'),
              name: 'documentDetail',
              meta: {title: '付款单-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        }
      ]
    },
    {
      path: 'costs',
      component: () => import('@/views/bpmaManager/costs/index'),
      name: 'costs',
      meta: {title: '成本管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        { path: 'income',
          component: () => import('@/views/bpmaManager/costs/income/index'),
          name: 'income',
          meta: {title: '产值收入', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'outputBill',
              component: () => import('@/views/bpmaManager/costs/income/outputBill/index'),
              name: 'outputBill',
              meta: {title: '产值单据', icon: 'dashboard', noCache: false, affix: false},
            }
          ]
        },{
          path: 'outlayCosts',
          component: () => import('@/views/bpmaManager/costs/outlayCosts/index'),
          name: 'outlayCosts',
          meta: {title: '实际成本', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'costsBill',
              component: () => import('@/views/bpmaManager/costs/outlayCosts/costsBill/index'),
              name: 'costsBill',
              meta: {title: '成本单据', icon: 'dashboard', noCache: false, affix: false},
            }
          ]
        }
      ]
    },

    {
      path: 'goods',
      component: () => import('@/views/bpmaManager/goods/index'),
      name: 'goods',
      meta: {title: '物资管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'goodsBudget',
          component: () => import('@/views/bpmaManager/goods/goodsBudget/index'),
          name: 'goodsBudget',
          meta: {title: '物资预算', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'BudgetRegister',
              component: () => import('@/views/bpmaManager/goods/goodsBudget/BudgetRegister/index'),
              name: 'BudgetRegister',
              meta: {title: '预算登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'BudgetRegister/id/:id*/:detail',
              component: () => import('@/views/bpmaManager/goods/goodsBudget/BudgetRegister/detail'),
              name: 'BudgetRegisterDetail',
              meta: {title: '预算登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'budgetQuery',
              component: () => import('@/views/bpmaManager/goods/goodsBudget/budgetQuery/index'),
              name: 'BudgetQuery',
              meta: {title: '预算查询', icon: 'dashboard', noCache: false, affix: false}
            },
          ]
        },
        {
          path: 'purchase',
          component: () => import('@/views/bpmaManager/goods/purchase/index'),
          name: 'purchase',
          meta: {title: '采购管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'materialsRequirements',
              component: () => import('@/views/bpmaManager/goods/purchase/materialsRequirements/index'),
              name: 'materialsRequirements',
              meta: {title: '用料需求', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'materialsRequirements/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/materialsRequirements/components/requirementsDetail'),
              name: 'requirementsDetail',
              meta: {title: '用料需求-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchaseApplication',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseApplication/index'),
              name: 'purchaseApplication',
              meta: {title: '采购申请', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchaseApplication/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseApplication/components/materialApplyDetail'),
              name: 'materialApplyDetail',
              meta: {title: '采购申请-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchaseInquiry',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseInquiry/index'),
              name: 'purchaseInquiry',
              meta: {title: '采购询价', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchaseInquiry/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseInquiry/components/purchaseInquiryDetail'),
              name: 'purchaseInquiryDetail',
              meta: {title: '采购询价-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchasePrice',
              component: () => import('@/views/bpmaManager/goods/purchase/purchasePrice/index'),
              name: 'purchasePrice',
              meta: {title: '供方报价', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchasePrice/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/purchasePrice/components/purchasePriceDetail'),
              name: 'purchasePriceDetail',
              meta: {title: '供方报价-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'chooseSupplier',
              component: () => import('@/views/bpmaManager/goods/purchase/chooseSupplier/index'),
              name: 'chooseSupplier',
              meta: {title: '供方比选', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'chooseSupplier/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/chooseSupplier/components/chooseSupplierDetail'),
              name: 'chooseSupplierDetail',
              meta: {title: '供方比选-详情', icon: 'dashboard', noCache: false, affix: false}
            },

            {
              path: 'purchaseSettlement',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseSettlement/index'),
              name: 'PurchaseSettlement',
              meta: {title: '采购结算列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchaseSettlement/id/:id*',
              component: () => import('@/views/bpmaManager/goods/purchase/purchaseSettlement/detail'),
              name: 'PurchaseSettlementDetail',
              meta: {title: '采购结算-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'goodsContract',
          component: () => import('@/views/bpmaManager/goods/goodsContract/index'),
          name: 'goodsContract',
          meta: {title: '物资合同', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'review',
              component: () => import('@/views/bpmaManager/goods/goodsContract/review/index'),
              name: 'review',
              meta: {title: '物资合同评审', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'review/id/:id*',
              component: () => import('@/views/bpmaManager/goods/goodsContract/review/contractDetail'),
              name: 'reviewDetail',
              meta: {title: '物资合同评审-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'register',
              component: () => import('@/views/bpmaManager/goods/goodsContract/register/index'),
              name: 'register',
              meta: {title: '物资合同登记', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'register/id/:id*',
              component: () => import('@/views/bpmaManager/goods/goodsContract/register/detail'),
              name: 'registerDetail',
              meta: {title: '物资合同登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'change',
              component: () => import('@/views/bpmaManager/goods/goodsContract/change/index'),
              name: 'change',
              meta: {title: '物资合同变更', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'change/id/:id*',
              component: () => import('@/views/bpmaManager/goods/goodsContract/change/components/changeDetail'),
              name: 'changeDetail',
              meta: {title: '物资合同变更-详情', icon: 'dashboard', noCache: false, affix: false}
            }

          ]
        },
        {
          path: 'putStorage',
          component: () => import('@/views/bpmaManager/goods/putStorage/index'),
          name: 'putStorage',
          meta: {title: '入库管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'outTheFront',
              component: () => import('@/views/bpmaManager/goods/putStorage/outTheFront/index'),
              name: 'outTheFront',
              meta: {title: '直进直出', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'outTheFront/id/:id*',
              component: () => import('@/views/bpmaManager/goods/putStorage/outTheFront/detail'),
              name: 'outTheFrontDetail',
              meta: {title: '直进直出-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchase',
              component: () => import('@/views/bpmaManager/goods/putStorage/purchase/index'),
              name: 'purchase1',
              meta: {title: '采购入库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'purchase/id/:id*',
              component: () => import('@/views/bpmaManager/goods/putStorage/purchase/components/purchaseDetail'),
              name: 'purchaseDetail',
              meta: {title: '采购入库-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'other',
              component: () => import('@/views/bpmaManager/goods/putStorage/other/index'),
              name: 'other',
              meta: {title: '其他入库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'other/id/:id*',
              component: () => import('@/views/bpmaManager/goods/putStorage/other/components/otherDetail'),
              name: 'otherDetail',
              meta: {title: '其他入库-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'returnGoods',
              component: () => import('@/views/bpmaManager/goods/putStorage/returnGoods/index'),
              name: 'returnGoods',
              meta: {title: '采购退货', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'returnGoods/id/:id*',
              component: () => import('@/views/bpmaManager/goods/putStorage/returnGoods/components/returnGoodsDetail'),
              name: 'returnGoodsDetail',
              meta: {title: '采购退货-详情', icon: 'dashboard', noCache: false, affix: false}
            }

          ]
        },
        {
          path: 'outbound',
          component: () => import('@/views/bpmaManager/goods/outbound/index'),
          name: 'outbound',
          meta: {title: '出库管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'receiveOutbound',
              component: () => import('@/views/bpmaManager/goods/outbound/receiveOutbound/index'),
              name: 'receiveOutbound',
              meta: {title: '领用出库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'receiveOutbound/id/:id*',
              component: () => import('@/views/bpmaManager/goods/outbound/receiveOutbound/components/receiveOutboundDetail'),
              name: 'receiveOutboundDetail',
              meta: {title: '领用出库-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'other',
              component: () => import('@/views/bpmaManager/goods/outbound/other/index'),
              name: 'other1',
              meta: {title: '其他出库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'other/id/:id*',
              component: () => import('@/views/bpmaManager/goods/outbound/other/components/otherDetail'),
              name: 'otherDetails',
              meta: {title: '其他出库-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'returnGoods',
              component: () => import('@/views/bpmaManager/goods/outbound/returnGoods/index'),
              name: 'returnGoods1',
              meta: {title: '领用退货', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'returnGoods/id/:id*',
              component: () => import('@/views/bpmaManager/goods/outbound/returnGoods/components/returnGoodsDetail'),
              name: 'returnGoodsDetails',
              meta: {title: '领用退货-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'inventory',
          component: () => import('@/views/bpmaManager/goods/inventory/index'),
          name: 'inventory',
          meta: {title: '库存管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'check',
              component: () => import('@/views/bpmaManager/goods/inventory/check/index'),
              name: 'check',
              meta: {title: '库存盘点', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'check/id/:id*',
              component: () => import('@/views/bpmaManager/goods/inventory/check/components/checkDetail'),
              name: 'checkDetail',
              meta: {title: '库存盘点-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'currentInventory',
              component: () => import('@/views/bpmaManager/goods/inventory/currentInventory/index'),
              name: 'currentInventory',
              meta: {title: '当前库存', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'transfers',
          component: () => import('@/views/bpmaManager/goods/transfers/index'),
          name: 'transfers',
          meta: {title: '调拨管理', icon: 'dashboard',affix: false},
          children: [
            {
              path: 'outbound',
              component: () => import('@/views/bpmaManager/goods/transfers/outbound/index'),
              name: 'outbound1',
              meta: {title: '调拨出库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'outbound/id/:id*',
              component: () => import('@/views/bpmaManager/goods/transfers/outbound/components/outboundDetail'),
              name: 'outboundDetail',
              meta: {title: '调拨出库-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'putStorage',
              component: () => import('@/views/bpmaManager/goods/transfers/putStorage/index'),
              name: 'putStorage1',
              meta: {title: '调拨入库', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'putStorage/id/:id*',
              component: () => import('@/views/bpmaManager/goods/transfers/putStorage/components/putStorageDetail'),
              name: 'putStorageDetail',
              meta: {title: '调拨入库-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        }

      ]
    },
    {
      path: 'subpackage',
      component: () => import('@/views/bpmaManager/subpackage/index'),
      name: 'subpackage',
      meta: {title: '分包管理', icon: 'dashboard', noCache: false, affix: false},
      children: [
        {
          path: 'subcontractManagement',
          component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/index'),
          name: 'subcontractManagement',
          meta: {title: '分包管理', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'employment',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/employment/index'),
              name: 'Employment',
              meta: {title: '用工申请列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'employment/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/employment/detail'),
              name: 'EmploymentDetail',
              meta: {title: '用工申请-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'subcontractApplication',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/subcontractApplication/index'),
              name: 'SubcontractApplication',
              meta: {title: '分包申请列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'subcontractApplication/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/subcontractApplication/detail'),
              name: 'SubcontractApplicationDetail',
              meta: {title: '分包申请-详情', icon: 'dashboard', noCache: false, affix: false}
            },

            {
              path: 'subPay',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/subPay/index'),
              name: 'SubPay',
              meta: {title: '阶段结算列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'subPay/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/subPay/detail'),
              name: 'SubPayDetail',
              meta: {title: '阶段结算-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'completionPay',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/completionPay/index'),
              name: 'CompletionPay',
              meta: {title: '完工结算列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'completionPay/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontractManagement/completionPay/detail'),
              name: 'CompletionPayDetail',
              meta: {title: '完工结算-详情', icon: 'dashboard', noCache: false, affix: false}
            }
          ]
        },
        {
          path: 'subcontract',
          component: () => import('@/views/bpmaManager/subpackage/subcontract/index'),
          name: 'Subcontract',
          meta: {title: '分包合同', icon: 'dashboard', noCache: false, affix: false},
          children: [
            {
              path: 'review',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/review/index'),
              name: 'Review',
              meta: {title: '分包合同评审列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'review/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/review/detail'),
              name: 'ReviewDetail',
              meta: {title: '分包合同评审-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/registration/index'),
              name: 'Registration',
              meta: {title: '分包合同登记列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'registration/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/registration/detail'),
              name: 'RegistrationDetail',
              meta: {title: '分包合同登记-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'change',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/change/index'),
              name: 'Change',
              meta: {title: '分包合同变更列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'change/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subcontract/change/detail'),
              name: 'ChangeDetail',
              meta: {title: '分包合同变更-详情', icon: 'dashboard', noCache: false, affix: false}
            },

          ]
        },
        {
          path: 'subValue',
          component: () => import('@/views/bpmaManager/subpackage/subValue/index'),
          name: 'SubValue',
          meta: {title: '产值管理', icon: 'dashboard', noCache: false, affix: false},
          children:[
            {
              path: 'labour',
              component: () => import('@/views/bpmaManager/subpackage/subValue/labour/index'),
              name: 'Labour',
              meta: {title: '用工单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'labour/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/labour/detail'),
              name: 'LabourDetail',
              meta: {title: '用工单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'count',
              component: () => import('@/views/bpmaManager/subpackage/subValue/count/index'),
              name: 'Count',
              meta: {title: '计量单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'count/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/count/detail'),
              name: 'CountDetail',
              meta: {title: '计量单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'visa',
              component: () => import('@/views/bpmaManager/subpackage/subValue/visa/index'),
              name: 'Visa',
              meta: {title: '签证单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'visa/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/visa/detail'),
              name: 'VisaDetail',
              meta: {title: '签证单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'claim',
              component: () => import('@/views/bpmaManager/subpackage/subValue/claim/index'),
              name: 'Claim',
              meta: {title: '索赔单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'claim/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/claim/detail'),
              name: 'ClaimDetail',
              meta: {title: '索赔单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'award',
              component: () => import('@/views/bpmaManager/subpackage/subValue/award/index'),
              name: 'Award',
              meta: {title: '奖励单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'award/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/award/detail'),
              name: 'AwardDetail',
              meta: {title: '奖励单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'punish',
              component: () => import('@/views/bpmaManager/subpackage/subValue/punish/index'),
              name: 'Punish',
              meta: {title: '扣罚单列表', icon: 'dashboard', noCache: false, affix: false}
            },
            {
              path: 'punish/id/:id*',
              component: () => import('@/views/bpmaManager/subpackage/subValue/punish/detail'),
              name: 'PunishDetail',
              meta: {title: '扣罚单-详情', icon: 'dashboard', noCache: false, affix: false}
            },
          ]
        }
      ]
    }

  ]
}

export default bpmaManagerRouter
