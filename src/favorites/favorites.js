import { auth, favoritesByUserRef, librariesByUserRef } from '../firebase.js';
import loadArtists from '../list-component.js';
import { makeTrackSearchUrl, makeLyricSearchUrl } from '../make-search-url.js';

const favoritedArtistsList = document.getElementById('favorited-artists-list');
const submitFavoriteArtistsButton = document.getElementById('submit-favorite-artists');

auth.onAuthStateChanged(user => {
    const userId = user.uid;
    const userFavorites = favoritesByUserRef.child(userId);
    const userLibraryRef = librariesByUserRef.child(userId);
    userFavorites.on('value', snapshot => {
        const value = snapshot.val();
        const artistList = Object.values(value);
        loadArtists(artistList, favoritedArtistsList);
        submitFavoriteArtistsButton.addEventListener('click', () => {
            artistList.forEach(artist => {
                const artistLibraryRef = userLibraryRef.child(artist.artist_id);
                const url = makeTrackSearchUrl(artist);
                fetch(url)
                    .then(response => response.json())
                    .then(trackResult => {
                        const trackList = trackResult.message.body.track_list;
                        trackList.forEach(track => {
                            const trackId = track.track.track_id;
                            const trackRef = artistLibraryRef.child(trackId);
                            const lyricSearchUrl = makeLyricSearchUrl(trackId);
                            fetch(lyricSearchUrl)
                                .then(response => response.json())
                                .then(lyricResult => {
                                    const lyric = lyricResult.message.body.lyrics.lyrics_body;
                                    trackRef.set({ 
                                        track_id: track.track.track_id,
                                        track_name: track.track.track_name,
                                        lyrics: lyric
                                    });
                                });
                        });
                    });
            });
        });
    });
});