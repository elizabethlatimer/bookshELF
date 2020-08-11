import axios from "axios"
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class backendAPI {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    paramsOrData._token = localStorage.getItem("_token");
    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err?.response?.data?.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  //user methods

  static async loginUser(user) {
    let res = await this.request('login', user, "post");
    return res.token;
  }

  static async createUser(user) {
    let res = await this.request('users', user, "post");
    return res.token;
  }

  static async getUser(username) {
    let res = await this.request('users', {username});
    delete res.password;
    return res;
  }

  //static async updateUser(username, password, data) {}

  //collection methods

  static async newCollection(data) {
    let res = await this.request('collections', data, "post");
    return res;
  }

  static async getCollectionsByUser() {
    let res = await this.request('collections');
    return res.collections;
  }


  //book methods

}

export default backendAPI;