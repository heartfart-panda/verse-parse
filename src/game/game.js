import { makeGameDisplay } from './game-component.js';
import dummydata from '../../data/dummy-lyrics-data.js';
import { auth, librariesByUserRef } from '../firebase.js';

makeGameDisplay(dummydata);

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    userLibraryRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            const favoriteArtists = Object.values(value);
            const trackLibrary = favoriteArtists.map(artist => Object.values(artist)).flat();
            console.log(trackLibrary);
        });
});