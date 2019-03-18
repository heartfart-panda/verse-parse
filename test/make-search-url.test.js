import { makeSearchUrl } from '../src/make-search-url.js';
const test = QUnit.test;

QUnit.module('URL Construction for API fetching');

const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

test('URL construction for API fetching', assert => {
    // Arrange
    const expected = CORS_ANYWHERE + 'https://api.musixmatch.com/ws/1.1/artist.search?q_artist=kanye+west&apikey=c50fe663a733fdddb10284d0025a7487&page=1&page_size=5';
    const queryOptions = {
        search: 'kanye west',
        page: 1
    };
    // Act
    const result = makeSearchUrl(queryOptions);

    // Assert
    assert.equal(result, expected);
});

test('Return empty string if no search', assert => {
    // Arrange
    const expected = '';
    const queryOptions = {
        search: '',
        page: 1
    };
    // Act
    const result = makeSearchUrl(queryOptions);

    // Assert
    assert.equal(result, expected);
});