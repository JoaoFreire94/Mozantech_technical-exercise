const fetchParts = () => {
    return fetch("http://localhost:8081/store/parts");
};
export default fetchParts;
