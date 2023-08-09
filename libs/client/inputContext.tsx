import React, { createContext, useContext, useState } from "react";

interface InputContextProps {
  inputNameValue: string;
  setInputNameValue: (value: string) => void;
  inputIDValue: string;
  setInputIDValue: (value: string) => void;
  inputEmailValue: string;
  setInputEmailValue: (value: string) => void;
  inputAuthCodeValue: string;
  setInputAuthCodeValue: (value: string) => void;
  backendVeriCode: string;
  setBackendVeriCode: (value: string) => void;
}

const InputContext = createContext<InputContextProps | undefined>(undefined);

export const InputProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [inputNameValue, setInputNameValue] = useState<string>("");
  const [inputIDValue, setInputIDValue] = useState<string>("");
  const [inputEmailValue, setInputEmailValue] = useState<string>("");
  const [inputAuthCodeValue, setInputAuthCodeValue] = useState<string>("");
  const [backendVeriCode, setBackendVeriCode] = useState<string>("");

  return (
    <InputContext.Provider
      value={{
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
      }}
    >
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = (): InputContextProps => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider");
  }
  return context;
};
