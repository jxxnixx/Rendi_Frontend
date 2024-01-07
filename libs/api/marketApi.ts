import { api } from "./api";

const marketApi = {
  // 마켓 브랜드 리스트
  allBrands: async () => {
    try {
      const response = await api.get("/brand/all");
      if (response) {
        return { success: true, response: response.data, error: null };
      }
    } catch (error) {
      console.error(error);
    }
  },

  // 마켓 상세페이지 (로그인)
  brandDetailsForUsers: async (brandName: any, accessToken: string) => {
    try {
      const response = await api.get("/brand/details", {
        params: { brandName },
        headers: {
          Authorization: `Bearer ${accessToken}`,
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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },

  // 마켓 상세페이지 (비로그인 )
  brandDetailsForGuests: async (brandName: any) => {
    try {
      const response = await api.get("/brand/guest/details", {
        params: { brandName },
      });
      if (response) {
        console.log("카테고리별 불러오기 성공");
        return {
          success: true,
          response: response.data,
          error: null,
        };
      }

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  },
};

export default marketApi;
