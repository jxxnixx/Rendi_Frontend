import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@tanstack/react-query";
import { AEditInfosProps, usersApi } from "@/libs/api";

function Find() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<AEditInfosProps>({
    mode: "onChange",
  });

  const router = useRouter();

  const handleClick = async () => {
    // 입력값 가져오기
    const nickname = watch("nickname");
    const username = watch("username");
    const password = watch("password");
    const phonenum = watch("phonenum");

    router.push("/auth/taste");
  };

  const loginMutation = useMutation(
    (data: ALogInProps) => usersApi.login(data) // usersApi.login 사용
  );

  const [value, setValue] = useState<string | number>("Map");

  const submitForm: SubmitHandler<UpdateForm> = (data: UpdateForm) => {
    console.log(data);

    handleClick();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Update</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1500px] flex-col bg-white text-lg font-medium ">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className="contents items-center gap-[6px] p-0 w-[448px] h-[1500px] space-x-[60px]"
            >
              <div>
                <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                  아이디 찾기
                </p>

                <div className="relative top-[133px]">
                  <Input
                    name="profile.email"
                    label="이메일"
                    type="email"
                    kind="text"
                    register={register("profile.email", {
                      required: "이메일을 입력하세요",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "유효한 이메일 주소를 입력하세요.",
                      },
                    })}
                    placeholder=""
                    error={errors.profile?.email?.message}
                  />

                  <Input
                    name="profile.nickname"
                    label="이름"
                    type="nickname"
                    kind="text"
                    register={register("profile.nickname", {
                      required: "한글로 입력해주세요.",
                      pattern: {
                        value:
                          /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{2,23}$/,
                        message: "올바르지 않은 형식의 이름입니다.",
                      },
                    })}
                    placeholder=""
                    error={errors?.profile?.nickname?.message}
                  />
                </div>
                <div className="flex mt-[180px] text-center justify-center">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="아이디 찾기"
                    className="flex justify-center items-center h-screen"
                    onClick={handleClick} // handleClick 함수 추가
                  />
                </div>
              </div>

              <div>
                <div>
                  <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                    비밀번호 찾기
                  </p>

                  <div className="relative top-[133px]">
                    <Input
                      name="profile.email"
                      label="이메일"
                      type="email"
                      kind="text"
                      register={register("profile.email", {
                        required: "이메일을 입력하세요",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "유효한 이메일 주소를 입력하세요.",
                        },
                      })}
                      placeholder=""
                      error={errors.profile?.email?.message}
                    />

                    <Input
                      name="profile.nickname"
                      label="이름"
                      type="nickname"
                      kind="text"
                      register={register("profile.nickname", {
                        required: "한글로 입력해주세요.",
                        pattern: {
                          value:
                            /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{2,23}$/,
                          message: "올바르지 않은 형식의 이름입니다.",
                        },
                      })}
                      placeholder=""
                      error={errors?.profile?.nickname?.message}
                    />

                    <Input
                      name="username"
                      label="아이디"
                      type="username"
                      register={register("username", {
                        required: {
                          value: true,
                          message: "영어와 숫자로만 구성해주세요.",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9]+$/,
                          message: "적합하지 않은 형태의 아이디 입니다.",
                        },
                      })}
                      placeholder=""
                      // server 문제 해결되면 placeholder 말고 axios로 불러올 것
                      error={errors?.username?.message}
                      kind="text"
                      watch={watch}
                      errors={errors}
                    />
                  </div>
                  <div className="flex mt-[180px] text-center justify-center">
                    <SubmitBtn
                      type="submit"
                      large={true}
                      text="비밀번호 찾기"
                      className="flex justify-center items-center h-screen"
                      onClick={handleClick} // handleClick 함수 추가
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Find;
