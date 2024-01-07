import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { getCookie, setCookie } from "../client/cookies";

export const API_URL = "/";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let cancelTokenSource: CancelTokenSource | null = null;

// api.interceptors.request.use(
//   function (config: AxiosRequestConfig): any {
//     if (cancelTokenSource) {
//       cancelTokenSource.cancel("Request canceled due to new request");
//     }

//     cancelTokenSource = axios.CancelToken.source();
//     config.cancelToken = cancelTokenSource.token;

//     const token = localStorage.getItem("accessToken");

//     if (!config.headers) config.headers = {};

//     //요청시 AccessToken 계속 보내주기
//     if (!token) {
//       config.headers.accessToken = null;
//       console.log("토큰이 아직업쉥");
//     } else if (config.headers && token) {
//       const accessToken = token;
//       config.headers.authorization = `Bearer ${accessToken}`;
//       console.log("토큰 헤더에 넣는다?");
//     }
//     // 인터셉터 내에서 config를 수정한 후 return
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.log("intercept 요청 에러!", error);
//     return Promise.reject(error);
//   }
// );
// // Add a response interceptor
// api.interceptors.response.use(
//   function (response: AxiosResponse) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     console.log("intercept 잘됨", response);
//     return response;
//   },
//   async (error) => {
//     const { config, response } = error;
//     if (response && response.status === 401) {
//       console.log("토큰 401");

//       // token refresh 요청
//       try {
//         const accessToken = localStorage.getItem("accessToken");
//         //
//         console.log("재발급 요청한다?");

//         try {
//           const reissueResponse = await api.post("/member/reissue", {
//             accessToken,
//           });

//           console.log(reissueResponse.data.response);

//           const newAccessToken = reissueResponse.data.response.accessToken;
//           const newRefreshToken = reissueResponse.data.response.refreshToken;

//           localStorage.setItem("accessToken", newAccessToken);
//           setCookie("refreshToken", newRefreshToken);

//           api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

//           const newRequestConfig = { ...config, retry: true };
//           return api(newRequestConfig);
//         } catch (reissueError) {
//           console.log("토큰 재발급 실패", reissueError);
//           return Promise.reject(reissueError);
//         }
//       } catch {
//         console.log("response error", error);
//         return Promise.reject(error);
//       }
//     }
//   }
// );

export default api;

// https://velog.io/@wooya/axios-interceptors%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-token%EB%A7%8C%EB%A3%8C%EC%8B%9C-refreshToken-%EC%9E%90%EB%8F%99%EC%9A%94%EC%B2%AD
