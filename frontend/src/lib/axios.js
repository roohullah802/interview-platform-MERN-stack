import axios from "axios";

console.log("url ", import.meta.env.VITE_API_URL);


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://interview-platform-mern-stack.onrender.com/api",
  withCredentials: true, // by adding this field browser will send the cookies to server automatically, on every single req
});

axiosInstance.interceptors.request.use(async (config) => {
  try {
    // Dynamically get the token from Clerk's global window object or hook
    const token = await window.Clerk?.session?.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error("Error fetching Clerk token", error);
  }
  return config;
});

export default axiosInstance;
