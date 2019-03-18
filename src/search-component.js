import { writeSearchToQuery } from './hash-query.js';

const searchForm = document.getElementById('form');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const artistSearch = document.getElementById('artist-search');
    const searchValue = artistSearch.value;
    const existingQuery = window.location.hash.slice(1);
    const newQuery = writeSearchToQuery(existingQuery, searchValue);
    window.location.hash = newQuery;
});