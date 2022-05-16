import { RouteRecordRaw } from 'vue-router'
import Layout from '@/layouts/index.vue'

const ProfileRouter: Array<RouteRecordRaw> = [
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'noredirect',
    name:"ClipboardDemo",
    children: [
      {
        path: 'index',
        component: () => import(/* webpackChunkName: "clipboard" */ '@/views/clipboard/Index.vue'),
        name: 'Clipboard',
        meta: {
          title: 'clipboard',
          icon: '#iconcopy'
        }
      }
    ]
  }
]

export default ProfileRouter
