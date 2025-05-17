// Author: TrungQuanDev: https://youtube.com/@trungquandev


import axios from "axios";
import { toast } from "react-toastify";

//Khởi tạo một dự án Axios authenrizedAxiosInstance mục đích custom và cấu hình chung cho dự án
let authenrizedAxiosInstance = axios.create()
// Thời gian chờ tối đa của 1 request là 10p
authenrizedAxiosInstance.defaults.timeout = 1000 * 60 * 10
// withCredentials: Sẽ cho phép axios tự động đính kèm và gửi cookie trong mỗi request lên BE (Phục vụ cho
// trường hợp chúng ta sử dụng JWT Tokens (refresh và access) theo cơ chế http Only Cookie)
//authenrizedAxiosInstance.defaults.withCredentials = true

/** Cấu hình interceptors (Bộ đánh chặn vào giữa mọi Request và Response)
 http://axios-http.com/docs/interceptors
 */
// Add a request interceptor: Can thiệp vào giữa những cái request API
authenrizedAxiosInstance.interceptors.request.use( (config) => {
    // Do something before request is sent
    return config
}, (error) => {
    // Do something with request error
    return Promise.reject(error)
})

// Add a response interceptor: Can thiệp vào những cái response nhận về từ API
authenrizedAxiosInstance.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Mọi mã http status code nằm ngoài khoảng 200-299 sẽ là success rơi vào đay
    // Do something with response data
    return response
}, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Mọi mã http status code nằm ngoài khoảng 200-299 sẽ là error rơi vào đay
    // Do something with response error

    /**
    Xử lý tập trung phần hiển thị thông báo lỗi trả về từ moị API ở đây 
    console.log error ra là sẽ thấy cấu trúc data dẫn đến message lỗi như dưới đây
    Dùng toastify để hiển thị bất kể mọi mã lỗi lên màn hình, ngoại trừ lỗi 410 - gone phục vụ việc tự động
    refresh lại token
     */
    if(error.response?.status !== 410){
        toast.error(error.response?.data?.message || error?.message)
    }
    return Promise.reject(error)
})

export default authenrizedAxiosInstance