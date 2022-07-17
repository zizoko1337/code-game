<template>
  <div class="hello">
    <div class="arr-box">
      <h1>McArray menu</h1>
      <form @submit.prevent="submitMethod">
        <p>
          ['🍕','🍔','🍟','🌭','🍿','🥓','🍗','🌮','🥐'].<input
            v-if="gameOn"
            type="submit_on_enter"
            v-model="userMethod"
          />
        </p>
      </form>
    </div>
    <div>
      <h1 v-if="!gameOn">GAME OVER your score is {{ playerMoney.length }}</h1>
      <button v-if="!gameOn" @click="fullHp">Start Game</button>
      <h2>Client: {{ clientDialog }}</h2>
      <h2>You: {{ arrOutput }}</h2>
      <h2>Your lives: {{ playerLives.join('') }}</h2>
      <h2>Time left: {{ playerTime.join('') }}</h2>
      <p>Methods: at(index), pop(), shift(), splice(index,elements)</p>
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
        'Let me have some ',
      ],
      userMethod: null,
      answer: null,
      gameArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      tempArr: ['🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🍗', '🌮', '🥐'],
      arrOutput: null,
      previousOrder: null,
      playerLives: [],
      playerTime: [],
      playerMoney: [],
      gameOn: false,
    };
  },

  methods: {
    submitMethod() {
      if(this.userMethod == null){this.userMethod = "at(100)"}
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`;
      if (this.userMethod.length < 15 && !this.userMethod.includes('for') && !this.userMethod.includes('while') && !this.userMethod.includes(';')) {
        this.arrOutput = eval(this.answer);
      } else {
        this.playerLives = [];
      }
      if (Array.isArray(this.clientOrder)) {
        if (this.clientOrder.join(',') == this.arrOutput) {
          for (var i = 0; i < this.clientOrder.length; i++) {
            this.playerMoney.push('💰');
          }
          this.clientHappy();
        } else {
          this.playerLives.shift();
          this.clientAngry();
        }
      } else {
        if (this.clientOrder == this.arrOutput) {
          this.playerMoney.push('💰');
          this.clientHappy();
        } else {
          this.playerLives.shift();
          this.clientAngry();
        }
      }
      if (this.playerLives.length < 1) {
        console.log('GAME OVER');
        this.gameOn = false;
      }
      (this.userMethod = null), this.nextSequence();
    },
    clientOrderMethod() {
      setTimeout(this.orderError, 500);
      this.arrOutput = 'Working on it...';
      this.gameOn = true;
      const typeOfOrder = Math.floor(Math.random() * 4);
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
          // random item
          this.clientOrder = this.gameArr.at(
            Math.floor(Math.random() * this.gameArr.length)
          );
          this.noRepeat(this.clientOrder);
          this.clientDialog = this.randomDialog() + this.clientOrder;
          this.previousOrder = this.clientOrder;
          break;
        case 3:
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
    nextSequence() {
      if (this.gameOn) {
        setTimeout(this.clientOrderMethod, 1500);
      }
    },
    randomDialog() {
      let dialogNumber = Math.ceil(
        Math.random() * (this.clientDialogs.length - 1)
      );
      return this.clientDialogs[dialogNumber];
    },
    clientHappy() {
      this.clientDialog = 'Thank you 😁';
      this.arrOutput = 'Enjoy your meal ' + this.arrOutput;
    },
    clientAngry() {
      this.clientDialog = 'This is not what i wanted! 😡';
      this.arrOutput = "I'm sorry " + this.arrOutput;
    },
    noRepeat(order) {
      if (order == this.previousOrder) {
        this.clientOrder = this.gameArr.at(
          Math.floor(Math.random() * this.gameArr.length)
        );
        console.log(order + ' changed to ' + this.clientOrder);
      }
    },
    fullHp() {
      this.playerLives = ['💖', '💖', '💖'];
      this.playerTime = ['⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳']
      this.playerMoney = [];
      this.clientOrderMethod();
      setTimeout(this.timeDecrease, 4000);
      setTimeout(this.timeDecrease, 8000);
      setTimeout(this.timeDecrease, 12000);
      setTimeout(this.timeDecrease, 16000);
      setTimeout(this.timeDecrease, 20000);
      setTimeout(this.timeDecrease, 24000);
      setTimeout(this.timeDecrease, 28000);
      setTimeout(this.timeDecrease, 32000);
      setTimeout(this.timeDecrease, 36000);
      setTimeout(this.timeDecrease, 40000);
      setTimeout(this.timeDecrease, 44000);
      setTimeout(this.timeDecrease, 48000);
      setTimeout(this.timeDecrease, 52000);
      setTimeout(this.timeDecrease, 56000);
      setTimeout(this.timeDecrease, 60000);
      setTimeout(this.gameOver, 60000);
    },    
    timeDecrease(){
      this.playerTime.pop();
    },
    gameOver(){
      this.playerLives = [];
    },
    orderError() {
      if (
        this.clientDialog == 'This is not what i wanted! 😡' ||
        this.clientDialog == 'Thank you 😁'
      ) {
        this.nextSequence();
      }
    },
  }
}

</script>

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
button {
  border-radius: 0px;
  transform: scale(2);
  transition: 1s;
}
button:hover {
  transform: scale(2.3);
}
</style>
