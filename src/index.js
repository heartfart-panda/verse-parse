import artistData from '../data/artist-data.js';
import './search-component.js';
import loadArtists from './list-component.js';

loadArtists(artistData.message.body.artist_list);
