import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import usersApi from "@/libs/api/usersApi";
import { useRecoilState } from "recoil";
import { UserInputState, findIDInputState } from "@/libs/client/atom";
import { AFindIDProps } from "@/libs/api/apiProps";

function FindID() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserInputState>({
    mode: "onChange",
  });

  const [findIDInputValue, setFindIDInputValue] =
    useRecoilState(findIDInputState);

  const handleClick = async () => {
    // 입력값 가져오기

    const nickname = watch("profile.nickname");
    const email = watch("profile.email");

    const updatedFindID: AFindIDProps = {
      nickname,
      email,
    };

    try {
      const findIDResponse = await usersApi.findID(updatedFindID);
      console.log(findIDResponse);
      if (!findIDResponse) {
        alert("아이디를 찾을 수 없습니다. 가입 정보를 확인해주세요.");
        console.log("아이디 찾기 실패!");
      }

      if (findIDResponse?.success) {
        alert("아이디는 " + findIDResponse.response.username + " 입니다.");
        console.log("아이디 찾기 성공!");
      }
    } catch (error) {
      console.log("아이디 찾기 오류");
    }
  };

  const submitForm: SubmitHandler<UserInputState> = (data: UserInputState) => {
    console.log(data);

    handleClick();
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Find-id</title>
        </Head>

        <div className=" mt-[104px] flex w-full h-[1500px] flex-col bg-white text-lg font-medium mobile:h-[700px]">
          <div className="flex justify-center items-center">
            <form
              onSubmit={handleSubmit(submitForm)}
              className=" items-center gap-[6px] p-0 w-[448px] h-[1500px] space-x-[60px]"
            >
              <div>
                <p className="relative top-[109px] text-4xl font-semibold text-center text-black mobile:top-[50px]">
                  아이디 찾기
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
                    inputValue={findIDInputValue}
                    setInputValue={setFindIDInputValue}
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
                    inputValue={findIDInputValue}
                    setInputValue={setFindIDInputValue}
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
                    inputValue={findIDInputValue}
                    setInputValue={setFindIDInputValue}
                  />
                </div>

                <div className="flex mt-[180px] text-center justify-center  mobile:mt-[130px]">
                  <SubmitBtn
                    type="submit"
                    large={true}
                    text="아이디 찾기"
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

export default FindID;
