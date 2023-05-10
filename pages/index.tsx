import Circle from "@/components/category/circle";
import HoriCategory from "@/components/category/horiCategory";
import NavBar from "@/components/structure/NavBar";
import Banner from "@/components/structure/banner";
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
      <div className="relative mt-[104px] flex w-full flex-col bg-slate-200 text-lg font-medium ">
        <NavBar />
        <Banner />
        {/* <Link href="/signUp" legacyBehavior>
          <a className={router.pathname === "/signUp" ? "active" : ""}>
            Sign Up
          </a>
        </Link> */}
        <HoriCategory />
      </div>
    </Layout>
  );
};

export default Home;
