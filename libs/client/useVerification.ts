import { usersApi } from "../api";

// 사용자 이름 중복 확인
export async function onUsernameVerification(inputIDValue: string) {
  try {
    const checkIDResponse = await usersApi.checkID(inputIDValue);

    console.log(checkIDResponse);

    if (checkIDResponse.success) {
      console.log("중복확인 완료!");
      return true;
    }
  } catch (error) {
    console.log("중복확인 오류:", error);
    return false;
  }
}

// 이메일 인증 코드 요청( 이메일 전송 )
export async function onEmailVerification(
  inputNameValue: string,
  inputEmailValue: string
) {
  try {
    const EmailCheckResponse: any = await usersApi.emailcheck(inputEmailValue);

    console.log(EmailCheckResponse);

    if (EmailCheckResponse.success === false) {
      alert("다른 이메일을 입력해주세요.");
      return false;
    } else {
      const EmailVeriResponse = await usersApi.emailVerification({
        nickname: inputNameValue,
        email: inputEmailValue,
      });

      console.log(EmailVeriResponse);

      if (EmailVeriResponse) {
        const responseData = EmailVeriResponse.response;
        const regex = /인증코드: ([a-zA-Z0-9]+)/;
        const match = responseData.message.match(regex);

        console.log(match);

        if (match) {
          const backendVeriCode = match[1];
          console.log("받은 인증코드:", backendVeriCode);

          return backendVeriCode;
        }
      } else {
        alert("다른 이메일을 입력해주세요.");
        console.log("이메일 인증 요청 실패:", EmailVeriResponse.error);
        return false;
      }
    }
  } catch (error) {
    console.log("이메일 인증 오류: ", error);
    return false;
  }
}

// 인증 코드 검증
export function onAuthCodeVerification(
  inputAuthCodeValue: string,
  backendVeriCode: string
) {
  if (inputAuthCodeValue === backendVeriCode) {
    alert("인증코드 검증 성공!");
    console.log("인증코드 검증 성공!");
    return true;
  } else {
    alert("잘못된 인증 코드입니다. 다시 시도해주세요.");
    console.log("인증코드 검증 실패: 잘못된 인증 코드");
    return false;
  }
}
