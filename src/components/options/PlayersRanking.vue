<template>
  <div class="ranking">
    <h3>🎺 Top 5 Players 🎺</h3>
    <p>🥇{{ ' ' + topPlayers[0].name + ' ' + topPlayers[0].score + '💰' }}</p>
    <p>🥈{{ ' ' + topPlayers[1].name + ' ' + topPlayers[1].score + '💰' }}</p>
    <p>🏅{{ ' ' + topPlayers[2].name + ' ' + topPlayers[2].score + '💰' }}</p>
    <p>🤝{{ ' ' + topPlayers[3].name + ' ' + topPlayers[3].score + '💰' }}</p>
    <p>🤝{{ ' ' + topPlayers[4].name + ' ' + topPlayers[4].score + '💰' }}</p>
  </div>
</template>

<script>
export default {
  name: 'PlayerRanking',
  props: ['players'],
  data() {
    return {
      topPlayers: this.players,
    };
  },
};
</script>

<style scoped>
.ranking {
  transform: translate(50%, 15%);
  width: 50%;
  border: 3px solid rgb(76, 76, 76);
}
</style>
