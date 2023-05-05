import NavBar from "@/components/NavBar";
import Layout from "@/layouts/layout";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Layout>
      <Head>
        <title>Home</title>
      </Head>
      <div className="mt-14 flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <NavBar />
        <Link href="/signUp" legacyBehavior>
          <a className={router.pathname === "/signUp" ? "active" : ""}>
            Sign Up
          </a>
        </Link>
      </div>
    </Layout>
  );
};

export default Home;
