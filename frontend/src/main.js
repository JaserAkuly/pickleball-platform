import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { supabase } from './supabase'

const app = createApp(App)

app.use(router)
app.config.globalProperties.$supabase = supabase

app.mount('#app')

console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
console.log('Supabase Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Present' : 'Missing')