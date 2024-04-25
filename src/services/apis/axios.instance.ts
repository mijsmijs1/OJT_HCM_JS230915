import axios from "axios";
import api from '@services/apis'

(axios as any).defaults.headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Cache-Control": "no-cache, no-store, must-revalidate",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
  "language": "vi",
  "Authorization": `Bearer ${String(localStorage.getItem("token"))}`
};

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${String(localStorage.getItem("token"))}`;
    return config;
  },
  (err) => {
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    // Nếu response OK, trả về data
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // Nếu server trả về lỗi 504 và chưa có flag _retry
    if (error.response.status === 504 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu request đã được retry

      // Thực hiện refresh token
      const refreshTokenRes = await api.authenApi.refreshToken(String(localStorage.getItem('refreshToken')));
      localStorage.setItem('token', refreshTokenRes.data.accessToken);

      // Cập nhật token mới vào header của request
      originalRequest.headers['Authorization'] = 'Bearer ' + refreshTokenRes.data.accessToken;

      // Gửi lại request với config cũ
      try {
        return axios(originalRequest);
      } catch (err) {
        console.error(err);
      }
    }

    // Nếu không thể refresh token, trả về lỗi
    return Promise.reject(error);
  }
);
export default axios