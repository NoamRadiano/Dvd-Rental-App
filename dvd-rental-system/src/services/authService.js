import axios from "axios";
const API_URL = "http://localhost:8090/api/auth";

const register = (username, password, email, age) => {
  return axios.post(`${API_URL}/register`, {
    name: username,
    password: password,
    email: email,
    roles: "ROLE_USER",
    age: age,
  });
};

const login = (username, password, role) => {
  return axios
    .post(`${API_URL}/login`, {
      username: username,
      password: password,
      roles: role,
    })
    .then((response) => {
      if (response.data) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("token", response.data.token);
        axios.defaults.headers.common = {
          Authorization: `bearer ${response.data.token}`,
        };
      }
      return response.data;
    });
};

const getCurrentUser = () => {
  if (sessionStorage.getItem("user"))
    return JSON.parse(sessionStorage.getItem("user"));
  else window.location.assign("/login");
  // return sessionStorage.getItem('token');
};

const logout = () => {
  // sessionStorage.removeItem('token');
  // setRole("");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  //explain
  delete axios.defaults.headers.common["Authorization"];
  window.location.assign("/");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
