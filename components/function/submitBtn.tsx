import { cls } from "@/libs/client/utils";
import { useRecoilState } from "recoil";
import { signUpState, SignUpState } from "@/libs/client/atom";

interface SubmitBtnProps {
  kind?: "submit" | "button";
  large?: boolean;
  text: string;
  className: any;
  onClick: any;
}

export default function SubmitBtn({
  kind,
  large = false,
  text,
  ...rest
}: SubmitBtnProps) {
  const [signUpData, setSignUpData] = useRecoilState(signUpState);

  const handleClick = () => {
    if (kind === "button") {
      // 입력값 가져오기
      const username = signUpData.username;
      const password = signUpData.password;
      const profile = { ...signUpData.profile };

      // signUpState 업데이트
      const updatedSignUpData: SignUpState = {
        ...signUpData,
        username: username,
        password: password,
        profile: profile,
      };
      setSignUpData(updatedSignUpData);
    } else if (kind === "submit") {
    }
  };

  return (
    <button
      type={kind === "submit" ? "submit" : "button"}
      className={cls(
        "w-[448px] rounded-[50px] border border-transparent bg-[#FC435A] stroke-[#FC435A] stroke-2  text-[22px] font-medium text-center text-white",
        large ? "h-[65px]" : "h-[55px]"
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
