import { API_URL, usersApi } from "@/libs/api";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Google, KakaoTalk, LoginLine, Naver } from "@/components/icons";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import router from "next/router";

interface LogInForm {
  username: string;
  password: string;
}

function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInForm>({
    mode: "onChange",
  });

  const { data, status } = useSession();

  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const handleKakaoLogin = async () => {
    await signIn("kakao");
  };

  const handleNaverLogin = async () => {
    await signIn("naver");
  };

  const submitForm: SubmitHandler<LogInForm> = async (data: LogInForm) => {
    try {
      const response = await usersApi.login({
        username: data.username,
        password: data.password,
      });

      if (response.status === 200) {
        // 로그인 성공 - NextAuth 로그인 처리
        const result = await signIn("credentials", {
          redirect: false,
          username: data.username,
          password: data.password,
        });

        if (result?.error) {
          console.error(result.error);
        } else {
          // 로그인 성공 - 필요한 작업을 수행
          console.log("로그인 성공");
        }
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
    }
  };

  useEffect(() => {
    if (data) {
      router.push("/");
    }
  }, [data]);
  return (
    <>
      <Layout>
        <Head>
          <title>LogIn</title>
        </Head>
        <div className=" flex flex-col items-center">
          <div className="relative top-[241px] text-center">
            <p className="text-4xl mb-[70px] font-semibold text-black">
              로그인
            </p>
          </div>
          <div className="absolute  top-[305px] text-center">
            <p className="text-lg text-[#666]">
              Rendi만의 지능형 AI 검색을 경험해보세요!
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center mt-[70px] h-screen">
          <form
            className=" flex flex-col items-center gap-1 p-0 w-448 h-1017"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              name="username"
              label=""
              type="username"
              register={register("username", {})}
              placeholder="아이디"
              kind="text"
              error={errors?.username?.message}
            />
            <Input
              name="password"
              label=""
              type="password"
              kind="text"
              register={register("password", {})}
              placeholder="비밀번호"
              error={errors?.password?.message}
              autoComplete="off"
            />
            <div className="flex text-xs justify-between items-center h-[40px] w-[448px] text-[#666]">
              <label
                htmlFor="rememberId"
                className="flex items-center cursor-pointer"
              >
                <input type="checkbox" id="rememberId" className="mr-2" />
                Remember ID
              </label>
              <div className="flex">
                {/* 아이디, 비번찾기 페이지 새로 만들어야함 !! */}
                <Link href="flex items-center " legacyBehavior>
                  <button className="">아이디 찾기</button>
                </Link>
                <p className=" m-[5px]"> | </p>
                <Link href="" legacyBehavior>
                  <button>비밀번호 찾기</button>
                </Link>
              </div>
            </div>
            <div className="flex mt-[10px] text-center text-xs justify-center">
              <SubmitButton
                type="submit"
                text="로그인"
                className="flex justify-center items-center h-screen"
              />
            </div>
            <div className="mt-[60px]">
              <LoginLine />
            </div>

            <div className="flex mt-[20px] text-center text-[10pt]">
              <button
                className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#fee500]"
                onClick={handleKakaoLogin}
              >
                <div className="mr-[10px]">
                  <KakaoTalk />
                </div>
                카카오 로그인
              </button>
              <button
                className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#03c75a]"
                onClick={handleNaverLogin}
              >
                <div className="mr-[10px]">
                  <Naver />
                </div>
                네이버 로그인
              </button>
              <button
                className="flex items-center justify-center flex-row w-[186px] h-[46px] p-5 rounded-[15px] bg-white border border-[#666]/30"
                onClick={handleGoogleLogin}
              >
                <div className="mr-[10px]">
                  <Google />
                </div>
                구글 로그인
              </button>
            </div>

            <div className="mt-[40px] bg-white text-gray-600 text-[11pt] text-base">
              Rendi가 처음이신가요?
            </div>
            <Link href="/auth/signUp" legacyBehavior>
              <button className="mt-[3px] bg-white text-black text-[12pt] text-base">
                회원가입
              </button>
            </Link>
          </form>
        </div>
        {/* </Layout> */}
      </Layout>
    </>
  );
}

export default LogIn;

//https://velog.io/@taemin4u/Next-Auth%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0v4
