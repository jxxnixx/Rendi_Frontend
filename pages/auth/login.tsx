import { ALogInProps, usersApi } from "@/libs/api";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Google, KakaoTalk, LoginLine, Naver } from "@/components/icons";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { setCookie } from "@/libs/client/cookies";

function LogIn() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ALogInProps>({
    mode: "onChange",
  });

  const [loginError, setLoginError] = useState<string>("");
  // const [login, setLogin] = useRecoilState(isLoggedInState);
  // const [logUsername, setLogUsername] = useRecoilState(loginState);
  const router = useRouter();

  // const loginMutation = useMutation(
  //   (data: ALogInProps) => usersApi.login(data) // usersApi.login 사용
  // );
  // useMutation의 첫 번째 매개변수 : 비동기 작업을 수행하는 콜백 함수

  const submitForm: SubmitHandler<ALogInProps> = async (data: ALogInProps) => {
    try {
      const loginResponse = await usersApi.login(data);

      console.log(data);

      if (loginResponse.success) {
        console.log("로그인 성공!");

        console.log(loginResponse);

        // 로그인 성공
        const accessToken: string = loginResponse.response.response.accessToken;
        const refreshToken: string =
          loginResponse.response.response.refreshToken;

        // 토큰 저장
        // refreshToken 저장 위치 고려..!
        localStorage.setItem("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);

        // 페이지 이동
        // 예시: 메인 페이지로 이동
        router.push("/");
      } else {
        // 로그인 실패
        setLoginError(
          "로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인해주세요."
        );
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

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

        <div className="flex justify-center items-center mt-[50px] h-screen">
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
                <Link href="/find/id" legacyBehavior>
                  <button className=" bg-white">아이디 찾기</button>
                </Link>

                <p className=" px-[5px] text-[10pt]"> | </p>

                <Link href="/find/pw" legacyBehavior>
                  <button className=" bg-white">비밀번호 찾기</button>
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
              <button className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#fee500]">
                <div className="mr-[10px]">
                  <KakaoTalk />
                </div>
                카카오 로그인
              </button>
              <button className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#03c75a]">
                <div className="mr-[10px]">
                  <Naver />
                </div>
                네이버 로그인
              </button>
              <button className="flex items-center justify-center flex-row w-[186px] h-[46px] p-5 rounded-[15px] bg-white border border-[#666]/30">
                <div className="mr-[10px]">
                  <Google />
                </div>
                구글 로그인
              </button>
            </div>

            <div className="mt-[40px] bg-white text-gray-600 text-[11pt] text-base">
              Rendi가 처음이신가요?
            </div>
            <Link href="/auth/signup" legacyBehavior>
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
