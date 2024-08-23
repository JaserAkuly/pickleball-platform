<!-- src/components/UserProfile.vue -->
<template>
  <div class="user-profile">
    <h2>User Profile</h2>
    <div v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Account Type:</strong> {{ user.account_type }}</p>
      <p><strong>DUPR Connected:</strong> {{ user.dupr_connected ? 'Yes' : 'No' }}</p>
      <button v-if="!user.dupr_connected" @click="handleConnectDUPR">Connect DUPR</button>
      
      <div v-if="user.account_type === 'player'">
        <h3>Available Actions</h3>
        <button @click="viewTournaments">View Tournaments</button>
        <button @click="viewClubs">View Clubs</button>
        <button @click="viewLeagues">View Leagues</button>
      </div>
      
      <div v-if="user.account_type === 'admin'">
        <h3>Admin Actions</h3>
        <button @click="createTournament">Create Tournament</button>
        <button @click="createClub">Create Club</button>
        <button @click="createLeague">Create League</button>
        <button @click="manageBrackets">Manage Brackets</button>
      </div>
    </div>
    <div v-else>
      <p>Please log in to view your profile.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getProfile, connectDUPR } from '../api'

export default {
  name: 'UserProfile',
  setup() {
    const user = ref(null)

    const fetchProfile = async () => {
      try {
        const userData = await getProfile()
        user.value = userData
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    const handleConnectDUPR = async () => {
      try {
        const updatedUser = await connectDUPR()
        user.value = updatedUser
      } catch (error) {
        console.error('Error connecting DUPR:', error)
      }
    }

    const viewTournaments = () => {
      // Implement navigation to tournaments view
    }

    const viewClubs = () => {
      // Implement navigation to clubs view
    }

    const viewLeagues = () => {
      // Implement navigation to leagues view
    }

    const createTournament = () => {
      // Implement tournament creation logic
    }

    const createClub = () => {
      // Implement club creation logic
    }

    const createLeague = () => {
      // Implement league creation logic
    }

    const manageBrackets = () => {
      // Implement bracket management logic
    }

    onMounted(fetchProfile)

    return {
      user,
      handleConnectDUPR,
      viewTournaments,
      viewClubs,
      viewLeagues,
      createTournament,
      createClub,
      createLeague,
      manageBrackets
    }
  }
}
</script>

<style scoped>
.user-profile {
  padding: 20px;
}

button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>