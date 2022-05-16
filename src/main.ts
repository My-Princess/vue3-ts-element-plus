// import 'virtual:windi.css'
// import "tailwindcss/tailwind.css"
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import './assets/css/index.less'
import 'virtual:windi-utilities.css';
import { createApp } from 'vue'
import './permission'
// import {setupStore} from './store'
import { store } from './store'

import 'normalize.css'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'
const app = createApp(App)
// setupStore(app) // 引入状态管理
app.use(store).use(router).mount('#app')