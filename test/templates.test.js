/* eslint-disable */
import { makeProfile } from '../src/profile-component.js';
import { makeArtistCard } from '../src/list-component.js';
import { makeTrackChoice, makeGameDisplay } from '../src/game/game-component.js';
import { makeHeader } from '../src/header-component.js';


const test = QUnit.test;

QUnit.module('Templates');

test('Make artist card', assert => {
    // Arrange
    const expected = `
        <li>
            <span class="star">★</span>
            <span>Kanye West</span>
        </li>
    `;
    const artist = {
        "artist": {
            "artist_id": 33091467,
            "artist_name": "Kanye West",
            "artist_name_translation_list": [],
            "artist_comment": "",
            "artist_country": "US",
            "artist_alias_list": [{
                "artist_alias": "\u30ab\u30cb\u30a8\u30fb\u30a6\u30a7\u30b9\u30c8"
            }, {
                "artist_alias": "K. West"
            }, {
                "artist_alias": "Kanye Omari West"
            }, {
                "artist_alias": "Kayne West"
            }],
            "artist_rating": 84,
            "artist_twitter_url": "https:\/\/twitter.com\/kanyewest",
            "artist_credits": {
                "artist_list": []
            },
            "restricted": 0,
            "updated_time": "2017-04-28T23:16:37Z"
        }
    };
    // Act
    const result = makeArtistCard(artist)

    // Assert
    assert.htmlEqual(result, expected);
});

test('Make profile', assert => {
    // Arrange
    const expected = `
        <div id="profile">
            <img src="./assets/unknown-user.png" alt="User Image">
            <p>Tommy</p>
            <button>Sign Out</button>
        </div>
    `;
    const user = {
        displayName: 'Tommy',
        photoURL: './assets/unknown-user.png'
    };

    // Act
    const result = makeProfile(user)

    // Assert
    assert.htmlEqual(result, expected);
});

test('MakeTrackChoice', assert => {
    // Arrange
    const expected = `
        <li>
            <label>
                <input type="radio" name="track-choice" value="3411415">
                I Need to Know by Kanye West
            </label>
        </li>
    `;
    const track =   {
        "lyrics": "[Chorus]\nI need to know, you down to do whatever?\nDown to get it poppin? Down to get topless, ohh\nI need to know, if you about cutting\nOr you about frontin, baby I need to know\n\n[Verse 1]\nI spent my last 8 checks's on a neck-e-lace\nSo I better get some sex for this, shiit\nShe wanna sip up on the cris-e-cris\nLike it's Christ-e-mas and I'm St. Nicholas\nI got her and her sister innn\nThat white benz, dyke twins\nI aint gon lie they only fives but together they ten's\nAnd would I do em again? Hmmm, hmmm?\nIt's like old folks pissin cuz it all depends\nAnd it's no coke sniffin just juice and gin\nGrey Goose to get you loose then hit the nigga producing\nThe track that got you movin, this track got you movin\nSo crazy you don't know what you doin\nYou been telling them jokes, and its not a rumor\n...\n\n******* This Lyrics is NOT for Commercial use *******\n(1409618287272)",
        "track_id": 3411415,
        "track_name": "I Need to Know",
        "artist_name": "Kanye West"
    }
    
    // Act
    const result = makeTrackChoice(track);

    // Assert
    assert.htmlEqual(result, expected);
});

test('make game template', assert => {
    // Arrange
    const expected = `
        <div>
            <div id="lyrics-container"></div>
            <form id="game-form">
                <ul id="track-choices"></ul>
                <button>Now Sing It!</button>
            </form>
        </div>  
    `;

    // Act
    const result = makeGameDisplay();

    // Assert
    assert.htmlEqual(result, expected);
});

test('make header template', assert => {
    //arrange
    const expected = `
        <div id="verse-parse">
            <h1><span class="yellow">verseParse</span>
                <span class="purple">(</span>
                <span class="light-blue">verse</span>
                <span class="purple">)</span>;</h1>
        </div>
    `;
    //act
    const result = makeHeader();
    //assert
    assert.htmlEqual(result, expected);
});