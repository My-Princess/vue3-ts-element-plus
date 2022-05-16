import { createRouter, createWebHashHistory,RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

// import.meta.globEager (vite全部导入)  require.context(webpack)
const constantFiles = import.meta.globEager("./constantModules/*.ts")
let constantModules: Array<RouteRecordRaw> = [] 
Object.keys(constantFiles).forEach((key) => {
  if (key === './constantModules/index.ts') return
  constantModules = constantModules.concat(constantFiles[key]?.default)
})


// 引入异步路由
const asyncFiles = import.meta.globEager("./permissionModules/*.ts")
let permissionModules: Array<RouteRecordRaw> = [] 
Object.keys(asyncFiles).forEach((key) => {
  if (key === './permissionModules/index.ts') return
  permissionModules = permissionModules.concat(asyncFiles[key]?.default)
})



export const constantRoutes:Array<RouteRecordRaw> = [
    {
        path: '/redirect',
        component: Layout,
        meta: {hidden: true},
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue')
              }
        ]
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
          {
            path: 'dashboard',
            component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
            name: 'Dashboard',
            meta: {
              title: 'dashboard',
              // 判断是否是白名单 true(不是)
              affix: true,
              
            }
          }
        ]
    },
    ...constantModules
]

export const asyncRoutes:Array<RouteRecordRaw> = [
  ...permissionModules
]


const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
})

// 删除/重置路由
export function resetRoute(): void{
   router.getRoutes().forEach((route)=>{
     const {name} = route
     if(name){
       router.hasRoute(name) && router.removeRoute(name)
     }
   })
}

export default router