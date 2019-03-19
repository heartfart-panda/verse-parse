import { auth, favoritesByUserRef } from './firebase.js';

export function makeArtistCard(artist) {
    const html = `
        <li>
            <span class="star">★</span>
            <span>${artist.artist.artist_name}</span>
        </li>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const searchedArtistList = document.getElementById('searched-artist-list');

export default function loadArtists(artists) {
    clearList();
    artists.forEach(artist => {
        const dom = makeArtistCard(artist);
        const li = dom.querySelector('li');
        const star = dom.querySelector('.star');
        const userId = auth.currentUser.uid;
        const userFavorites = favoritesByUserRef.child(userId);
        const favoriteArtist = userFavorites.child(artist.artist.artist_id);
        favoriteArtist.once('value')
            .then(snapshot => {
                const value = snapshot.val();
                if(value) {
                    star.classList.add('favorite');
                }
            });
        li.addEventListener('click', () => {
            if(star.classList.contains('favorite')) {
                star.classList.remove('favorite');
                favoriteArtist.remove();
            }
            else {
                star.classList.add('favorite');
                favoriteArtist.set({
                    artist_id: artist.artist.artist_id,
                    artist_name: artist.artist.artist_name
                });
            }
        });
        searchedArtistList.appendChild(dom);
    });
}

function clearList() {
    while(searchedArtistList.children.length > 0) {
        searchedArtistList.lastElementChild.remove();
    }
}