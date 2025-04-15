import axios from 'axios';

const instance = axios.create({
  baseURL: '/api', // Umi Mock 代理会处理 /api 请求
  timeout: 10000,
});

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  },
);

export default instance;
