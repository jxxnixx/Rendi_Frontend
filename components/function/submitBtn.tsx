interface submitBtnProps {
  text: string;
  [key: string]: any;
}

export default function SubmitBtn({ onClick, text, ...rest }: submitBtnProps) {
  return (
    <button
      {...rest}
      className={
        "w-[448px] h-[55px] mt-[10px]  rounded-[50px] border border-transparent bg-[#FC435A] stroke-[#FC435A] stroke-2 absolute text-[22px] font-semibold text-center text-white"
      }
    >
      {text}
    </button>
  );
}
