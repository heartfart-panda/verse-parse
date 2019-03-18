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
