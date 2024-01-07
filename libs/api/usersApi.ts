import { api } from "./api";
import {
  AEditInfosProps,
  AEmailVeriProps,
  AFindIDProps,
  AFindPWProps,
  ALogInProps,
  ASignUpProps,
  ASocialLoginProps,
  ASocialSignUpProps,
} from "./apiProps";

const usersApi = {
  // 일반 회원가입
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
      const response = await api.post("/member/local/", {
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
      }
    } catch (error: any) {
      console.error("회원가입 오류:", error);
    }
  },

  // ID 중복 확인
  checkID: async (id: string) => {
    try {
      const response = await api.post("/member/id-check", id, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      const message = response.data.response.message;
      alert(message);

      return response.data;
    } catch (error: any) {
      // Handle the error
      console.error("중복 확인 오류:", error);
      alert("이미 존재하는 아이디입니다.");
    }
  },

  // 이메일 인증
  emailVerification: async ({ nickname, email }: AEmailVeriProps) => {
    try {
      const response = await api.post("/member/email", {
        name: nickname,
        email,
      });

      console.log(response.data);

      const message = response.data.response.message;
      alert(message);
      console.log(message);

      return response.data;
    } catch (error: any) {
      // Handle the error
      console.error("이메일 인증 오류:", error);
    }
  },

  emailcheck: async (email: string) => {
    try {
      const response = await api.post("/member/email-check", {
        email,
      });
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }

      console.log(response.data);
    } catch (error: any) {
      return {
        success: false,
      };
    }
  },

  // 소셜 회원가입
  socialSignup: async ({
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
    api.post("/member/social-profile/", {
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
  login: async ({ username, password }: ALogInProps) => {
    try {
      const response = await api.post("/member/login/", {
        username,
        password,
      });
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error: any) {
      console.error("로그인 오류:", error);
    }
  },

  //소셜 로그인
  socialLogin: async ({ provider, email }: ASocialLoginProps) =>
    api.post("/member/social-token/", {
      provider,
      email,
    }),

  //ID 찾기

  findID: async ({ nickname, email }: AFindIDProps) => {
    try {
      const response = await api.post("/member/find-id/", {
        name: nickname,
        email,
      });

      console.log(response.data);

      if (response.status === 200) {
        const responseData = response.data;
        if (responseData.success) {
          // ID found
          const username = responseData.response.username;
          const createdDate = responseData.response.createdDate;

          return {
            success: true,
            response: {
              username,
              createdDate,
            },
            error: null,
          };
        }
      }
    } catch (error: any) {
      console.error("아이디 찾기 오류:", error);
    }
  },

  // PW 변경
  changePW: async ({ email, password }: AFindPWProps) => {
    try {
      const response = await api.post("/member/find-pw/", {
        email,
        password,
      });
      if (response.status === 200) {
        return {
          success: true,
          response: {
            message: "비밀번호 재설정이 완료되었습니다.",
          },
          error: null,
        };
      }
    } catch (error: any) {
      console.error("비밀번호 변경 오류:", error);
    }
  },

  // 회원정보 조회
  viewInfos: async (accessToken: string) => {
    try {
      const response = await api.get("/member/information/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.error("회원정보 조회 오류:", error);
    }
  },

  // 회원정보 수정
  editInfos: async (accessToken: string, updatedInfos: AEditInfosProps) => {
    try {
      // const response = await axiosPrivate.put("/member/information", updatedInfos);
      const response = await api.put("/member/information/", updatedInfos, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.error("회원정보 수정 오류:", error);
    }
  },
};

export default usersApi;
