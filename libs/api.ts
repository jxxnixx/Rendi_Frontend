import axios from "axios";

export const API_URL = "http://121.166.191.129:9876";

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
  email?: string;
  nickname?: string;
  birth?: string;
  phonenum?: string;
}

export interface AEmailVeriProps {
  nickname: string;
  email: string;
}

export interface AFindIDProps {
  nickname: string;
  email: string;
}

export interface AFindPWProps {
  email: string;
  password: string;
}

export interface APopularSearchProps {
  keyword: string;
  searchCount: number;
}

export interface ASaveSearchProps {
  keyword: string;
}

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const usersApi = {
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
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 400) {
          // Bad Request
          return {
            success: false,
            response: null,
            error: {
              errorCode: data.errorCode || "BAD_INPUT",
              errorMessage: data.errorMessage || "입력이 올바르지 않습니다.",
              errors: data.errors || null,
            },
          };
        } else if (status === 409) {
          // Conflict - Member already exists
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
      }
      console.error("회원가입 오류:", error);
      throw error;
    }
  },

  // ID 중복 확인
  checkID: async (id: string) => {
    try {
      const response = await axios.post("/member/id-check", id, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response.data);

      const message = response.data.response.message;
      alert(message);
      console.log(message);

      return response.data;
    } catch (error: any) {
      // Handle the error
      console.error("중복 확인 오류:", error);
      throw error;
    }
  },

  // 이메일 인증
  emailVerification: async ({ nickname, email }: AEmailVeriProps) => {
    try {
      const response = await axios.post("/member/email", {
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
      throw error;
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
  login: async ({ username, password }: ALogInProps) => {
    try {
      const response = await axios.post("/member/login/", {
        username,
        password,
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
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          // Not Found - Member not found
          return {
            success: false,
            response: null,
            error: {
              errorCode: "MEMBER_NOT_FOUND",
              errorMessage: "회원을 찾을 수 없습니다.",
              errors: null,
            },
          };
        } else if (status === 401) {
          // Unauthorized - Incorrect credentials
          return {
            success: false,
            response: null,
            error: {
              errorCode: "CREDENTIAL_MISS_MATCH",
              errorMessage: "비밀번호가 틀렸습니다.",
              errors: null,
            },
          };
        }
      }
      console.error("로그인 오류:", error);
      throw error;
    }
  },

  //소셜 로그인
  socialLogin: async ({ provider, email }: ASocialLoginProps) =>
    axios.post("/member/social-token/", {
      provider,
      email,
    }),

  // ID 찾기
  findID: async ({ nickname, email }: AFindIDProps) => {
    try {
      const response = await axios.post("/member/find-id/", {
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
      throw error;
    }
  },

  // PW 변경
  changePW: async ({ email, password }: AFindPWProps) => {
    try {
      const response = await axios.post("/member/find-pw/", {
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
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error: any) {
      console.error("비밀번호 변경 오류:", error);
      throw error;
    }
  },

  // 회원정보 조회
  viewInfos: async (accessToken: string) => {
    try {
      const response = await axios.get("/member/information/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
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
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("회원정보 조회 오류:", error);
      throw error;
    }
  },

  // 회원정보 수정
  editInfos: async (accessToken: string, updatedInfos: AEditInfosProps) => {
    try {
      // const response = await axiosPrivate.put("/member/information", updatedInfos);
      const response = await axios.put("/member/information/", updatedInfos, {
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
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("회원정보 수정 오류:", error);
      throw error;
    }
  },

  // 토큰 재발급
  reissueToken: async (accessToken: string, refreshToken: string) => {
    try {
      // const response = await axiosPrivate.post("/member/reissue/", {
      //   accessToken,
      //   refreshToken,
      // });

      const response = await axios.post("/member/reissue/", {
        accessToken,
        refreshToken,
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
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("토큰 재발급 오류:", error);
      throw error;
    }
  },
};

export const itemsApi = {
  // 인기 검색어 조회
  popularSearch: async (accessToken: string) => {
    try {
      // const response = await axiosPrivate.get("/search/keyword/popular/");
      const response = await axios.get("/search/keyword/popular/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        return {
          success: true,
          response: response.data as APopularSearchProps[],
          error: null,
        };
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("인기 검색어 요청 오류:", error);
      throw error;
    }
  },

  // 검색어 저장
  saveSearch: async (accessToken: string, { keyword }: ASaveSearchProps) => {
    try {
      // const response = await axiosPrivate.post("/search/keyword/update/", { keyword });
      const response = await axios.post(
        "/search/keyword/update/",
        { keyword },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        return {
          success: true,
          response: {
            message: "검색어 DB 업데이트 성공",
          },
          error: null,
        };
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("검색어 저장 오류:", error);
      throw error;
    }
  },

  // 찜하기 조회
  getWish: async (accessToken: string) => {
    try {
      // const response = await axiosPrivate.get("/wishlist/all/");
      const response = await axios.get("/wishlist/all/", {
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
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("찜한 상품 조회 오류:", error);
      throw error;
    }
  },

  // 찜하기 변경
  toggleWish: async (accessToken: string, productId: number) => {
    try {
      // const response = await axiosPrivate.post(`/wishlist/${productId}`);
      const response = await axios.post(`/wishlist/${productId}`, {
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
      } else {
        return {
          success: false,
          response: null,
          error: {
            errorCode: "API_ERROR",
            errorMessage: "API 요청 중 오류가 발생했습니다.",
            errors: null,
          },
        };
      }
    } catch (error) {
      console.error("찜 변경 오류:", error);
      throw error;
    }
  },
};

/* 사용예시



(async () => {
  try {
    const result = await searchApi.popular();

    if (result.success) {
      console.log("인기 검색어 TOP 10:");
      console.log(result.response);
    } else {
      console.log("인기 검색어 조회 오류:", result.error?.errorMessage);
    }
  } catch (error) {
    console.error("인기 검색어 요청 오류:", error);
  }
})();

(async () => {
  try {
    const keyword = "검색어"; // 실제 저장하고자 하는 검색어를 변수에 할당해줍니다.
    const result = await searchApi.updateKeyword({ keyword });

    if (result.success) {
      console.log("검색어 저장 성공:", result.response.message);
    } else {
      console.log("검색어 저장 실패:", result.error?.errorMessage);
    }
  } catch (error) {
    console.error("검색어 저장 오류:", error);
  }
})();

(async () => {
  try {
    const result = await wishlistApi.getWishlist();

    if (result.success) {
      console.log("찜한 상품 목록:");
      console.log(result.response);
    } else {
      console.log("찜한 상품 조회 오류:", result.error?.errorMessage);
    }
  } catch (error) {
    console.error("찜한 상품 조회 오류:", error);
  }
})();

(async () => {
  try {
    const productId = 3; // 수정하고자 하는 상품의 아이디
    const result = await wishlistApi.toggleWishlist(productId);

    if (result.success) {
      console.log(result.response.message);
    } else {
      console.log("찜 변경 오류:", result.error?.errorMessage);
    }
  } catch (error) {
    console.error("찜 변경 오류:", error);
  }
})();

(async () => {
  try {
    const accessToken = "기존 accessToken";
    const refreshToken = "기존 refreshToken";

    const result = await usersApi.reissueToken(accessToken, refreshToken);

    if (result.success) {
      console.log("새로운 액세스 토큰:", result.response.accessToken);
      console.log("새로운 리프레시 토큰:", result.response.refreshToken);
    } else {
      console.log("토큰 재발급 오류:", result.error?.errorMessage);
    }
  } catch (error) {
    console.error("토큰 재발급 요청 오류:", error);
  }
})();

*/
