import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <Link href="/signUp" legacyBehavior>
        <a className={router.pathname === "/signUp" ? "active" : ""}>Sign Up</a>
      </Link>
      ;
    </div>
  );
};

export default Home;
