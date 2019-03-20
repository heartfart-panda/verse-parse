import loadProfile from '../profile-component.js';
import { usersRef } from '../firebase.js';
import loadScoreboard from './scoreboard-component.js';

loadProfile();

usersRef.once('value')
    .then(snapshot => {
        const value = snapshot.val();
        const users = Object.values(value);
        loadScoreboard(users);
    });