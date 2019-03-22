import { auth, usersRef } from '../firebase.js';
import loadHeader from '../header-component.js';

const ui = new firebaseui.auth.AuthUI(auth);

loadHeader();

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: './',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
        signInSuccessWithAuthResult(authResult) {
            const user = authResult.user;
            const photo = user.photoURL || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';
            usersRef.child(user.uid).child('uid').set(user.uid);
            usersRef.child(user.uid).child('displayName').set(user.displayName);
            usersRef.child(user.uid).child('photoURL').set(photo);
            return true;
        }
    }
});
