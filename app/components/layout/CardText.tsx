"use client";
import { nextjs13todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

interface Props {
  todo: nextjs13todo;
}

const CardText = ({ todo }: Props) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    await fetch("api/todo?id=" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    router.refresh();
  };

  return (
    // <div className={clsx('my-8 mx-6 border-4 border-black  box-shadow-offset-black',randomColorClass)}>
    <div className="bg-yellow-300 my-8 mx-6 border-4 border-black  box-shadow-offset-black">
      <h1 className="text-[24px] font-bold pt-6 ml-4 mb-4">{todo.title}</h1>
      <div className="flex flex-col ">
        <p className="ml-4 mb-2">{todo.content}</p>
        <div className="flex flex-row justify-start space-x-4 mt-6 ml-4 mb-4">
          <button
            className="bg-teal-500 px-[10px] py-[5px] border-2 border-black"
            onClick={() => router.push(`/update/${todo.id}`)}
          >
            Edit
          </button>
          <button
            className="bg-teal-500 px-[10px] py-[5px] border-2 border-black"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardText;
