import { Cookies } from "react-cookie";

interface CookieProps {
  path?: string;
  expires?: Date;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
  httpOnly?: boolean;
  [key: string]: any;
}

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  // 쿠키 기본 옵션
  const defaultOptions: CookieProps = {
    path: "/",
    secure: true,
    sameSite: "strict",
    httpOnly: true,
  };

  // 만료 기간
  const expires = new Date();
  expires.setDate(expires.getDate() + 3); // 3일 뒤

  // 쿠키 최종 옵션
  const finalOptions = {
    ...defaultOptions,
    ...options,
    expires,
  };

  return cookies.set(name, value, finalOptions);
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
