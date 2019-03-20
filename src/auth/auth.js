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
            usersRef.child(user.uid)
                .set({
                    uid: user.uid,
                    displayName: user.displayName,
                    photoURL: user.photoURL
                });
            return true;
        }
    }
});
