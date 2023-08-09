import AppLayout from "@/layouts/appLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CookiesProvider } from "react-cookie";
import { InputProvider } from "@/libs/client/inputContext";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <InputProvider>
      <RecoilRoot>
        <SWRConfig>
          <QueryClientProvider client={queryClient}>
            <AppLayout>
              <CookiesProvider>
                <Component {...pageProps} />
              </CookiesProvider>
            </AppLayout>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </SWRConfig>
      </RecoilRoot>
    </InputProvider>
  );
}

export default MyApp;
