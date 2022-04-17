import { NextComponentType, NextPage } from "next";

export type myNextComponentType = NextComponentType & { auth: boolean };

export type myNextPage = NextPage & { auth: boolean };

export type todo = {
  _id: string;
  email: string;
  title: string;
  isCompleted: boolean;
};

