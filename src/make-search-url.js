const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const ARTIST_SEARCH = 'artist.search';
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'c50fe663a733fdddb10284d0025a7487';
const TRACK_SEARCH = 'track.search';

export function makeSearchUrl(queryOptions) {
    if(!queryOptions.search) {
        return '';
    }
    const url = new URL(BASE_URL + ARTIST_SEARCH);
    url.searchParams.set('q_artist', queryOptions.search);
    url.searchParams.set('apikey', API_KEY);
    url.searchParams.set('page', queryOptions.page);
    url.searchParams.set('page_size', 100);

    return CORS_ANYWHERE + url.toString();
}

export function makeTrackSearchUrl(artist) {
    const url = new URL(BASE_URL + TRACK_SEARCH);
    url.searchParams.set('f_artist_id', artist.artist_id);
    url.searchParams.set('apikey', API_KEY);
    url.searchParams.set('f_has_lyrics', 1);
    url.searchParams.set('f_lyrics_language', 'en');
    url.searchParams.set('s_track_rating', 'desc');
    url.searchParams.set('page', 1);
    url.searchParams.set('page_size', 10);

    return CORS_ANYWHERE + url.toString();
}