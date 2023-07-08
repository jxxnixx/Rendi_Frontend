import axios from "axios";
import { getToken } from "next-auth/jwt";

// export const API_URL = "http://121.166.191.129:9876";

// const api = axios.create({
//   baseURL: API_URL,
// });

export interface APIProps {
  username: string;
  password: string;
  nickname: string;
  email: string;
  phonenum: string;
  birth: string;
  sex: string;
  interests: string[];
  emailAgreeYn: string;
  phoneAgreeYn: string;
}

// export const axiosPrivate = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

export const usersApi = {
  signup: async ({
    username,
    password,
    nickname,
    email,
    phonenum,
    birth,
    sex,
    interests,
    emailAgreeYn,
    phoneAgreeYn,
  }: APIProps) => {
    try {
      const response = await axios.post("/member/local/", {
        username,
        password,
        profile: {
          nickname,
          email,
          phonenum,
          birth,
          sex,
          interests,
        },
        emailAgreeYn,
        phoneAgreeYn,
      });

      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "MEMBER_DUPLICATED",
            errorMessage: "이미 가입된 회원입니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      throw error;
    }
  },

  // ID 중복체크 확인
  checkID: (username: APIProps) =>
    axios.get(`/member/id_check?username=${username}`),

  // 회원가입 인증번호 발급
  getSignupCode: ({ nickname, email }: APIProps) =>
    axios.post("/member/email/", {
      name: nickname,
      email,
    }),

  // // sns 회원가입
  // snsSignup: ({
  //   type,
  //   username,
  //   nickname,
  //   email,
  //   phone,
  //   year,
  //   month,
  //   day,
  //   sex,
  //   interests,
  //   emailAYN,
  //   phoneAYN,
  // }: APIProps) =>
  //   axios.post("/member/social-profile/", {
  //     provider: type,
  //     profile: {
  //       sns_user: username,
  //       nickname,
  //       email,
  //       phonenum: phone,
  //       birth: `${year}-${month}-${day}`,
  //       sex,
  //       interests,
  //     },
  //     emailAgreeYn: emailAYN,
  //     phoneAgreeYn: phoneAYN,
  //   }),

  // 일반 로그인
  login: ({ username, password }: APIProps) =>
    axios.post("member/login/", {
      // login_method: "normal",
      username,
      password,
    }),

  // SNS 로그인
  // snsLogin: ({ type, email }: APIProps) =>
  //   axios.post("/member/social-token/", {
  //     provider: type,
  //     email,
  //   }),

  // ID 찾기
  findID: (email: string) => axios.get(`/member/find-id/?email=${email}`),

  // PW 변경
  changePW: (email: string, password: string) =>
    axios.post("/member/find-pw/", { email, password }),
};
