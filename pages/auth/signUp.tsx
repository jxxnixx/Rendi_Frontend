import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Segmented } from "antd";
import { useLayoutEffect, useState } from "react";
import { SignUpState, signUpInputState, signUpState } from "@/libs/client/atom";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

interface IsignUpForm extends SignUpState {
  extraError?: string;
  cPassword: string;
  authCode: string;
  isEmailVerified: boolean;
  idCheck: boolean; // 아이디 중복확인 여부
  emailCheck: boolean; // 이메일 인증 여부
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

  // taste.tsx에서 이뤄지는 백엔드와의 소통을 위한 atom. 찐 회원가입용 atom
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  // 사용자 입력값 확인용 atom
  const [signUpInputValue, setSignUpInputValue] =
    useRecoilState(signUpInputState);

  const [idCheck, setIdCheck] = useState<boolean>(false);
  const [codeCheck, setCodeCheck] = useState<boolean>(false);
  const [stateEmailAgree, setStateEmailAgree] = useState<string>("N");
  const [statePhoneAgree, setStatePhoneAgree] = useState<string>("N");

  const router = useRouter();

  useLayoutEffect(() => {
    setIdCheck(false);
  }, [signUpInputValue.username]); // username 값이 변경될 때 실행

  useLayoutEffect(() => {
    setCodeCheck(false);
  }, [signUpInputValue.authCode]); // authCode 값이 변경될 때 실행

  // 약관동의
  const emailAgreeOnChange = (e: CheckboxChangeEvent) => {
    console.log(`email checked = ${e.target.checked}`);

    setSignUpData((prevValue) => ({
      ...prevValue,
      emailAgreeYn: e.target.checked ? "Y" : "N",
    }));
    setStateEmailAgree(e.target.checked ? "Y" : "N");
  };
  const phoneAgreeOnChange = (e: CheckboxChangeEvent) => {
    console.log(`phone checked = ${e.target.checked}`);
    setSignUpData((prevValue) => ({
      ...prevValue,
      phoneAgreeYn: e.target.checked ? "Y" : "N",
    }));
    setStatePhoneAgree(e.target.checked ? "Y" : "N");
  };
  useLayoutEffect(() => {
    // emailAgreeYn이 변경될 때의 동작을 여기에 추가
    console.log("emailAgreeYn changed:", stateEmailAgree);
  }, [stateEmailAgree]);

  useLayoutEffect(() => {
    // phoneAgreeYn이 변경될 때의 동작을 여기에 추가
    console.log("phoneAgreeYn changed:", statePhoneAgree);
  }, [statePhoneAgree]);

  const handleClick = () => {
    console.log(idCheck, codeCheck);
    console.log("emailAgreeYn :", stateEmailAgree);
    console.log("phoneAgreeYn :", statePhoneAgree);
    if (
      idCheck &&
      codeCheck &&
      statePhoneAgree === "Y" &&
      stateEmailAgree === "Y"
    ) {
      console.log("idCheck: " + idCheck + ", codeCheck: " + codeCheck);
      // 입력값 가져오기(submit 이후)
      const username = watch("username");
      const password = watch("password");
      const cPassword = watch("cPassword");
      const nickname = watch("profile.nickname");
      const email = watch("profile.email");
      const phonenum = watch("profile.phonenum");
      const birth = watch("profile.birth");
      const sex = value.toString() as "1" | "2";
      const interests = watch("profile.interests");
      const emailAgreeYn = stateEmailAgree;
      const phoneAgreeYn = statePhoneAgree;

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
        emailAgreeYn,
        phoneAgreeYn,
      };

      setSignUpData(updatedSignUpData);
      console.log(updatedSignUpData);

      router.push("/auth/taste");
    } else if (
      !idCheck &&
      codeCheck &&
      statePhoneAgree === "Y" &&
      stateEmailAgree === "Y"
    ) {
      // console.log("idCheck: " + idCheck + ", codeCheck: " + codeCheck);
      alert("아이디 중복확인을 해주세요.");
    } else if (
      !codeCheck &&
      idCheck &&
      statePhoneAgree === "Y" &&
      stateEmailAgree === "Y"
    ) {
      // console.log("idCheck: " + idCheck + ", codeCheck: " + codeCheck);
      alert("이메일 인증번호 확인을 완료해주세요.");
    } else if (
      codeCheck &&
      idCheck &&
      (statePhoneAgree === "N" || stateEmailAgree === "N")
    ) {
      alert("약관을 모두 동의를 해주세요.");
    } else {
      alert("아이디 중복 확인과 이메일 인증을 완료해주세요.");
    }
  };

  const [value, setValue] = useState<string | number>("Map");

  const submitForm: SubmitHandler<IsignUpForm> = (data: IsignUpForm) => {
    // 약관동의 여부를 가져옵니다
    const emailAgreeYn = stateEmailAgree;
    const phoneAgreeYn = statePhoneAgree;

    // data 객체에 약관동의 여부를 추가합니다
    const formDataWithAgree = {
      ...data,
      emailAgreeYn,
      phoneAgreeYn,
    };
    console.log(data);

    handleClick();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Signup</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1550px] flex-col bg-white text-lg font-medium mobile:h-[1350px] ">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px]  mobile:h-[1300px]"
            >
              <p className="relative top-[89px] text-4xl font-semibold text-center text-black  mobile:mt-[20px] mobile:top-[10px] mobile:text-[19pt]">
                회원가입
              </p>

              <div className="relative top-[110px] mobile:top-[13px] ">
                <Input
                  setIdCheck={setIdCheck}
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
                <div className="pt-[10px] pb-[10px] font-bold text-[#666] mobile:ml-[75px] ">
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
                  setCodeCheck={setCodeCheck}
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
                <div className="flex mobile:flex-col justify-center mt-[20px] gap-[10px] ">
                  <Checkbox
                    onChange={emailAgreeOnChange}
                    className="mobile:justify-center"
                  >
                    이메일 정보 수집 약관동의
                  </Checkbox>
                  <Checkbox
                    onChange={phoneAgreeOnChange}
                    className="mobile:justify-center"
                  >
                    휴대폰 정보 수집 약관동의
                  </Checkbox>
                </div>
                <div className="flex mt-[30px] text-center justify-center">
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
