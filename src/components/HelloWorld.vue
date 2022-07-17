<template>
  <div class="hello">
    <div class="arr-box">
      <h1>McArray menu</h1>
      <form @submit.prevent="submitMethod">
        <p>
          ['🍕','🍔','🍟','🌭','🍿','🥓','🍗','🌮','🥐'].<input
            type="submit_on_enter"
            v-model="userMethod"
          />
        </p>
      </form>
    </div>
    <div>
      <button @click="clientOrderMethod">Start game</button>
      <p>Client: {{clientDialog}}</p>
      <p>You: Here is your order {{ arrOutput }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      clientOrder: null,
      clientDialog: null,
      clientDialogs: ["Can i get aaaaaa... ","I order ","Give me ","Im hungry, i want ","Just give me ","I could eat some ","I want to buy ","I would like some ","I would kill for some ","Gimme some ","Gimme some of those ","Shut up and take my money for "],
      userMethod: null,
      answer: null,
      gameArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      tempArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      arrOutput: null,
      previousOrder: null,
    };
  },

  methods: {
    submitMethod() {
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`;
      this.arrOutput = eval(this.answer);
    },
    clientOrderMethod() {
      const typeOfOrder = Math.floor(Math.random() * 6);
      switch (typeOfOrder) {
        case 0:
          // first item
          this.clientOrder = this.gameArr[0];
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.previousOrder = this.clientOrder;
          break;
        case 1:
          // last item
          this.clientOrder = this.gameArr.at(-1);
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.previousOrder = this.clientOrder;
          break;
        case 2:
        case 3:
          // random item
          this.clientOrder = this.gameArr.at(Math.floor(Math.random() * this.gameArr.length));
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.previousOrder = this.clientOrder;
          break;
        case 4:
          //couple items
          var start = Math.floor(Math.random() * (this.gameArr.length -1));
          var end = 10;
          while((start + end > this.gameArr.length) && end > 0){
            end = Math.ceil(Math.random() * this.gameArr.length);
          }
          this.clientOrder = this.tempArr.splice(start,end);
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.tempArr = ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'];
          this.previousOrder = this.clientOrder;
          break;
        default:
        // code block
      }
    },
    randomDialog(){
      let x = Math.ceil(Math.random() * (this.clientDialogs.length -1));
      return this.clientDialogs[x];
    },
    noRepeat(order){
      if(order == this.previousOrder){
        this.clientOrder = this.gameArr.at(Math.floor(Math.random() * this.gameArr.length));
        console.log(order +" changed to " + this.clientOrder);
      }
    }
  },
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
  margin-bottom: 5rem;
}
</style>
