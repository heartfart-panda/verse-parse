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

let correctId = null;

export function loadGameContent(tracks) {
    const random = Math.floor(Math.random() * 4);
    const lyricsContainer = document.getElementById('lyrics-container');
    lyricsContainer.textContent = tracks[random].lyrics;
    correctId = tracks[random].track_id;
    
    const trackChoices = document.getElementById('track-choices');
    tracks.forEach(track => {
        const dom = makeTrackChoice(track);
        trackChoices.appendChild(dom);
    });
}

export function makeGameDisplay() {
    const html = `
        <div>
            <div id="lyrics-container"></div>
            <form id="game-form">
                <ul id="track-choices"></ul>
                <button>Now Sing It!</button>
            </form>
        </div>  
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const gameContainer = document.getElementById('game-container');

let score = 0;
const scoreSpan = document.getElementById('score');
scoreSpan.textContent = score;

export default function loadGame(userLibraryRef) {
    clearGame();
    userLibraryRef.once('value')
        .then(snapshot => {
            const value = snapshot.val();
            const favoriteArtists = Object.values(value);
            const trackLibrary = favoriteArtists.map(artist => Object.values(artist)).flat();
            const randomTracks = pickFourRandomTracks(trackLibrary);
            const gameDisplayDom = makeGameDisplay();
            gameContainer.appendChild(gameDisplayDom);
            loadGameContent(randomTracks);
            const gameForm = document.getElementById('game-form');
            gameForm.addEventListener('submit', event => {
                event.preventDefault();
                const formDaddy = new FormData(gameForm);
                const answer = Number(formDaddy.get('track-choice'));
                if(correctId === answer) { 
                    score++;
                    scoreSpan.textContent = score;
                }
                loadGame(userLibraryRef);
            });
        });
}

function pickFourRandomTracks(trackLibrary) {
    let randomTracks = [];
    for(let i = 0; i < 4; i++) {
        const random = Math.floor(Math.random() * trackLibrary.length);
        randomTracks.push(trackLibrary.splice(random, 1)[0]);
    }
    return randomTracks;
}

export function clearGame() {
    while(gameContainer.children.length > 0) {
        gameContainer.lastElementChild.remove();
    }
}