import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  const isMainPage = router.asPath.includes("/main");

  if (!isMainPage) {
    return (
      <nav className="fixed flex items-center justify-center top-[100px] z-20 h-[35px] w-full bg-white mx-auto shadow-sm mobile:top-[50px]">
        <div className="bg-white text-base text-[#666666] space-x-[60px] mobile:space-x-[23px]">
          {[
            { href: "/", text: "Today" },
            { href: "/menus/best", text: "Best" },
            { href: "/menus/new", text: "New" },
            { href: "/menus/market", text: "Market" },
            { href: "/menus/trend", text: "Trend" },
            { href: "/menus/all", text: "All" },
          ].map(({ href, text }) => (
            <Link href={href} key={href} legacyBehavior>
              <a
                className={
                  (router.pathname === href
                    ? "active visited:text-black"
                    : "") + " relative inline-block hover:text-[#FC435A]"
                }
              >
                {text}
                {/* 밑줄 */}
                {router.pathname === href && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black mb-[-6.5px] z-30"></span>
                )}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="fixed flex items-center justify-center top-[100px] z-20 h-[35px] w-full bg-white mx-auto shadow-sm mobile:top-[50px]">
        <div className="bg-white text-base text-[#666666] space-x-[60px] mobile:space-x-[23px]">
          {[
            { href: "/main", text: "Today" },
            { href: "/main/menus/best", text: "Best" },
            { href: "/main/menus/new", text: "New" },
            { href: "/main/menus/market", text: "Market" },
            { href: "/main/menus/trend", text: "Trend" },
            { href: "/main/menus/all", text: "All" },
          ].map(({ href, text }) => (
            <Link href={href} key={href} legacyBehavior>
              <a
                className={
                  (router.pathname === href
                    ? "active visited:text-black"
                    : "") + " relative inline-block hover:text-[#FC435A]"
                }
              >
                {text}
                {/* 밑줄 */}
                {router.pathname === href && (
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black mb-[-6.5px] z-30"></span>
                )}
              </a>
            </Link>
          ))}
        </div>
      </nav>
    );
  }
}
