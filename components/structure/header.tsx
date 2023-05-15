import Link from "next/link";
import ProfileBtn from "./profileBtn";
import SearchBar from "./searchBar";

export default function Header() {
  return (
    <header className="fixed flex top-0 z-10 h-[104px] w-screen bg-white">
      <div className=" relative w-[181px] h-[132px]">
        <Link href="/" legacyBehavior className="w-[100px] h-[70px]">
          <img src="logo.png" className="w-[147px] h-[110px]" />
        </Link>
      </div>
      <div className=" relative w-[679px] h-[46px] px-[24px] py-[14px]">
        <SearchBar />
      </div>
      <div className="relative">
        {" "}
        <ProfileBtn />{" "}
      </div>
    </header>
  );
}
