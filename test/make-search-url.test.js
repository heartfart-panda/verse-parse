import { makeSearchUrl, makeTrackSearchUrl, makeLyricSearchUrl } from '../src/make-search-url.js';

const test = QUnit.test;
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';

QUnit.module('URL Construction for API fetching');

test('URL construction for API fetching', assert => {
    // Arrange
    const expected = CORS_ANYWHERE + 'https://api.musixmatch.com/ws/1.1/artist.search?q_artist=kanye+west&apikey=c50fe663a733fdddb10284d0025a7487&page=1&page_size=100';
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


test('make url for track fetch, based on artist id', assert => {
    // Arrange
    const expected = CORS_ANYWHERE + 'https://api.musixmatch.com/ws/1.1/track.search?f_artist_id=123456&apikey=c50fe663a733fdddb10284d0025a7487&f_has_lyrics=1&f_lyrics_language=en&s_track_rating=desc&page=1&page_size=10';
    const artist = {
        artist_id: 123456
    };
    // Act
    const result = makeTrackSearchUrl(artist);

    // Assert
    assert.equal(result, expected);
});

test('make fetch url for lyrics', assert => {
    // Arrange
    const expected = CORS_ANYWHERE + 'https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=16440100&apikey=c50fe663a733fdddb10284d0025a7487';
    const trackID = 16440100;
    // Act
    const result = makeLyricSearchUrl(trackID);

    // Assert
    assert.equal(result, expected);
});