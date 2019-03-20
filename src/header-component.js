export function makeHeader() {
    const html = `
        <div id="verse-parse">
            <h1><span class="yellow">verseParse</span>
                <span class="purple">(</span>
                <span class="light-blue">verse</span>
                <span class="purple">)</span>;</h1>
        </div>
    `;

    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const headerContainer = document.getElementById('header-container');

export default function loadHeader() {
    const dom = makeHeader();
    headerContainer.appendChild(dom);
}