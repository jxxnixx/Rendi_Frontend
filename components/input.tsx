import { cls } from "@/libs/client/utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  kind?: "text" | "check";
  label: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  [key: string]: any;
}

export default function Input({
  label,
  name,
  register,
  kind = "text",
  error,
  ...rest
}: InputProps) {
  const { ref, onChange, ...inputProps } = register;

  return (
    <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1.5">
      <label
        className=" flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#666]"
        htmlFor={name}
      >
        {label}
      </label>

      {kind === "text" ? ( // kind에 따라 출력하는 컴포넌트 변경
        <div className="w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
          <input
            {...inputProps}
            {...rest}
            ref={ref}
            onChange={onChange}
            className={cls(
              "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
              error
                ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
                : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
            )}
            id={name}
            name={name}
          />{" "}
        </div>
      ) : kind === "check" ? (
        <div className="w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
          <button
            {...rest}
            ref={ref}
            // onClick={onClick}
            className={cls(
              "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
              error
                ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
                : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
            )}
            id={name}
            name={name}
          >
            {label}
          </button>
        </div>
      ) : // <label className="container">
      //   <input type="checkbox" {...rest} />
      //   <span className="checkmark" />
      //   <button
      //     className="check-btn"
      //     style={{
      //       boxSizing: "border-box",
      //       // position: "absolute",
      //       width: "67px",
      //       height: "35px",
      //       left: "0px",
      //       top: "0px",
      //       background: "#FC435A",
      //       border: "1px solid #FC435A",
      //       borderRadius: "50px",
      //     }}
      //   />
      // </label>
      null}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
// import { cls } from "@/libs/client/utils";
// import React from "react";
// import type { UseFormRegisterReturn } from "react-hook-form";

// interface InputProps {
//   kind?: "text";
//   label: string;
//   name: string;
//   register: UseFormRegisterReturn;
//   error?: string;
//   [key: string]: any;
// }

// export default function Input({
//   label,
//   name,
//   register,
//   kind = "text",
//   error,
//   ...rest
// }: InputProps) {
//   return (
//     <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1.5">
//       <label
//         className=" flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#666]"
//         htmlFor={name}
//       >
//         {label}
//       </label>

//       {kind === "text" ? (
//         <div className="w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
//           <input
//             id={name}
//             {...register}
//             {...rest}
//             className={cls(
//               "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] px-[41.82px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
//               error
//                 ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
//                 : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
//             )}
//           />
//         </div>
//       ) : null}
//     </div>
//   );
// }
