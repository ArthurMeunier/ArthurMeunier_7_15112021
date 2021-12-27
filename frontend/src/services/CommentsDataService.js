import http from "../http-common";

class commentsDataService {
  getAll() {
    return http.get("/comments/");
  }

  getAllByPost(postId) {
    return http.get(`comments/?postId=${postId}`);
  }

  

  get(id) {
    return http.get(`/comments/${id}`);
  }

  create(data) {
    return http.post("/comments/", data, {
    headers: {
      Authorization: "Bearer " + sessionStorage.token,
    }});
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data);
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }


}

export default new commentsDataService();