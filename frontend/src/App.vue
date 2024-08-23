<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link v-if="!user" to="/login">Login</router-link> |
      <router-link v-if="!user" to="/register">Register</router-link>
      <a v-if="user" href="#" @click.prevent="handleLogout">Logout</a>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from './supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const user = ref(null)
    const router = useRouter()

    onMounted(() => {
      user.value = supabase.auth.user()
      supabase.auth.onAuthStateChange((_, session) => {
        user.value = session?.user || null
      })
    })

    const handleLogout = async () => {
      try {
        await supabase.auth.signOut()
        router.push('/login')
      } catch (error) {
        console.error('Error logging out:', error)
      }
    }

    return { user, handleLogout }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
nav a {
  margin: 0 10px;
}
</style>