import { SubmitHandler, useForm } from "react-hook-form";
import SubmitButton from "@/components/submitBtn";
import Input from "@/components/input";
import Layout from "@/layouts/layout";
import NavBar from "@/components/NavBar";
import Head from "next/head";

interface IsignUpForm {
  id: string;
  password: string;
  cPassword: string;
  username: string;
  birth: string;
  phone: string;
  email: string;
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
    <Layout>
      <Head>
        <title>SignUp</title>
      </Head>
      <div className="flex justify-center items-center h-screen">
        {/* <form className="mt-40 flex flex-col" onSubmit={handleSubmit(submitForm)}> */}
        <NavBar />
        <form
          className="flex flex-col items-start gap-6 p-0 w-448 h-1017"
          onSubmit={handleSubmit(submitForm)}
        >
          <Input
            name="id"
            label="아이디"
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

          <div className="mb-5" />

          <SubmitButton type="submit" text="회원가입" />
        </form>
      </div>
    </Layout>
  );
}

export default SignUp;
