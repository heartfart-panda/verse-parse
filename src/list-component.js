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
        li.addEventListener('click', () => {
            if(star.classList.contains('favorite')) {
                star.classList.remove('favorite');
            }
            else {
                star.classList.add('favorite');
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