import { createRouter, createWebHashHistory,RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

// import.meta.globEager (vite全部导入)  require.context(webpack)
const constantFiles = import.meta.globEager("./constantModules/*.ts")
let constantModules: Array<RouteRecordRaw> = [] 
Object.keys(constantFiles).forEach((key) => {
  if (key === './constantModules/index.ts') return
  constantModules = constantModules.concat(constantFiles[key]?.default)
})

const routes = [
    {
        name: '/redirect',
        path: '/',
        component: Layout,
        meta: {hidden: true},
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/Index.vue')
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
              affix: true
            }
          }
        ]
    },
    ...constantModules
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router