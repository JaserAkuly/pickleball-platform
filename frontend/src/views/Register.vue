<template>
  <div class="register">
    <h2>Register</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Password" required>
      <select v-model="accountType" required>
        <option value="player">Player</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="success" class="success">{{ success }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const email = ref('')
    const password = ref('')
    const accountType = ref('player')
    const error = ref(null)
    const success = ref(null)
    const router = useRouter()

    const handleRegister = async () => {
      try {
        error.value = null
        success.value = null
        
        // Sign up the user
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        })

        if (signUpError) throw signUpError

        if (user) {
          // Insert the user profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({ user_id: user.id, account_type: accountType.value })

          if (profileError) throw profileError

          success.value = "Registration successful! Please check your email to confirm your account."
          setTimeout(() => router.push('/login'), 2000)
        } else {
          // This can happen if email confirmation is required
          success.value = "Registration initiated. Please check your email to confirm your account."
        }
      } catch (e) {
        error.value = e.message
        console.error('Registration error:', e)
      }
    }

    return { email, password, accountType, error, success, handleRegister }
  }
}
</script>

<style scoped>
.register {
  max-width: 300px;
  margin: 0 auto;
}
input, select, button {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
.error {
  color: red;
}
.success {
  color: green;
}
</style>