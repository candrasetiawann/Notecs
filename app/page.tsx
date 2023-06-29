import CardText from "@/app/components/layout/CardText";
import Link from "next/link";
import MenuController from "@/app/components/layout/MenuController";
import { getServerSession } from "next-auth";
import { authOptions } from "./lib/nextAuth";
import { redirect } from "next/navigation";
import prisma from "./lib/prisma";

interface Todo {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
}

const getTodos = async (): Promise<Todo[]> => {
  const session = await getServerSession(authOptions);
  if (!session || session === null) {
    return redirect("/components/auth/signin?callbackUrl=/signin");
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  if (!findUser) {
    throw new Error("You should be logged in");
  }

  const todosData = await prisma.nextjs13todo.findMany({
    where: {
      authorId: findUser?.id ?? "",
    },
  });
  return todosData || [];
};

export default async function Home(): Promise<JSX.Element> {
  const todos: Todo[] = await getTodos();
  return (
    // <ErrorBoundary fallback={<ErrorComponent error={new Error("error")} reset={() => {}} /> }>
    <div className="relative z-10 overflow-x-hidden">
      <div className=" fixed z-50 top-0 right-0 left-0 mt-0">
        <MenuController />
      </div>
      <div className="relative z-0 flex flex-col gap-[30px] w-full min-h-screen">
        <div className=" bg-blue-900 min-h-screen">
          <div className="sticky top-0 z-50 w-full py-2 mt-12 bg-red-600">
            <div className=" w-full space-x-2 my-[10px] mt-4 mx-6 ">
              <input
                className="bg-white px-4 py-2 focus:outline-none w-2/5 mt-1 border-4 border-black"
                type="text"
                placeholder="Cari"
              />
              <button className="bg-amber-400 px-4 py-2 border-4 border-black">
                Cari
              </button>
              <Link
                className="bg-cyan-600 px-4 py-2 border-4 border-black"
                href={"/create"}
              >
                Buat
              </Link>
            </div>
          </div>
          {todos &&
            todos?.map((todo: any, index: number) => {
              return <CardText key={index} todo={todo} />;
            })}
        </div>
      </div>
    </div>
    // </ErrorBoundary>
  );
}
