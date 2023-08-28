// input.tsx

import React, { useState } from "react";
import { cls } from "@/libs/client/utils";
import type { UseFormRegisterReturn } from "react-hook-form";
import {
  onAuthCodeVerification,
  onEmailVerification,
  onUsernameVerification,
} from "@/libs/client/useVerification";
import { backendVeriCodeState } from "@/libs/client/atom";
import { RecoilState, useRecoilState } from "recoil";

interface InputProps {
  kind?: "text" | "check" | "disabled";
  label: string;
  checkLabel?: string;
  name: string;
  register: UseFormRegisterReturn;
  setInputValue?: (newState: any) => void; // Recoil 상태 업데이트 함수
  onValueChange?: boolean;
  setIdCheck?: (value: boolean) => void | undefined; // 추가
  setCodeCheck?: (value: boolean) => void | undefined; // 추가
  [key: string]: any;
}

export default function Input({
  label,
  checkLabel,
  name,
  register,
  kind = "text",
  error,
  inputValue, // Recoil 상태 추가
  setInputValue, // Recoil 상태 업데이트 함수 추가
  onValueChange = false,
  idCheck,
  codeCheck,
  setIdCheck,
  setCodeCheck,
  ...rest
}: InputProps) {
  const { ref, onChange, ...inputProps } = register;

  const [backendVeriCode, setBackendVeriCode] =
    useRecoilState(backendVeriCodeState);

  // Input 컴포넌트의 onChange 핸들러를 호출할 때마다, 사용자 입력값을 해당 상태로 업데이트
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (setInputValue) {
      setInputValue((prevInputValues: any) => {
        const fieldPath = name.split("."); // 입력 필드 이름을 '.'로 분리

        if (fieldPath.length === 1) {
          // 입력 필드가 profile 외부에 있는 경우
          return {
            ...prevInputValues,
            [name]: value,
          };
        }

        if (fieldPath[0] === "profile") {
          // 입력 필드가 profile 내부에 있는 경우
          return {
            ...prevInputValues,
            profile: {
              ...prevInputValues.profile,
              [fieldPath[1]]: value,
            },
          };
        }

        // 위 조건에 해당하지 않는 경우
        return prevInputValues;
      });
    }

    onChange(event); // 기존의 onChange 핸들러도 호출
    // onValueChange(event);
  };

  let inputComponent;
  if (kind === "text") {
    inputComponent = (
      <div className="w-[448px] h-[55px] rounded-[50px] bg-white justify-center items-center mobile:flex mobile:justify-center mobile:items-center mobile:w-[302px]">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          // onChange={onValueChange ? handleChange : onChange}
          onChange={handleChange}
          className={cls(
            "w-[448px] h-[55px] rounded-[50px] bg-white border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A] mobile:w-[302px] mobile:justify-center",
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
      <div className="relative w-[448px] h-[55px] rounded-[50px] bg-white justify-center mobile:flex mobile:items-center mobile:w-[302px]">
        <input
          {...inputProps}
          {...rest}
          ref={ref}
          className={cls(
            "w-[448px] h-[55px] rounded-[50px] bg-gray-100 border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A] mobile:w-[302px] mobile:justify-center",
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
              onUsernameVerification(inputValue.username);
              const changeIdCheck: any = await onUsernameVerification(
                inputValue.username
              );
              if (changeIdCheck) {
                console.log(true);
                if (setIdCheck) setIdCheck(true); // 값이 있을 때만 호출
              } else {
                console.log(false);
                if (setIdCheck) setIdCheck(false); // 값이 없을 때만 호출
              }
            } else if (checkLabel === "인증") {
              const VeriCode = await onEmailVerification(
                inputValue.profile.nickname,
                inputValue.profile.email
              );
              setBackendVeriCode(VeriCode);
            }
            if (checkLabel === "확인") {
              onAuthCodeVerification(inputValue.authCode, backendVeriCode);
              const changeCodeCheck = await onAuthCodeVerification(
                inputValue.authCode,
                backendVeriCode
              );
              if (changeCodeCheck) {
                console.log(true);
                if (setCodeCheck) setCodeCheck(true); // 값이 있을 때만 호출
              } else {
                console.log(false);
                if (setCodeCheck) setCodeCheck(false); // 값이 없을 때만 호출
              }
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
            "w-[448px] h-[55px] rounded-[50px] bg-gray-100 border border-[#e0e0e0] px-[20px] py-[19.25px] placeholder-gray-400 placeholder: shadow-sm focus:border-[#666] focus:outline-none focus:ring-[#FC435A] mobile:w-[302px]",
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
    <div className="flex flex-col justify-center flex-grow-0 flex-shrink-0 relative gap-1.5 py-[10px] w-[448px] mobile:px-[75px] mobile:text-sm">
      <label
        className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#666] mobile:items-start"
        htmlFor={name}
      >
        {label}
      </label>
      {inputComponent}
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
