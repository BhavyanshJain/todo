import { TrashIcon as TrashIconOutline } from "@heroicons/react/24/outline";
import { TrashIcon as TrashIconSolid } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { todo } from "../../types/myTypes";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";

export default function CompletedTodos() {
  const router = useRouter();
  const { status } = useSession();
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

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
    setTodos(todos.filter((t: todo) => t._id !== todo._id));
    await axios
      .delete(`/api/todos/${todo._id}`)
      .catch((err) => console.log(err));
  };

  return (
    <div className="py-5 px-5 md:py-10 md:px-20 w-full overflow-y-scroll overflow-x-hidden select-none flex flex-col h-full">
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
        <motion.div layout className="flex flex-col-reverse gap-2 sm:gap-4">
          {todos.map((todo: todo) => (
            <motion.div
              layout
              key={todo._id}
              className="py-2 px-4 sm:p-4 rounded-lg sm:rounded-xl bg-[#ebf0f9] w-full shadow-md sm:shadow-lg select-none flex items-center justify-between"
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
                  <TrashIconSolid className="hidden w-5 h-5 sm:w-7 sm:h-7 text-red-500 group-hover:block" />
                  <TrashIconOutline className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500 group-hover:hidden" />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

CompletedTodos.auth = true;
