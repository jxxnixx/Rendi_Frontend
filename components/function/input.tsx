import { cls } from "@/libs/client/utils";
import React from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  kind?: "text" | "check" | "birth";
  label: string;
  checkLabel?: string;
  name: string;
  register: UseFormRegisterReturn;
  error?: string;
  [key: string]: any;
}
export default function Input({
  label,
  checkLabel,
  name,
  register,
  kind = "text",
  error,
  ...rest
}: InputProps) {
  const { ref, onChange, ...inputProps } = register;

  let inputComponent;
  if (kind === "text") {
    inputComponent = (
      <div className="w-[448px] h-[55px] rounded-[50px] bg-white ">
        {/* py-[20px] */}
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
    );
  } else if (kind === "check") {
    inputComponent = (
      <div className="relative w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          onChange={onChange}
          className={cls(
            "w-full h-full rounded-[50px] bg-white border-none px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
            error
              ? "w-full h-full rounded-[50px] bg-white border border-[#f00]"
              : "w-full h-full rounded-[50px] bg-white border border-[#4caf50]"
          )}
          id={name}
          name={name}
        />
        <button
          {...rest}
          ref={ref}
          className="absolute top-[10px] right-[20px] w-[67px] h-[35px] bg-[#FC435A] rounded-[50px] text-white flex justify-center items-center"
        >
          {checkLabel}
        </button>
      </div>
    );
  } else if (kind === "birth") {
    inputComponent = (
      <div className="flex gap-2">
        <div className="w-[200px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
          <input
            {...inputProps}
            {...rest}
            ref={ref}
            onChange={onChange}
            className={cls(
              "w-full h-full rounded-[50px] bg-white border-none px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
              error
                ? "w-full h-full rounded-[50px] bg-white border border-[#f00]"
                : "w-full h-full rounded-[50px] bg-white border border-[#4caf50]"
            )}
            id={name}
            name={name}
          />{" "}
        </div>
        <p className="flex-grow-0 flex-shrink-0 w-[34px] h-[55px] text-lg text-center flex items-center justify-center text-[#666]">
          -
        </p>

        <div className="w-[50px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
          <input
            {...inputProps}
            {...rest}
            ref={ref}
            onChange={onChange}
            className={cls(
              "w-full h-full rounded-[50px] bg-white border-none px-[20px] py-[19.25px] placeholder-white focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
              error
                ? "w-full h-full rounded-[50px] bg-white border border-[#f00]"
                : "w-full h-full rounded-[50px] bg-white border border-[#4caf50]"
            )}
            id={name + "_confirm"}
            name={name + "_confirm"}
          />{" "}
        </div>
        <div className="w-[150px] text-center flex items-center text-5xl">
          ••••••
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1.5 py-[10px]">
      <label
        className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#666]"
        htmlFor={name}
      >
        {label}
      </label>
      {inputComponent}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}

// export default function Input({
//   label,
//   checkLabel,
//   name,
//   register,
//   kind = "text",
//   error,
//   ...rest
// }: InputProps) {
//   const { ref, onChange, ...inputProps } = register;

//   return (
//     <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative gap-1.5">
//       <label
//         className=" flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#666]"
//         htmlFor={name}
//       >
//         {label}
//       </label>

//       {kind === "text" ? ( // kind에 따라 출력하는 컴포넌트 변경
//         <div className="w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
//           <input
//             {...inputProps}
//             {...rest}
//             ref={ref}
//             onChange={onChange}
//             className={cls(
//               "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
//               error
//                 ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
//                 : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
//             )}
//             id={name}
//             name={name}
//           />{" "}
//         </div>
//       ) : kind === "check" ? (
//         <div className="relative w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
//           <input
//             {...inputProps}
//             {...rest}
//             ref={ref}
//             onChange={onChange}
//             className={cls(
//               "w-full h-full rounded-[50px] bg-white border-none px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
//               error
//                 ? "w-full h-full rounded-[50px] bg-white border border-[#f00]"
//                 : "w-full h-full rounded-[50px] bg-white border border-[#4caf50]"
//             )}
//             id={name}
//             name={name}
//           />
//           <button
//             {...rest}
//             ref={ref}
//             className="absolute top-[10px] right-[20px] w-[67px] h-[35px] bg-[#FC435A] rounded-[50px] text-white flex justify-center items-center"
//           >
//             {checkLabel}
//           </button>
//         </div>
//       ) : null}
//       {error && <span className="text-red-500 text-sm">{error}</span>}
//     </div>
//   );
// }
