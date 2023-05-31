import axios from "axios";

// export const API_URL = "http://121.166.191.129:9876";

// const api = axios.create({
//   baseURL: API_URL,
// });

interface IProps {
  [key: string]: any;
}

// export const axiosPrivate = axios.create({
//   baseURL: API_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

export const usersApi = {
  signup: async ({
    username, // id
    password,
    cPassword,
    nickname, // 본명
    email,
    phone,
    year,
    month,
    day,
    sex,
    interests,
    emailAYN,
    phoneAYN,
  }: IProps) => {
    try {
      const response = await axios.post("/member/local/", {
        username,
        password,
        cPassword,
        nickname,
        email,
        phone,
        birth: `${year}-${month}-${day}`,
        sex,
        interests,
        emailAgreeYn: emailAYN,
        phoneAgreeYn: phoneAYN,
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
  // AgreeYN Y로 넘기기

  // ID 중복체크 확인
  checkID: (username: IProps) =>
    axios.get(`/member/id_check?username=${username}`),

  // 회원가입 인증번호 발급
  getSignupCode: ({ nickname, email }: IProps) =>
    axios.post("/member/email/", {
      name: nickname,
      email,
    }),

  // sns 회원가입
  snsSignup: ({
    type,
    username,
    nickname,
    email,
    phone,
    year,
    month,
    day,
    sex,
    interests,
    emailAYN,
    phoneAYN,
  }: IProps) =>
    axios.post("/member/social-profile/", {
      provider: type,
      profile: {
        sns_user: username,
        nickname,
        email,
        phonenum: phone,
        birth: `${year}-${month}-${day}`,
        sex,
        interests,
      },
      emailAgreeYn: emailAYN,
      phoneAgreeYn: phoneAYN,
    }),

  // 일반 로그인
  login: ({ username, password }: IProps) =>
    axios.post("member/login/", {
      // login_method: "normal",
      username,
      password,
    }),

  // SNS 로그인
  snsLogin: ({ type, email }: IProps) =>
    axios.post("/member/social-token/", {
      provider: type,
      email,
    }),

  // ID 찾기
  findID: (email: string) => axios.get(`/member/find-id/?email=${email}`),

  // PW 변경
  changePW: (email: string, password: string) =>
    axios.post("/member/find-pw/", { email, password }),
};
