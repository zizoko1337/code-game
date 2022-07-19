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
      <h2 class="game-over" v-if="!gameOn && firstStart">GAME OVER your score is {{ playerMoney.length }}</h2>
      <button class="start-button" v-if="!gameOn" @click="fullHp">Start Game</button>
      <h2>Client: {{ clientDialog }}</h2>
      <h2>You: {{ arrOutput }}</h2>
      <h2>Your lives: {{ playerLives.join('') }}</h2>
      <h2>Time left: {{ playerTime.join('') }}</h2> 
      <h2>Your money: {{ playerMoney.join('') }}</h2>
      <button @click="toggleHelp">Help ❔</button>
      <div v-if="helpVisible" class="help">
        <h3>Use array methods to get clients their orders.</h3>
        <p><span class="method-display">at(📌)</span>, 📌 = index of array</p>
        <p><span class="method-display">shift()</span>, returns at first item of array.</p>
        <p><span class="method-display">pop()</span>, returns last item of array</p>
        <p><span class="method-display">splice(📌,💼)</span>, 📌 = index of array. 💼 = amount of items, you want to return</p>
      </div>
    </div>
  </div>
</template>

<script>
import cashSound from '../assets/cash.mp3';
import failSound from '../assets/fail.mp3';

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
      cashSound2: new Audio(cashSound),
      failSound2: new Audio(failSound),
      helpVisible: false,
      firstStart: false,
    };
  },

  methods: {
    submitMethod() {
      if(this.userMethod == null){this.userMethod = "at(100)"}
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`;
      if (/(pop|splice|at|shift)\(([0-9,-]+)?\)/.test(this.answer)) {
        this.arrOutput = eval(this.answer); // Im going to jail for this 👮‍♂️👨‍💼👮‍♂️
      } else {
        this.arrOutput = "🤪";
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
      //this.gameOn = true;
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
      this.cashSound2.play();
      this.clientDialog = 'Thank you 😁';
      this.arrOutput = 'Enjoy your meal ' + this.arrOutput;
    },
    clientAngry() {
      if(this.gameOn)this.failSound2.play();
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
      this.firstStart = true;
      this.gameOn = true;
      this.playerLives = ['💖', '💖', '💖'];
      this.playerTime = ['⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳']
      this.playerMoney = [];
      this.clientOrderMethod();
      this.timeDecrease();
    },    
    timeDecrease(){
      setTimeout(() => {
        this.playerTime.pop();
        if(this.playerLives.length == 0 || this.playerTime.length == 0){
          this.playerTime = [];
          this.playerLives = [];
          this.gameOver;
          this.gameOn = false;
          this.submitMethod();
          this.clientDialog = "Nevermind, it's too late ⌚";
          this.arrOutput = "Time to go home 🚗"
        }else{
          this.timeDecrease(); 
        }
        }, 4000);
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
    toggleHelp(){
      this.helpVisible = !this.helpVisible;
    }
  }
}

</script>

<style scoped>
h3 {
  margin: 15px;
}
button {
  border-radius: 0px;
  transform: scale(2);
  transition: 1s;
  border: 2px solid rgb(76, 76, 76);
}
button:hover {
  transform: scale(2.3);
}
.start-button{
  margin-top: 1rem;
}
.arr-box {
  transform: scale(2);
  margin-bottom: 2rem;
}
.hello {
  animation: roll-in 250ms ease;
  display: flex;
  flex-direction: column;
}
.method-display {
  font-weight: 600;
  color: black;
}
.help {
  transform: translate(50%,15%);
  width: 50%;
  border: 3px solid rgb(76, 76, 76);
}
.game-over {
  animation: hi-there 3s infinite;
  font-size: 3rem;
}

/* animation keyframes */

@keyframes roll-in {
  0% {
    opacity: 0;
    transform: translateX(-100%) rotate(-120deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0px) rotate(0deg);
  }
}
@keyframes hi-there {
  30% { transform: scale(1.2); }
  40%, 60% { transform: rotate(-20deg) scale(1.2); }
  50% { transform: rotate(20deg) scale(1.2); }
  70% { transform: rotate(0deg) scale(1.2); }
  100% { transform: scale(1); }
}
</style>
