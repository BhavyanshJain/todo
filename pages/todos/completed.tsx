import { TrashIcon as TrashIconOutline } from "@heroicons/react/outline";
import { TrashIcon as TrashIconSolid } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { todo } from "../../types/myTypes";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";

export default function CompletedTodos() {
  const router = useRouter();
  const { status } = useSession();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    await axios
      .get("/api/todos")
      .then((res) => {
        setTodos(
          res.data.todos.filter((todo: todo) => todo.isCompleted === true)
        );
      })
      .catch((err) => {
        console.log(err);
        router.replace("/login");
      })
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    status === "loading" ? null : fetchTodos();
  }, [status, router, fetchTodos]);

  const handleDelete = async (e: React.FormEvent, todo: todo) => {
    e.preventDefault();

    await axios
      .delete(`/api/todos/${todo._id}`)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-5 px-5 md:py-10 md:px-20 w-full overflow-y-auto overflow-x-hidden select-none">
      <div className="flex items-center justify-between pb-7 text-[#3e6397] ">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          ToDo{" "}
          <span className="text-sm sm:text-base md:text-lg"> (Completed) </span>
        </h1>
      </div>

      {status === "loading" || loading ? (
        <div className="flex items-center justify-center  text-[#3e6397] text-2xl font-bold select-none flex-grow h-full">
          Loading...
        </div>
      ) : (
        <div className="flex flex-col-reverse gap-2 sm:gap-4">
          {todos.map((todo: todo) => (
            <div
              key={todo._id}
              className="p-2 sm:p-4 rounded-lg sm:rounded-xl bg-[#ebf0f9] w-full shadow-md sm:shadow-lg select-none flex items-center justify-between"
            >
              <h3 className="text-sm text-ellipsis overflow-hidden sm:text-md font-bold text-[#3e6397]">
                {todo.title}
              </h3>

              <motion.button
                className="cursor-pointer sm:p-[6px] rounded-xl"
                onClick={(e) => handleDelete(e, todo)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="group ">
                  <TrashIconSolid className="hidden w-4 h-4 sm:w-6 sm:h-6 text-red-500 group-hover:block" />

                  <TrashIconOutline className="w-4 h-4 sm:w-6 sm:h-6 text-gray-500 group-hover:hidden" />
                </div>
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

CompletedTodos.auth = true;
