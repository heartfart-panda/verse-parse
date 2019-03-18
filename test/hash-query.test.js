import { writeSearchToQuery } from '../src/hash-query.js';

const test = QUnit.test;

QUnit.module('Hash query');

test('Write search to query', assert => {
    // Arrange
    const existingQuery = 'search=&page=1';
    const expected = 'search=kanye+west&page=1';
    const searchValue = 'kanye west';
    // Act
    const result = writeSearchToQuery(existingQuery, searchValue);

    // Assert
    assert.equal(result, expected);
});