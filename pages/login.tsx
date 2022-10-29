import { useSession, signIn, getProviders, getSession } from "next-auth/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Image from "next/image";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Login({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (session && status === "authenticated") return null;

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-[#3e6397] text-3xl font-bold select-none">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <motion.button
        className="absolute top-5 left-5 cursor-pointer"
        onClick={() => {
          setLoading(true);
          router.replace("/");
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeftIcon className="w-6 h-6 sm:w-8 sm:h-8 text-[#506f97]" />
      </motion.button>

      <h1 className="font-bold text-2xl sm:text-3xl pb-10 text-[#224066] select-none">
        ToDo
      </h1>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setLoading(true);
          signIn(providers.google.id);
        }}
        className="px-5 sm:px-10 py-2 rounded-lg text-gray-700 bg-opacity-75 flex items-center bg-gray-100"
      >
        <Image src="/icons/google.png" alt="a" width={16} height={16} />
        <p className="pl-2 ">Continue with {providers.google.name} </p>
      </motion.button>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/todos",
        permanent: false,
      },
    };
  }

  const providers = await getProviders();

  return {
    props: { providers },
  };
};
