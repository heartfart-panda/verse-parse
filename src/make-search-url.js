const BASE_URL = 'https://api.musixmatch.com/ws/1.1/';
const ARTIST_SEARCH = 'artist.search';
const CORS_ANYWHERE = 'https://cors-anywhere.herokuapp.com/';
const API_KEY = 'c50fe663a733fdddb10284d0025a7487';

export function makeSearchUrl(queryOptions) {
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