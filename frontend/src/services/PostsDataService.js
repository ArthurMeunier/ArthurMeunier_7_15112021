import http from "../http-common";

class PostsDataService {
  getAll() {
    return http.get("/posts/");
  }


  get(id) {
    return http.get(`/posts/${id}`);
  }

  create(data) {
    return http.post("/posts/", data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.token,
    }});
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data);
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  likePost(id) {
    return http.post(`/posts/${id}/likes`);
  }
}

export default new PostsDataService();