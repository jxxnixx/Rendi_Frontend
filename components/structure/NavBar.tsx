import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <div className=" h-[28px] bg-white py-3 text-base text-black flex shadow-md space-x-[60px] items-center justify-center">
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Today</a>
        </Link>
        <Link href="/best" legacyBehavior>
          <a className={router.pathname === "/best" ? "active" : ""}>Best</a>
        </Link>
        <Link href="/new" legacyBehavior>
          <a className={router.pathname === "/new" ? "active" : ""}>New</a>
        </Link>
        <Link href="/market" legacyBehavior>
          <a className={router.pathname === "/market" ? "active" : ""}>
            Market
          </a>
        </Link>
        <Link href="/trend" legacyBehavior>
          <a className={router.pathname === "/trend" ? "active" : ""}>Trend</a>
        </Link>
      </div>
    </nav>
  );
}
