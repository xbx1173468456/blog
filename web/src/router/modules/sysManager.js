/* jshint esversion: 6 */
import Layout from '@/views/layout/Layout';

const sysManagerRouter = {
  path: '/sysManager',
  component: Layout,
  redirect: '/sysManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/sysManager/index'),
      name: 'SysManagerIndex',
      meta: { title: '系统首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'sysInfo',
      component: () => import('@/views/sysManager/sysInfo/index'), // Parent router-view
      name: 'SysInfoIndex',
      meta: { title: '系统信息' },
      children: [
        {
          path: 'prodInfo',
          component: () => import('@/views/sysManager/sysInfo/prodInfo/list'),
          name: 'ProdInfoList',
          meta: { title: '产品信息', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'unitInfo',
          component: () => import('@/views/sysManager/sysInfo/unitInfo/index'),
          name: 'unitInfo',
          meta: { title: '单位信息', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'authInfo',
          component: () => import('@/views/sysManager/sysInfo/authInfo/index'),
          name: 'authInfo',
          meta: { title: '授权信息', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'sysInitialization',
      component: () => import('@/views/sysManager/sysInitialization/index'), // Parent router-view
      name: 'SysInitialization',
      meta: { title: '系统初始化' },
      children: [
        {
          path: 'dataClean',
          component: () => import('@/views/sysManager/sysInitialization/dataClean/index'),
          name: 'DataClean',
          meta: { title: '数据清理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'dataInitialization',
          component: () => import('@/views/sysManager/sysInitialization/dataInitialization/index'),
          name: 'DataInitialization',
          meta: { title: '数据初始化', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'groupAuth',
      component: () => import('@/views/sysManager/groupAuth/index'), // Parent router-view
      name: 'GroupAuthIndex',
      meta: { title: '组织权限' },
      children: [
         {
          path: 'menuManager',
          component: () => import('@/views/sysManager/groupAuth/menu/index'),
          name: 'MenuManager',
          meta: { title: '菜单管理', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'groupManager',
          component: () => import('@/views/sysManager/groupAuth/groupManager/index'),
          name: 'GroupManager',
          meta: { title: '角色权限', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'group',
          component: () => import('@/views/sysManager/groupAuth/group/index'),
          name: 'Group',
          meta: { title: '权限管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'groupTypeManager',
          component: () => import('@/views/sysManager/groupAuth/groupType/index'),
          name: 'GroupTypeManager',
          meta: { title: '角色类型管理', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'groupMechanism',
          component: () => import('@/views/sysManager/groupAuth/groupMechanism/index'),
          name: 'GroupMechanism',
          meta: { title: '组织机构', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'userManager',
          component: () => import('@/views/sysManager/groupAuth/userManager/index'),
          name: 'UserManager',
          meta: { title: '操作人员', icon: 'dashboard', noCache: false, affix: false }
        }, {
          path: 'userManager/id/:id*',
          component: () => import('@/views/sysManager/groupAuth/userManager/detail'),
          name: 'UserManagerDetail',
          meta: { title: '操作人员-详情', icon: 'dashboard', noCache: false, affix: false }
        }
        , {
          path: 'gateLog',
          component: () => import('@/views/sysManager/groupAuth/gateLog/index'),
          name: 'ateLog',
          meta: { title: '操作日志', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'resourceDictionary',
      component: () => import('@/views/sysManager/resourceDictionary/index'), // Parent router-view
      name: 'ResourceDictionary',
      meta: { title: '资源字典' },
      children: [
        {
          path: 'materialType',
          component: () => import('@/views/sysManager/resourceDictionary/materialType/index'),
          name: 'MaterialType',
          meta: { title: '物资类型', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'materialDictionary',
          component: () => import('@/views/sysManager/resourceDictionary/materialDictionary/index'),
          name: 'MaterialDictionary',
          meta: { title: '物资字典', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'sysPersonTypeManager',
          component: () => import('@/views/sysManager/resourceDictionary/sysPersonTypeManager/index'),
          name: 'SysPersonTypeManager',
          meta: { title: '人员类型', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'sysCostTypeManager',
          component: () => import('@/views/sysManager/resourceDictionary/sysCostTypeManager/index'),
          name: 'SysCostTypeManager',
          meta: { title: '费用类型', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'enterpriseInfo',
      component: () => import('@/views/sysManager/enterpriseInfo/index'), // Parent router-view
      name: 'EnterpriseInfo',
      meta: { title: '往来单位' },
      children: [
        {
          path: 'sysUnitTypeInfo',
          component: () => import('@/views/sysManager/enterpriseInfo/sysUnitTypeInfo/index'),
          name: 'SysUnitTypeInfo',
          meta: { title: '单位类型', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'sysEnterpriseInfo',
          component: () => import('@/views/sysManager/enterpriseInfo/sysEnterpriseInfo/index'),
          name: 'SysEnterprise',
          meta: { title: '单位信息', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'sysEnterpriseInfo/id/:id*',
          component: () => import('@/views/sysManager/enterpriseInfo/sysEnterpriseDetail/index'),
          name: 'SysEnterpriseDetail',
          meta: { title: '单位信息-详情', icon: 'dashboard', noCache: false, affix: false}
        },
      ]
    },
    {
      path: 'sysBaseSet',
      component: () => import('@/views/sysManager/sysBaseSet/index'), // Parent router-view
      name: 'sysBaseSet',
      meta: { title: '基础设置' },
      children: [
        {
          path: 'dataDictionaryManager',
          component: () => import('@/views/sysManager/sysBaseSet/dataDictionaryManager/index'),
          name: 'DataDictionaryManager',
          meta: { title: '数据字典', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'measureUnit',
          component: () => import('@/views/sysManager/sysBaseSet/measureUnit/index'),
          name: 'measureUnit',
          meta: { title: '计量单位', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'areaManager',
          component: () => import('@/views/sysManager/sysBaseSet/areaManager/index'),
          name: 'areaManager',
          meta: { title: '业务区域 ', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'monthYearManager',
          component: () => import('@/views/sysManager/sysBaseSet/monthYearManager/index'),
          name: 'monthYearManager',
          meta: { title: '会计期间', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'dataDictionaryManager',
          component: () => import('@/views/sysManager/sysBaseSet/dataDictionaryManager/index'),
          name: 'dataDictionaryManager',
          meta: { title: '数据字典', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'workCalendarManager',
          component: () => import('@/views/sysManager/sysBaseSet/workCalendarManager/index'),
          name: 'workCalendarManager',
          meta: { title: '工作日历', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'districtManager',
          component: () => import('@/views/sysManager/sysBaseSet/districtManager/index'),
          name: 'districtManager',
          meta: { title: '行政区域', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    },
    {
      path: 'approval',
      component: () => import('@/views/sysManager/approval/index'), // Parent router-view
      name: 'approval',
      meta: { title: '审批流程' },
      children: [
        {
          path: 'flowManager',
          component: () => import('@/views/sysManager/approval/flowManager/index'),
          name: 'flowManager1',
          meta: { title: '流程管理', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'process',
          component: () => import('@/views/sysManager/approval/process/index'),
          name: 'process',
          meta: { title: '流程配置', icon: 'dashboard', noCache: false, affix: false }
        }
      ]
    }
  ]
}


export default sysManagerRouter
