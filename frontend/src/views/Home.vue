<template>
  <div class="home">
    <h2>Upcoming Tournaments</h2>
    <div v-if="loading">Loading tournaments...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else class="tournament-list">
      <div v-for="tournament in tournaments" :key="tournament.id" class="tournament-card" @click="viewTournament(tournament.id)">
        <h3>{{ tournament.name }}</h3>
        <p>{{ tournament.start_date }} - {{ tournament.end_date }}</p>
        <p>{{ tournament.location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'Home',
  setup() {
    const tournaments = ref([])
    const loading = ref(true)
    const error = ref(null)
    const router = useRouter()

    const fetchTournaments = async () => {
      try {
        const { data, error: fetchError } = await supabase
          .from('tournaments')
          .select('*')
          .order('start_date', { ascending: true })

        if (fetchError) throw fetchError
        tournaments.value = data
      } catch (e) {
        error.value = 'Failed to fetch tournaments'
        console.error(e)
      } finally {
        loading.value = false
      }
    }

    const viewTournament = (id) => {
      router.push(`/tournament/${id}`)
    }

    onMounted(fetchTournaments)

    return { tournaments, loading, error, viewTournament }
  }
}
</script>

<style scoped>
.tournament-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.tournament-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
}

.tournament-card:hover {
  background-color: #f0f0f0;
}
</style>