import { readFromQuery } from './hash-query.js';

const artistSearch = document.getElementById('artist-search');

export default function loadDisplay() {
    const existingQuery = window.location.hash.slice(1);
    const queryOptions = readFromQuery(existingQuery);
    artistSearch.value = queryOptions.search;
}