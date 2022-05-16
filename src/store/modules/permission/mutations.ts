import { MutationTree } from 'vuex'
import { PermissionState } from '../../interface/index'
import { PermissionMutationType } from '../../interface/mutation-types'
import { RouteRecordRaw } from 'vue-router'
import { constantRoutes } from '@/router'


export type Mutations<S = PermissionState> = {
    [PermissionMutationType.SET_ROUTES](state: S, routes: RouteRecordRaw[]): void
}

export const mutations: MutationTree<PermissionState> & Mutations = {
    [PermissionMutationType.SET_ROUTES](state: PermissionState, routes: RouteRecordRaw[]) {
        state.routes = constantRoutes.concat(routes)
        state.permissionList = routes
        console.log("routes",state.permissionList)
    }
}
