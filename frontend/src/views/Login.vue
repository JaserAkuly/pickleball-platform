<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <button type="submit">Login</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)
    const router = useRouter()

    const handleLogin = async () => {
      try {
        error.value = null
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        })
        if (signInError) throw signInError

        console.log('Login successful:', data)
        router.push('/dashboard')
      } catch (e) {
        error.value = e.message
        console.error('Login error:', e)
      }
    }

    return { email, password, error, handleLogin }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 0 auto;
}
input, button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
.error {
  color: red;
}
</style>