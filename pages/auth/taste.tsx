import SubmitBtn from "@/components/function/submitBtn";
import TItems from "@/components/product/tItems";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Taste() {
  const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);

  const handleItemSelection = (itemId: string) => {
    if (selectedItemIds.includes(itemId)) {
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  const isSubmitEnabled = selectedItemIds.length >= 3;

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
          <Link href="/" passHref>
            <SubmitBtn
              large={true}
              type="submit"
              text="회원가입 완료"
              disabled={!isSubmitEnabled}
            />
          </Link>
        </div>
      </div>
    </Layout>
  );
}
