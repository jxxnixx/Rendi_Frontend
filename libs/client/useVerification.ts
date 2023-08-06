import { ACheckIDProps, usersApi } from "../api";

// backendAuthCode 저장할 closure 생성
const createAuthCodeStorage = () => {
  let backendAuthCode = " ";

  return {
    getAuthCode: () => backendAuthCode,
    setAuthCode: (newAuthCode: string) => {
      backendAuthCode = newAuthCode;
    },
  };
};

// Closure 인스턴스 생성
const authCodeStorage = createAuthCodeStorage();

// 사용자 이름 중복 확인
export function onUsernameVerfication(inputNameValue: string) {
  try {
    const id: ACheckIDProps = { id: inputNameValue };
    usersApi
      .checkID(id)
      .then((response) => {
        if (response.success) {
          console.log("사용자 이름 중복 확인 성공!");
        } else {
          console.log(id);
          console.log(response);
          console.log("사용자 이름 중복 확인 실패:", response.error);
        }
      })
      .catch((error) => {
        console.log("사용자 이름 중복 확인 오류:", error);
      });
    console.log("사용자 이름 확인 중:", inputNameValue);
  } catch (error) {
    console.log("사용자 이름 중복 확인 오류2:", error);
  }
  console.log("사용자 이름 확인 중:", inputNameValue);
}

// 이메일 인증 코드 요청
export function onEmailVerification(
  inputNameValue: string,
  inputEmailValue: string
) {
  try {
    usersApi
      .emailVerification({
        nickname: inputNameValue,
        email: inputEmailValue,
      })
      .then((response) => {
        console.log("이메일 인증 요청 결과:", response.data);

        if (response.status === 200 && response.data.success) {
          const responseData = response.data.response;
          const regex = /인증코드: ([a-zA-Z0-9]+)/;
          const match = responseData.message.match(regex);

          if (match) {
            const backendVeriCode = match[1];
            authCodeStorage.setAuthCode(backendVeriCode);

            console.log("받은 인증코드:", backendVeriCode);
          } else {
            console.log("이메일 인증 요청 실패:", response.data.error);
          }
        } else {
          console.log("이메일 인증 요청 실패:", response.data.error);
        }
      })
      .catch((error) => {
        console.log(inputEmailValue);
        console.log("이메일 인증 요청 오류:", error);
      });
  } catch (error) {
    console.log("이메일 인증 요청 오류:", error);
  }
}

// 인증 코드 검증
export function onAuthCodeVerification(inputAuthCodeValue: string) {
  console.log("인증 코드 확인 중:", inputAuthCodeValue);
  const backendAuthCode = authCodeStorage.getAuthCode();
  if (backendAuthCode === inputAuthCodeValue) {
    console.log("인증 코드 검증 성공!");
  } else {
    console.log("인증 코드 검증 실패: 잘못된 인증 코드");
  }
}
