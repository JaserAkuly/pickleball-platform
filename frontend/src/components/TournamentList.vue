<template>
  <div class="tournament-list">
    <h2>Tournaments</h2>
    <button @click="createTournament">Create New Tournament</button>
    <div v-if="tournaments.length">
      <div v-for="tournament in tournaments" :key="tournament.id" class="tournament-item">
        <h3>{{ tournament.name }}</h3>
        <p><strong>Date:</strong> {{ formatDate(tournament.start_date) }} - {{ formatDate(tournament.end_date) }}</p>
        <p><strong>Location:</strong> {{ tournament.location }}</p>
        <button @click="viewTournamentDetails(tournament.id)">View Details</button>
      </div>
    </div>
    <div v-else>
      <p>No tournaments available at the moment.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getTournaments } from '../api'

export default {
  name: 'TournamentList',
  setup() {
    const tournaments = ref([])

    const fetchTournaments = async () => {
      try {
        const tournamentData = await getTournaments()
        tournaments.value = tournamentData
      } catch (error) {
        console.error('Error fetching tournaments:', error)
      }
    }

    const createTournament = () => {
      // Implement create tournament logic here
      console.log('Create tournament clicked')
    }

    const viewTournamentDetails = (id) => {
      // Implement view tournament details logic here
      console.log('View tournament details clicked for id:', id)
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    onMounted(fetchTournaments)

    return {
      tournaments,
      createTournament,
      viewTournamentDetails,
      formatDate
    }
  }
}
</script>

<style scoped>
.tournament-list {
  margin-top: 20px;
}

.tournament-item {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
}

button {
  background-color: #008CBA;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

button:hover {
  background-color: #007B9A;
}
</style>