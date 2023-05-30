import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Google, KakaoTalk, LoginLine, Naver } from "@/components/icons";

interface LogInForm {
  id: string;
  password: string;

  extraError?: string;
}

function LogIn() {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
    //setError,
  } = useForm<LogInForm>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<LogInForm> = (data: any) => {
    console.log(data);
  };
  // const submitForm: SubmitHandler<ILogInForm> = (data: any) => {
  //   console.log(data);
  // };

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
              name="id"
              label=""
              type="id"
              register={register("id", {})}
              placeholder="아이디"
              kind="text"
              error={errors?.id?.message}
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
              {/* link 연결해야함. */}
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
