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

export interface UserInfoState {
  username: string;
  nickname: string;
  email: string;
  birth: string;
  phonenum: string;
  interests: string[];
}

// 찐 회원가입용 atom. taste 페이지에서 회원가입 post 시 사용
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

// signUp 페이지에서 사용자 입력값을 받아오기 위한 일시적 atom
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

// findID 페이지에서 사용자 입력값을 받아오기 위한 일시적 atom
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

// findPW 페이지에서 사용자 입력값을 받아오기 위한 일시적 atom
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

// 회원정보 수정 페이지에서 사용자 입력값을 받아오기 위한 일시적 atom
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

//
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

export const userInfoState = atom<UserInfoState>({
  key: "userInfoState",
  default: {
    username: "",
    nickname: "",
    email: "",
    birth: "",
    phonenum: "",
    interests: [],
  },
  effects_UNSTABLE: [persistAtom],
});

export const searchFiltersState = atom<any>({
  key: "searchFiltersState",
  default: {
    productIds: [],
    sortName: "",
    parentCategory: "",
    childCategory: "",
    colourName: "",
    minPrice: 0,
    maxPrice: 50000,
  },
});
