import loadGame from './game-component.js';
import { clearGame } from './game-component.js';
import { auth, librariesByUserRef } from '../firebase.js';
const startButton = document.getElementById('start-button');


auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    let timer = 30;
    timerSpan.textContent = timer;

    // startButton.addEventListener('click', () => {    
    //     const gameTimer = setInterval(updateTimer, 1000);
        loadGame(userLibraryRef);
    //     function updateTimer() {
    //         timer--;
    //         timerSpan.textContent = timer;
    //         if(!timer) {
    //             clearInterval(gameTimer);
    //             clearGame();
    //         }
    //     }
    // });
});
const timerSpan = document.getElementById('timer');