import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/solid";

type Props = {};

export default function SidePanel({}: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) return <></>;

  const { user } = session;

  return (
    <div className="p-2 lg:p-0 w-full lg:h-full lg:w-[25%] bg-gradient-to-br from-[#e2f3f9] to-transparent rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl lg:rounded-none lg:rounded-l-3xl backdrop-filter backdrop-blur-xl flex flex-row lg:shrink-0 lg:flex-col items-center justify-between lg:justify-start select-none">
      <div className="top-0 left-0 h-10 w-10 lg:m-0 lg:mt-10 lg:h-20 lg:w-20 relative m-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user?.image || ""}
          alt="Picture of bhavyansh jain"
          data-layout="fill"
          className="rounded-full"
        />
      </div>

      <p className="hidden lg:block pt-5 font-semibold text-[#3e6397] cursor-default">
        {user?.name}
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center order-last lg:order-none cursor-pointer lg:mt-2 text-sm lg:text-base font-semibold text-[#658ec6] p-2 lg:p-0"
        onClick={() => signOut()}
      >
        Logout
      </motion.button>

      <div className="lg:pt-20 text-base text-[#00b7ff] grid grid-flow-col lg:grid-flow-row gap-2 lg:gap-10 content-start font-medium">
        <motion.button
          className="flex items-center cursor-pointer"
          onClick={() => router.replace("/todos")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ClipboardDocumentListIcon className="w-8 h-8 lg:w-12 lg:h-12" />
        </motion.button>

        <motion.button
          className="flex items-center cursor-pointer"
          onClick={() => router.replace("/todos/completed")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ClipboardDocumentCheckIcon className="w-8 h-8 lg:w-12 lg:h-12" />
        </motion.button>
      </div>
    </div>
  );
}
