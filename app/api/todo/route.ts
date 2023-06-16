// import prisma from "@/app/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export const GET = async (req: NextRequest) => {
//   const todos = await prisma.nextjs13todo.findMany({});
//   return NextResponse.json({ todos });
// };

// export const POST = async (req: NextRequest) => {
//   const { title, content } = await req.json();

//   // const todos = await prisma.nextjs13todo.create({
//   //   data: {
//   //     title,
//   //     content,
//   //   },
//   // });
//   // return NextResponse.json({ todos });
// };

// export const DELETE = async (req: NextRequest) => {
//   const url = new URL(req.url).searchParams;
//   const id = Number(url.get("id")) || 0;
//   console.log("id" + id);

//   const todos = await prisma.nextjs13todo.delete({
//     where: {
//       id: id,
//     },
//   });

//   if (!todos) {
//     return NextResponse.json({ message: "error" }, { status: 500 });
//   }
//   return NextResponse.json({ message: "ok" }, { status: 200 });
// };

// export const PUT = async (req: NextRequest) => {
//   const { id, title, content } = await req.json();

//   const todos = await prisma.nextjs13todo.update({
//     where: {
//       id: Number(id),
//     },
//     data: {
//       title,
//       content,
//     },
//   });
//   return NextResponse.json({ todos });
// };

import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const session = await getServerSession(authOptions);
  console.log("ini session :", session);
  if (!session) {
    console.log("not authenticated");
    return NextResponse.json({ authenticated: !!session, session });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? "",
    },
  });

  console.log("user : ", user);

  if (user === null) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const todos = await prisma.nextjs13todo.findMany({
    where:{
      authorId:user.id
    }
  });
  console.log('ini todos : ',todos)
  return NextResponse.json({ todos });
};


//POST
export const POST = async (req: NextRequest) => {
  //get user by session
  const session = await getServerSession(authOptions);
  const findUser = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? "" },
  });

  //if user is missing
  if (!findUser) {
    throw new Error("User ID is missing");
  }

  if (req.method === "POST") {
    const { title, content } = await req.json();
    
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required" },
        { status: 400 }
      );
    }

    const createTodos = await prisma.nextjs13todo.create({
      data: {
        title,
        content,
        author: {
          connect: {
            id: findUser.id,
          },
        },
      },
    });
    console.log(createTodos);
    return NextResponse.json({ createTodos });
  }
};


//DELETE
export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url).searchParams;
  const id = Number(url.get("id")) || 0;
  console.log("id" + id);

  const deleteTodos = await prisma.nextjs13todo.delete({
    where: {
      id: id,
    },
  });

  if (!deleteTodos) {
    return NextResponse.json({ message: "error" }, { status: 500 });
  }
  return NextResponse.json({ message: "ok" }, { status: 200 });
};

//PUT
export const PUT = async (req: NextRequest) => {
  const { id, title, content } = await req.json();

  const todos = await prisma.nextjs13todo.update({
    where: {
      id: Number(id),
    },
    data: {
      title,
      content,
    },
  });
  return NextResponse.json({ todos });
};

//tes connection
async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Koneksi database berhasil!");
    // Lakukan operasi lain yang melibatkan Prisma di sini
  } catch (error) {
    console.error("Gagal terhubung ke database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testDatabaseConnection();
