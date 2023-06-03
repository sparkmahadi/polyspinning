import axios from "axios";

let URL;

console.log(process.env.REACT_APP_ENVIRONMENT);
switch (process.env.REACT_APP_ENVIRONMENT) {
    case "DEVELOPMENT":
        URL = "http://localhost:5000/";
        break;
    case "PRODUCTION":
        URL = "server link";
        break;
    default:
        URL = "http://localhost:5000/";
};

const instance = axios.create({
    baseURL: URL,
});

export default instance;