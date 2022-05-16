import { Module } from "vuex";
import { RouteRecordRaw } from 'vue-router'

import {permissionData} from "@/api/user/index"
import { permissionListState, RootStateTypes } from '../interface/index';
import {asyncRoutes,constantRoutes} from '@/router/index'
import {recursionRouter} from "@/utils/recursion-router"
const permissionModule: Module<permissionListState, RootStateTypes> = {
  state: {
    permissionList: [], // 获取的异步路由
    routes: [],// 导航菜单(异步和同步路由菜单筛选hideen)
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.permissionList = routes
      console.log("www",state.permissionList)
      state.routes = constantRoutes.concat(routes)
    }

  },
  actions: {
    async FETCH_PERMISSION({commit}:any){
      // 获取权限路由
     let res = await permissionData();
     let permissionList = res.data;
     // 1.获取的路由数据和异步路由对比 获取最终可完整访问的路由
     let routes = recursionRouter(permissionList, asyncRoutes)
    //  console.log('routes',routes)
     commit('SET_ROUTES', routes)
    //  router.addRoute(routes) (弃用)
     
    }
  }
}

export default permissionModule