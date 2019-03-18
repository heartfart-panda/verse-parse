const config = {
    apiKey: 'AIzaSyDrLWhtxWCOGQbh0_Zg4TcxzSuqfH7sPxg',
    authDomain: 'verse-parse.firebaseapp.com',
    databaseURL: 'https://verse-parse.firebaseio.com',
    projectId: 'verse-parse'
};

export const app = firebase.initializeApp(config);
export const auth = firebase.auth();