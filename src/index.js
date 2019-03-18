import artistData from '../data/artist-data.js';
import './search-component.js';
import loadArtists from './list-component.js';
import { makeSearchUrl } from './make-search-url.js';



window.addEventListener('hashchange', () => {
    loadArtists(artistData.message.body.artist_list);
    const existingQuery = window.location.hash.slice(1);
    const queryOptions = readFromQuery(existingQuery);
    const url = makeSearchUrl(queryOptions);
});