import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  return (
    <nav>
      <div className=" bg-white py-3 text-base text-black flex shadow-md space-x-5 items-center justify-center">
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Today</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Best</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>New</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Market</a>
        </Link>
        <Link href="/" legacyBehavior>
          <a className={router.pathname === "/" ? "active" : ""}>Trend</a>
        </Link>
      </div>
    </nav>
  );
}
