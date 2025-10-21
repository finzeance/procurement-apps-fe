import axios from "axios";

// URL backend utama
const BASE_URL = "http://localhost:9000";

// Buat instance axios agar bisa reuse
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials : true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor untuk menambahkan access token di setiap request
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor untuk auto-refresh token jika access token kadaluarsa
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem("refreshToken");

    // Jika token expired dan belum pernah di-refresh, lakukan refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshToken
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(`${BASE_URL}/auth/refresh`, {
          refreshToken,
        });

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        // Update header dan ulangi request sebelumnya
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token gagal:", refreshError);
        localStorage.clear(); // hapus semua token
        window.location.href = "/login"; // paksa login ulang
      }
    }

    return Promise.reject(error);
  }
);

export default api;
