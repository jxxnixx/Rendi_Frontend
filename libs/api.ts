import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from "axios";
import { getCookie, setCookie } from "./client/cookies";

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

export interface ARecentProps {
  productIds: any;
  accessToken: string;
}

export const API_URL = "/";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

let cancelTokenSource: CancelTokenSource | null = null;

api.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled due to new request");
    }

    cancelTokenSource = axios.CancelToken.source();
    config.cancelToken = cancelTokenSource.token;

    const token = localStorage.getItem("accessToken");

    if (!config.headers) config.headers = {};

    //요청시 AccessToken 계속 보내주기
    if (!token) {
      config.headers.accessToken = null;
      console.log("토큰이 아직업쉥");
    } else if (config.headers && token) {
      const accessToken = token;
      config.headers.authorization = `Bearer ${accessToken}`;
      console.log("토큰 헤더에 넣는다?");
    }
    // 인터셉터 내에서 config를 수정한 후 return
    return config;
  },
  function (error) {
    // Do something with request error
    console.log("intercept 요청 에러!", error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("intercept 잘됨", response);
    return response;
  },
  async (error) => {
    const { config, response } = error;
    if (response && response.status === 401) {
      console.log("토큰 401");

      // token refresh 요청
      try {
        const accessToken = localStorage.getItem("accessToken");

        console.log("재발급 요청한다?");

        try {
          const reissueResponse = await api.post("/member/reissue", {
            accessToken,
          });

          console.log(reissueResponse.data.response);

          const newAccessToken = reissueResponse.data.response.accessToken;
          const newRefreshToken = reissueResponse.data.response.refreshToken;

          localStorage.setItem("accessToken", newAccessToken);
          setCookie("refreshToken", newRefreshToken);

          api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

          const newRequestConfig = { ...config, retry: true };
          return api(newRequestConfig);
        } catch (reissueError) {
          console.log("토큰 재발급 실패", reissueError);
          return Promise.reject(reissueError);
        }
      } catch {
        console.log("response error", error);
        return Promise.reject(error);
      }
    }
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
      if (response.data.success) {
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
      if (response.status === 200) {
        return {
          success: true,
          response: response.data as APopularSearchProps[],
          error: null,
        };
      }
    } catch (error) {
      console.error("인기 검색어 요청 오류:", error);
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
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.error("검색어 저장 오류:", error);
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
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.error("찜한 상품 조회 오류:", error);
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
      if (response.status === 200) {
        console.log(response);
        console.log(response.data);
        console.log(response.data.response);
        console.log(response.data.response.message);
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.error("찜 변경 오류:", error);
    }
  },

  // 조회수 업데이트
  updateHits: async (productId: number, hits: number) => {
    try {
      const response = await api.patch(`/products/hits/update`, {
        productId,
        hits,
      });
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("조회수 업데이트 오류:", error);
    }
  },

  // 최근 본 상품
  recentView: async (recentProductIds: number[], accessToken: string) => {
    try {
      const response = await api.get("/products/recent", {
        params: {
          recentProductIds,
        },
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
      console.log("최근 본 상품 불러오기 오류:", error);
    }
  },

  allProducts: async (accessToken: string) => {
    try {
      const response = await api.get("/products/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {}
  },

  newProducts: async () => {
    try {
      const response = await api.get("/products/new");
      console.log(response);
      if (response.status === 200) {
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {}
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
