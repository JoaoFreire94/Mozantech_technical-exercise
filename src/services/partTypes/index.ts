const fetchPartTypes = () => {
    return fetch("http://localhost:8081/store/part-types");
};
export default fetchPartTypes;
