import axios from "axios";

const instance = axios.create({ baseURL: process.env.REACT_APP_DEV_PORT });

export default instance;
