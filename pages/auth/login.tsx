import { ALogInProps, usersApi } from "@/libs/api";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import SubmitBtn from "@/components/function/submitBtn";
import Input from "@/components/function/input";
import Layout from "@/layouts/layout";
import Head from "next/head";
import Link from "next/link";
import { Google, KakaoTalk, LoginLine, Naver } from "@/components/icons";
import { useLayoutEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { getCookie, setCookie } from "@/libs/client/cookies";
import { userInfoState, UserInfoState } from "@/libs/client/atom";
import { useRecoilState } from "recoil";

function LogIn() {
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ALogInProps>({
    mode: "onChange",
  });

  const [loginError, setLoginError] = useState<string>("");
  // const [login, setLogin] = useRecoilState(isLoggedInState);
  // const [logUsername, setLogUsername] = useRecoilState(loginState);
  const router = useRouter();

  // const loginMutation = useMutation(
  //   (data: ALogInProps) => usersApi.login(data) // usersApi.login 사용
  // );
  // useMutation의 첫 번째 매개변수 : 비동기 작업을 수행하는 콜백 함수

  // 로컬 스토리지에서 저장된 아이디 가져오기
  const [rememberCheck, setRememberCheck] = useState<boolean>(true);
  // 아이디 입력 필드의 기본값을 저장하기 위한 상태 변수
  const [inputValue, setInputValue] = useState<string>("");

  useLayoutEffect(() => {
    // Check if localStorage is available (for server-side rendering)
    if (typeof window !== "undefined" && window.localStorage) {
      // Now you can safely use localStorage
      const rememberedId = localStorage.getItem("rememberedId");
      const defaultUsernameValue = rememberedId || "";
      setInputValue(defaultUsernameValue);
    }
  }, []);

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const fetchAndSetDefaultValues = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      console.log(accessToken);

      if (!accessToken) {
        // accessToken이 없다면 로그인 페이지로 리다이렉트
        router.push("/auth/login");
        return;
      }

      if (accessToken) {
        const viewInfoResponse: any = await usersApi.viewInfos(accessToken);
        console.log(viewInfoResponse);

        if (viewInfoResponse?.success) {
          console.log("회원정보 조회 성공!");

          const updatedUserInfoData: UserInfoState = {
            username: viewInfoResponse.response.response.username,
            nickname: viewInfoResponse.response.response.nickname,
            email: viewInfoResponse.response.response.email,
            birth: viewInfoResponse.response.response.birth,
            phonenum: viewInfoResponse.response.response.phone,
            interests: viewInfoResponse.response.response.interests,
          };

          setUserInfo(updatedUserInfoData);
          console.log(updatedUserInfoData);
        }
      }
    } catch (error) {
      console.log("회원정보 조회 오류");
    }
  };

  const submitForm: SubmitHandler<ALogInProps> = async (data: ALogInProps) => {
    try {
      // 기존 로그인 시 아이디 저장 체크된 경우, 아이디 input에 빈문자열 전달되는 상황 -> 아이디 필드 값을 업데이트
      if (data.username == "" && data.password != "") {
        data.username = inputValue;
      }
      const loginResponse: any = await usersApi.login(data);
      console.log(data);

      if (loginResponse.success) {
        console.log("로그인 성공!");
        console.log(loginResponse);
        // 아이디를 로컬 스토리지에 저장 (리멤버 아이디 체크된 경우에만 저장)
        console.log(rememberCheck);
        if (rememberCheck) {
          localStorage.setItem("rememberedId", data.username);
        } else {
          setInputValue("");
          localStorage.removeItem("rememberedId");
        }
        // 로그인 성공
        const accessToken: string = loginResponse.response.response.accessToken;
        const refreshToken: string =
          loginResponse.response.response.refreshToken;

        console.log(accessToken);
        console.log(refreshToken);
        alert("로그인에 성공했습니다.");

        // 토큰 저장
        // refreshToken 저장 위치 고려..!
        localStorage.setItem("accessToken", accessToken);
        setCookie("refreshToken", refreshToken);
        setCookie("accessToken", accessToken);

        fetchAndSetDefaultValues();
        console.log(userInfo);

        // 페이지 이동
        // 예시: 메인 페이지로 이동
        router.push("/main");
      } else {
        // 로그인 실패
        alert(
          "로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인해주세요."
        );
        setLoginError(
          "로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인해주세요."
        );
      }
    } catch (error) {
      alert("로그인에 실패했습니다. 사용자 이름 또는 비밀번호를 확인해주세요.");
      console.error("로그인 오류:", error);
      setLoginError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  // Enter 키 누를 때 폼 제출
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 아이디찾기페이지로 넘어가는거 막음
      handleSubmit(submitForm)(); // 폼 제출 함수 호출
    }
  };

  return (
    <>
      <Layout>
        <Head>
          <title>LogIn</title>
        </Head>
        <div className="flex flex-col items-center mobile:h-[30px]">
          <div className="relative top-[240px] mobile:top-[120px] text-center mo ">
            <p className="text-4xl mb-[0px] font-semibold text-black mobile:text-[20pt] mobile:mb-[60px]">
              로그인
            </p>
          </div>
          <div className="absolute top-[305px] mobile:top-[170px] text-center">
            <p className="text-lg text-[#666]">
              Rendi만의 지능형 AI 검색을 경험해보세요!
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center mt-[100px] h-screen mobile:mt-[150px] mobile:h-[600px]">
          <form
            className=" flex flex-col justify-center items-center gap-1 p-0 w-[590px] h-[890px] mobile:w-[390px] mobile:h-[930px]"
            onSubmit={handleSubmit(submitForm)}
          >
            <Input
              name="username"
              label=""
              type="username"
              register={register("username", {})}
              placeholder="아이디"
              kind="text"
              error={errors?.username?.message}
              className="justify-center items-center"
              defaultValue={inputValue}
            />
            <Input
              name="password"
              label=""
              type="password"
              kind="text"
              register={register("password", {})}
              placeholder="비밀번호"
              error={errors?.password?.message}
              autoComplete="off"
              onKeyPress={handleKeyPress}
            />
            <div className="flex text-xs justify-between mobile:flex-col items-center h-[40px] w-[448px] text-[#666]">
              <label
                htmlFor="rememberId"
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="rememberId"
                  className="mr-2"
                  onChange={(e) => setRememberCheck(e.target.checked)}
                  defaultChecked={true}
                />
                Remember ID
              </label>
              <div className="flex mobile:p-[20px]">
                <Link href="/find/id" legacyBehavior>
                  <button className=" bg-white">아이디 찾기</button>
                </Link>

                <p className="px-[5px] text-[10pt]"> | </p>

                <Link href="/find/pw" legacyBehavior>
                  <button className=" bg-white">비밀번호 찾기</button>
                </Link>
              </div>
            </div>
            <div className="flex mt-[20px] text-center text-xs justify-center mobile:pt-[20px]">
              <SubmitBtn
                type="submit"
                text="로그인"
                className="flex justify-center items-center h-screen"
              />
            </div>
            <div className="mt-[20px] mobile:mt-[15px]">
              <LoginLine />
            </div>

            <div className="flex mobile:flex-col mt-[20px] text-center text-[10pt] mobile:mt-[15px]">
              <button className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#fee500] mobile:w-[326px] mobile:mx-auto ">
                <div className="mr-[10px]">
                  <KakaoTalk />
                </div>
                카카오 로그인
              </button>
              {/* <div className="mobile:flex mobile:my-3"> */}
              {/* <button className="flex items-center justify-center flex-row w-[186px] h-[46px] mr-[15px] p-5 rounded-[15px] bg-[#03c75a] mobile:w-[155px] ">
                <div className="mr-[10px]">
                  <Naver />
                </div>
                네이버 로그인
              </button>
              <button className="flex items-center justify-center flex-row w-[186px] h-[46px] p-5 rounded-[15px] bg-white border border-[#cecdcd] mobile:w-[155px]">
                <div className="mr-[10px]">
                  <Google />
                </div>
                구글 로그인
              </button> */}
              {/* </div> */}
            </div>

            <div className="mt-[40px] bg-white text-gray-600 text-[11pt] text-base">
              Rendi가 처음이신가요?
            </div>
            <Link href="/auth/signUp" legacyBehavior>
              <button className="mt-[3px] bg-white text-black text-[12pt] text-base">
                회원가입
              </button>
            </Link>
          </form>
        </div>
        {/* </Layout> */}
      </Layout>
    </>
  );
}

export default LogIn;

//https://velog.io/@taemin4u/Next-Auth%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%98%EC%97%AC-%EC%86%8C%EC%85%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0v4
