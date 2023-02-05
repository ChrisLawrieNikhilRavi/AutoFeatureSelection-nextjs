import "../styles/globals.css";
import Layout from "@/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { DarkModeProvider } from "@/context/darkModeContext";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
// import { GoogleAnalytics } from "nextjs-google-analytics";

NProgress.configure({
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const router = useRouter();

  useEffect(() => {
    const start = () => {
      NProgress.start();
    };
    const end = () => {
      NProgress.done();
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <DarkModeProvider>
        <Layout>
          {/* {process.env.NODE_ENV === "production" && (
          <GoogleAnalytics strategy="lazyOnload" />
        )} */}
          {/* TODO: Add Google Analytics */}
          <Component {...pageProps} />
        </Layout>
      </DarkModeProvider>
    </SessionContextProvider>
  );
}

export default MyApp;
