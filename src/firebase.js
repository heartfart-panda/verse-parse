const config = {
    apiKey: 'AIzaSyDrLWhtxWCOGQbh0_Zg4TcxzSuqfH7sPxg',
    authDomain: 'verse-parse.firebaseapp.com',
    databaseURL: 'https://verse-parse.firebaseio.com',
    projectId: 'verse-parse'
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth();
const db = firebase.database();
export const usersRef = db.ref('users');
export const favoritesByUserRef = db.ref('favorites-by-user');
export const librariesByUserRef = db.ref('libraries-by-user');
