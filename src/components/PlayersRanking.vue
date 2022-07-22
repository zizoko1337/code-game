<template>
      <div class="ranking">
        <h3>🎺 Top 5 Players 🎺</h3>
        <p>
          🥇{{ ' ' + players[0].name + ' ' + players[0].score + '💰' }}
        </p>
        <p>
          🥈{{ ' ' + players[1].name + ' ' + players[1].score + '💰' }}
        </p>
        <p>
          🏅{{ ' ' + players[2].name + ' ' + players[2].score + '💰' }}
        </p>
        <p>
          🤝{{ ' ' + players[3].name + ' ' + players[3].score + '💰' }}
        </p>
        <p>
          🤝{{ ' ' + players[4].name + ' ' + players[4].score + '💰' }}
        </p>
      </div>
</template>

<script>
export default {
    props: ['players'],
    data(){
      return {
        players2: this.props.players,
      }
    },
    mounted(){
      console.log(this.players2[0].score)
    }
        
}

</script>

<style scoped>
.ranking {
  transform: translate(50%, 15%);
  width: 50%;
  border: 3px solid rgb(76, 76, 76);
}
</style>