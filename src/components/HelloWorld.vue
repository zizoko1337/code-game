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
      <h2>Client: {{ clientDialog }}</h2>
      <h2>You: Here is your order {{ arrOutput }}</h2>
      <h2>Your lives: {{ playerLives.join('') }}</h2>
      <h2>Your money: {{ playerMoney.join('') }}</h2>
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
      clientDialogs: [
        'Can i get aaaaaa... ',
        'I order ',
        'Give me ',
        'Im hungry, i want ',
        'Just give me ',
        'I could eat some ',
        'I want to buy ',
        'I would like some ',
        'I would kill for some ',
        'Gimme some ',
        'Gimme some of those ',
        'Shut up and take my money for ',
      ],
      userMethod: null,
      answer: null,
      gameArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      tempArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      arrOutput: null,
      previousOrder: null,
      playerLives: ['💖', '💖', '💖'],
      playerMoney: [],
      gameOn: false,
    };
  },

  methods: {
    submitMethod() {
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`;
      this.arrOutput = eval(this.answer);
      if (Array.isArray(this.clientOrder)) {
        if (this.clientOrder.join(',') == this.arrOutput) {
          for (var i = 0; i < this.clientOrder.length; i++) {
            this.playerMoney.push('💰');
          }
        } else {
          this.playerLives.shift();
        }
      } else {
        this.clientOrder == this.arrOutput
          ? this.playerMoney.push('💰')
          : this.playerLives.shift();
      }
      if (this.playerLives.length < 1) {
        console.log('GAME OVER');
        this.gameOn = false;
      }
    },
    clientOrderMethod() {
      this.gameOn = true;
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
          this.clientOrder = this.gameArr.at(
            Math.floor(Math.random() * this.gameArr.length)
          );
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.previousOrder = this.clientOrder;
          break;
        case 4:
          //many items
          var start = Math.floor(Math.random() * (this.gameArr.length - 1));
          var end = 10;
          while (start + end > this.gameArr.length && end > 0) {
            end = Math.ceil(Math.random() * this.gameArr.length);
          }
          this.clientOrder = this.tempArr.splice(start, end);
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.tempArr = ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'];
          this.previousOrder = this.clientOrder;
          break;
        default:
      }
    },
    randomDialog() {
      let dialogNumber = Math.ceil(
        Math.random() * (this.clientDialogs.length - 1)
      );
      return this.clientDialogs[dialogNumber];
    },
    noRepeat(order) {
      if (order == this.previousOrder) {
        this.clientOrder = this.gameArr.at(
          Math.floor(Math.random() * this.gameArr.length)
        );
        console.log(order + ' changed to ' + this.clientOrder);
      }
    },
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
