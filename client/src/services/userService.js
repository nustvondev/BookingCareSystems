import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/auth/login", { email, password });
};

const getAllUsers = (inputValue) => {
  return axios.get(`api/get-all-user?id=${inputValue}`);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
}

const deteleUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
}

const createNewUserService = (data) => {
  console.log('check data from service : ', data)
  return axios.post('/api/create-new-user', data)
}
export { handleLoginApi, getAllUsers, deteleUserService, createNewUserService, editUserService, getAllCodeService };
