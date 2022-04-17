import { SessionProvider, useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import Layout from "../components/layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import SidePanel from "../components/SidePanel";
import { myNextComponentType } from "../types/myTypes";

type Props = {
  children: ReactNode;
};

type myAppProps = AppProps & {
  Component: myNextComponentType;
  pageProps: any;
};

export default function MyApp({ Component, pageProps }: myAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {Component.auth ? (
        <Auth>
          <Layout>
            <SidePanel />
            <Component {...pageProps} />
          </Layout>
        </Auth>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}

const Auth: FC<Props> = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isUser = !!session?.user;
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser) router.replace("/login"); // If not authenticated, force log in
  }, [isUser, status, router]);

  if (isUser) {
    return <>{children}</>;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return (
    <div className="bg-grad min-h-screen flex items-center justify-center text-[#3e6397] text-3xl font-bold">
      Loading...
    </div>
  );
};
