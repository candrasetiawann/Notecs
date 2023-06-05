"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { findUserByEmail } from "../api/todo/user";


const Page = async() => {
  const { data: session, status } = useSession();
  const user = await findUserByEmail(session?.user?.email ?? "")
  const authorId = user?.id
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    // const author = await prisma.user.findUnique({
    //   where: { email: session?.user?.email ?? "" },
    // });


    event.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        authhorId: authorId
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      setIsLoading(false);
      router.push("/");
    } else {
      // Handle the error condition appropriately
      console.error("Failed to submit form:", response.status, response.statusText);
      setIsLoading(false);
    }

   
    setIsLoading(false);
    router.push("/");
  };

  return (
    <div className="bg-blue-900 w-full min-h-screen">
      <h1 className="text-white text-center">Buat Catatan Baru</h1>
      <div className=" ml-6 mt-4 flex bg-teal-600 w-3/4 flex-col h-[500px] border-4 border-black box-shadow-offset-black">
        <form
          className="py-8 flex flex-col gap-2 px-4"
          action=""
          onSubmit={handleSubmit}
        >
          <input
            className="focus:outline-none bg-teal-600 placeholder:text-teal-400 font-bold px-3"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Judul"
          />
          <textarea
            className="focus:outline-none bg-teal-600 placeholder:text-teal-400 py-2 px-3 resize-none"
            rows={13}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Buat Catatan Baru"
          />
          <button
            className="border-4 border-black bg-amber-400 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Loading" : "Simpan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
