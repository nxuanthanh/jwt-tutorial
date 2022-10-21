import jwt_decode from "jwt-decode";
import axiosClient from "./axiosClient";

const refreshToken = async (user) => {
  const decodedToken = jwt_decode(user?.accessToken);

  if (decodedToken.exp < new Date().getTime() / 1000) {
    try {
      const res = await axiosClient.post("auth/refresh", {
        withCredentials: true,
      });
      console.log(res);
      return res.data?.accessToken;
    } catch (error) {
      console.log(error);
    }
  } else {
    return user?.accessToken;
  }
};

const userApi = {
  register(data) {
    const url = "auth/register";
    return axiosClient.post(url, data);
  },

  login(data) {
    const url = "auth/login";
    return axiosClient.post(url, data);
  },

  async logout(user) {
    const url = "auth/logout";
    const accessToken = await refreshToken(user);

    return axiosClient.post(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  async getAllUsers(user) {
    const url = "user/";
    const accessToken = await refreshToken(user);

    return axiosClient.get(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },

  async deleteUser(user) {
    const url = `user/${user._id}`;
    const { accessToken } = await refreshToken(user);

    return axiosClient.delete(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default userApi;
