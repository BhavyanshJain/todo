import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import { getSession } from "next-auth/react";
import { Todo } from "../../../models/Todo";
import { encryptText, hashText } from "../../../utils/helperMethods";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  const email = session.user?.email || "";
  const hashedEmail = hashText(email);

  switch (method) {
    case "PUT":
      await updateATodo(req, res, id, email, hashedEmail);
      break;
    case "DELETE":
      await deleteATodo(res, id, hashedEmail);
      break;
    default:
      res.status(405).json({
        message:
          "The HTTP method in the request was not supported by the resource",
      });
      break;
  }
}

async function updateATodo(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
  id: string | string[],
  email: string,
  hashedEmail: string
) {
  try {
    const reqBodyTodo = req.body;
    if (!reqBodyTodo)
      return res.status(400).json({ message: "Please add a todo!" });

    reqBodyTodo.title = encryptText(reqBodyTodo.title, email);

    const todo = await Todo.findOneAndUpdate(
      { _id: id, email: hashedEmail },
      {
        $set: {
          email: hashedEmail,
          title: reqBodyTodo.title,
          isCompleted: reqBodyTodo.isCompleted,
        },
      },
      { new: true, runValidators: true }
    );

    if (!todo)
      return res.status(401).json({ message: "Invalid Authentication!" });

    res.status(200).json({ message: "Success!" });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong! Details: " + JSON.stringify(err),
    });
  }
}

async function deleteATodo(
  res: NextApiResponse<Data>,
  id: string | string[],
  hashedEmail: string
) {
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      email: hashedEmail,
    });

    if (!deletedTodo)
      return res.status(401).json({ message: "Invalid Authentication!" });

    res.status(201).json({ message: "Success!" });
  } catch (err) {
    return res.status(400).json({
      message: "Something went wrong! Details: " + JSON.stringify(err),
    });
  }
}
