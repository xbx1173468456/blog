import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/register', '/choose']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      if (store.getters.rootMenus && store.getters.rootMenus.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetInfo').then(response => { // 拉取user_info
          // store.dispatch('GenerateRoutes').then(() => { // 生成可访问的路由表
          //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
          //   next({...to, replace: true})
          // })
          store.dispatch('RootMenusSelected', to.fullPath.split('/')[1]);
          next()
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            next({ path: '/' })
          })
        })
      } else {
        store.dispatch('RootMenusSelected', to.fullPath.split('/')[1]);
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach((to,from) => {
  if(from.path != '/register' &&from.path != '/login' && from.path != '/' && to.path == '/login'){
    window.location.reload();
  }
  NProgress.done()
})
