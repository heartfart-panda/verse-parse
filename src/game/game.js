import loadGame from './game-component.js';
import { clearGame } from './game-component.js';
import { auth, librariesByUserRef, usersRef } from '../firebase.js';
const startButton = document.getElementById('start-button');


auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    let timer = 60;
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
                const scoreSpan = document.getElementById('score');
                const userRef = usersRef.child(user.uid);
                const recentScoreRef = userRef.child('recentScore');
                const recentScore = Number(scoreSpan.textContent);
                recentScoreRef.set(recentScore);
                const topScoreRef = userRef.child('topScore');
                topScoreRef.once('value')
                    .then(snapshot => {
                        const value = snapshot.val();
                        if(recentScore > value) {
                            topScoreRef.set(recentScore);
                        }
                    });
                window.location = './results.html';

            }
        }
    });
});
const timerSpan = document.getElementById('timer');