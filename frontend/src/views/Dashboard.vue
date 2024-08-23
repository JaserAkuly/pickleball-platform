<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="profile.account_type === 'player'">
        <h3>Player Dashboard</h3>
        <!-- Add player-specific content here -->
      </div>
      <div v-else-if="profile.account_type === 'admin'">
        <h3>Admin Dashboard</h3>
        <button @click="createTournament">Create Tournament</button>
        <!-- Add admin-specific content here -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const profile = ref(null)
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()

    const fetchProfile = async () => {
      try {
        const user = supabase.auth.user()
        if (!user) throw new Error('No user logged in')

        const { data, error: fetchError } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .single()

        if (fetchError) throw fetchError
        profile.value = data
      } catch (e) {
        error.value = e.message
      } finally {
        loading.value = false
      }
    }

    const createTournament = () => {
      router.push('/create-tournament')
    }

    onMounted(fetchProfile)

    return { profile, loading, error, createTournament }
  }
}
</script>