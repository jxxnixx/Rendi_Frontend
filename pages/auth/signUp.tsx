import { usersApi } from "@/libs/api";
import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";

interface IsignUpForm {
  username: string;
  password: string;
  cPassword: string;
  nickname: string;
  email: string;
  phone: string;
  birth: string;
  authCode: string;
  checknum: number;
  emailAgreeYn: string;
  phoneAgreeYn: string;
  extraError?: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IsignUpForm>({
    mode: "onChange",
  });

  // const [birth, setBirth] = useState({ year: "", month: "", day: "" });
  // const [sex, setSex] = useState("");

  const submitForm: SubmitHandler<IsignUpForm> = async (data: IsignUpForm) => {
    console.log(data);
    try {
      const result = await usersApi.signup(data); // api.ts의 signup 함수 호출

      if (result.success) {
        console.log("회원가입 성공:", result.response);
      } else {
        console.error("회원 가입 실패:", result.error?.errorMessage);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
  //   const value = e.target.value;
  //   if (type === "sex") {
  //     setSex(value === "1" ? "1" : "2");
  //   } else {
  //     setBirth((prev) => ({ ...prev, [type]: value }));
  //   }
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
                  name="username"
                  label="아이디"
                  checkLabel="확인"
                  type="username"
                  register={register("username", {
                    required: {
                      value: true,
                      message: "영어와 숫자로만 구성해주세요.",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
                      message: "이미 존재하는 username 입니다.",
                    },
                  })}
                  placeholder="아이디"
                  // error={errors?.username?.message}
                  kind="check"
                  error={errors?.username?.message}
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
                  name="nickname"
                  label="이름"
                  type="nickname"
                  kind="text"
                  register={register("nickname", {
                    required: "nickname is required",
                    pattern: {
                      value: /^[ㄱ-ㅎ|가-힣|A-z][ㄱ-ㅎ|가-힣|A-z0-9-_]{2,23}$/,
                      message: "nickname regex",
                    },
                  })}
                  placeholder="이름"
                  error={errors?.nickname?.message}
                />
                <Input
                  name="birth"
                  label="생년월일"
                  type="birth"
                  kind="birth"
                  register={register("birth", {
                    required: "birth is required",
                    pattern: {
                      value: /^[0-9]{6}}$/,
                      message: "birth regex",
                    },
                  })}
                  placeholder="YYMMDD"
                  error={errors?.birth?.message}
                />

                {/* <Input
                  name="birth_year"
                  label="생년월일"
                  type="birth"
                  kind="birth"
                  register={register("birth_year", {
                    //... 기타 validation
                  })}
                  placeholder="YY"
                  error={errors?.birth_year?.message}
                  onChange={(e) => handleChange(e, "year")}
                />
                <Input
                  name="birth_month"
                  type="birth"
                  kind="birth"
                  register={register("birth_month", {
                    //... 기타 validation
                  })}
                  placeholder="MM"
                  error={errors?.birth_month?.message}
                  onChange={(e) => handleChange(e, "month")}
                />
                <Input
                  name="birth_day"
                  type="birth"
                  kind="birth"
                  register={register("birth_day", {
                    //... 기타 validation
                  })}
                  placeholder="DD"
                  error={errors?.birth_day?.message}
                  onChange={(e) => handleChange(e, "day")}
                />
                <Input
                  name="sex"
                  type="birth"
                  kind="birth"
                  register={register("sex", {
                    //... 기타 validation
                  })}
                  placeholder="1 or 2"
                  error={errors?.sex?.message}
                  onChange={(e) => handleChange(e, "sex")}
                /> */}

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
