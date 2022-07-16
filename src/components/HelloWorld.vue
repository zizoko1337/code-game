<template>
  <div class="hello">
    <div class="arr-box">
      <form @submit.prevent="submitMethod">
        <p>
          ['🪓','🔨','🔧','💣','🔩','🧲'].<input
            type="submit_on_enter"
            v-model="userMethod"
          />
        </p>
      </form>
    </div>
    <div>
      <p>{{ arrOutput }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      userMethod: null,
      answer: null,
      gameArr: ['🪓', '🔨', '🔧', '💣', '🔩', '🧲'],
      arrOutput: 'waiting for method',
    };
  },

  methods: {
    submitMethod(){
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`
      // for(const item of this.gameArr){
      //   this
      // }
      // this.gameArr = this.gameArr.toString();

      // this.answer = "[" + this.gameArr.split(",") + "]." + this.userMethod;
      console.log(this.answer)

      this.arrOutput = eval(this.answer);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.arr-box {
  transform: scale(2);
}
</style>
