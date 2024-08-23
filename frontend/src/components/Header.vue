<template>
  <header>
    <h1>Pickleball Experience Platform</h1>
    <nav>
      <ul>
        <li><a href="#profile">Profile</a></li>
        <li><a href="#tournaments">Tournaments</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  background-color: #4CAF50;
  color: white;
  padding: 1em;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}

nav ul li a {
  color: white;
  text-decoration: none;
}
</style>