import { SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { UserInputState, editInfoInputState } from "@/libs/client/atom";
import { useRecoilState } from "recoil";
import { AEditInfosProps, usersApi } from "@/libs/api";

export interface IEditInfosProps extends UserInputState {
  birth: string;
  phonenum: string;
}

function Edit() {
  const {
    watch,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IEditInfosProps>({
    mode: "onChange",
  });

  const [editInfoInputValue, setEditInfoInputValue] =
    useRecoilState(editInfoInputState);

  const handleClick = async (data: IEditInfosProps) => {
    try {
      const accessToken: any = localStorage.getItem("accessToken");

      const updatedEditInfos = {
        ...(data.profile.email && { email: data.profile.email }),
        ...(data.profile.nickname && { nickname: data.profile.nickname }),
        ...(data.profile.phonenum && { phonenum: data.profile.phonenum }),
        ...(data.profile.birth && { birth: data.profile.birth }),
      };
      // data.profile.000 이 존재할 경우에만 updatedEditInfors에 뒷 내용 추가

      const editInfoResponse = await usersApi.editInfos(
        accessToken,
        updatedEditInfos
      );

      console.log(editInfoResponse);

      if (editInfoResponse.success) {
        console.log("회원정보 수정 성공!");
      }
    } catch (error) {
      console.log("회원정보 수정 오류");
    }
  };

  const submitForm: SubmitHandler<IEditInfosProps> = (
    data: IEditInfosProps
  ) => {
    console.log(data);

    handleClick(data);
  };

  return (
    <>
      <Layout>
        <Head>
          <title>Edit</title>
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
                  inputValue={editInfoInputValue}
                  setInputValue={setEditInfoInputValue}
                  onValueChange
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
                  inputValue={editInfoInputValue}
                  setInputValue={setEditInfoInputValue}
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
                  inputValue={editInfoInputValue}
                  setInputValue={setEditInfoInputValue}
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
                  placeholder="-를 제외하고 입력하세요."
                  error={errors?.profile?.phonenum?.message}
                  inputValue={editInfoInputValue}
                  setInputValue={setEditInfoInputValue}
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

export default Edit;
