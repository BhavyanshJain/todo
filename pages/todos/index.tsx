import { CheckCircleIcon as CheckCircleIconOutline } from "@heroicons/react/outline";
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/solid";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { todo } from "../../types/myTypes";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import axios from "axios";

export default function Todos() {
  const router = useRouter();
  const { status } = useSession();

  const textInput = useRef(null);
  const [todos, setTodos] = useState([]);
  const [inputTitle, setInputTitle] = useState("");

  const fetchTodos = useCallback(async () => {
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
      });
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
    setInputTitle("");
    // @ts-ignore: Object is possibly 'null'.
    textInput.current.disabled = true;

    const data = {
      title: inputTitle,
      isCompleted: false,
    };

    await axios
      .post("/api/todos", data)
      .then(() => fetchTodos())
      .catch((err) => console.log(err))
      .finally(() => {
        // @ts-ignore: Object is possibly 'null'.
        textInput.current.disabled = false;
        // @ts-ignore: Object is possibly 'null'.
        textInput.current.focus();
      });
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
          required
          type="text"
          maxLength={125}
          autoFocus={true}
          ref={textInput}
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          className="w-full border-0 rounded-lg bg-gradient-to-br from-[#e2f3f9] to-transparent backdrop-filter backdrop-blur-xl border-none focus:ring-0"
          placeholder=" Add a new todo..."
        />
        <button type="submit"></button>
      </form>

      <div className="flex flex-col-reverse gap-2 sm:gap-4">
        {todos.map((todo: todo) => (
          <div
            key={todo._id}
            className="py-2 px-4 sm:p-4 rounded-lg sm:rounded-xl bg-[#ebf0f9] w-full shadow-md sm:shadow-lg select-none flex items-center justify-between"
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
              <div className="group">
                <CheckCircleIconSolid className="hidden w-5 h-5 sm:w-7 sm:h-7 text-green-500 group-hover:block something" />
                <CheckCircleIconOutline className="w-5 h-5 sm:w-7 sm:h-7 text-gray-500 group-hover:hidden" />
              </div>
            </motion.button>
          </div>
        ))}
      </div>
    </div>
  );
}

Todos.auth = true;
