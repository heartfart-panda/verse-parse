import loadGame from './game-component.js';
import { auth, librariesByUserRef } from '../firebase.js';


auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userLibraryRef = librariesByUserRef.child(userId);
    loadGame(userLibraryRef);
});