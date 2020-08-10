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

  static async loginUser(user) {
    let res = await this.request('login', user, "post");
    return res.token;
  }

  static async createUser(user) {
    let res = await this.request('users', user, "post");
    return res.token;
  }

}

export default backendAPI;