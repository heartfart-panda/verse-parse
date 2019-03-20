export function makeScoreboard(user) {
    const html = `
        <tr>
            <td><img src="${user.photoURL}">${user.displayName}</td>
            <td>${user.topScore} points</td>
        </tr>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}