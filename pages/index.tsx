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

      <div className="font-medium text-[#3e6397] grid grid-flow-row md:grid-cols-2 gap-5">
        <div className="p-2">
          A simple ToDo App made with <span className="font-bold">Next.js</span>{" "}
          and <span className="font-bold">TailwindCSS</span>. It allows you to
          create, edit, and delete todo items.
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0">
            <Image
              src="/icons/nextjs.svg"
              alt="Picture of bhavyansh jain"
              layout="fill"
            />
          </div>

          <span className="text-4xl font-extralight">+</span>

          <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0">
            <Image
              src="/icons/tailwindcss.svg"
              alt="Picture of bhavyansh jain"
              layout="fill"
            />
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <div className="h-14 w-14 lg:h-20 lg:w-40 relative flex-shrink-0 hidden lg:block">
            <Image src="/icons/mongodb.svg" alt="MongoDB logo" layout="fill" />
          </div>

          <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0 lg:hidden">
            <Image
              src="/icons/mongodb-mini.svg"
              alt="MongoDB logo"
              layout="fill"
              className="hidden lg:block"
            />
          </div>

          <span className="text-4xl font-extralight">+</span>

          <div className="h-14 w-14 lg:h-20 lg:w-20 relative flex-shrink-0">
            <Image
              src="/icons/nextAuth.png"
              alt="next Auth logo"
              layout="fill"
            />
          </div>
        </div>

        <div className="p-2">
          Your data is completely encrypted with{" "}
          <span className="font-bold">crypto-js</span> and stored in{" "}
          <span className="font-bold">MongoDB Atlas</span>. <br />
          <br /> Google login is provided with the help of{" "}
          <span className="font-bold">Next-Auth</span>. Designed with{" "}
          <span className="font-bold"> TailwindCSS </span>
          and animated with <span className="font-bold"> Framer Motion</span>.
          Coded in <span className="font-bold">Typescript</span>{" "}
          <p className="h-5 w-5 relative inline-block px-3 -mb-1">
            <Image
              src="/icons/typescript.svg"
              alt="Typescript Logo"
              layout="fill"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;

Home.auth = false;
