import { cls } from "@/libs/client/utils";
interface submitBtnProps {
  large?: boolean;
  text: string;
  [key: string]: any;
}

export default function SubmitBtn({
  large = false,
  onClick,
  text,
  ...rest
}: submitBtnProps) {
  return (
    <button
      {...rest}
      className={cls(
        "w-[448px] rounded-[50px] border border-transparent bg-mc stroke-[#FC435A] stroke-2  text-[22px] font-semibold text-center text-white",
        large ? "h-[65px]" : "h-[55px]"
      )}
    >
      {text}
    </button>
  );
}
