import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";

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
            <p className="text-4xl font-semibold text-black">로그인</p>
          </div>
          <div className="absolute top-[305px] text-center">
            <p className="text-lg text-[#666]">
              Rendi만의 지능형 AI 검색을 경험해보세요!
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center top-[400px] h-screen">
          <form
            className=" flex flex-col items-center mt-[-60px] gap-1 p-0 w-448 h-1017"
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
            <div className="flex text-center text-xs justify-center">
              <SubmitButton
                type="submit"
                text="로그인"
                className="flex justify-center items-center h-screen"
              />
            </div>

            <Link href="/auth/signUp" legacyBehavior>
              <button className="mt-[100px] bg-white text-gray-600 text-base">
                Rendi가 처음이신가요?
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
