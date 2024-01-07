import React, { useLayoutEffect, useState } from "react";
import { LeftOutlined, CloseOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import itemsApi from "@/libs/api/itemsApi";
import { useRecoilState } from "recoil";
import { recentSearchHistoryState } from "@/libs/client/atom";
import { Camera, Search } from "../icons";
import SubmitBtn from "../function/submitBtn";
import { useScreenSize, useScreenWidth } from "@/libs/client/useScreen";
import { APopularSearchProps } from "@/libs/api/apiProps";

interface MoSearchBarProps {
  onClose: () => void; // 팝업 닫기 핸들러
}

export default function MoSearchBar({ onClose }: MoSearchBarProps) {
  const router = useRouter();
  const screenWidth = useScreenWidth();

  const isMainPage = router.asPath.includes("/main");
  const [accessToken, setAccessToken] = useState<string>(" ");

  const [searchValue, setSearchValue] = useState(""); // 검색어 상태
  const [imageValue, setImageValue] = useState(""); // State to store the image value

  const [popularKeywords, setPopularKeywords] = useState<APopularSearchProps[]>(
    //[]
    []
  );
  // 순위를 붙이기 위한 popularKeywords 배열 정리, 순위를 붙여서 rankedPopularKeywords에 저장
  const rankedPopularKeywords = popularKeywords
    .slice(0, 10) // 최대 10개까지만 표시
    .sort((a, b) => b.searchCount - a.searchCount)
    .map((item, index) => ({ ...item, rank: index + 1 })); // rank를 순위로 설정

  useLayoutEffect(() => {
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

  const handleSubmitForGuests = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (showContent === "popular") {
      alert("로그인이 필요한 서비스입니다.");
      router.push("/");
    }
    setSearchValue(""); // 검색어 초기화

    onClose(); // 팝업 닫기
  };

  const handleSubmitForUsers = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 빈 문자열 또는 공백 문자열인 경우 처리하지 않고 반환
    if (!searchValue.trim()) {
      return;
    }
    // 기존 최근 검색어와 중복을 제거한 후 새로운 검색어 추가
    setRecentSearchHistory((prevHistory) => {
      const updatedHistory = [
        searchValue,
        ...prevHistory.filter((item) => item !== searchValue),
      ];
      if (updatedHistory.length > MAX_RECENT_SEARCHES) {
        updatedHistory.pop(); // 오래된 검색어부터 삭제
      }
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

  const handleSubmitForGuestsBtnClick = () => {
    alert("로그인이 필요한 서비스입니다.");
  };

  const MAX_RECENT_SEARCHES = 7; // 최근 검색어 최대 개수

  const handleDeleteRecentSearch = (indexToDelete: any) => {
    setRecentSearchHistory((prevHistory) => {
      const updatedHistory = [...prevHistory];
      updatedHistory.splice(indexToDelete, 1);
      return updatedHistory;
    });
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

  if (!isMainPage) {
    return (
      <form onSubmit={handleSubmitForGuests}>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40">
          {/* 검색창 */}
          <div className="p-4 flex justify-between items-center">
            {/* Left arrow icon to close popup */}
            <LeftOutlined
              onClick={onClose}
              className="text-2xl cursor-pointer"
            />
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
          <div className="m-auto">
            <div className="w-screen h-[400px]  h-[400px] relative">
              <div
                className={`w-screen h-12 absolute ${
                  showContent === "recent" ? "left-[0px]" : "right-[0px]"
                } overflow-hidden`}
              >
                <svg
                  width={screenWidth}
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
                  width={screenWidth / 2}
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
                  width={screenWidth}
                  height={1}
                  viewBox="0 0 570 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[-1px]"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0L500 0" stroke="black" strokeOpacity="0.5" />
                </svg>

                <div className="w-screen h-12 absolute left-0 top-0 ">
                  <div className="flex flex-row text-sm font-medium text-center text-black content-center  bg-[#ffffff]">
                    <button
                      type="button"
                      id="recent"
                      className={`z-50 w-1/2 h-12 items-center justify-center content-center ${
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
                      className={`z-50 w-1/2 h-12 items-center justify-center content-center ${
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
              <div className="w-screen h-[400px]  top-12  left-0 right-0 overflow-hidden justify-center items-center m-auto">
                <div
                  id="content"
                  className="w-1/2 h-[400px]  text-sm font-medium flex justify-center items-center text-center text-black m-auto mt-20"
                >
                  {showContent === "recent"
                    ? "최근 검색한 기록이 없습니다."
                    : "로그인이 필요한 서비스입니다."}
                </div>
              </div>
            </div>
            <div
              className="flex justify-center items-center"
              onClick={handleSubmitForGuestsBtnClick}
            >
              <SubmitBtn type="submit" text={"검색"} />
            </div>
          </div>
        </div>
      </form>
    );
  } else {
    return (
      <form onSubmit={handleSubmitForUsers}>
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40">
          {/* 검색창 */}
          <div className="p-4 flex justify-between items-center">
            {/* Left arrow icon to close popup */}
            <LeftOutlined
              onClick={onClose}
              className="text-2xl cursor-pointer"
            />
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
          <div className="m-auto">
            <div className="w-screen  h-[400px] relative">
              <div
                className={`w-screen h-12 absolute ${
                  showContent === "recent" ? "left-[0px]" : "right-[0px]"
                } overflow-hidden`}
              >
                <svg
                  width={screenWidth}
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
                  width={screenWidth / 2}
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
                  width={screenWidth}
                  height={1}
                  viewBox="0 0 570 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[-1px]"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0L500 0" stroke="black" strokeOpacity="0.5" />
                </svg>

                <div className="w-screen  h-12 absolute left-0 top-0 z-100">
                  <div className="flex flex-row text-sm font-medium z-100 text-center text-black content-center">
                    <button
                      type="button"
                      id="recent"
                      className={`w-1/2 h-12 items-center justify-center content-center z-100 bg-[#ffffff] ${
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
                      className={`w-1/2 h-12 items-center justify-center content-center z-100 bg-[#ffffff] ${
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
              <div className=" w-screen overflow-y-auto h-[500px] top-[170px] left-0 right-0 overflow-hidden justify-center items-center ">
                <div
                  id="content"
                  className="w-screen h-[520px]  text-sm font-medium justify-center items-center text-center text-black m-auto mt-[47px] p-[3px] "
                >
                  {showContent === "recent" ? (
                    recentSearchHistory.length > 0 ? (
                      recentSearchHistory.map((item, index) => (
                        <div
                          className="flex flex-row items-center justify-between w-[95%] h-[30px] m-[20px] border-black"
                          key={index}
                        >
                          <div>{item}</div>
                          <div
                            className="flex items-center mr-5"
                            onClick={() => handleDeleteRecentSearch(index)}
                          >
                            <CloseOutlined />
                            {/* <CloseSquareOutlined /> */}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-row items-center justify-center w-[95%] h-[200px] m-[10px] border-black">
                        최근 검색한 기록이 없습니다.
                      </div>
                    )
                  ) : rankedPopularKeywords.length > 0 ? (
                    rankedPopularKeywords.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-row items-center h-[50px] w-1/2 ml-[40%]  overflow-hidden  "
                      >
                        <div className="justify-center items-center mr-1 ">
                          {item.rank}.
                        </div>
                        <div>{item.keyword}</div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-row items-center justify-center w-[95%] h-[400px] m-[10px] border-black">
                      인기 검색어 로딩 중..
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center mt-[100px]">
              <SubmitBtn type="submit" text={"검색"} />
            </div>
          </div>
        </div>
      </form>
    );
  }
}
