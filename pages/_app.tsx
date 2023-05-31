import AppLayout from "@/layouts/appLayout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SWRConfig>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </SWRConfig>
    </SessionProvider>
  );
}

export default MyApp;
