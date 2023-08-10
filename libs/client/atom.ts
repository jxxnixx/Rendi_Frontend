import { AtomEffect, atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ASignUpProps } from "../api";

export interface SignUpState {
  username: string;
  password: string;
  profile: {
    nickname: string;
    email: string;
    phonenum: string;
    birth: string;
    sex: string;
    interests: string[];
  };
  emailAgreeYn: string;
  phoneAgreeYn: string;
}

export interface UserInputState {
  username: string;
  profile: {
    nickname: string;
    email: string;
  };
  authCode: string;
}

export const signUpState = atom<SignUpState>({
  key: "signUpState",
  default: {
    username: "",
    password: "",
    profile: {
      nickname: "",
      email: "",
      phonenum: "",
      birth: "",
      sex: "",
      interests: [],
    },
    emailAgreeYn: "Y",
    phoneAgreeYn: "Y",
  },
});

export const userInputState = atom<UserInputState>({
  key: "userInputState",
  default: {
    username: "",
    profile: {
      nickname: "",
      email: "",
    },
    authCode: "",
  },
});

export const backendVeriCodeState = atom<string>({
  key: "backendVeriCodeState",
  default: "",
});
