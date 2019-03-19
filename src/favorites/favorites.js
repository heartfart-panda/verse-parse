import { auth, favoritesByUserRef } from '../firebase.js';
import loadArtists from '../list-component.js';

const favoritedArtistsList = document.getElementById('favorited-artists-list');
const submitFavoriteArtistsButton = document.getElementById('submit-favorite-artists');

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userFavorites = favoritesByUserRef.child(userId);
    userFavorites.on('value', snapshot => {
        const value = snapshot.val();
        const artistList = Object.values(value);
        loadArtists(artistList, favoritedArtistsList);
        submitFavoriteArtistsButton.addEventListener('click', () => {
            artistList.forEach(artist => {
                fetch()
            })
        });
    });
});
