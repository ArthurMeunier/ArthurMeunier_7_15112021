import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Authorization": "Bearer " + sessionStorage.token,
    "Content-type": "application/json"
  }
});