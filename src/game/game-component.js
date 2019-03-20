export function makeTrackChoice(track) {
    const html =  `
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