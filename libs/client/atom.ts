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
  username?: string;
  password?: string;
  profile: {
    nickname: string;
    email: string;
    birth?: string;
    phonenum?: string;
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

export const signUpInputState = atom<UserInputState>({
  key: "signUpInputState",
  default: {
    username: "",
    profile: {
      nickname: "",
      email: "",
    },
    authCode: "",
  },
});

export const findIDInputState = atom<UserInputState>({
  key: "findIDInputState",
  default: {
    profile: {
      nickname: "",
      email: "",
    },
    authCode: "",
  },
});

export const findPWInputState = atom<UserInputState>({
  key: "findPWInputState",
  default: {
    profile: {
      nickname: "",
      email: "",
    },
    authCode: "",
  },
});

export const editInfoInputState = atom<UserInputState>({
  key: "editInfoInputState",
  default: {
    profile: {
      nickname: "",
      email: "",
      birth: "",
      phonenum: "",
    },
    authCode: "",
  },
});

// export const editInfoState = atom<UserInputState>({
//   key: "editInfoState",
//   default: {},
// });

export const backendVeriCodeState = atom<string>({
  key: "backendVeriCodeState",
  default: "",
});

const { persistAtom } = recoilPersist();

export const recentSearchHistoryState = atom<string[]>({
  key: "recentSearchHistoryState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const recentViewedItemsState = atom<number[]>({
  key: "recentViewedItemsState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
