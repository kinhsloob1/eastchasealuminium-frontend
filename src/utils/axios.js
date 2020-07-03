import axios from 'axios';

const { create, CancelToken: cancelToken } = axios;
const instance = create({
  baseURL: '/api',
  withCredentials: true,
  responseType: 'json',
  timeout: 1000,
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: { 'X-Custom-Header': 'foobar' }
});

instance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    console.log('request interceptor', error);
    // Do something with request error
    return Promise.reject(error);
  }
);

const getCsrfToken = async (csrfRequestObject) => {
  try {
    const {
      data: { data: token }
    } = axios(csrfRequestObject);
    return token;
  } catch {
    return null;
  }
};

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status }
    } = error;

    if (status === 419) {
      let tries = 0;
      let token = null;

      while (!token && tries < 5) {
        // eslint-disable-next-line no-await-in-loop
        token = await getCsrfToken(config);
        tries += 1;
      }

      if (token) {
        try {
          config.headers['x-csrf-token'] = token;
          return axios(config);
        } catch {
          token = null;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
export const CancelToken = cancelToken;
