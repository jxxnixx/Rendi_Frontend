import React, { useEffect, useState } from "react";
import { LeftOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { useRouter } from "next/router";
import { APopularSearchProps, itemsApi } from "@/libs/api";
import { useRecoilState } from "recoil";
import { recentSearchHistoryState } from "@/libs/client/atom";
import { Camera, Search } from "../icons";
import SubmitBtn from "../function/submitBtn";

interface MoMainSearchBarProps {
  onClose: () => void; // 팝업 닫기 핸들러
}

export default function MoMainSearchBar({ onClose }: any) {
  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");

  const [accessToken, setAccessToken] = useState<string>(" ");

  const [popularKeywords, setPopularKeywords] = useState<APopularSearchProps[]>(
    []
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAccessToken: string | null =
        localStorage.getItem("accessToken");
      if (storedAccessToken) {
        setAccessToken(storedAccessToken);
      }
    }
  }, []);

  const [recentSearchHistory, setRecentSearchHistory] = useRecoilState(
    recentSearchHistoryState
  );

  const [searchValue, setSearchValue] = useState("");
  const [imageValue, setImageValue] = useState(""); // 이미지 처리 state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 기존 최근 검색어와 중복을 제거한 후 새로운 검색어 추가
    setRecentSearchHistory((prevHistory) => {
      const updatedHistory = [
        searchValue,
        ...prevHistory.filter((item) => item !== searchValue),
      ];
      return updatedHistory;
    });

    // 검색 로직
    console.log("Search value:", searchValue);
    console.log("Image value:", imageValue);

    if (accessToken && searchValue) {
      try {
        const saveResponse = await itemsApi.saveKeyword(
          searchValue,
          accessToken
        );
        console.log(saveResponse); // 응답 데이터 출력

        // 성공적으로 검색어를 저장한 후, 다음 동작을 수행할 수 있음
        router.push(
          `/main/searchResult?search=${searchValue}&image=${imageValue}`
        );

        setSearchValue(""); // 검색어 초기화
      } catch (error) {
        console.log("검색 키워드 저장 오류:", error);
      }
    }

    onClose(); // 팝업 닫기
  };

  // 버튼 클릭 여부 관리 recent , popular 둘 중 하나로 결정
  const [showContent, setShowContent] = useState("recent");

  // 클릭된 button 구별, 관리
  const handleTabClick = (tab: string) => {
    setShowContent(tab);

    if (isMainPage) {
      if (tab === "recent") {
      } else if (tab === "popular") {
        handlePopular(accessToken);
      }
    } else {
    }
  };

  const handlePopular = async (accessToken: string) => {
    try {
      const popularResponse: any = await itemsApi.popularSearch(accessToken);
      if (popularResponse.response) {
        setPopularKeywords(popularResponse.response.response.slice(0, 10)); // 최대 10개만 저장
      }
      console.log(popularResponse);
    } catch (error) {
      console.log("인기 검색어 받아오기 오류!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40">
        {/* 검색창 */}
        <div className="p-4 flex justify-between items-center">
          {/* Left arrow icon to close popup */}
          <LeftOutlined onClick={onClose} className="text-2xl cursor-pointer" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="block w-full h-[46px] px-[20px] rounded-[50px] bg-white border-2 border-[#FC435A] focus:outline-none focus:ring-0"
            // placeholder=!showSquare?"검색어를 입력하세요":"사진을 업로드해주세요"
            placeholder="검색어를 입력하세요."
          />
        </div>
        {/* 최근 검색어와 인기 검색어 */}
        <div className="px-4">
          <div className="w-[570px] h-[570px] relative z-0">
            <div
              className={`w-[570px] h-12 absolute ${
                showContent === "recent" ? "left-[0px]" : "right-[0px]"
              } overflow-hidden`}
            >
              <svg
                width={570}
                height={0.5}
                viewBox="0 0 570 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[47px]"
                preserveAspectRatio="none"
              >
                <path d="M0 1L570 1" stroke="black" strokeOpacity="0.5" />
              </svg>

              <svg
                width={235}
                height={2}
                viewBox="0 0 235 2"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`absolute top-[46px] ${
                  showContent === "recent" ? "left-[0px]" : "right-[0px]"
                }`}
                preserveAspectRatio="none"
              >
                <path d="M0 2L235 2" stroke="#FC435A" strokeWidth="5" />
              </svg>

              <svg
                width={570}
                height={1}
                viewBox="0 0 570 1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-[-1px]"
                preserveAspectRatio="none"
              >
                <path d="M0 0L500 0" stroke="black" strokeOpacity="0.5" />
              </svg>

              <div className="w-[570px] h-12 absolute left-0 top-0">
                <div className="flex flex-row text-sm font-medium text-center text-black content-center">
                  <button
                    type="button"
                    id="recent"
                    className={`w-1/2 h-12 items-center justify-center content-center ${
                      showContent === "recent"
                        ? "text-[#FC435A] border-b-2 border-[#FC435A]"
                        : ""
                    }`}
                    onClick={() => handleTabClick("recent")}
                  >
                    최근 검색어
                  </button>
                  <button
                    type="button"
                    id="popular"
                    className={`w-1/2 h-12 items-center justify-center content-center ${
                      showContent === "popular"
                        ? "text-[#FC435A] border-b-2 border-[#FC435A]"
                        : ""
                    }`}
                    onClick={() => handleTabClick("popular")}
                  >
                    인기 검색어
                  </button>
                </div>
              </div>
            </div>
            <div className="w-[570px] h-[361px] absolute left-0 right-0 top-12 overflow-hidden">
              <div
                id="content"
                className="w-[200px] absolute left-[190px] top-[157px] text-sm font-medium text-center text-black"
              >
                {showContent === "recent"
                  ? recentSearchHistory.length > 0
                    ? recentSearchHistory.map((item, index) => (
                        <div key={index}>{item}</div>
                      ))
                    : "최근 검색한 기록이 없습니다."
                  : popularKeywords.length > 0
                  ? popularKeywords.map((item, index) => (
                      <div key={index}>
                        {item.keyword} ({item.searchCount}회 검색)
                      </div>
                    ))
                  : "인기 검색어 로딩 중.."}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <SubmitBtn type="submit" text={"검색"} />
          </div>
        </div>
      </div>
    </form>
  );
}
