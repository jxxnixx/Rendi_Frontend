import axios from "axios";
import { getCookie } from "./client/cookies";

export const API_URL = "http://211.33.36.227:8081";

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

export const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refreshToken");
      if (refreshToken) {
        try {
          const response = await api.post("/member/reissue/", {
            accessToken: originalRequest.headers["Authorization"].split(" ")[1],
            refreshToken,
          });

          if (response.status === 200) {
            const newAccessToken = response.data.response.accessToken;
            localStorage.setItem("accessToken", newAccessToken);
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return api(originalRequest);
          }
        } catch (error) {
          console.error("토큰 재발급 오류:", error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;

//https://velog.io/@wooya/axios-interceptors%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-token%EB%A7%8C%EB%A3%8C%EC%8B%9C-refreshToken-%EC%9E%90%EB%8F%99%EC%9A%94%EC%B2%AD

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
    } catch (error: any) {
      console.error("회원가입 오류:", error);
      throw error;
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
    } catch (error: any) {
      console.error("로그인 오류:", error);
      throw error;
    }
  },

  //소셜 로그인
  socialLogin: async ({ provider, email }: ASocialLoginProps) =>
    api.post("/member/social-token/", {
      provider,
      email,
    }),

  // ID 찾기
  findID: async ({ nickname, email }: AFindIDProps) => {
    try {
      const response = await api.post("/member/find-id/", {
        name: nickname,
        email,
      });

      console.log(response.data);
    } catch (error: any) {
      console.error("아이디 찾기 오류:", error);
      throw error;
    }
  },

  // PW 변경
  changePW: async ({ email, password }: AFindPWProps) => {
    try {
      const response = await api.post("/member/find-pw/", {
        email,
        password,
      });
    } catch (error: any) {
      console.error("비밀번호 변경 오류:", error);
      throw error;
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
    } catch (error) {
      console.error("회원정보 조회 오류:", error);
      throw error;
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
    } catch (error) {
      console.error("회원정보 수정 오류:", error);
      throw error;
    }
  },
};

export const itemsApi = {
  // 인기 검색어 조회
  popularSearch: async (accessToken: string) => {
    try {
      // const response = await axiosPrivate.get("/search/keyword/popular/");
      const response = await api.get("/search/keyword/popular/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("인기 검색어 요청 오류:", error);
      throw error;
    }
  },

  // 검색어 저장
  saveKeyword: async (keyword: string, accessToken: string) => {
    try {
      const response = await api.post(
        `/search/keyword/update/`,
        {
          keyword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("검색어 저장 오류:", error);
      throw error;
    }
  },

  // 찜하기 조회
  getWish: async (accessToken: string) => {
    try {
      // const response = await axiosPrivate.get("/wishlist/all/");
      const response = await api.get("/wishlist/all/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("찜한 상품 조회 오류:", error);
      throw error;
    }
  },

  // 찜하기 변경
  toggleWish: async (productId: number, accessToken: string) => {
    try {
      const response = await api.post(`/wishlist/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
