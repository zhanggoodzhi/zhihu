import { Message } from '@arco-design/web-react';
import axios from 'axios'
import { router } from '../router';
// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API, // url = base url + request url
    timeout: 60000, // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent
        const token = localStorage.getItem("token");
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['Authorization'] = `Bearer ${token}`;
        }
       
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
    */
   
   /**
    * Determine the request status by custom code
    * Here is just an example
    * You can also judge the status by HTTP Status Code
   */
  response => {
      const res = response.data
      return res;
      
    },
    error => {
        if(error?.response?.status===401){
            router.navigate('/login')
            return;
        }
        if(error?.response?.data?.message){
            Message.error(error?.response?.data?.message)
        }
        return Promise.reject(error)
    }
)

export default service