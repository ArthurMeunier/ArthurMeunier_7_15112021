import http from "../http-common";

class likesDataService {


  like() {
    return http.put(`/like`, data);
  }




}

export default new likesDataService();