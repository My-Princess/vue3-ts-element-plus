import router from './router/index'
// import store from './store/index'
import { useStore } from './store'
// import { AppRouteRecordRaw } from '@/store/interface/index';
import { PermissionActionType } from './store/interface/action-types'
import { getToken } from './utils/auth'
import {
  ElMessage,
  ElLoading
} from 'element-plus'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false
})
// 白名单
const whiteList = ['/login']
router.beforeEach(async (to: any, from: any, next: any) => {
  NProgress.start()
  const store = useStore()
  const hasetoken = getToken('USER-TOKEN');
  // console.log("USER-TOKEN", hasetoken)

  if (hasetoken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      // next(from.fullPath)
    } else {
      if (store.state.permission.permissionList.length == 0) {
        const loading = ElLoading.service();
        await store.dispatch(PermissionActionType.ACTION_SET_ROUTES, undefined)

        store.state.permission.permissionList.forEach((route) => {
          router.addRoute(route)
        })
        loading.close(); // 关闭loading
        next({
          ...to,
          replace: true
        }) // hack方法 确保addRoutes已完成
      } else {
        next();
      }
    }



    next();
  } else {
    //  方法一：根据路由判断是否是白名单 to.matched.length > 0 && !to.matched.some((record) => record.meta.affix) 
    //  方法二:
    // 在免登录白名单，直接进入
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.fullPath}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})