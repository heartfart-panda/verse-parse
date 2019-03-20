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

export function loadGameContent(tracks) {
    const random = Math.floor(Math.random() * 4);
    lyricsContainer.textContent = tracks[random].lyrics;
    correctId = tracks[random].track_id;
    
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
