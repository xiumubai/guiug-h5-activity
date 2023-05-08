// import { useAxios } from '@vueuse/integrations/useAxios';
import axios from 'axios';
import { showToast } from 'vant';
import 'vant/es/toast/style';
import { useUserStore } from '/@/store/modules/user';
let userStore: any = null;
// create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
// request interceptor
instance.interceptors.request.use(
  (config: any) => {
    if (userStore === null) {
      userStore = useUserStore();
    }
    // do something before request is sent
    const token = userStore.token;
    if (token) {
    //   // let each request carry token
      config.headers = {
        ...config.headers,
        'x-access-token': token
      };
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.status !== 200) {
      showToast({
        message: res.message,
        duration: 3000
      });
      return Promise.reject(res.msg || 'Error');
    } else {
      return res;
    }
  },
  (error) => {
    console.log('err' + error);
    showToast(error.message);
    return Promise.reject(error.message);
  },
);

/**
 * reactive useFetchApi
 */

export default instance;