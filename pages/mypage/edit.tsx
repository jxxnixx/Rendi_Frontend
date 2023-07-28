import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Segmented } from "antd";
import { useState } from "react";
import { SignUpState, signUpState } from "@/libs/client/atom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { useMutation } from "@tanstack/react-query";
import { AEditInfosProps, usersApi } from "@/libs/api";

function Edit() {
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
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px]"
            >
              <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                회원정보 수정
              </p>

              <div className="relative top-[133px]">
                <Input
                  name="profile.email"
                  label="이메일"
                  type="email"
                  kind="disabled"
                  register={register("profile.email", {
                    required: "이메일을 입력하세요",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "유효한 이메일 주소를 입력하세요.",
                    },
                  })}
                  placeholder="xxxx@xxx.com"
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
                      value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{2,23}$/,
                      message: "올바르지 않은 형식의 이름입니다.",
                    },
                  })}
                  placeholder="김유저"
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
                  placeholder="user_name"
                  // server 문제 해결되면 placeholder 말고 axios로 불러올 것
                  error={errors?.username?.message}
                  kind="check"
                  checkLabel="확인"
                  watch={watch}
                  errors={errors}
                />

                <Input
                  name="password"
                  label="비밀번호"
                  type="password"
                  kind="text"
                  register={register("password", {
                    required:
                      "영어,숫자,특수문자를 1자 이상씩 포함하여 8자 이상으로 구성해주세요.",
                    minLength: {
                      value: 4,
                      message: "비밀번호는 최소 8자 이상이어야 합니다",
                    },
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/,
                      message:
                        "영어,숫자,특수문자를 1자 이상씩 포함하여 8자 이상으로 구성해주세요.",
                    },
                  })}
                  placeholder="new password"
                  error={errors?.password?.message}
                  autoComplete="off"
                />

                <Input
                  name="cPassword"
                  label="비밀번호 확인"
                  type="password"
                  kind="text"
                  register={register("cPassword", {
                    required: "필수 영역입니다.",
                    validate: (value) =>
                      value === watch("password") ||
                      "입력한 비밀번호와 동일하지 않습니다.",
                  })}
                  placeholder=""
                  error={errors?.cPassword?.message}
                  autoComplete="off"
                />

                <Input
                  name="profile.birth"
                  label="생년월일"
                  type="birth"
                  kind="disabled"
                  register={register("profile.birth", {
                    required: "생년월일을 입력해주세요.",
                  })}
                  placeholder="2000-01-01"
                  error={errors?.profile?.birth?.message}
                />

                <Input
                  name="profile.phonenum"
                  label="휴대폰 번호"
                  type="phonenum"
                  kind="text"
                  register={register("profile.phonenum", {
                    required: "-를 제외하고 입력하세요.",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "-를 제외하고 입력하세요.",
                    },
                  })}
                  placeholder="010-9988-7766"
                  error={errors?.profile?.phonenum?.message}
                />

                <div className="flex mt-[40px] text-center justify-center">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="수정하기"
                    className="flex justify-center items-center h-screen"
                    onClick={handleClick} // handleClick 함수 추가
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Update;
