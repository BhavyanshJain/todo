import { ReactNode } from "react";
import Head from "next/head";
import Circles from "./Circles";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>ToDo</title>

        <link rel="manifest" href="/manifest.json" />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#fff" />

        {/* <title>ToDo</title>
        <meta name="description" content="Best ToDo app in the World." />
        <meta charSet="utf-8" />
        <meta name="keywords" content="ToDo" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#fff" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="mask-icon"
          href="/icons/maskable_icon_x192.png"
          color="#00c2cb"
        /> */}
      </Head>

      <main>
        <div className="bg-grad min-h-screen flex items-center justify-center">
          <Circles />
          <div className="h-[90vh] w-[85%] md:h-[80vh] md:w-[70%] bg-white bg-opacity-30 rounded-xl sm:rounded-2xl md:rounded-3xl backdrop-filter backdrop-blur-xl border border-opacity-20 border-white z-20">
            <div className="h-[90vh] md:h-[80vh] flex flex-col lg:flex-row">
              {children}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
