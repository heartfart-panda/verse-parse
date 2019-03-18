export function writeSearchToQuery(existingQuery, searchValue) {
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('search', searchValue);
    searchParams.set('page', 1);
    return searchParams.toString();
}

export function readFromQuery(existingQuery) {
    const searchParams = new URLSearchParams(existingQuery);
    const queryOptions = {
        search: searchParams.get('search'),
        page: Number(searchParams.get('page')),
    };
    return queryOptions;
}

export function writePageToQuery(existingQuery, currentPageNumber) {
    const searchParams = new URLSearchParams(existingQuery);
    searchParams.set('page', currentPageNumber);
    return searchParams.toString();
}