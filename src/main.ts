// import 'virtual:windi.css'
// import "tailwindcss/tailwind.css"
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import './assets/css/index.less'
import 'virtual:windi-utilities.css';
import { createApp } from 'vue'


import 'normalize.css'
// import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')