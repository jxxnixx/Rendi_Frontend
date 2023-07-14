import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import SubmitBtn from "@/components/function/submitBtn";
import TItems from "@/components/product/tItems";
import Layout from "@/layouts/layout";
import Head from "next/head";
import { useState } from "react";
import { signUpState, SignUpState } from "@/libs/client/atom";
import axios from "axios";

interface ITasteForm {
  interests: string[];
}

function Taste() {
  const { handleSubmit } = useForm<ITasteForm>({ mode: "onChange" });

  const [signUpData, setSignUpData] = useRecoilState(signUpState);
  const router = useRouter();

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const handleItemSelection = (itemId: string) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  const isSubmitEnabled = selectedItemIds.length >= 3;

  const handleClick = async () => {
    // interests 업데이트
    const updatedProfile = {
      ...signUpData.profile,
      interests: selectedItemIds,
    };

    const updatedSignUpData: SignUpState = {
      ...signUpData,
      profile: updatedProfile,
    };

    setSignUpData(updatedSignUpData);

    console.log(updatedSignUpData);

    try {
      // 회원가입 요청
      const signupResponse = await axios.post(
        "/member/local",
        updatedSignUpData
      );
      console.log(signupResponse.data);

      if (signupResponse.data.success) {
        // 회원가입 성공
        const accessToken = signupResponse.data.response.accessToken;
        const refreshToken = signupResponse.data.response.refreshToken;

        // 로그인 요청
        const loginData = {
          username: updatedSignUpData.username,
          password: updatedSignUpData.password,
        };
        const loginResponse = await axios.post("/member/login", loginData);
        console.log(loginResponse.data);

        if (loginResponse.data.success) {
          // 로그인 성공
          const accessToken = loginResponse.data.response.accessToken;

          // 토큰 저장
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          // 페이지 이동
          router.push("/");
          console.log("회원가입 완료!");
        } else {
          // 로그인 실패
          console.log("로그인 실패:", loginResponse.data.error);
        }
      } else {
        // 회원가입 실패
        console.log("회원가입 실패:", signupResponse.data.error);
      }
    } catch (error) {
      console.log("회원가입 오류:", error);
    }
  };

  const submitForm: SubmitHandler<ITasteForm> = (data: ITasteForm) => {
    console.log(data);

    handleClick();
  };

  return (
    <Layout>
      <Head>
        <title>Taste</title>
      </Head>

      <div className="flex flex-col h-[1450px] bg-white justify-center items-center">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col items-center mt-[100px]"
        >
          <div className="text-lg text-center font-medium">
            고객님의 선호 스타일을 최소 3개 이상 선택해주세요!
          </div>
          <TItems onItemSelect={handleItemSelection} />

          <div className="w-screen flex flex-col items-center mt-4">
            <SubmitBtn
              large={true}
              type="submit"
              text="회원가입 완료"
              disabled={!isSubmitEnabled}
              onClick={handleClick}
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default Taste;
