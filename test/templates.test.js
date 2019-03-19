/* eslint-disable */

import { makeArtistCard } from '../src/list-component.js';

const test = QUnit.test;

QUnit.module('Templates');

test('Make artist card', assert => {
    // Arrange
    const expected = `
        <li>
            <h2>Kanye West</h2>
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
            <img src="./assets/unknown-user.png" alt="Unknow User Image">
            <p>Tommy</p>
            <button>Sign Out</button>
        </div>
    `;

    // Act
    const result = makeProfile(user)

    // Assert
    assert.equal(result, expected);
});