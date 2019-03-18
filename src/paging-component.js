import { writePageToQuery } from './hash-query.js';

const previousButton = document.getElementById('previous-button');
const nextButton = document.getElementById('next-button');
const currentPage = document.getElementById('current-page');

let currentPageNumber = 1;

previousButton.addEventListener('click', () => {
    currentPageNumber--;
    const existingQuery = window.location.hash.slice(1);
    const newQuery = writePageToQuery(existingQuery, currentPageNumber);
    window.location.hash = newQuery;
    currentPage.textContent = currentPageNumber;
});
nextButton.addEventListener('click', () => {
    currentPageNumber++;
    const existingQuery = window.location.hash.slice(1);
    const newQuery = writePageToQuery(existingQuery, currentPageNumber);
    window.location.hash = newQuery;
    currentPage.textContent = currentPageNumber;
});