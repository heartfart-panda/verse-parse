import { makeGameDisplay } from './game-component.js';
import { auth, librariesByUserRef } from '../firebase.js';


auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    userLibraryRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            const favoriteArtists = Object.values(value);
            const trackLibrary = favoriteArtists.map(artist => Object.values(artist)).flat();
            const randomTracks = pickFourRandomTracks(trackLibrary);
            makeGameDisplay(randomTracks);
        });
});

function pickFourRandomTracks(trackLibrary) {
    let randomTracks = [];
    for(let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * trackLibrary.length);
        randomTracks.push(trackLibrary.splice(random, 1)[0]);
    }
    return randomTracks;
}

const gameForm = document.getElementById('game-form');
gameForm.addEventListener('submit', event => {
    event.preventDefault();
    const formDaddy = new FormData(gameForm);
    const answer = Number(formDaddy.get('track-choice'));
    if(correctId === answer) {
        console.log('yay');
    }
    else {
        console.log('boo');
    }
});