// import artistData from '../data/artist-data.js';
import './search-component.js';
import loadArtists from './list-component.js';
import { makeSearchUrl } from './make-search-url.js';
import { readFromQuery } from './hash-query.js';
import loadDisplay from './display-component.js';
import loadProfile from './profile-component.js';
import loadHeader from './header-component.js';

const searchedArtistList = document.getElementById('searched-artist-list');
loadProfile();
loadHeader();
loadDisplay();

window.addEventListener('hashchange', () => {
    loadDisplay();
    const existingQuery = window.location.hash.slice(1);
    const queryOptions = readFromQuery(existingQuery);
    const url = makeSearchUrl(queryOptions);

    fetch(url) 
        .then(response => response.json())
        .then(result => {
            if(!result.message.body.artist_list.length) {
                alert('no results found');
            }
            else {
                loadArtists(result.message.body.artist_list, searchedArtistList);
            }
        });
});