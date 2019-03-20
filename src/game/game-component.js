export function makeTrackChoice(track) {
    const html = `
        <li>
            <label>
                <input type="radio" name="track-choice" value="${track.track_id}">
                ${track.track_name} by ${track.artist_name}
            </label>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const lyricsContainer = document.getElementById('lyrics-container');
const trackChoices = document.getElementById('track-choices');
let correctId = null;

export function makeGameDisplay(tracks) {
    const random = Math.floor(Math.random() * 4);
    lyricsContainer.textContent = tracks[random].lyrics;
    correctId = tracks[random].track_id;
    
    tracks.forEach(track => {
        const dom = makeTrackChoice(track);
        trackChoices.appendChild(dom);
    });
}

const gameForm = document.getElementById('game-form');
gameForm.addEventListener('submit', event => {
    event.preventDefault();
    const formDaddy = new FormData(gameForm);
    const answer = Number(formDaddy.get('track-choice'));
    if(correctId === answer) {
        console.log('yay');
    }
    else {
        console.log('boo');
    }
});