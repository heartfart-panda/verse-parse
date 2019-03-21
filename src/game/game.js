import loadGame from './game-component.js';
import { clearGame } from './game-component.js';
import { auth, librariesByUserRef } from '../firebase.js';
import loadHeader from '../../src/header-component.js';
import loadProfile from '../profile-component.js';

const startButton = document.getElementById('start-button');

loadHeader();
loadProfile();

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    let timer = 5;
    timerSpan.textContent = timer;

    startButton.addEventListener('click', () => {    
        const gameTimer = setInterval(updateTimer, 1000);
        loadGame(userLibraryRef);
        function updateTimer() {
            timer--;
            timerSpan.textContent = timer;
            if(!timer) {
                clearInterval(gameTimer);
                clearGame();
                window.location = './results.html';
            }
        }
    });
});
const timerSpan = document.getElementById('timer');