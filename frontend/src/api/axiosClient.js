import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosClient = new axios.create({
  baseURL: "http://localhost:8000/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshToken = async () => {
  try {
    const res = await axios.post("/v1/auth/refresh", {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(stateSuccess(refreshUser));
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // // Any status codes that falls outside the range of 2xx cause this function to trigger
    // // Do something with response error
    // const { config, status, data } = error.response;
    // const URLs = ["auth/local/register", "auth/local"];
    // if (URLs.includes(config.url) && status === 400) {
    //   const errorList = data.data || [];
    //   const firstError = errorList.length > 0 ? errorList[0] : {};
    //   const massagelist = firstError.messages || [];
    //   const firstMessage = massagelist.length > 0 ? massagelist[0] : {};

    //   throw new Error(firstMessage.message);
    // }
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosClient;
