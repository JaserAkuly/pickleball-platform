<!-- src/components/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h1>Welcome, {{ user.name }}</h1>
    <p>Account Type: {{ user.account_type }}</p>
    <button v-if="!user.dupr_connected" @click="handleConnectDUPR">Connect DUPR</button>
    
    <div v-if="user.account_type === 'player'">
      <h2>Player Dashboard</h2>
      <button @click="viewTournaments">View Tournaments</button>
      <button @click="viewClubs">View Clubs</button>
      <button @click="viewLeagues">View Leagues</button>
    </div>
    
    <div v-if="user.account_type === 'admin'">
      <h2>Admin Dashboard</h2>
      <button @click="createTournament">Create Tournament</button>
      <button @click="createClub">Create Club</button>
      <button @click="createLeague">Create League</button>
      <button @click="manageBrackets">Manage Brackets</button>
    </div>

    <div v-if="showTournaments">
      <h3>Tournaments</h3>
      <ul>
        <li v-for="tournament in tournaments" :key="tournament.id">
          {{ tournament.name }}
          <button v-if="user.account_type === 'player'" @click="signUpForTournament(tournament.id)">Sign Up</button>
        </li>
      </ul>
    </div>

    <div v-if="showClubs">
      <h3>Clubs</h3>
      <ul>
        <li v-for="club in clubs" :key="club.id">
          {{ club.name }}
        </li>
      </ul>
    </div>

    <div v-if="showLeagues">
      <h3>Leagues</h3>
      <ul>
        <li v-for="league in leagues" :key="league.id">
          {{ league.name }}
          <button v-if="user.account_type === 'player'" @click="signUpForLeague(league.id)">Sign Up</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getProfile, connectDUPR, getTournaments, getClubs, getLeagues, signUpForEvent } from '../api'

export default {
  name: 'Dashboard',
  setup() {
    const user = ref(null)
    const tournaments = ref([])
    const clubs = ref([])
    const leagues = ref([])
    const showTournaments = ref(false)
    const showClubs = ref(false)
    const showLeagues = ref(false)

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

    const viewTournaments = async () => {
      try {
        const data = await getTournaments()
        tournaments.value = data
        showTournaments.value = true
        showClubs.value = false
        showLeagues.value = false
      } catch (error) {
        console.error('Error fetching tournaments:', error)
      }
    }

    const viewClubs = async () => {
      try {
        const data = await getClubs()
        clubs.value = data
        showClubs.value = true
        showTournaments.value = false
        showLeagues.value = false