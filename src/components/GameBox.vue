<template>
  <div class="game">
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
      <button class="top-players-button" @click="toggleRanking">
        Ranking 🏆
      </button>
      <HelpInstructions v-if="helpVisible"></HelpInstructions>
      <PlayerRanking v-if="rankingVisible" :players="topPlayers"></PlayerRanking>
    </div>
    <p v-if="!helpVisible && !rankingVisible" class="made-by">made by <a href="https://github.com/zizoko1337/Code-game-McArray" target="_blank">mkcode</a></p>
  </div>
</template>

<script>
import axios from 'axios';
import cashSound from '../assets/cash.mp3';
import failSound from '../assets/fail.mp3';
import PlayerRanking from './options/PlayersRanking.vue';
import HelpInstructions from './options/HelpInstructions.vue';

export default {
  name: 'GameBox',
  components: {
    PlayerRanking,
    HelpInstructions,
  },
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
      rankingVisible: false,
      topPlayers: [
        { name: null, score: null },
        { name: null, score: null },
        { name: null, score: null },
        { name: null, score: null },
        { name: null, score: null },
      ],
      dbKey: null,
    };
  },

  methods: {
    submitMethod() {
      // when player submits answer, checking if it is corrects and increasing score or removing hearts
      if (this.userMethod == null) {
        this.userMethod = 'at(100)';
      }
      this.answer = `${JSON.stringify(this.gameArr)}.${this.userMethod}`;
      if (/(pop|splice|at|shift)\(([0-9,-]+)?\)/.test(this.answer)) {
        this.arrOutput = eval(this.answer); // Im going to jail for this 👮‍♂️👨‍💼👮‍♂️
      } else {
        this.arrOutput = '🤪';
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
        this.gameOn = false;
      }
      (this.userMethod = null), this.nextSequence();
    },
    clientOrderMethod() {
      // creating random orders
      setTimeout(this.orderError, 500); // optional function but it might help if client order gets corrupted
      this.arrOutput = 'Working on it...';
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
      if (this.gameOn) this.failSound2.play();
      this.clientDialog = 'This is not what i wanted! 😡';
      this.arrOutput = "I'm sorry " + this.arrOutput;
    },
    noRepeat(order) {
      if (order == this.previousOrder) {
        this.clientOrder = this.gameArr.at(
          Math.floor(Math.random() * this.gameArr.length)
        );
      }
    },
    fullHp() {
      this.firstStart = true;
      this.gameOn = true;
      this.playerLives = ['💖', '💖', '💖'];
      this.playerTime = ['⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳','⏳'];
      this.playerMoney = [];
      this.clientOrderMethod();
      this.timeDecrease();
    },
    timeDecrease() {
      // manages time and stops game if time is over. player time = 60sec. 1⏳ = 4sec
      setTimeout(() => {
        this.playerTime.pop();
        if (this.playerLives.length == 0 || this.playerTime.length == 0) {
          this.playerTime = [];
          this.playerLives = [];
          this.gameOver;
          this.gameOn = false;
          this.submitMethod();
          this.clientDialog = "Nevermind, it's too late ⌚";
          this.arrOutput = 'Time to go home 🚗';
          this.submitScore();
        } else {
          this.timeDecrease();
        }
      }, 4000);
    },
    gameOver() {
      this.playerLives = [];
    },
    orderError() {
      // optional function that, does not allow client errors to happen
      if (
        this.clientDialog == 'This is not what i wanted! 😡' ||
        this.clientDialog == 'Thank you 😁'
      ) {
        this.nextSequence();
      }
    },
    toggleHelp() {
      this.helpVisible = !this.helpVisible;
      this.rankingVisible = false;
    },
    toggleRanking() {
      this.rankingVisible = !this.rankingVisible;
      this.sortPlayersByScores();
      this.helpVisible = false;
    },
    submitScore() {
      this.sortPlayersByScores();
      if (this.playerMoney.length > this.topPlayers[4].score) {
        this.topPlayers[4].score = this.playerMoney.length;
        this.topPlayers[4].name = prompt(
          '🎈 Congratulations 🎈 you are one of the top 5 players. Write your name and press submit to join the ranking',
          ''
        );
        if (this.topPlayers[4].name === '') this.topPlayers[4].name = 'Anon';
        this.sortPlayersByScores();
        this.updateRanking();
      }
    },
    sortPlayersByScores() {
      this.topPlayers.sort((a, b) => (a.score > b.score ? -1 : 1));
    },
    updateRanking() {
      for (let i = 0; i < 5; i++) {
        axios.put(
          `https://${this.dbKey}/ranking/-N7X7PTf8SsPipSWYXQn/players/${i}.json`,
          {
            name: this.topPlayers[i].name,
            score: this.topPlayers[i].score,
          }
        );
      }
    },
  },
  mounted() {
    // loading ranking form data base
    this.dbKey = process.env.VUE_APP_DB;
    axios
      .get(`https://${this.dbKey}/ranking/-N7X7PTf8SsPipSWYXQn/players.json`)
      .then((response) => {
        for (let i = 0; i < response.data.length; i++)
          this.topPlayers[i] = response.data[i];
      });
  },
};
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

/* custom classes */

.start-button {
  margin-top: 1rem;
}
.arr-box {
  transform: scale(2);
  margin-bottom: 2rem;
}
.game {
  animation: roll-in 250ms ease;
  display: flex;
  flex-direction: column;
}
.game-over {
  animation: hi-there 3s infinite;
  font-size: 3rem;
}
.top-players-button {
  margin: 0 0 0 5rem;
}
.made-by{
  font-size: 0.8rem;
  margin-top: 20px;
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
  30% {
    transform: scale(1.2);
  }
  40%,
  60% {
    transform: rotate(-20deg) scale(1.2);
  }
  50% {
    transform: rotate(20deg) scale(1.2);
  }
  70% {
    transform: rotate(0deg) scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

/* a little touch of responsiveness. This app will not be used on mobiles but still... */

@media only screen and (max-width: 950px) {
  .arr-box {
    transform: scale(1.3);
    margin-bottom: 2rem;
  }
}
</style>
