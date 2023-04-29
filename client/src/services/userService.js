import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/auth/login", { email, password });
};

const getAllUsers = (inputValue) => {
  return axios.get(`api/get-all-user?id=${inputValue}`);
};

const deteleUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
export { handleLoginApi, getAllUsers, deteleUserService };
