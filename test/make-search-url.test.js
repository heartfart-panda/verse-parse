const test = QUnit.test;

QUnit.module('URL Construction for API fetching');

const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const ARTIST_SEARCH = 'artist.search';
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'c50fe663a733fdddb10284d0025a7487';

function makeSearchUrl(queryOptions) {
    if(!queryOptions.search) {
        return '';
    }
    const url = new URL(BASE_URL + ARTIST_SEARCH);
    url.searchParams.set('q_artist', queryOptions.search);
    url.searchParams.set('apikey', API_KEY);
    url.searchParams.set('page', queryOptions.page);
    url.searchParams.set('page_size', 5);

    return CORS_ANYWHERE + url.toString();
}

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