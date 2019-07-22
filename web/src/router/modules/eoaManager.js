/* jshint esversion: 6 */
import Layout from '@/views/layout/Layout'

const eoaManagerRouter = {
  path: '/eoaManager',
  component: Layout,
  redirect: '/eoaManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/eoaManager/index'),
      name: 'eoaManagerIndex',
      meta: { title: '协同首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'work',
      component: () => import('@/views/eoaManager/work/index'),
      name: 'Work',
      meta: { title: '工作管理' },
      children: [
        {
          path: 'logManager',
          component: () => import('@/views/eoaManager/work/logManager/index'),
          name: 'LogManager',
          meta: { title: '日志管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'logManager/id/:id*',
          component: () => import('@/views/eoaManager/work/logManager/components/logDetail'),
          name: 'logDetail',
          meta: { title: '日志详情', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },{
      path: 'task',
      component: () => import('@/views/eoaManager/taskCenterManager/index'),
      name: 'task',
      meta: { title: '任务管理' },
      children: [
        {
          path: 'taskCenterManager',
          component: () => import('@/views/eoaManager/taskCenterManager/taskCenter'),
          name: 'taskCenterManager',
          meta: { title: '任务中心', icon: 'dashboard', noCache: false, affix: false }
        },
        /*{
          path: 'logDetail',
          component: () => import('@/views/eoaManager/work/logManager/components/logDetail'),
          name: 'logDetail',
          meta: { title: '日志详情', icon: 'dashboard', noCache: false, affix: false }
        }*/
      ]
    },{
      path: 'information',
      component: () => import('@/views/eoaManager/information/index'),
      name: 'information',
      meta: { title: '信息管理' },
      children: [
        {
          path: 'newsManager',
          component: () => import('@/views/eoaManager/information/newsManager/index'),
          name: 'newsManager',
          meta: { title: '新闻管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'newsManager/id/:id*',
          component: () => import('@/views/eoaManager/information/newsManager/components/newsDetail'),
          name: 'newsDetail',
          meta: { title: '新闻详情', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'noticeManager',
          component: () => import('@/views/eoaManager/information/noticeManager/index'),
          name: 'noticeManager',
          meta: { title: '通知管理', icon: 'dashboard', noCache: false, affix: false }
        },{
          path: 'noticeManager/id/:id*',
          component: () => import('@/views/eoaManager/information/noticeManager/components/noticeDetail'),
          name: 'noticeDetail',
          meta: { title: '通知详情', icon: 'dashboard', noCache: false, affix: false }
        },

      ]
    },
    {
      path: 'message',
      component: () => import('@/views/eoaManager/message/index'),
      name: 'message',
      meta: { title: '消息管理' },
      children: [
        {
          path: 'messageCenterManager',
          component: () => import('@/views/eoaManager/message/messageCenterManager/index'),
          name: 'messageCenterManager',
          meta: { title: '消息中心', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'messageStatisticalManager',
          component: () => import('@/views/eoaManager/message/messageStatisticalManager/index'),
          name: 'messageStatisticalManager',
          meta: { title: '统计分析', icon: 'dashboard', noCache: false, affix: false }
        },
      ]
    },
    {
      path: 'attendance',
      component: () => import('@/views/eoaManager/attendance'),
      name: 'attendance',
      meta: { title: '考勤管理', icon: 'zip', noCache: false, affix: true },
      children: [
        {
          path: 'askForLeave',
          component: () => import('@/views/eoaManager/attendance/askForLeave/index'),
          name: 'askForLeave',
          meta: { title: '请假管理', icon: 'zip', noCache: false, affix: false, process: 'askForLeave' }
        },
        {
          path: 'askForLeave/id/:id*',
          component: () => import('@/views/eoaManager/attendance/askForLeave/details'),
          name: 'askForLeaveDetails',
          meta: { title: '请假详情', icon: 'zip', noCache: false, affix: false, process: 'askForLeave' }
        },
        {
          path: 'workOvertime',
          component: () => import('@/views/eoaManager/attendance/workOvertime/index'),
          name: 'workOvertime',
          meta: { title: '加班管理', icon: 'zip', noCache: false, affix: false, process: 'workOvertime' }
        },
        {
          path: 'workOvertime/id/:id*',
          component: () => import('@/views/eoaManager/attendance/workOvertime/details'),
          name: 'workOvertimeDetails',
          meta: { title: '加班详情', icon: 'zip', noCache: false, affix: false, process: 'workOvertime' }
        }
      ]
    }
  ]
}

export default eoaManagerRouter
