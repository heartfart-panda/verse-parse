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
    if(artists[0].artist) {
        if(artists.every(artist => artist.artist.artist_rating <= 50)) {
            alert('No results found');
        }
    }
    artists.forEach(artist => {
        if(artist.artist_id || artist.artist.artist_rating > 50) {
            const dom = makeArtistCard(artist);
            const li = dom.querySelector('li');
            const star = dom.querySelector('.star');
            auth.onAuthStateChanged(user => {
                const userId = user.uid;
                const userFavorites = favoritesByUserRef.child(userId);
                const favoriteArtist = userFavorites.child(artist.artist_id || artist.artist.artist_id);
                favoriteArtist.on('value', snapshot => {
                    const value = snapshot.val();
                    if(value) {
                        star.classList.add('favorite');
                    } else {
                        star.classList.remove('favorite');
                    }
                });
                li.addEventListener('click', () => {
                    if(star.classList.contains('favorite')) {
                        star.classList.remove('favorite');
                        favoriteArtist.remove();
                    } else {
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
    });
}

function clearList(ul) {
    while(ul.children.length > 0) {
        ul.lastElementChild.remove();
    }
}