// input.tsx

import React, { useState } from "react";
import { cls } from "@/libs/client/utils";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
  onAuthCodeVerification,
  onEmailVerification,
  onUsernameVerification,
} from "@/libs/client/useVerification";
import { useInputContext } from "@/libs/client/inputContext";

interface InputProps {
  kind?: "text" | "check" | "disabled";
  label: string;
  checkLabel?: string;
  name: string;
  register: UseFormRegisterReturn;
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
  const {
    inputNameValue,
    setInputNameValue,
    inputIDValue,
    setInputIDValue,
    inputEmailValue,
    setInputEmailValue,
    inputAuthCodeValue,
    setInputAuthCodeValue,
    backendVeriCode,
    setBackendVeriCode,
  } = useInputContext();

  // // 사용자 입력값들을 상태로 관리
  // const [inputIDValue, setInputIDValue] = useState(""); // 아이디 입력값
  // const [inputNameValue, setInputNameValue] = useState("");
  // const [inputEmailValue, setInputEmailValue] = useState(""); // 이메일 입력값
  // const [inputAuthCodeValue, setInputAuthCodeValue] = useState(""); // 인증 코드 입력값

  // Input 컴포넌트의 onChange 핸들러를 호출할 때마다, 사용자 입력값을 해당 상태로 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "username") {
      setInputIDValue(value);
    } else if (name === "profile.email") {
      setInputEmailValue(value);
    } else if (name === "authCode") {
      setInputAuthCodeValue(value);
    } else if (name === "profile.nickname") {
      setInputNameValue(value);
    }
    onChange(event); // 기존의 onChange 핸들러도 호출
  };

  let inputComponent;
  if (kind === "text") {
    inputComponent = (
      <div className="w-[448px] h-[55px] rounded-[50px] bg-white">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={async () => {
            if (checkLabel === "중복확인") {
              console.log(inputIDValue);
              onUsernameVerification(inputIDValue);
            } else if (checkLabel === "인증") {
              console.log(inputNameValue, inputEmailValue);
              const VeriCode = await onEmailVerification(
                inputNameValue,
                inputEmailValue
              );
              console.log(VeriCode);
              setBackendVeriCode(VeriCode);
            }
            if (checkLabel === "확인") {
              console.log(backendVeriCode);
              onAuthCodeVerification(inputAuthCodeValue, backendVeriCode);
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
