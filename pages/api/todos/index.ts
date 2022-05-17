import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import { todo } from "../../../types/myTypes";
import { getSession } from "next-auth/react";
import { Todo } from "../../../models/Todo";
import {
  decryptText,
  encryptText,
  hashText,
} from "../../../utils/helperMethods";

type Data = {
  message: string;
  todos?: todo[];
  todo?: todo;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  await dbConnect();

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const email = session.user?.email || "";
  const hashedEmail = hashText(email);

  switch (method) {
    case "GET":
      await getTodos(res, email, hashedEmail);
      break;
    case "POST":
      await createTodo(req, res, email, hashedEmail);
      break;
    default:
      res.status(405).json({
        message:
          "The HTTP method in the request was not supported by the resource",
      });
      break;
  }
}

async function getTodos(
  res: NextApiResponse<Data>,
  email: string,
  hashedEmail: string
) {
  try {
    const todos = await Todo.find({ email: hashedEmail });
    if (todos.length > 0) {
      todos.forEach((todo) => {
        todo.title = decryptText(todo.title, email);
      });
    }

    res.status(200).json({ message: "Success!", todos: todos });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong! Details: " + JSON.stringify(err),
    });
  }
}

async function createTodo(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  email: string,
  hashedEmail: string
) {
  try {
    const reqBodyTodo = req.body;
    if (!reqBodyTodo)
      return res.status(400).json({ message: "Please add a todo!" });

    reqBodyTodo.title = encryptText(reqBodyTodo.title, email);

    var newTodo = new Todo({
      email: hashedEmail,
      title: reqBodyTodo.title,
      isCompleted: reqBodyTodo.isCompleted,
    });

    const todo = await Todo.create(newTodo);
    todo.title = decryptText(todo.title, email);

    res.status(201).json({ message: "Success!", todo: todo });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong! Details: " + JSON.stringify(err),
    });
  }
}
