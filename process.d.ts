declare namespace NodeJS {
  export interface ProcessEnv {
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    NEXT_PUBLIC_ID: string;
    NEXT_PUBLIC_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    AUTH0_ID: string;
    AUTH0_SECRET: string;
    KAKAO_CLIENT_ID: string;
    KAKAO_CLIENT_SECRET: string;
    NAVER_CLIENT_ID: string;
    NAVER_CLIENT_SECRET: string;
  }
}
