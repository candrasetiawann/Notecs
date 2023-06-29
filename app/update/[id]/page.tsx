"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch("/api/todo/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        id,
      }),
    });
    router.push("/");
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const res = await fetch("/api/todo/" + id);
    const json = await res.json();

    if (!json) {
      router.push("/404");
      return;
    }

    setTitle(json.todos.title);
    setContent(json.todos.content);
  };

  return (
    <div className="bg-blue-900 w-full min-h-screen">
      <div className=" ml-6 mt-[50px] flex bg-teal-600 w-2/3 flex-col h-[500px] border-4 border-black box-shadow-offset-black">
        <form
          onSubmit={handleSubmit}
          className="py-8 flex flex-col gap-2 px-4"
          action=""
        >
          <input
            className="focus:outline-none bg-teal-600 placeholder:text-teal-400 font-bold"
            type="text"
            placeholder="Judul"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            className="focus:outline-none bg-teal-600 placeholder:text-teal-400 py-2 px-3 resize-none"
            placeholder="Buat Catatan Baru"
            rows={13}
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <button className="bg-amber-400 py-2 px-4 border-4 border-black">
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
