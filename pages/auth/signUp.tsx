import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import NavBar from "@/components/structure/NavBar";
import Head from "next/head";
import Link from "next/link";

interface IsignUpForm {
  id: string;
  password: string;
  cPassword: string;
  username: string;
  userBirth: string;
  phone: string;
  email: string;
  authCode: string;
  checknum: number;
  extraError?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors },
    //setError,
  } = useForm<IsignUpForm>({
    mode: "onChange",
  });

  const submitForm: SubmitHandler<IsignUpForm> = (data: any) => {
    console.log(data);
  };
  // const submitForm: SubmitHandler<IsignUpForm> = (data: any) => {
  //   console.log(data);
  // };

  return (
    <>
      <Layout>
        <Head>
          <title>SignUp</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1500px] flex-col bg-white text-lg font-medium ">
          <div className="flex justify-center items-center">
            <form
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px]"
              onSubmit={handleSubmit(submitForm)}
            >
              <p className="relative top-[109px] text-4xl font-semibold text-center text-black">
                회원가입
              </p>

              <div className="relative top-[133px]">
                <Input
                  name="id"
                  label="아이디"
                  checkLabel="확인"
                  type="id"
                  register={register("id", {
                    required: {
                      value: true,
                      message: "영어와 숫자로만 구성해주세요.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "이미 존재하는 id 입니다.",
                    },
                  })}
                  placeholder="아이디"
                  // error={errors?.id?.message}
                  kind="check"
                  error={errors?.id?.message}
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
                />

                <Input
                  name="cPassword"
                  label="비밀번호 확인"
                  type="password"
                  kind="text"
                  register={register("cPassword", {
                    required: "cPassword is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,}$/,
                      message: "비밀번호가 일치하지 않습니다.",
                    },
                  })}
                  placeholder="비밀번호 확인"
                  error={errors?.cPassword?.message}
                  autoComplete="off"
                />
                <Input
                  name="username"
                  label="이름"
                  type="username"
                  kind="text"
                  register={register("username", {
                    required: "Username is required",
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
                      message: "Username regex",
                    },
                  })}
                  placeholder="이름"
                  error={errors?.username?.message}
                />
                <Input
                  name="userBirth"
                  label="생년월일"
                  type="userBirth"
                  kind="birth"
                  register={register("userBirth", {
                    required: "UserBirth is required",
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{3,23}$/,
                      message: "UserBirth regex",
                    },
                  })}
                  placeholder="YYMMDD"
                  error={errors?.userBirth?.message}
                />

                <Input
                  name="phone"
                  label="휴대폰 번호"
                  type="phone"
                  kind="text"
                  register={register("phone", {
                    required: "-를 제외하고 입력하세요.",
                    pattern: {
                      value: /^[0-9]{10,11}$/,
                      message: "-를 제외하고 입력하세요.",
                    },
                  })}
                  placeholder="-를 제외하고 입력하세요."
                  error={errors?.phone?.message}
                />
                <Input
                  name="email"
                  label="이메일"
                  checkLabel="인증"
                  type="email"
                  kind="check"
                  register={register("email", {
                    required: "이메일을 입력하세요",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "유효한 이메일 주소를 입력하세요.",
                    },
                  })}
                  placeholder="유효한 이메일 주소를 입력하세요."
                  error={errors?.email?.message}
                />
                <Input
                  name="authCode"
                  label="인증번호"
                  checkLabel="확인"
                  type="authCode"
                  kind="check"
                  register={register("authCode", {
                    required: "인증번호를 입력하세요",
                    // pattern: {
                    //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    //   message: "유효한 이메일 주소를 입력하세요.",
                    // },
                  })}
                  placeholder="인증번호를 입력하세요."
                  error={errors?.authCode?.message}
                />

                <div>
                  <Link href="/auth/login" legacyBehavior>
                    <button className="relative py-[30px] bg-white text-gray-600 text-lg">
                      계정이 이미 있으신가요?
                    </button>
                  </Link>
                </div>

                <div className="flex text-center justify-center">
                  <Link href="/auth/taste" legacyBehavior>
                    <SubmitBtn
                      large={true}
                      type="submit"
                      text="다음"
                      className="flex justify-center items-center h-screen"
                    />
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

export default SignUp;
