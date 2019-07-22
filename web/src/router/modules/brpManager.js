import Layout from '@/views/layout/Layout'

const eoaManagerRouter = {
  path: '/brpManager',
  component: Layout,
  redirect: '/brpManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/brpManager/index'),
      name: 'brpManagerIndex',
      meta: { title: '企业首页', icon: 'zip', noCache: false, affix: false }
    },
    {
      path: 'brpqualificationManager',
      component: () => import('@/views/brpManager/brpqualificationManager/index'),
      name: 'brpqualificationManager',
      meta: {title: '资证管理'},
      children: [
        {
          path: 'brpqualificationtypeManager',
          component: () => import('@/views/brpManager/brpqualificationManager/brpqualificationtypeManager/index'),
          name: 'brpqualificationtypeManager',
          meta: { title: '资证类型', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'brpqualificationinfoManager',
          component: () => import('@/views/brpManager/brpqualificationManager/brpqualificationinfoManager/index'),
          name: 'brpqualificationinfoManager',
          meta: { title: '资证档案列表', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'brpqualificationinfoManager/id/:id*',
          component: () => import('@/views/brpManager/brpqualificationManager/brpqualificationinfoManager/details'),
          name: 'brpqualificationinfoDetails',
          meta: { title: '资证详情', icon: 'dashboard', noCache: false, affix: false }
        },
        {
          path: 'dayManager',
          component: () => import('@/views/brpManager/brpqualificationManager/dayManager/index'),
          name: 'dayManager',
          meta: { title: '日常管理'},
          children: [
            {
              path: 'useRecordManager',
              component: () => import('@/views/brpManager/brpqualificationManager/dayManager/useRecordManager/index'),
              name: 'useRecordManager',
              meta: { title: '使用记录', icon: 'dashboard', noCache: false, affix: false }
            },
            {
              path: 'useRecordManager/id/:id*',
              component: () => import('@/views/brpManager/brpqualificationManager/dayManager/useRecordManager/details'),
              name: 'useRecordManagerDetails',
              meta: { title: '使用详情', icon: 'dashboard', noCache: false, affix: false }
            }
          ]
        }
      ]
    }
  ]
}

export default eoaManagerRouter
