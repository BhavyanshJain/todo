import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { todo } from "../../types/myTypes";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";

export default function Todos() {
  const router = useRouter();
  const { status } = useSession();

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputTitle, setInputTitle] = useState("");

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    await axios
      .get("/api/todos")
      .then((res) => {
        setTodos(
          res.data.todos.filter((todo: todo) => todo.isCompleted === false)
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

  const handleTick = async (e: React.FormEvent, todo: todo) => {
    e.preventDefault();

    const data = {
      title: todo.title,
      isCompleted: true,
    };

    await axios
      .put(`/api/todos/${todo._id}`, data)
      .then(() => fetchTodos())
      .catch((err) => console.log(err));
  };

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      title: inputTitle,
      isCompleted: false,
    };

    await axios
      .post("/api/todos", data)
      .then(() => fetchTodos())
      .catch((err) => console.log(err))
      .finally(() => setInputTitle(""));
  };

  return (
    <div className="py-5 px-5 md:py-10 md:px-20 w-full overflow-y-auto overflow-x-hidden select-none flex flex-col h-full">
      <div className="flex items-center justify-between pb-7 text-[#3e6397] ">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
          ToDo{" "}
          <span className="text-sm sm:text-base md:text-lg"> (Current) </span>
        </h1>
      </div>

      <form
        onSubmit={handleCreate}
        className="flex items-center justify-between pb-7"
      >
        <input
          disabled={loading}
          maxLength={125}
          autoFocus={true}
          type="text"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          className="w-full border-0 rounded-lg bg-gradient-to-br from-[#e2f3f9] to-transparent backdrop-filter backdrop-blur-xl border-none focus:ring-0"
          placeholder=" Add a new todo..."
        />
        <button type="submit"></button>
      </form>

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
                onClick={(e) => handleTick(e, todo)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="group ">
                  <CheckCircleIconSolid className="hidden w-6 h-6 sm:w-8 sm:h-8 text-green-500 group-hover:block" />

                  <CheckCircleIconOutline className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500 group-hover:hidden" />
                </div>
              </motion.button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Todos.auth = true;
