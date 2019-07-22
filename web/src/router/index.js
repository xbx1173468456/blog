import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
/* 系统管理 */
import sysManagerRouter from './modules/eoaManager'
/* 协同办公 */
import eoaManagerRouter from './modules/sysManager'
/*企业管理*/
import brpManagerRouter from './modules/brpManager'
/*施工管理*/
import bpmaManagerRouter from './modules/bpmaManager'
/*业主管理*/
import ownerManagerRouter from './modules/ownerManager'

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
        meta: { noCache: true}
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/user/login/index'),
    meta: { noCache: true}
  },
  {
    path: '/register',
    component: () => import('@/views/user/register/index'),
    meta: { noCache: true}
  },
  {
    path: '/choose',
    component: () => import('@/views/user/register/choose'),
    meta: { noCache: true}
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404')
  },
  sysManagerRouter,
  eoaManagerRouter,
  brpManagerRouter,
  bpmaManagerRouter,
  ownerManagerRouter,
  { path: '*', redirect: '/404'}
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
