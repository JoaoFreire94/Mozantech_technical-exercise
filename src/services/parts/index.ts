const fetchParts = (type?: string, query?: string) => {
    let queryParams = "";
    if (!!type && !!query) {
        queryParams = `?type=${type}&query=${encodeURI(query)}`;
    } else if (type) {
        queryParams = `?type=${type}`;
    } else if (query) {
        queryParams = `?query=${encodeURI(query)}`;
    }

    return fetch(`http://localhost:8081/store/parts${queryParams}`);
};
export default fetchParts;
