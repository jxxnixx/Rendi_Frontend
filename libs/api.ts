import axios from "axios";
// export const API_URL = "http://121.166.191.129:9876";

// const api = axios.create({
//   baseURL: API_URL,
// });

export interface ASignUpProps {
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

export interface ASocialSignUpProps {
  provider: string;
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

export interface ALogInProps {
  username: string;
  password: string;
}

export interface ASocialLoginProps {
  provider: string;
  email: string;
}

export interface AEditInfosProps {
  username: string;
  password: string;
  nickname: string;
  phonenum: string;
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
  }: ASignUpProps) => {
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
  checkID: (username: ASignUpProps) =>
    axios.get(`/member/id_check?username=${username}`),

  // 회원가입 인증번호 발급
  getSignupCode: ({ nickname, email }: ASignUpProps) =>
    axios.post("/member/email/", {
      name: nickname,
      email,
    }),

  // 소셜 회원가입
  socialSignup: ({
    provider,
    nickname,
    email,
    phonenum,
    birth,
    sex,
    interests,
    emailAgreeYn,
    phoneAgreeYn,
  }: ASocialSignUpProps) =>
    axios.post("/member/social-profile/", {
      provider,
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
    }),

  // 일반 로그인
  login: ({ username, password }: ALogInProps) =>
    axios.post("/member/login/", {
      // login_method: "normal",
      username,
      password,
    }),

  //소셜 로그인
  socialLogin: ({ provider, email }: ASocialLoginProps) =>
    axios.post("/member/social-token/", {
      provider,
      email,
    }),

  // ID 찾기
  findID: (email: string) => axios.get(`/member/find-id/?email=${email}`),

  // PW 변경
  changePW: (email: string, password: string) =>
    axios.post("/member/find-pw/", { email, password }),

  // 회원정보 수정
  editInfos: ({ username, password, nickname, phonenum }: AEditInfosProps) =>
    axios.post(
      "//URL",
      {
        ...(username && { username }),
        ...(password && { password }),
        ...(nickname && { nickname }),
        ...(phonenum && { phonenum }),
      }
      // {
      //   headers: {
      //     Authorization: token,
      //     "Content-Type": "application/json",
      //   },
      // }
      // token 핸들링 필요
    ),
};
