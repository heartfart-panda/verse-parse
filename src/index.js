import artistData from '../data/artist-data.js';
import './search-component.js';
import loadArtists from './list-component.js';
import { makeSearchUrl } from './make-search-url.js';
import { readFromQuery } from './hash-query.js';


window.addEventListener('hashchange', () => {
    loadArtists(artistData.message.body.artist_list);
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
                loadArtists(result.message.body.artist_list);
            }
        });


});