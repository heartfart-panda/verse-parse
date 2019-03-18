export function makeArtistCard(artist) {
    const html = `
        <li>
            <h2>${artist.artist.artist_name}</h2>
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
        searchedArtistList.appendChild(dom);
    });
}

function clearList() {
    while(searchedArtistList.children.length > 0) {
        searchedArtistList.lastElementChild.remove();
    }
}