import { ActionTree, ActionContext } from 'vuex'
import {asyncRoutes,constantRoutes} from '@/router/index'
import { RootState } from '@/store'
import { Mutations } from "./mutations"
import { PermissionState } from "../../interface/index"
import {PermissionMutationType } from "../../interface/mutation-types"
import { PermissionActionType } from "../../interface/action-types"
import { recursionRouter } from "@/utils/recursion-router"
import {permissionData} from '@/api/user/index'


type AugmentedActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1],
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<PermissionState, RootState>, 'commit'>

export interface Actions {
    [PermissionActionType.ACTION_SET_ROUTES](
        { commit }: AugmentedActionContext): void
}

export const actions: ActionTree<PermissionState, RootState> & Actions = {
   async [PermissionActionType.ACTION_SET_ROUTES](
        { commit }: AugmentedActionContext) {
        // 获取权限路由
        let res = await permissionData().then((res)=>{
            let permissionList = res.data;
            // 1.获取的路由数据和异步路由对比 获取最终可完整访问的路由
            let routes = recursionRouter(permissionList, asyncRoutes)
            //  console.log('routes',routes)
             //  router.addRoute(routes) (弃用)
            commit(PermissionMutationType.SET_ROUTES, routes)
            return routes
        })


       
    }
}

