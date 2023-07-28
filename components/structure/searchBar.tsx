import React, { useState, useRef, useEffect } from "react";
import { Camera, Search } from "../icons";
import { Button, Upload } from "antd";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchValue = inputRef.current?.value;
    const imageValue = ""; // 이미지 값 가져오는 방법에 따라 추가

    setShowUpload(false);

    router.push(`/searchResult?search=${searchValue}&image=${imageValue}`);
  };
  // Ref로 사각형, input dom요소 참조
  // const squareRef = useRef<HTMLDivElement>(null);
  // const inputRef = useRef<HTMLInputElement>(null);
  const squareRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 검색창 하단 사각형 표시 여부 관리
  const [showSquare, setShowSquare] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  // 버튼 클릭 여부 관리 recent , popular 둘 중 하나로 결정
  const [showContent, setShowContent] = useState("recent");

  useEffect(() => {
    // 검색창 외부 클릭 시 사각형 사라지게 설정
    const handleClickOutside = (event: MouseEvent) => {
      if (
        // Ref 사용해서 클릭된 요소가 사각형,input 내부인지 외부인지 확인
        squareRef.current &&
        !squareRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSquare(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // showSqaure state 관리
  const handleInputClick = () => {
    setShowSquare(true);
  };

  const handleCameraClick = () => {
    setShowUpload(true);
  };

  // 클릭된 button 구별, 관리
  const handleTabClick = (tab: string) => {
    setShowContent(tab);
  };

  // 닫기 button
  const handleCloseClick = () => {
    setShowSquare(false);
  };

  const handleCameraCloseClick = () => {
    setShowUpload(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      {/* div 수정 */}
      <div className="relative">
        {!showSquare && !showUpload ? (
          <input
            ref={inputRef}
            type="search"
            id="default-search"
            className="block w-[679px] h-[46px] px-[20px] rounded-[50px] bg-white border-2 border-[#FC435A] focus:outline-none focus:ring-0"
            // placeholder=!showSquare?"검색어를 입력하세요":"사진을 업로드해주세요"
            placeholder="검색어를 입력하세요."
            onClick={handleInputClick}
          />
        ) : (
          <input
            ref={inputRef}
            type="search"
            id="default-search"
            className="block w-[679px] h-[46px] px-[20px] rounded-t-[23px] bg-white border-2 border-[#FC435A] focus:outline-none focus:ring-0 "
            placeholder={
              !showSquare && showUpload
                ? "사진을 업로드해주세요."
                : "검색어를 입력하세요."
            }
            onClick={handleInputClick}
          />
        )}
        {showUpload && (
          <div className="absolute top-[46px] left-[0px] w-[679px] h-[456px] bg-white border-2 border-[#FC435A]  rounded-b-[23px] border-t-0">
            <div className="flex  flex-col justify-center items-center w-[679px] h-[410px]">
              <div className=" w-[600px] mt-[10px] p-[20px] overflow-y-auto">
                <span className="flex m-[20px] justify-center text-sm  font-medium text-gray-900 ">
                  여기로 이미지를 업로드해주세요.
                </span>
                <div>
                  <Upload.Dragger
                    multiple
                    listType="picture"
                    accept=".jpg,.png, .jpeg"
                    //action 속성은 <Upload> 컴포넌트가 파일을 업로드할 서버 쪽 스크립트 또는 API 엔드포인트를 가리키는 URL을 설정합니다. 업로드된 파일은 이 URL로 전송되어 서버 쪽에서 처리됩니다.
                    action={""}
                  >
                    <Button>upload</Button>
                  </Upload.Dragger>
                </div>
              </div>
            </div>
            <div className="flex w-[679px] h-12 absolute left-0 top-[408px] overflow-hidden">
              <button
                id="close"
                className="w-[463px] h-[37px]  top-1.5 text-sm font-medium text-center text-[#666]"
                onClick={handleCameraCloseClick}
              >
                닫기
              </button>
              <button
                id="submit"
                type="submit"
                className="w-[463px] h-[37px]   top-1.5 text-sm font-medium text-center text-[#666]"
              >
                검색
              </button>
            </div>
          </div>
        )}

        {showSquare && (
          <div ref={squareRef} className="w-[679px] h-[456px] relative z-0">
            <div className="flex justify-start items-start w-[679px] h-[456px] absolute left-0 top-0 rounded-b-[23px] bg-white border-x-2 border-b-2 border-[#fc435a]">
              <div
                className={`w-[676px] h-12 absolute ${
                  showContent === "recent" ? "left-[0px]" : "right-[0px]"
                } overflow-hidden`}
              >
                <svg
                  width={673}
                  height={1}
                  viewBox="0 0 673 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[47px]"
                  preserveAspectRatio="none"
                >
                  <path d="M0 1L673 1" stroke="black" strokeOpacity="0.5" />
                </svg>

                <svg
                  width={338}
                  height={2}
                  viewBox="0 0 338 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`absolute top-[46px] ${
                    showContent === "recent" ? "left-[0px]" : "right-[0px]"
                  }`}
                  preserveAspectRatio="none"
                >
                  <path d="M0 2L338 2" stroke="#FC435A" strokeWidth="5" />
                </svg>

                <svg
                  width={673}
                  height={1}
                  viewBox="0 0 673 1"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[-1px]"
                  preserveAspectRatio="none"
                >
                  <path d="M0 0L673 0" stroke="black" strokeOpacity="0.5" />
                </svg>

                <div className=" w-[679px] h-12 flex flex-row text-sm font-medium text-center text-black content-center">
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
                    className={`w-1/2 h-12 items-center justify-center ${
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
              <div className="w-[679px] h-[361px] absolute left-0 top-12 overflow-hidden">
                <div
                  id="content"
                  className="w-[203px] absolute left-[229px] top-[157px] text-sm font-medium text-center text-black"
                >
                  {showContent === "recent"
                    ? "최근 검색한 기록이 없습니다."
                    : "인기 검색어 내용"}
                </div>
              </div>
            </div>
            <div className="w-[679px] h-12 absolute left-0 top-[408px] overflow-hidden">
              <button
                id="close"
                className="w-[463px] h-[37px] absolute left-[108px] top-1.5 text-sm font-medium text-center text-[#666]"
                onClick={handleCloseClick}
              >
                닫기
              </button>
            </div>
          </div>
        )}
        {/* 버튼 두개 위치 수정 */}
        <button
          type="button"
          className="absolute inset-y-0 right-[45px] top-[11px] flex items-center justify-center w-[25px] h-[25px] p-0 bg-transparent focus:ring-0 focus:outline-none text-gray-500 dark:text-gray-400
          "
          onClick={handleCameraClick}
        >
          <Camera />
        </button>

        <button
          type="submit"
          className="absolute inset-y-0 right-[15px] top-[11px] flex items-center justify-center w-[25px] h-[24px] p-0 bg-transparent focus:ring-0 focus:outline-none text-gray-500 dark:text-gray-400"
        >
          <Search />
        </button>
      </div>
    </form>
  );
}
