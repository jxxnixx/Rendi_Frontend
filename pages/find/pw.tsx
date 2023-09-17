import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { AFindPWProps, usersApi } from "@/libs/api";
import { useRecoilState } from "recoil";
import { UserInputState, findPWInputState } from "@/libs/client/atom";

export interface IFindPWProps extends UserInputState {
  password: string;
  cPassword: string;
}

function FindPW() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFindPWProps>({
    mode: "onChange",
  });

  const [findPWInputValue, setFindPWInputValue] =
    useRecoilState(findPWInputState);

  const handleClick = async () => {
    // 입력값 가져오기

    const email = watch("profile.email");
    const password = watch("password");

    const updatedFindPW: AFindPWProps = {
      email,
      password,
    };

    try {
      const changePWResponse = await usersApi.changePW(updatedFindPW);
      console.log(changePWResponse);
      if (!changePWResponse) {
        alert("비밀번호를 재설정할 수 없습니다. 가입 정보를 확인해주세요.");
        console.log("비밀번호 재설정 실패!");
      }
      if (changePWResponse?.success) {
        alert("비밀번호가 재설정되었습니다. 다시 로그인을 시도해주세요.");
        console.log("비밀번호 재설정 성공!");
      }
    } catch (error) {
      console.log("비밀번호 재설정 오류");
    }
  };

  const submitForm: SubmitHandler<IFindPWProps> = (data: IFindPWProps) => {
    console.log(data);

    handleClick();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Find-pw</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1000px] flex-col bg-white text-lg font-medium mobile:h-[900px]">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px] space-x-[60px]"
            >
              <div>
                <p className="relative top-[109px] text-4xl font-semibold text-center text-black mobile:top-[50px]">
                  비밀번호 찾기
                </p>

                <div className="relative top-[133px] mobile:top-[83px]">
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
                    placeholder="이름"
                    error={errors?.profile?.nickname?.message}
                    inputValue={findPWInputValue}
                    setInputValue={setFindPWInputValue}
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
                    error={errors.profile?.email?.message}
                    inputValue={findPWInputValue}
                    setInputValue={setFindPWInputValue}
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
                    inputValue={findPWInputValue}
                    setInputValue={setFindPWInputValue}
                  />

                  <Input
                    name="password"
                    label="새 비밀번호"
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
                    placeholder="새 비밀번호"
                    error={errors?.password?.message}
                    autoComplete="off"
                    inputValue={findPWInputValue}
                    setInputValue={setFindPWInputValue}
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
                    inputValue={findPWInputValue}
                    setInputValue={setFindPWInputValue}
                  />
                </div>
                <div className="flex mt-[180px] text-center justify-center mobile:mt-[130px]">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="비밀번호 찾기"
                    className="flex justify-center items-center h-screen"
                    onClick={handleClick}
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

export default FindPW;
