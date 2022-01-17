import axios from "axios";

let instance = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

instance.interceptors.request.use(config => {
  let auth ="Bearer " + sessionStorage.token;
  config.headers.Authorization = auth;
  return config
});

export default instance;