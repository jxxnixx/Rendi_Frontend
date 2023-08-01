// input.tsx

import React, { useState } from "react";
import { cls } from "@/libs/client/utils";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
  onAuthCodeVerification,
  onEmailVerification,
  onUsernameVerfication,
} from "@/libs/client/useVerification";

interface InputProps {
  kind?: "text" | "check" | "disabled";
  label: string;
  checkLabel?: string;
  name: string;
  register: UseFormRegisterReturn;
  inputNameValue?: any;
  inputEmailValue?: any;
  inputAuthCodeValue?: any;
  [key: string]: any;
}

export default function Input({
  label,
  checkLabel,
  name,
  register,
  kind = "text",
  inputNameValue,
  inputEmailValue,
  inputAuthCodeValue,
  error,
  ...rest
}: InputProps) {
  const { ref, onChange, ...inputProps } = register;

  let inputComponent;
  if (kind === "text") {
    inputComponent = (
      <div className="w-[448px] h-[55px] rounded-[50px] bg-white">
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
        />
      </div>
    );
  } else if (kind === "check") {
    inputComponent = (
      <div className="relative w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0]">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          className={cls(
            "w-[448px] h-[55px] rounded-[50px] bg-gray-100 border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
            error
              ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
              : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
          )}
          id={name}
          name={name}
        />
        <button
          onClick={() => {
            if (checkLabel === "중복확인") {
              onUsernameVerfication(inputNameValue);
            } else if (checkLabel === "인증") {
              onEmailVerification(inputNameValue, inputEmailValue);
            } else if (checkLabel === "확인") {
              onAuthCodeVerification(inputAuthCodeValue);
            }
          }}
          className="absolute top-[10px] right-[20px] w-[67px] h-[35px] bg-[#FC435A] rounded-[50px] text-base text-white flex justify-center items-center"
        >
          {checkLabel}
        </button>
      </div>
    );
  } else if (kind === "disabled") {
    inputComponent = (
      <div className="w-[448px] h-[55px] rounded-[50px] bg-white ">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          onChange={onChange}
          className={cls(
            "w-[448px] h-[55px] rounded-[50px] bg-gray-100 border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A]",
            error
              ? "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#f00]"
              : "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#4caf50]"
          )}
          id={name}
          name={name}
          disabled
        />
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
