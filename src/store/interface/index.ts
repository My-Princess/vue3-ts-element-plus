import { defineComponent } from "vue";
import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
type Component<T extends any = any> =
    | ReturnType<typeof defineComponent>
    | (() => Promise<typeof import('*.vue')>)
    | (() => Promise<T>)

interface RouteMeta {
    auth: string[]
    icon: string
    isLink?: string
    isAffix: boolean
    isHide: boolean
    isKeepAlive: boolean
    title: string
    index?: string | number
    roles?: string[]
    noCache?: boolean
}

type Recordable<T = any> = {
    [x: string]: T;
}

// 用户信息类型
export interface Userinfo {
    token?:string,
    name: string,
    avatar: string,
    roles: Array<any>,
    permissions: Array<any>,
}
export interface UserState {
    token:string,
    name: string,
    avatar: string,
    roles: Array<any>,
    permissions: Array<any>,
    introduction:string,
    email:string
}
// 权限类型
export interface permissionListState{
    permissionList: RouteRecordRaw[],
    routes: RouteRecordRaw[],
}
export interface PermissionState {
    routes: RouteRecordRaw[]
    permissionList: RouteRecordRaw[]
}

// 动态菜单类型
export interface Menu {
    name: String
    path: string,
    orderNo?: Number,
    query?: Partial<Recordable> | undefined
    meta: Partial<RouteMeta>
    component?: Component | string
    children?: Menu[]
}

// 主接口(顶级类型声明)
export interface RootStateTypes {
    user: Userinfo,
    permission:permissionListState,
}