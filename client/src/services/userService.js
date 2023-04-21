import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/auth/login", { email, password });
};

export { handleLoginApi };
