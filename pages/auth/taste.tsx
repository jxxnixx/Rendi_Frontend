import SubmitBtn from "@/components/function/submitBtn";
import TItems from "@/components/product/tItems";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { SignUpState, signUpState } from "@/libs/client/atom";
import { usersApi } from "@/libs/api";

export default function Taste() {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
  const [signUpInfo, setSignUpInfo] = useRecoilState(signUpState);

  const handleItemSelection = (itemId: string) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  const isSubmitEnabled = selectedItemIds.length >= 3;

  const handleSignUpCompletion = async () => {
    const tasteInfo = {
      ...signUpInfo.profile,
      interests: selectedItemIds,
    };

    const finalSignUpInfo = {
      ...signUpInfo,
      profile: tasteInfo,
    };

    try {
      const result = await usersApi.signup(finalSignUpInfo);

      if (result.success) {
        console.log("회원가입 성공:", result.response);
      } else {
        console.error("회원 가입 실패:", result.error?.errorMessage);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Taste</title>
      </Head>
      <div className="flex flex-col h-[1450px] bg-white justify-center items-center">
        <div className="flex flex-col items-center mt-[100px]">
          <div className="text-lg text-center font-medium">
            고객님의 선호 스타일을 최소 3개 이상 선택해주세요!
          </div>
          <TItems onItemSelect={handleItemSelection} />
        </div>

        <div className="w-screen flex flex-col items-center mt-4">
          <Link href="/auth/login" passHref>
            <SubmitBtn
              large={true}
              type="submit"
              text="회원가입 완료"
              disabled={!isSubmitEnabled}
              onClick={handleSignUpCompletion}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
