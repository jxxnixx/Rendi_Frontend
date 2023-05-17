import React from "react";

export default function SearchBar() {
  return (
    <form>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative top-[46px]">
        <input
          type="search"
          id="default-search"
          className="block w-[679px] h-[46px] px-[20px] rounded-[50px] bg-white border-2 border-[#FC435A] focus:outline-none focus:ring-0 "
          placeholder="검색어를 입력하세요"
          required
        />
        <button // 카메라 아이콘
          type="submit"
          className="absolute inset-y-0 right-[10px] top-[13px] flex items-center justify-center w-5 h-5 p-0 bg-transparent focus:ring-0 focus:outline-none text-gray-500 dark:text-gray-400"
        >
          <svg
            viewBox="0 0 30 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 5.43263C0 4.52306 0.728256 3.78571 1.64092 3.78571H7.38932C7.84045 3.78571 8.36948 3.45866 8.57035 3.05651L9.48312 1.2292C9.68429 0.826473 10.2214 0.5 10.6532 0.5H18.8888C19.3339 0.5 19.8581 0.827056 20.0589 1.2292L20.9717 3.05651C21.1729 3.45924 21.6885 3.78571 22.1527 3.78571H27.9011C28.8074 3.78571 29.5421 4.53446 29.5421 5.43263V21.8531C29.5421 22.7627 28.8118 23.5 27.9116 23.5H1.63041C0.729966 23.5 0 22.7513 0 21.8531V5.43263ZM1.64123 5.42857H8.92396C9.36859 5.42857 9.88789 5.10151 10.0832 4.69937L11.3245 2.14285H18.2997L19.4504 4.6665C19.6423 5.08738 20.1671 5.42857 20.6045 5.42857H27.9008V21.8571H1.64123V5.42857ZM14.771 20.2143C18.3967 20.2143 21.3359 17.2722 21.3359 13.6429C21.3359 10.0136 18.3967 7.07143 14.771 7.07143C11.1453 7.07143 8.20613 10.0136 8.20613 13.6429C8.20613 17.2722 11.1453 20.2143 14.771 20.2143ZM14.771 18.5714C17.4903 18.5714 19.6947 16.3648 19.6947 13.6429C19.6947 10.9209 17.4903 8.71429 14.771 8.71429C12.0518 8.71429 9.84735 10.9209 9.84735 13.6429C9.84735 16.3648 12.0518 18.5714 14.771 18.5714ZM3.28245 2.96429C3.28245 2.51062 3.63376 2.14285 4.11078 2.14285H5.73658C6.19403 2.14285 6.5649 2.52389 6.5649 2.96429V3.78571H3.28245V2.96429Z"
              fill="#666666"
            />
          </svg>
        </button>

        <button // 검색창 아이콘
          type="submit"
          className="absolute inset-y-0 right-[-20px] top-[13px] flex items-center justify-center w-5 h-5 p-0 bg-transparent focus:ring-0 focus:outline-none text-gray-500 dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </form>
  );
}
