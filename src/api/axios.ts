import type { AxiosRequestConfig } from 'axios';
import axios, { AxiosError } from 'axios';

const config: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_BASE_URL,
};

export const axiosInstance = axios.create(config);

// axiosInstance.interceptors.request.use(response => response,
//   async (error) => {
//     const { config, response } = error
//     const status = response.status

//     if (status === )
//   }
// )
