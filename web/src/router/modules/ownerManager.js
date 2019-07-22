import Layout from '@/views/layout/Layout';

const ownerManagerRouter = {
  path: '/ownerManager',
  component: Layout,
  redirect: '/ownerManager/index',
  children: [
    {
      path: 'index',
      component: () => import('@/views/ownerManager/index'),
      name: 'SysManagerIndex',
      meta: { title: '业主首页', icon: 'zip', noCache: false, affix: false }
    },
  ]
}


export default ownerManagerRouter
