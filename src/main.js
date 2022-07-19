import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

const firebase = {
    apiKey: "AIzaSyApf0w5QmjtkEOfI0Ktex4qlxgeoBCNM4k",
    authDomain: "code-game-2fdea.firebaseapp.com",
    projectId: "code-game-2fdea",
    storageBucket: "code-game-2fdea.appspot.com",
    messagingSenderId: "105138462087",
    appId: "1:105138462087:web:31d842d2814ad5606a0722",
    measurementId: "G-DMT0FNSP1E"
  };

  const firebaseApp = firebase.initializeApp(config)

  const db = firebase.firestore()
  const topPlayers = db.collection("top-players")

  export const addPlayer = player => {
    return topPlayers.add(player)
  }

  export const getUser = async id => {
    const player = await topPlayers.doc(id).get()
    return player.exist ? player.data() : null
  }