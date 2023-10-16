import axios from "axios";

export const fetchData = (url) => {
    const queryData = axios(url);
    return queryData;
}