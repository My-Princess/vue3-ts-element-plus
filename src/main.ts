import { createApp } from 'vue'
import "tailwindcss/tailwind.css"
import 'normalize.css'
import App from './App.vue'
import router from './router/index'


createApp(App).use(router).mount('#app')
