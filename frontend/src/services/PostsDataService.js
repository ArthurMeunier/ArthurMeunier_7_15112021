import http from "../http-common";

class PostsDataService {
  getAll() {
    return http.get("/posts/");
  }

  likePost(id) {
    return http.post(`/posts/${id}/likes`);
  }

  getAllLikes(id) {
    return http.get(`/posts/${id}/likes`);
  }

  getOneLike(id) {
    return http.get(`/posts/${id}/like`);
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


}

export default new PostsDataService();