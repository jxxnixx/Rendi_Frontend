import { atom } from "recoil";

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

export interface LoginState {
  username: string;
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

export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
});

export const loginState = atom<LoginState>({
  key: "loginState",
  default: { username: "" },
});
