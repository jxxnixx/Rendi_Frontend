import { AtomEffect, atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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

// export const atomCate = atom<string>({
//   key: "atomCate",
//   default: "전체", // 기본값은 전체
// });

export const atomActiveCate = atom<string>({
  key: "atomActiveCate",
  default: "전체", // 기본값은 전체
});

// const localStorageEffect =
//   (key: string): AtomEffect<any> =>
//   ({ setSelf, onSet }) => {
//     const savedValue = localStorage.getItem(key);
//     if (savedValue != null) {
//       setSelf(JSON.parse(savedValue));
//     }

//     onSet((newValue, _, isReset) => {
//       isReset
//         ? localStorage.removeItem(key)
//         : localStorage.setItem(key, JSON.stringify(newValue));
//     });
//   };

// const currentUserIDState = atom<number>({
//   key: 'CurrentUserID',
//   default: 1,
//   effects_UNSTABLE: [localStorageEffect('current_user')],
// });

// export const isLoggedInState = atom<boolean>({
//   key: "isLoggedInState",
//   default: false,
//   effects_UNSTABLE: [persistAtom],
//   // effects_UNSTABLE: [localStorageEffect("current_user")],
// });

// export const loginState = atom<LoginState>({
//   key: "loginState",
//   default: { username: "" },
//   effects_UNSTABLE: [persistAtom],
//   // effects_UNSTABLE: [localStorageEffect("current_user")],
// });

// // persistAtom이나 localStorageEffect나 도찐개찐임
