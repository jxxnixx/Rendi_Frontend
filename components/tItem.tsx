import Link from "next/link";

interface TItemProps {
  item: string;
}

export default function TItem({ item }: TItemProps) {
  return (
    <div className="relative w-[222px] h-[350px] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <button className="flex items-center justify-center">
        <Link href="/pdetails" legacyBehavior>
          <img
            className="relative w-[222px] h-[278px] rounded-t-lg"
            src="https://avatars.githubusercontent.com/u/103104002?s=400&u=fe6790e6a567f81123b15f0effc05364cc4b19e8&v=4"
          />
          {/* <a className={router.pathname === "/pdetails" ? "active" : ""} /> */}
        </Link>
        <svg
          width={30}
          height={30}
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 30, height: 30 }}
          preserveAspectRatio="none"
          className="absolute"
        >
          <path
            d="M15.775 26.0125C15.35 26.1625 14.65 26.1625 14.225 26.0125C10.6 24.775 2.5 19.6125 2.5 10.8625C2.5 7 5.6125 3.875 9.45 3.875C11.725 3.875 13.7375 4.975 15 6.675C16.2625 4.975 18.2875 3.875 20.55 3.875C24.3875 3.875 27.5 7 27.5 10.8625C27.5 19.6125 19.4 24.775 15.775 26.0125Z"
            stroke="#666666"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <div className="w-[222px] h-[60px] relative left-[25px] ">
        <p className="relative h-[20px] text-[15px] font-bold text-left text-[#000]">
          {/* 상품명: {item.productId} */}
          {item} 56,500
        </p>
        <p className="relative h-[20px] text-[13px] text-left text-[#666]">
          {item} 히니크
        </p>
        <p className="relative h-[20px] text-[15px] text-left text-[#000]">
          {item} 브라운 항공점퍼
        </p>

        {/* <Link
          to={{
            pathname: `/project/detail/${item.productId}`,
            state: {
              item: item,
            },
          }}
          
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        ></Link> */}
      </div>
    </div>
  );
}
