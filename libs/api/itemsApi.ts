import { api } from "./api";
import { APopularSearchProps, FilteredProduct } from "./apiProps";

const itemsApi = {
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
      if (response) {
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
        console.log("잘됨 굿굿");
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
  recentView: async (recentProductIds: any, accessToken: string) => {
    try {
      console.log(recentProductIds);
      console.log(typeof recentProductIds);

      const response = await api.get("/products/recent", {
        params: { recentProductIds: recentProductIds.join(",") },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      if (response) {
        console.log("최근 본 상품 불러오기 성공");
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

  // 신상품(비로그인)
  newProductsForGuests: async (categoryName: string) => {
    try {
      console.log(categoryName);

      const response = await api.get("/products/guest/new", {
        params: { categoryName },
      });
      console.log(response);

      if (response) {
        console.log("비로그인 신상품 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("비로그인 신상품 불러오기 오류:", error);
    }
  },

  // 신상품(로그인)
  newProductsForUsers: async (categoryName: any, accessToken: any) => {
    try {
      console.log(categoryName);

      const response = await api.get("/products/new", {
        params: { categoryName },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      if (response) {
        console.log("로그인 신상품 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("로그인 신상품 불러오기 오류:", error);
    }
  },

  //베스트 상품(비로그인)
  bestProductsForGuests: async (categoryName: any) => {
    try {
      console.log(categoryName);

      const response = await api.get("/products/guest/best", {
        params: { categoryName },
      });
      console.log(response);

      if (response) {
        console.log("비로그인 베스트 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("비로그인 베스트 불러오기 오류:", error);
    }
  },

  //베스트 상품(로그인)
  bestProductsForUsers: async (categoryName: any, accessToken: any) => {
    try {
      console.log(categoryName);

      const response = await api.get("/products/best", {
        params: { categoryName },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      if (response) {
        console.log("로그인 베스트 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("로그인 베스트 불러오기 오류:", error);
    }
  },

  //추천 상품 (today)
  todayProducts: async (recommendBrandIds: any, accessToken: string) => {
    try {
      const response = await api.get("/products/today", {
        params: { recommendBrandIds: recommendBrandIds.join(",") },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      if (response) {
        console.log("추천 상품 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("추천 상품 불러오기 오류:", error);
    }
  },

  // 카테고리별 조회 (비로그인)
  categoriesForGuests: async (parentName: any, childName: any) => {
    try {
      const response = await api.get("/products/guest/category", {
        params: {
          parentName: parentName === "원피스" ? "원피스/세트" : parentName,
          childName: childName === "전체" ? null : childName,
        },
      });
      if (response) {
        console.log("카테고리별 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("카테고리별 불러오기 오류:", error);
    }
  },

  // 카테고리별 조회 (로그인)
  categoriesForUsers: async (
    parentName: any,
    childName: any,
    accessToken: any
  ) => {
    try {
      const response = await api.get("/products/category", {
        params: {
          parentName: parentName === "원피스" ? "원피스/세트" : parentName,
          childName: childName === "전체" ? null : childName,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(childName);
      console.log(response);

      if (response) {
        console.log("카테고리별 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("카테고리별 불러오기 오류:", error);
    }
  },

  // 전체 상품 (비로그인)
  allProductsForGuests: async (filteredParams: FilteredProduct) => {
    try {
      const response = await api.get("/products/guest/all", {
        params: filteredParams,
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

  // 전체 상품 (로그인)
  allProductsForUsers: async (
    filteredParams: FilteredProduct,
    accessToken: string
  ) => {
    try {
      const response = await api.get("/products/all", {
        params: filteredParams,
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

  // 키워드 검색
  keywordSearch: async (keywordName: any) => {
    try {
      const response = await api.get("/products/guest/search/keyword", {
        params: { keywordName },
      });
      if (response) {
        console.log("키워드 검색 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }
    } catch (error) {
      console.log("키워드 검색 오류:", error);
    }
  },
};

export default itemsApi;
