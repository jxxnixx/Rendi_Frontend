// import Link from "next/link";
// import { useRouter } from "next/router";

// export default function NavBar() {
//   const router = useRouter();

//   return (
//     <nav className="fixed flex items-center justify-center top-[100px] z-10 h-[35px] w-full bg-white mx-auto shadow-sm">
//       <div className=" bg-white text-base text-[#666666] space-x-[60px]">
//         <Link href="/" legacyBehavior>
//           <a
//             className={
//               (router.pathname === "/"
//                 ? "active underline visited:text-black  "
//                 : "") + " hover:text-[#FC435A] hover:underline "
//             }
//           >
//             Today
//           </a>
//         </Link>
//         <Link href="/menus/best" legacyBehavior>
//           <a
//             className={
//               (router.pathname === "/menus/best"
//                 ? "active underline visited:text-black "
//                 : "") + " hover:text-[#FC435A] hover:underline "
//             }
//           >
//             Best
//           </a>
//         </Link>
//         <Link href="/menus/new" legacyBehavior>
//           <a
//             className={
//               (router.pathname === "/menus/new"
//                 ? "active underline visited:text-black "
//                 : "") + " hover:text-[#FC435A] hover:underline "
//             }
//           >
//             New
//           </a>
//         </Link>
//         <Link href="/menus/market" legacyBehavior>
//           <a
//             className={
//               (router.pathname === "/menus/market"
//                 ? "active underline visited:text-black "
//                 : "") + " hover:text-[#FC435A] hover:underline "
//             }
//           >
//             Market
//           </a>
//         </Link>
//         <Link href="/menus/trend" legacyBehavior>
//           <a
//             className={
//               (router.pathname === "/menus/trend"
//                 ? "active underline visited:text-black "
//                 : "") + " hover:text-[#FC435A] hover:underline "
//             }
//           >
//             Trend
//           </a>
//         </Link>
//       </div>
//     </nav>
//   );
// }
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
