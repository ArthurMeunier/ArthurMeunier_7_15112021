import axios from "axios";

// export default axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Authorization": "Bearer " + sessionStorage.token,
//     "Content-type": "application/json"
//   }
// });

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