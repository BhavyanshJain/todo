import { myNextPage } from "../types/myTypes";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

const Home: myNextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);

  session && router.replace("/todos");

  if (status === "loading" || loading || session) {
    return (
      <div className="flex items-center justify-center w-full h-full text-[#3e6397] text-3xl font-bold select-none">
        Loading...
      </div>
    );
  }
  return (
    <div className="py-5 px-6 md:py-10 md:px-20 w-full select-none overflow-y-scroll">
      <div className="flex items-center justify-between pb-5 select-none font-semibold text-[#3e6397]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl pr-5">ToDo</h1>

        <motion.button
          className="text-base sm:text-lg cursor-pointer font-semibold"
          onClick={() => {
            setLoading(true);
            router.replace("/login");
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Login
        </motion.button>
      </div>

      <hr className="py-5" />

      <div className="m-auto w-[90%]">
        <div className="pb-5 font-medium text-xl text-[#3e6397] leading-loose tracking-wide md:tracking-wider text-center lg:w-[80%] lg:m-auto">
          A simple ToDo App made with <span className="font-bold">Next.js</span>{" "}
          and <span className="font-bold">TailwindCSS</span>. It allows you to
          create and delete todo items.
        </div>

        <div className="flex flex-col items-center justify-evenly py-5 gap-5">
          <div className="flex items-center justify-evenly flex-shrink-0 w-full">
            <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0">
              <Image src="/icons/nextjs.svg" alt="Nextjs logo" layout="fill" />
            </div>

            <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0">
              <Image
                src="/icons/tailwindcss.svg"
                alt="TailwindCSS logo"
                layout="fill"
              />
            </div>
          </div>

          <div className="flex items-center justify-evenly flex-shrink-0 w-full">
            <div className="h-12 w-12 lg:h-16 lg:w-16 relative flex-shrink-0">
              <Image
                src="/icons/nextAuth.png"
                alt="NextAuth logo"
                layout="fill"
              />
            </div>

            <div className="h-20 w-20 lg:h-24 lg:w-24 relative flex-shrink-0">
              <Image
                src="/icons/mongodb-mini.svg"
                alt="MongoDB logo"
                layout="fill"
              />
            </div>

            <div className="h-12 w-12 lg:h-16 lg:w-16 relative flex-shrink-0">
              <Image
                src="/icons/typescript.svg"
                alt="Typescript Logo"
                layout="fill"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

Home.auth = false;
