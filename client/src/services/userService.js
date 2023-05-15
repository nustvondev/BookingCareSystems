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

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

const editUserService = (inputData) => {
  return axios.put('/api/edit-user', inputData);
}

const createNewUserService = (data) => {
  return axios.post('/api/create-new-user', data)
}
export { handleLoginApi, getAllUsers, deteleUserService, createNewUserService, editUserService, getAllCodeService, getTopDoctorHomeService };
