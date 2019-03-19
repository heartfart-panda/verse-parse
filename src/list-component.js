import { auth, favoritesByUserRef } from './firebase.js';

export function makeArtistCard(artist) {
    const html = `
        <li>
            <span class="star">★</span>
            <span>${artist.artist_name || artist.artist.artist_name}</span>
        </li>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export default function loadArtists(artists, ul) {
    clearList(ul);
    artists.forEach(artist => {
        const dom = makeArtistCard(artist);
        const li = dom.querySelector('li');
        const star = dom.querySelector('.star');
        const userId = auth.currentUser.uid;
        const userFavorites = favoritesByUserRef.child(userId);
        const favoriteArtist = userFavorites.child(artist.artist_id || artist.artist.artist_id);
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
        ul.appendChild(dom);
    });
}

function clearList(ul) {
    while(ul.children.length > 0) {
        ul.lastElementChild.remove();
    }
}