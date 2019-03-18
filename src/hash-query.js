export function writeSearchToQuery(existingQuery, searchValue) {
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('search', searchValue);
    searchParams.set('page', 1);
    return searchParams.toString();
}