import loadProfile from '../profile-component.js';
import { usersRef, auth } from '../firebase.js';
import loadScoreboard from './scoreboard-component.js';

loadProfile();

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userRef = usersRef.child(userId);
    const recentScoreRef = userRef.child('recentScore');
    recentScoreRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            const userScore = document.getElementById('user-score');
            userScore.textContent = value;
        });
});

usersRef.once('value')
    .then(snapshot => {
        const value = snapshot.val();
        const users = Object.values(value);
        users.sort((a, b) => {
            return b.topScore - a.topScore; 
        });
        loadScoreboard(users);
    });