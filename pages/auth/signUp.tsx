import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Segmented } from "antd";
import { useEffect, useState } from "react";
import { SignUpState, signUpInputState, signUpState } from "@/libs/client/atom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

interface IsignUpForm extends SignUpState {
  extraError?: string;
  cPassword: string;
  authCode: string;
  isEmailVerified: boolean;
}

function Signup() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IsignUpForm>({
    mode: "onChange",
  });

  const [signUpData, setSignUpData] = useRecoilState(signUpState);
  const [signUpInputValue, setSignUpInputValue] =
    useRecoilState(signUpInputState);
  const router = useRouter();

  const handleClick = () => {
    // 입력값 가져오기
    const username = watch("username");
    const password = watch("password");
    const cPassword = watch("cPassword");
    const nickname = watch("profile.nickname");
    const email = watch("profile.email");
    const phonenum = watch("profile.phonenum");
    const birth = watch("profile.birth");
    const sex = value.toString() as "1" | "2";
    const interests = watch("profile.interests");

    // signUpState 업데이트
    const updatedSignUpData: SignUpState = {
      ...signUpData,
      username,
      password,
      profile: {
        ...signUpData.profile,
        nickname,
        email,
        phonenum,
        birth,
        sex,
        interests,
      },
    };
    setSignUpData(updatedSignUpData);

    console.log(updatedSignUpData);

    router.push("/auth/taste");
  };

  const [value, setValue] = useState<string | number>("Map");

  const submitForm: SubmitHandler<IsignUpForm> = (data: IsignUpForm) => {
    console.log(data);

    handleClick();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>SignUp</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1500px] flex-col bg-white text-lg font-medium ">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px]"
            >
              <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                회원가입
              </p>

              <div className="relative top-[133px]">
                <Input
                  name="username"
                  label="아이디"
                  checkLabel="중복확인"
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
                  placeholder="아이디"
                  error={errors?.username?.message}
                  kind="check"
                  watch={watch}
                  errors={errors}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                  onValueChange
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
                  placeholder="비밀번호"
                  error={errors?.password?.message}
                  autoComplete="off"
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
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
                  placeholder="비밀번호 확인"
                  error={errors?.cPassword?.message}
                  autoComplete="off"
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
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
                  placeholder="이름"
                  error={errors?.profile?.nickname?.message}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                  onValueChange
                />

                <Input
                  name="profile.birth"
                  label="생년월일"
                  type="birth"
                  register={register("profile.birth", {
                    required: "생년월일을 입력해주세요.",
                    pattern: {
                      value:
                        /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/,
                      message: "올바르지 않은 형태의 생년월일입니다.",
                    },
                  })}
                  placeholder="YYYY-MM-DD"
                  error={errors?.profile?.birth?.message}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                />

                <div className="font-bold text-[#666]">
                  성별
                  <div>
                    <Segmented
                      name="profile.sex"
                      type="sex"
                      className="w-[148px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] p-[5px]s"
                      options={[
                        {
                          label: (
                            <div className="w-1/2 p-[10px]">
                              <div>남성</div>
                            </div>
                          ),
                          value: "1",
                        },
                        {
                          label: (
                            <div className="w-1/2 p-[10px]">
                              <div>여성</div>
                            </div>
                          ),
                          value: "2",
                        },
                      ]}
                      value={value}
                      onChange={setValue}
                    />
                  </div>
                </div>

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
                  placeholder="-를 제외하고 입력하세요."
                  error={errors?.profile?.phonenum?.message}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                />

                <Input
                  name="profile.email"
                  label="이메일"
                  checkLabel="인증"
                  type="email"
                  kind="check"
                  register={register("profile.email", {
                    required: "이메일을 입력하세요",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "유효한 이메일 주소를 입력하세요.",
                    },
                  })}
                  placeholder="유효한 이메일 주소를 입력하세요."
                  error={errors?.profile?.email?.message}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                />

                <Input
                  name="authCode"
                  label="인증번호"
                  checkLabel="확인"
                  type="authCode"
                  kind="check"
                  register={register("authCode", {
                    required: "인증번호를 입력하세요",
                  })}
                  placeholder="인증번호를 입력하세요."
                  error={errors?.authCode?.message}
                  inputValue={signUpInputValue}
                  setInputValue={setSignUpInputValue}
                />

                <div className="flex mt-[40px] text-center justify-center">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="다음"
                    className="flex justify-center items-center h-screen"
                    onClick={handleClick} // handleClick 함수 추가
                  />
                </div>

                <div className="flex justify-center">
                  <Link href="/auth/login" legacyBehavior>
                    <button className=" py-[30px] bg-white text-gray-600 text-center">
                      계정이 이미 있으신가요?
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Signup;
