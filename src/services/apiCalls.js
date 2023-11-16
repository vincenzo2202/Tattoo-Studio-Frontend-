import axios from "axios";

export const logUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/login`, body);
}

export const registerUser = async (body) => {
  return await axios.post(`http://localhost:4000/user/register`, body);
}

export const getWorkers = async (page) => {
  return await axios.get(`http://localhost:4000/user/AllWorkers?skip=6&page=${page}`);
}

export const getProfile = async (token) => {
  return await axios.get(`http://localhost:4000/user/profile`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const updateUser = (body, token) => {
  return axios.put(`http://localhost:4000/user/update`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const appointmentsUsers = (token,page) => {
  return axios.get(`http://localhost:4000/appointment/getAllAppointment?skip=5&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const createAppointment = (body, token) => {
  return axios.post(`http://localhost:4000/appointment/createAppointment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const updateAppointment = (body, token) => {
  return axios.put(`http://localhost:4000/appointment/updateAppointment`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const getAllUsers = (token, page ) => {
  return axios.get(`http://localhost:4000/user/all?skip=10&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const getAllAppointment = (token,page) => {
  return axios.get(`http://localhost:4000/appointment/AllAppointmentsSuper?skip=5&page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

};

export const getPortfolio = async (page) => {
  return await axios.get(`http://localhost:4000/user/portfolio?skip=6&page=${page}`);
}

export const deleteAppointment = async (token,id) => { 
  return await axios.delete(`http://localhost:4000/appointment/deleteAppointment`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { id: id},
  })
};


