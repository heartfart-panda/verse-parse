export function makeTrackChoice(track) {
    const html = `
        <li value="${track.track_id}">
            <p class="track-title">${track.track_name}</p> 
            <p class="track-artist">by ${track.artist_name}</p>
        </li>`;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

export function makeGameDisplay() {
    const html = `
        <div id="game">
            <div id="lyrics-container"></div>
            <ul id="track-choices"></ul>
        </div>  
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

let correctId = null;

export function loadGameContent(tracks, userLibraryRef) {
    const random = Math.floor(Math.random() * 4);
    const lyricsContainer = document.getElementById('lyrics-container');
    const lyrics = tracks[random].lyrics;
    const slicedLyrics = sliceLyrics(lyrics);
    
    slicedLyrics.forEach(line => {
        const template = document.createElement('template');
        template.innerHTML = `<p>${line}</p>`;
        lyricsContainer.append(template.content);
    });
    correctId = tracks[random].track_id;
    
    const trackChoices = document.getElementById('track-choices');
    tracks.forEach(track => {
        const dom = makeTrackChoice(track);
        const li = dom.querySelector('li');
        li.addEventListener('click', () => {
            const answer = li.value;
            if(correctId === answer) { 
                score++;
                scoreSpan.textContent = score;
            }
            loadGame(userLibraryRef);
        });
        trackChoices.appendChild(dom);
    });
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
            loadGameContent(randomTracks, userLibraryRef);
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

function sliceLyrics(lyrics) {
    const splitLyrics = lyrics.split('\n');
    const filteredLyrics = splitLyrics.filter(line => line);
    const random = Math.floor(Math.random() * (filteredLyrics.length - 5));
    const slicedLyrics = filteredLyrics.slice(random, random + 5);
    return slicedLyrics;
}