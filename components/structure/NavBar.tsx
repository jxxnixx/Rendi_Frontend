import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav className="fixed flex items-center justify-center top-[100px] z-10 h-[35px] w-full bg-white mx-auto shadow-sm">
      <div className="bg-white text-base text-[#666666] space-x-[60px]">
        {[
          { href: "/", text: "Today" },
          { href: "/menus/best", text: "Best" },
          { href: "/menus/new", text: "New" },
          { href: "/menus/market", text: "Market" },
          { href: "/menus/trend", text: "Trend" },
        ].map(({ href, text }) => (
          <Link href={href} key={href} legacyBehavior>
            <a
              className={
                (router.pathname === href ? "active visited:text-black" : "") +
                " relative inline-block hover:text-[#FC435A]"
              }
            >
              {text}
              {/* 밑줄 */}
              {router.pathname === href && (
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black mb-[-6.5px] z-500"></span>
              )}
            </a>
          </Link>
        ))}
      </div>
    </nav>
  );
}
