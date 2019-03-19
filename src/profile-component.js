import { auth } from './firebase.js';

export function makeProfile(user) {
    const html = `
        <div id="profile">
            <img src="${user.photoURL}" alt="User Image">
            <p>${user.displayName}</p>
            <button>Sign Out</button>
        </div>
    `;
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}

const header = document.querySelector('header');

export default function loadProfile() {
    auth.onAuthStateChanged(user => {
        if(user) {
            const dom = makeProfile(user);
            const button = dom.querySelector('button');
            button.addEventListener('click', () => {
                auth.signOut();
                window.location = './auth.html';
            });
            header.appendChild(dom);
        }
        else {
            window.location = './auth.html';
        }
    });
}