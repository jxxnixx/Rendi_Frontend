import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="fixed flex items-center justify-center top-[100px] z-10 h-[35px] w-full bg-white mx-auto shadow-sm">
      <div className=" bg-white text-base text-black space-x-[60px]">
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Today</a>
        </Link>
        <Link href="/menus/best" legacyBehavior>
          <a className={router.pathname === "/menus/best" ? "active" : ""}>
            Best
          </a>
        </Link>
        <Link href="/menus/new" legacyBehavior>
          <a className={router.pathname === "/menus/new" ? "active" : ""}>
            New
          </a>
        </Link>
        <Link href="/menus/market" legacyBehavior>
          <a className={router.pathname === "/menus/market" ? "active" : ""}>
            Market
          </a>
        </Link>
        <Link href="/menus/trend" legacyBehavior>
          <a className={router.pathname === "/menus/trend" ? "active" : ""}>
            Trend
          </a>
        </Link>
      </div>
    </nav>
  );
}
