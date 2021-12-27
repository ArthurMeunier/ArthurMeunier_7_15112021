import http from "../http-common";

class UsersDataService {
  getAll() {
    return http.get("/users/");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  myprofile() {
    return http.get("/users/profile");
  }

  create(firstname, lastname, email, password) {
    return http.post("/users/signup", {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
    })
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  login(email, password) {
    return http.post("/users/login", {
        email: email,
        password: password,
      })
  }
}

export default new UsersDataService();