import Link from "next/link";
import ProfileBtn from "./profileBtn";
import Search from "./search";

export default function Header() {
  return (
    <header className="fixed flex top-0 left-1/2 h-14 w-screen -translate-x-1/2 items-center justify-center bg-white shadow-md">
      <Search />

      <ProfileBtn />

      <Link href="/" legacyBehavior>
        <a className="fixed font-black text-[#111030]">Rendi</a>
      </Link>
    </header>
  );
}
