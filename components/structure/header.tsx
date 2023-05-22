import Link from "next/link";
import BrLine from "./brLine";
import ProfileBtn from "./profileBtn";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <header className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-10 h-[100px] w-[1040px] bg-white mx-auto">
      <>
        {/* 헤더 손봐야함. 네비바 스크롤할때 같이올라가 */}
        {/* 헤더 구분선선 */}
        <BrLine />
        {/* 로고 */}
        <div className="w-[181px] h-[132px]">
          <Link
            href="/"
            legacyBehavior
            className="w-[181px] h-[132px] absolute left-[-0.5px] top-[-1.5px] bg-white"
          >
            <img
              // 로고 확인. src
              src="logo.png"
              className="relative w-[147px] h-[83px] absolute left-[16.5px] top-[38px] object-cover"
            />
          </Link>
        </div>
        {/* 검색창 */}
        <div className="w-[679px] h-[46px] left-[181px] mt-[38px]">
          <SearchBar />
        </div>
        {/* 회원가입/로그인 */}
        <div className="w-[85px] h-[30px]">
          <ProfileBtn />
        </div>
      </>
    </header>
  );
}
// }
// import Link from "next/link";
// import ProfileBtn from "./profileBtn";
// import SearchBar from "./searchBar";

// export default function Header() {
//   return (
//     <header className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-10 h-[132px] w-[1040px] bg-white mx-auto">
//       <svg
//         width={1439}
//         height={1}
//         viewBox="0 0 1439 1"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//         className="absolute left-[-200px] top-[131px]"
//         preserveAspectRatio="none"
//       >
//         <line y1="0.5" x2={1440} y2="0.5" stroke="black" strokeOpacity="0.5" />
//       </svg>
//       <div className="w-[85px] h-[30px]">
//         <div className="w-[85px] h-[30px]">
//           <p className="w-[85px] h-[30px] absolute left-[955px] top-0 opacity-75 text-xs font-medium text-left text-[#666]">
//             회원가입 | 로그인
//           </p>
//         </div>
//       </div>
//       <div className="w-[181px] h-[132px]">
//         <div className="w-[181px] h-[132px] absolute left-[-0.5px] top-[-1.5px] bg-white" />
//         <img
//           src="rendi_logo-1.png"
//           className="w-[147px] h-[83px] absolute left-[16.5px] top-[18.5px] object-cover"
//         />
//       </div>
//       <div className="w-[679px] h-[46px] absolute left-[181px] top-[38px]">
//         <div className="flex justify-start items-start w-[679px] absolute left-0 top-0 gap-60 px-6 py-3.5 rounded-[50px] bg-white border-2 border-[#fc435a]">
//           <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[371px] gap-2.5">
//             <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[371px] gap-60">
//               <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 w-[113px] relative gap-2">
//                 <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#767494]">
//                   Search for products
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//         <svg
//           width={109}
//           height={46}
//           viewBox="0 0 109 46"
//           fill="none"
//           xmlns="http://www.w3.org/2000/svg"
//           className="w-[109px] h-[46px] absolute left-[570px] top-0"
//           preserveAspectRatio="none"
//         >
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M58.0556 27.2539C58.3908 26.9154 58.9343 26.9154 59.2695 27.
//             2539L64.4842 32.5202C64.8194 32.8587 64.8194 33.4076 64.4842 33.7461C64.149 34.0846 63.6055 34.0846 63.2703 33.7461L58.0556 28.4798C57.7204 28.1413 57.7204 27.5924 58.0556 27.2539Z"
//             fill="#666666"
//           />
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M52 12.7391C47.4376 12.7391 43.7391 16.4376 43.7391 21C43.7391 25.5624 47.4376 29.2609 52 29.2609C56.5624 29.2609 60.2609 25.5624 60.2609 21C60.2609 16.4376 56.5624 12.7391 52 12.7391ZM42 21C42 15.4772 46.4772 11 52 11C57.5228 11 62 15.4772 62 21C62 26.5228 57.5228 31 52 31C46.4772 31 42 26.5228 42 21Z"
//             fill="#666666"
//           />
//           <path
//             fillRule="evenodd"
//             clipRule="evenodd"
//             d="M0 16.4326C0 15.5231 0.728256 14.7857 1.64092 14.7857H7.38932C7.84045 14.7857 8.36948 14.4587 8.57035 14.0565L9.48312 12.2292C9.68429 11.8265 10.2214 11.5 10.6532 11.5H18.8888C19.3339 11.5 19.8581 11.8271 20.0589 12.2292L20.9717 14.0565C21.1729 14.4592 21.6885 14.7857 22.1527 14.7857H27.9011C28.8074 14.7857 29.5421 15.5345 29.5421 16.4326V32.8531C29.5421 33.7627 28.8118 34.5 27.9116 34.5H1.63041C0.729966 34.5 0 33.7513 0 32.8531V16.4326ZM1.64123 16.4286H8.92396C9.36859 16.4286 9.88789 16.1015 10.0832 15.6994L11.3245 13.1429H18.2997L19.4504 15.6665C19.6423 16.0874 20.1671 16.4286 20.6045 16.4286H27.9008V32.8571H1.64123V16.4286Z"
//             fill="#666666"
//           />
//         </svg>
//       </div>
//       <div className="w-[181px] h-[132px]">
//         <div className="w-[181px] h-[132px] absolute right-0 top-0 bg-white">
//           <ProfileBtn />
//         </div>
//       </div>
//     </header>
//   );
// }
